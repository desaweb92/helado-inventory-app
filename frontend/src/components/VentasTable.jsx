import React from "react";

const VentasTable = ({ ventasDia }) => {
  const calcularValorTotalVenta = () => {
    return ventasDia.reduce((total, venta) => total + parseFloat(venta.precioTotal || 0), 0);
  };

  const calcularCantidadTotal = () => {
    return ventasDia.reduce((total, venta) => total + parseInt(venta.cantidadVendida || 0, 10), 0);
  };

  const formatearTipoHelado = (tipo) => {
    switch(tipo) {
      case 'normal': return 'Normal';
      case 'especial': return 'Especial';
      case 'superEspecial': return 'Super Especial';
      default: return tipo;
    }
  };

  const formatearTipoVenta = (tipo) => {
    return tipo === 'mayor' ? 'Por mayor' : 'Al detal';
  };

  const formatearMetodoPago = (metodo) => {
    switch(metodo) {
      case 'Punto': return 'Punto';
      case 'PagoMovil': return 'Pago Móvil';
      case 'Efectivo': return 'Efectivo';
      default: return metodo;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Ventas del día</h2>
      
      {ventasDia.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No hay registros</h3>
          <p className="mt-1 text-gray-500">No se encontraron datos de ventas.</p>
        </div>
      ) : (
        <>
          {/* Vista para desktop (tabla normal) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo Venta</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sabores</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo Helado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Método Pago</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Observaciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ventasDia.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.fecha}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.tipoVenta === 'mayor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {formatearTipoVenta(item.tipoVenta)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.cantidadVendida}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">${parseFloat(item.precioTotal || 0).toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.sabores}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.tipoHelado === 'normal' ? 'bg-blue-100 text-blue-800' :
                        item.tipoHelado === 'especial' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formatearTipoHelado(item.tipoHelado)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.metodoPago === 'Efectivo' ? 'bg-green-100 text-green-800' :
                        item.metodoPago === 'PagoMovil' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {formatearMetodoPago(item.metodoPago)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-normal text-sm text-gray-700 max-w-xs truncate" title={item.observaciones}>
  {item.observaciones || '-'}
</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700" colSpan="2">Total General</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{calcularCantidadTotal()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">${calcularValorTotalVenta().toFixed(2)}</td>
                  <td className="px-4 py-3" colSpan="3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Vista para móvil (tarjetas) */}
          <div className="md:hidden space-y-4">
            {ventasDia.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Fecha</p>
                    <p className="text-sm text-gray-900">{item.fecha}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tipo Venta</p>
                    <p className="text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.tipoVenta === 'mayor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {formatearTipoVenta(item.tipoVenta)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Cantidad</p>
                    <p className="text-sm text-gray-900">{item.cantidadVendida}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Precio Total</p>
                    <p className="text-sm text-green-600 font-medium">${parseFloat(item.precioTotal || 0).toFixed(2)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-gray-500">Sabores</p>
                    <p className="text-sm text-gray-900">{item.sabores}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tipo Helado</p>
                    <p className="text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.tipoHelado === 'normal' ? 'bg-blue-100 text-blue-800' :
                        item.tipoHelado === 'especial' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formatearTipoHelado(item.tipoHelado)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Método Pago</p>
                    <p className="text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.metodoPago === 'Efectivo' ? 'bg-green-100 text-green-800' :
                        item.metodoPago === 'PagoMovil' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {formatearMetodoPago(item.metodoPago)}
                      </span>
                    </p>
                  </div>
                  <div className="col-span-2">
  <p className="text-xs font-medium text-gray-500">Observaciones</p>
  <p className="text-sm text-gray-900">{item.observaciones || '-'}</p>
</div>
                </div>
              </div>
            ))}
            
            {/* Totales para móvil */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Cantidad:</p>
                  <p className="text-lg font-semibold text-gray-900">{calcularCantidadTotal()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Total Ventas:</p>
                  <p className="text-lg font-semibold text-green-600">${calcularValorTotalVenta().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VentasTable;