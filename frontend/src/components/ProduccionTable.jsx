import React, { useState, useEffect } from "react";
import { API_URL } from "../services/api";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

const ProduccionTable = () => {
  const [produccionDia, setProduccionDia] = useState([]);
  const [resumen, setResumen] = useState({
    totalProduccionDia: 0,
    totalProduccionSemana: 0,
    totalProduccionMes: 0,
    totalProduccionAnio: 0,
    totalPrecioMayor: 0,
    totalPrecioDetal: 0,
    totalMaquinaSoftDia: 0,
    totalMaquinaSoftSemana: 0,
    totalMaquinaSoftMes: 0,
    totalMaquinaSoftAnio: 0,
    totalMaquinaMantecadoraDia: 0,
    totalMaquinaMantecadoraSemana: 0,
    totalMaquinaMantecadoraMes: 0,
    totalMaquinaMantecadoraAnio: 0,
    normal: 0,
    especial: 0,
    superEspecial: 0,
    "1lt": 0,
    "2lt": 0,
    "4lt": 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    tipo: '',
    maquina: '',
    sabor: ''
  });

  // Función para obtener el color y etiqueta según el tipo de helado
  const getTipoStyles = (tipo) => {
    switch(tipo) {
      case 'normal':
        return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Normal' };
      case 'especial':
        return { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Especial' };
      case 'superEspecial':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Super Especial' };
      case '1lt':
        return { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Envase 1lt' };
      case '2lt':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Envase 2lt' };
      case '4lt':
        return { bg: 'bg-pink-100', text: 'text-pink-800', label: 'Envase 4lt' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: tipo };
    }
  };

  // Función para formatear precios con moneda
  const formatPrecio = (precio, moneda) => {
    if (!precio) return '-';
    return moneda === 'USD' ? `$${precio}` : `Bs ${precio}`;
  };

  // Función para aplicar filtros
  const aplicarFiltros = () => {
    return produccionDia.filter(item => {
      return (
        (filters.tipo === '' || item.tipo === filters.tipo) &&
        (filters.maquina === '' || item.maquina === filters.maquina) &&
        (filters.sabor === '' || item.sabor.toLowerCase().includes(filters.sabor.toLowerCase()))
      );
    });
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Obtener todos los registros de producción
        const prodResponse = await fetch(`${API_URL}/produccion`);
        if (!prodResponse.ok) throw new Error('Error al obtener datos');
        
        const responseData = await prodResponse.json();
        
        // Verificar la estructura de la respuesta
        const todosLosRegistros = responseData.data || responseData || [];
        
        if (!Array.isArray(todosLosRegistros)) {
          throw new Error('Formato de datos inesperado');
        }

        // Filtrar para obtener solo los del día actual
        const hoy = new Date().toISOString().split('T')[0];
        const produccionHoy = todosLosRegistros.filter(item => 
          item.fecha && new Date(item.fecha).toISOString().split('T')[0] === hoy
        );
        
        setProduccionDia(produccionHoy);
        
        // 2. Obtener el resumen
        const resumenResponse = await fetch(`${API_URL}/produccion/resumen`);
        if (!resumenResponse.ok) throw new Error('Error al obtener resumen');
        
        const resumenData = await resumenResponse.json();
        const resumenCompleto = resumenData.data || resumenData;
        
        setResumen(prev => ({
          ...prev,
          ...resumenCompleto
        }));
        
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando datos de producción...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

 const exportToPDF = () => {
  try {
    const datosFiltrados = aplicarFiltros();
    const doc = new jsPDF();
    const colorPrincipal = '#E91E63';
    const colorSecundario = '#4CAF50';
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Agregar logo (opcional)
    if (typeof doc.addImage === 'function') {
      doc.addImage('https://i.imgur.com/GkhD8en.jpg', 'JPEG', pageWidth - 30, 10, 20, 20);
    }
    
    // Título del reporte
    doc.setFontSize(18);
    doc.setTextColor(colorPrincipal);
    doc.text("Reporte de Producción de Helados", pageWidth / 2, 20, { align: 'center' });

    // Información adicional
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Nota: Los precios al por mayor se registran en USD y los precios al detal en Bs", 14, 30);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 35);
    
    // Agregar información de filtros si están aplicados
    if (filters.tipo || filters.maquina || filters.sabor) {
      doc.text("Filtros aplicados:", 14, 40);
      let filterText = [];
      if (filters.tipo) filterText.push(`Tipo: ${filters.tipo}`);
      if (filters.maquina) filterText.push(`Máquina: ${filters.maquina}`);
      if (filters.sabor) filterText.push(`Sabor: ${filters.sabor}`);
      doc.text(filterText.join(', '), 14, 45);
    }
    
    // Configurar la tabla con autoTable
    autoTable(doc, {
      startY: filters.tipo || filters.maquina || filters.sabor ? 50 : 45,
      head: [
        [
          { content: "Fecha", styles: { fillColor: colorSecundario } },
          { content: "Sabor", styles: { fillColor: colorSecundario } },
          { content: "Tipo", styles: { fillColor: colorSecundario } },
          { content: "Precio Mayor", styles: { fillColor: colorSecundario } },
          { content: "Precio Detal", styles: { fillColor: colorSecundario } },
          { content: "Cantidad", styles: { fillColor: colorSecundario } },
          { content: "Máquina", styles: { fillColor: colorSecundario } }
        ]
      ],
      body: datosFiltrados.map((item) => [
        item.fecha,
        item.sabor,
        item.tipo,
        `${item.precio_mayor} ${item.monedaMayor}`,
        `${item.precio_detal} ${item.monedaDetal}`,
        `${item.cantidad}`,
        item.maquina
      ]),
      headStyles: {
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak'
      }
    });
    
    // Pie de página
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setDrawColor(colorPrincipal);
    doc.setLineWidth(0.3);
    doc.line(14, finalY, pageWidth - 14, finalY);
    
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("Helados para todos - Sistema de Producción", pageWidth / 2, finalY + 10, { align: 'center' });
    
    // Guardar el PDF
    doc.save(`reporte_produccion_${new Date().getTime()}.pdf`);
    
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Ocurrió un error al generar el reporte. Por favor intente nuevamente.");
  }
};

  const exportToExcel = () => {
    const datosFiltrados = aplicarFiltros();
    const datosConMoneda = datosFiltrados.map(item => ({
      ...item,
      precio_mayor: `${item.precio_mayor} ${item.monedaMayor}`,
      precio_detal: `${item.precio_detal} ${item.monedaDetal}`
    }));
    
    const ws = XLSX.utils.json_to_sheet(datosConMoneda);
    const wb = { Sheets: { Producción: ws }, SheetNames: ["Producción"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    
    // Nombre del archivo con fecha y hora
    const fechaHora = new Date().toISOString().replace(/[:.]/g, '-');
    saveAs(blob, `produccion_helados_${fechaHora}.xlsx`);
  };


  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Producción del día</h2>
      
      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="normal">Normal</option>
            <option value="especial">Especial</option>
            <option value="super_especial">Super Especial</option>
            <option value="1lt">Envase 1lt</option>
            <option value="2lt">Envase 2lt</option>
            <option value="4lt">Envase 4lt</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Máquina</label>
          <select
            name="maquina"
            value={filters.maquina}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="soft">Soft</option>
            <option value="mantecadora">Mantecadora</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sabor</label>
          <input
            type="text"
            name="sabor"
            value={filters.sabor}
            onChange={handleFilterChange}
            placeholder="Buscar por sabor..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

       {/* Botones de exportación */}
      <div className="mb-4 flex justify-end space-x-2">
        <button
          onClick={exportToPDF}
          className="bg-fucshia hover:bg-fucshia text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Exportar a PDF
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green hover:bg-green text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar a Excel
        </button>
      </div>

 

      {/* Tabla de producción */}
      {aplicarFiltros().length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No hay registros</h3>
          <p className="mt-1 text-gray-500">No se encontraron datos de producción con los filtros seleccionados.</p>
        </div>
      ) : (
        <>
          {/* Vista para desktop (tabla normal) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sabor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Máquina</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio Mayor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio Detal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {aplicarFiltros().map((item, index) => {
                  const tipoStyles = getTipoStyles(item.tipo);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.fecha}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.sabor}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tipoStyles.bg} ${tipoStyles.text}`}>
                          {tipoStyles.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.maquina === 'soft' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {item.maquina === 'soft' ? 'Soft' : 'Mantecadora'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.cantidad}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">
                        {formatPrecio(item.precio_mayor, item.monedaMayor)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">
                        {formatPrecio(item.precio_detal, item.monedaDetal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Vista para móvil (tarjetas) */}
          <div className="md:hidden space-y-4 overflow-x-auto">
            {aplicarFiltros().map((item, index) => {
              const tipoStyles = getTipoStyles(item.tipo);
              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Fecha</p>
                      <p className="text-sm text-gray-900">{item.fecha}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Sabor</p>
                      <p className="text-sm font-medium text-gray-900">{item.sabor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Tipo</p>
                      <p className="text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tipoStyles.bg} ${tipoStyles.text}`}>
                          {tipoStyles.label}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Máquina</p>
                      <p className="text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.maquina === 'soft' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {item.maquina === 'soft' ? 'Soft' : 'Mantecadora'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Cantidad</p>
                      <p className="text-sm text-gray-900">{item.cantidad}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Precio Mayor</p>
                      <p className="text-sm text-green-600 font-medium">
                        {formatPrecio(item.precio_mayor, item.monedaMayor)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Precio Detal</p>
                      <p className="text-sm text-green-600 font-medium">
                        {formatPrecio(item.precio_detal, item.monedaDetal)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProduccionTable;