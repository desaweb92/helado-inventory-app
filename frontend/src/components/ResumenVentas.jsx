import React from "react";

const ResumenVentas = ({ resumen }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Ventas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Tipo</th>
              <th className="py-2 px-4 border">Ventas Día</th>
              <th className="py-2 px-4 border">Ventas Semana</th>
              <th className="py-2 px-4 border">Ventas Mes</th>
              <th className="py-2 px-4 border">Ventas Año</th>
              <th className="py-2 px-4 border">Efectivo Día</th>
              <th className="py-2 px-4 border">Efectivo Semana</th>
              <th className="py-2 px-4 border">Efectivo Mes</th>
              <th className="py-2 px-4 border">Efectivo Año</th>
              <th className="py-2 px-4 border">Punto Día</th>
              <th className="py-2 px-4 border">Punto Semana</th>
              <th className="py-2 px-4 border">Punto Mes</th>
              <th className="py-2 px-4 border">Punto Año</th>
              <th className="py-2 px-4 border">Pago Móvil Día</th>
              <th className="py-2 px-4 border">Pago Móvil Semana</th>
              <th className="py-2 px-4 border">Pago Móvil Mes</th>
              <th className="py-2 px-4 border">Pago Móvil Año</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila para Total General */}
            <tr className="bg-gray-50">
              <td className="py-2 px-4 border font-semibold">Total General</td>
              <td className="py-2 px-4 border text-center">{resumen.totalVentasDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalVentasSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalVentasMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalVentasAnio}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalEfectivoDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalEfectivoSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalEfectivoMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalEfectivoAnio}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPuntoDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPuntoSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPuntoMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPuntoAnio}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPagoMovilDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPagoMovilSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPagoMovilMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPagoMovilAnio}</td>
            </tr>

            {/* Fila para Normales */}
            <tr>
              <td className="py-2 px-4 border">Normales</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalVentasDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalVentasSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalVentasMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalVentasAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalEfectivoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalEfectivoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalEfectivoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalEfectivoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPuntoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPuntoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPuntoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPuntoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPagoMovilDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPagoMovilSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPagoMovilMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPagoMovilAnio || 0}</td>
            </tr>

            {/* Fila para Especiales */}
            <tr>
              <td className="py-2 px-4 border">Especiales</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalVentasDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalVentasSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalVentasMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalVentasAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalEfectivoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalEfectivoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalEfectivoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalEfectivoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPuntoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPuntoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPuntoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPuntoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPagoMovilDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPagoMovilSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPagoMovilMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPagoMovilAnio || 0}</td>
            </tr>

            {/* Fila para Super Especiales */}
            <tr>
              <td className="py-2 px-4 border">Super Especiales</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalVentasDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalVentasSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalVentasMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalVentasAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalEfectivoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalEfectivoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalEfectivoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalEfectivoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPuntoDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPuntoSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPuntoMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPuntoAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPagoMovilDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPagoMovilSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPagoMovilMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPagoMovilAnio || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumenVentas;