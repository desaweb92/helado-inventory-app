import React, { useState, useEffect } from "react";
import { API_URL } from "../services/api";

const ProduccionTable = ({ handleEdit, handleDelete }) => {
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
    normal: {},
    especial: {},
    superEspecial: {},
    "1lt": {},
    "2lt": {},
    "4lt": {}
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
            <option value="superEspecial">Super Especial</option>
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

      {/* Resumen de producción */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Resumen general hoy</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Producción</p>
            <p className="text-xl font-bold">{resumen.totalProduccionDia?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Soft</p>
            <p className="text-xl font-bold">{resumen.totalMaquinaSoftDia?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">Mantecadora</p>
            <p className="text-xl font-bold">{resumen.totalMaquinaMantecadoraDia?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">Ventas</p>
            <p className="text-xl font-bold">Bs {resumen.totalPrecioDetal?.toLocaleString() || '0'}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">Ventas</p>
            <p className="text-xl font-bold">USD {resumen.totalPrecioMayor?.toLocaleString() || '0'}</p>
          </div>
        </div>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
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
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded-md text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
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
                    <div className="col-span-2 pt-2 flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
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