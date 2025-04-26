import React from "react";

const ResumenVentas = ({ resumen }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Ventas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ventas Día</th>
            <th className="py-2 px-4 border-b">Ventas Mes</th>
            <th className="py-2 px-4 border-b">Ventas Año</th>
            <th className="py-2 px-4 border-b">Ventas Semana</th>
            <th className="py-2 px-4 border-b">Pagos Efectivo Día</th>
            <th className="py-2 px-4 border-b">Pagos Efectivo Mes</th>
            <th className="py-2 px-4 border-b">Pagos Efectivo Año</th>
            <th className="py-2 px-4 border-b">Pagos Efectivo Semana</th>
            <th className="py-2 px-4 border-b">Pagos Punto Día</th>
            <th className="py-2 px-4 border-b">Pagos Punto Mes</th>
            <th className="py-2 px-4 border-b">Pagos Punto Año</th>
            <th className="py-2 px-4 border-b">Pagos Punto Semana</th>
            <th className="py-2 px-4 border-b">Pagos Pago Móvil Día</th>
            <th className="py-2 px-4 border-b">Pagos Pago Móvil Mes</th>
            <th className="py-2 px-4 border-b">Pagos Pago Móvil Año</th>
            <th className="py-2 px-4 border-b">Pagos Pago Móvil Semana</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">{resumen.totalVentasDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalVentasMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalVentasAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalVentasSemana}</td>
            <td className="py-2 px-4 border-b">{resumen.totalEfectivoDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalEfectivoMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalEfectivoAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalEfectivoSemana}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPuntoDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPuntoMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPuntoAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPuntoSemana}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPagoMovilDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPagoMovilMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPagoMovilAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalPagoMovilSemana}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResumenVentas;
