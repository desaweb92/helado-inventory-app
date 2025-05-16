import React from "react";

const VentasTable = ({ ventasDia }) => {
  // Función para calcular el valor total en USD
  const calcularValorTotalVenta = () => {
    return ventasDia.reduce((total, venta) => {
      const precio = venta.tipoVenta === 'mayor'
        ? parseFloat(venta.precioTotal || 0)
        : parseFloat(venta.precioTotal || 0) / parseFloat(venta.tasaBcv || 36.5);
      return total + precio;
    }, 0);
  };

  // Función para calcular el valor total en Bs
  const calcularValorTotalVentaBs = () => {
    return ventasDia.reduce((total, venta) => {
      const precio = venta.tipoVenta === 'mayor'
        ? parseFloat(venta.precioTotal || 0) * parseFloat(venta.tasaBcv || 36.5)
        : parseFloat(venta.precioTotalBs || 0);
      return total + precio;
    }, 0);
  };

  // Función para calcular la cantidad total (solo declarada una vez)
  const calcularCantidadTotal = () => {
    return ventasDia.reduce((total, venta) => total + parseInt(venta.cantidadVendida || 0, 10), 0);
  };

  const formatearTipoHelado = (tipo) => {
    switch(tipo) {
      case 'normal': return 'Normal';
      case 'especial': return 'Especial';
      case 'superEspecial': return 'Super Especial';
      case 'barquilla_bolitas': return 'Barquilla Bolitas';
      case 'barquilla_soft': return 'Barquilla Soft';
      case 'barquilla_yogurt': return 'Barquilla Yogurt';
      case '1lt': return 'Tarro 1lt';
      case '2lt': return 'Tarro 2lt';
      case '4lt': return 'Tarro 4lt';
      case 'sundae': return 'Sundae';
      default: return tipo;
    }
  };

  const formatearTipoVenta = (tipo) => {
    return tipo === 'mayor' ? 'Por mayor (USD)' : 'Al detal (Bs)';
  };

  const formatearMetodoPago = (metodo) => {
    switch(metodo) {
      case 'Punto': return 'Punto';
      case 'PagoMovil': return 'Pago Móvil';
      case 'Efectivo': return 'Efectivo';
      default: return metodo;
    }
  };

  const formatAmount = (amount, isUSD = true) => {
    const value = parseFloat(amount || 0);
    if (isUSD) {
      return `$${value.toFixed(2)} USD`;
    }
    return `Bs ${value.toFixed(2)}`;
  };

  const calculateBsEquivalent = (usdAmount, tasaBcv = 36.5) => {
    return parseFloat(usdAmount || 0) * parseFloat(tasaBcv || 36.5);
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio Unitario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tasa BCV</th>
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {item.tipoVenta === 'mayor'
                        ? `$${parseFloat(item.precioUnitario || 0).toFixed(2)} USD`
                        : `Bs ${parseFloat(item.precioUnitario || 0).toFixed(2)}`}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex flex-col">
                        <span className="text-green-600 font-medium">
                          {item.tipoVenta === 'mayor'
                            ? `$${parseFloat(item.precioTotal || 0).toFixed(2)} USD`
                            : `Bs ${parseFloat(item.precioTotalBs || 0).toFixed(2)}`}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.tipoVenta === 'mayor'
                            ? `Bs ${(parseFloat(item.precioTotal || 0) * parseFloat(item.tasaBcv || 36.5)).toFixed(2)}`
                            : `$${(parseFloat(item.precioTotalBs || 0) / parseFloat(item.tasaBcv || 36.5)).toFixed(2)} USD`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {parseFloat(item.tasaBcv || 0).toFixed(2)}
                    </td>
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-700" colSpan="2">
                    <div className="flex flex-col">
                      <span className="text-green-600">${calcularValorTotalVenta().toFixed(2)} USD</span>
                      <span className="text-sm text-gray-700">Bs {calcularValorTotalVentaBs().toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" colSpan="5"></td>
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
                    <p className="text-xs font-medium text-gray-500">Precio Unitario</p>
                    <p className="text-sm text-gray-700">
                      {item.tipoVenta === 'mayor'
                        ? `$${parseFloat(item.precioUnitario || 0).toFixed(2)} USD`
                        : `Bs ${parseFloat(item.precioUnitario || 0).toFixed(2)}`}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-gray-500">Precio Total</p>
                    <div className="flex flex-col">
                      <p className="text-sm text-green-600 font-medium">
                        {item.tipoVenta === 'mayor'
                          ? `$${parseFloat(item.precioTotal || 0).toFixed(2)} USD`
                          : `Bs ${parseFloat(item.precioTotalBs || 0).toFixed(2)}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.tipoVenta === 'mayor'
                          ? `Bs ${(parseFloat(item.precioTotal || 0) * parseFloat(item.tasaBcv || 36.5)).toFixed(2)}`
                          : `$${(parseFloat(item.precioTotalBs || 0) / parseFloat(item.tasaBcv || 36.5)).toFixed(2)} USD`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tasa BCV</p>
                    <p className="text-sm text-gray-700">{parseFloat(item.tasaBcv || 0).toFixed(2)}</p>
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
                  <p className="text-sm font-medium text-gray-700">Total Ventas (USD):</p>
                  <p className="text-lg font-semibold text-green-600">${calcularValorTotalVenta().toFixed(2)}</p>
                  <p className="text-sm font-medium text-gray-700">Total Ventas (Bs):</p>
                  <p className="text-lg font-semibold text-blue-600">Bs {calcularValorTotalVentaBs().toFixed(2)}</p>
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
