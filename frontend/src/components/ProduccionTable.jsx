import React from "react";

const ProduccionTable = ({ produccionDia, aplicarFiltros, handleEdit, handleDelete }) => {
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

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Producción del día</h2>
      
      {aplicarFiltros().length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No hay registros</h3>
          <p className="mt-1 text-gray-500">No se encontraron datos de producción.</p>
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
                            onClick={() => handleEdit(index)}
                            className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded-md text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
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
                        onClick={() => handleEdit(index)}
                        className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
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