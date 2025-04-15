import React from "react";

const VentasTable = ({ ventasDia }) => {
  const calcularValorTotalVenta = () => {
    return ventasDia.reduce((total, venta) => total + parseFloat(venta.precioTotal), 0);
  };

  const calcularCantidadTotal = () => {
    return ventasDia.reduce((total, venta) => total + parseInt(venta.cantidadVendida, 10), 0);
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">Ventas del día</h2>
      {ventasDia.length === 0 ? (
        <p>No hay registros aún.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Tipo de Venta</th>
              <th className="p-2 border">Cantidad Vendida</th>
              <th className="p-2 border">Precio Total</th>
              <th className="p-2 border">Sabores</th>
              <th className="p-2 border">Tipo de Helado</th>
              <th className="p-2 border">Método de Pago</th>
            </tr>
          </thead>
          <tbody>
            {ventasDia.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.fecha}</td>
                <td className="p-2 border">{item.tipoVenta}</td>
                <td className="p-2 border">{item.cantidadVendida}</td>
                <td className="p-2 border">{item.precioTotal}</td>
                <td className="p-2 border">{item.sabores}</td>
                <td className="p-2 border">{item.tipoHelado}</td>
                <td className="p-2 border">{item.metodoPago}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-300">
              <td className="p-2 border" colSpan="3">Valor Total Venta:</td>
              <td className="p-2 border">{calcularValorTotalVenta()}</td>
              <td className="p-2 border" colSpan="2">Cantidad Total:</td>
              <td className="p-2 border">{calcularCantidadTotal()}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default VentasTable;
