import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Report = ({ inventario }) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    // Procesar datos del inventario para el reporte
    if (inventario) {
      const processedData = [];
      
      // Función para procesar cada categoría de inventario
      const processInventory = (inventory, type) => {
        Object.entries(inventory || {}).forEach(([clave, cantidad]) => {
          const [sabor] = clave.split(' - ');
          processedData.push({
            sabor,
            tipo: type,
            cantidad,
            precioMayor: '$0', // Estos valores deberían venir de tu base de datos
            precioDetal: '$0'  // O del estado de tu aplicación
          });
        });
      };

      // Procesar todos los tipos de helados
      processInventory(inventario.normal, 'Normal');
      processInventory(inventario.especial, 'Especial');
      processInventory(inventario.superEspecial, 'Super Especial');
      processInventory(inventario['1lt'], 'Tarro 1lt');
      processInventory(inventario['2lt'], 'Tarro 2lt');
      processInventory(inventario['4lt'], 'Tarro 4lt');

      setReportData(processedData);
    }
  }, [inventario]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Título del reporte
    doc.setFontSize(18);
    doc.text('Reporte de Inventario de Helados', 15, 20);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 15, 30);
    
    // Datos de la tabla
    const headers = [['Sabor', 'Tipo', 'Cantidad', 'Precio Mayor', 'Precio Detal']];
    const data = reportData.map(item => [
      item.sabor,
      item.tipo,
      item.cantidad,
      item.precioMayor,
      item.precioDetal
    ]);

    // Configuración de la tabla
    doc.autoTable({
      startY: 40,
      head: headers,
      body: data,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 40 },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 'auto' }
      }
    });

    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 10
      );
      // Logo o información adicional
      doc.addImage('https://i.imgur.com/GkhD8en.jpg', 'JPEG', 15, doc.internal.pageSize.height - 15, 20, 10);
    }

    doc.save('inventario_helados.pdf');
  };

  // Función para obtener estilos según el tipo de helado
  const getTypeStyle = (type) => {
    switch(type) {
      case 'Normal':
        return 'bg-blue-100 text-blue-800';
      case 'Especial':
        return 'bg-purple-100 text-purple-800';
      case 'Super Especial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Tarro 1lt':
        return 'bg-orange-100 text-orange-800';
      case 'Tarro 2lt':
        return 'bg-red-100 text-red-800';
      case 'Tarro 4lt':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reporte de inventario</h1>
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar a PDF
        </button>
      </div>

      {reportData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Sabor</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Tipo</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Cantidad</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Precio Mayor</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Precio Detal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                  <td className="py-3 px-4 text-gray-800">{item.sabor}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeStyle(item.tipo)}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{item.cantidad}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">{item.precioMayor}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">{item.precioDetal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No hay datos de inventario</h3>
          <p className="mt-1 text-gray-500">No se encontraron registros para mostrar.</p>
        </div>
      )}
    </div>
  );
};

export default Report;