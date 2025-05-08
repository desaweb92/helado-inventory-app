import React from "react";

const ResumenVentas = ({ resumen }) => {
  // Función para formatear montos en ambas divisas
  const formatAmount = (amount, isUSD = true) => {
    const value = parseFloat(amount || 0);
    if (isUSD) {
      return `$${value.toFixed(2)} USD`;
    }
    return `Bs ${value.toFixed(2)}`;
  };

  // Función para calcular el equivalente en Bs si no viene en el resumen
  const calculateBsEquivalent = (usdAmount, tasaBcv = 36.5) => {
    return parseFloat(usdAmount || 0) * parseFloat(tasaBcv || 36.5);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Ventas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Tipo</th>
              <th className="py-2 px-4 border" colSpan="4">Ventas Día</th>
              <th className="py-2 px-4 border" colSpan="4">Ventas Semana</th>
              <th className="py-2 px-4 border" colSpan="4">Ventas Mes</th>
              <th className="py-2 px-4 border" colSpan="4">Ventas Año</th>
            </tr>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border"></th>
              {/* Subtítulos para Ventas Día */}
              <th className="py-2 px-4 border text-xs">Total</th>
              <th className="py-2 px-4 border text-xs">Efectivo</th>
              <th className="py-2 px-4 border text-xs">Punto</th>
              <th className="py-2 px-4 border text-xs">Pago Móvil</th>
              {/* Subtítulos para Ventas Semana */}
              <th className="py-2 px-4 border text-xs">Total</th>
              <th className="py-2 px-4 border text-xs">Efectivo</th>
              <th className="py-2 px-4 border text-xs">Punto</th>
              <th className="py-2 px-4 border text-xs">Pago Móvil</th>
              {/* Subtítulos para Ventas Mes */}
              <th className="py-2 px-4 border text-xs">Total</th>
              <th className="py-2 px-4 border text-xs">Efectivo</th>
              <th className="py-2 px-4 border text-xs">Punto</th>
              <th className="py-2 px-4 border text-xs">Pago Móvil</th>
              {/* Subtítulos para Ventas Año */}
              <th className="py-2 px-4 border text-xs">Total</th>
              <th className="py-2 px-4 border text-xs">Efectivo</th>
              <th className="py-2 px-4 border text-xs">Punto</th>
              <th className="py-2 px-4 border text-xs">Pago Móvil</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila para Total General */}
            <tr className="bg-gray-50">
              <td className="py-2 px-4 border font-semibold">Total General</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalVentasDiaBs || calculateBsEquivalent(resumen.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalEfectivoDiaBs || calculateBsEquivalent(resumen.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPuntoDiaBs || calculateBsEquivalent(resumen.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalVentasSemanaBs || calculateBsEquivalent(resumen.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPuntoSemanaBs || calculateBsEquivalent(resumen.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalVentasMesBs || calculateBsEquivalent(resumen.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalEfectivoMesBs || calculateBsEquivalent(resumen.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPuntoMesBs || calculateBsEquivalent(resumen.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPagoMovilMesBs || calculateBsEquivalent(resumen.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalVentasAnioBs || calculateBsEquivalent(resumen.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalEfectivoAnioBs || calculateBsEquivalent(resumen.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPuntoAnioBs || calculateBsEquivalent(resumen.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Normales */}
            <tr>
              <td className="py-2 px-4 border">Normales</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalVentasDiaBs || calculateBsEquivalent(resumen.normal?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.normal?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPuntoDiaBs || calculateBsEquivalent(resumen.normal?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.normal?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalVentasSemanaBs || calculateBsEquivalent(resumen.normal?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.normal?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.normal?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.normal?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalVentasMesBs || calculateBsEquivalent(resumen.normal?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalEfectivoMesBs || calculateBsEquivalent(resumen.normal?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPuntoMesBs || calculateBsEquivalent(resumen.normal?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.normal?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalVentasAnioBs || calculateBsEquivalent(resumen.normal?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.normal?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPuntoAnioBs || calculateBsEquivalent(resumen.normal?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.normal?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.normal?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.normal?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Especiales */}
            <tr>
              <td className="py-2 px-4 border">Especiales</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalVentasDiaBs || calculateBsEquivalent(resumen.especial?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.especial?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPuntoDiaBs || calculateBsEquivalent(resumen.especial?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.especial?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalVentasSemanaBs || calculateBsEquivalent(resumen.especial?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.especial?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.especial?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.especial?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalVentasMesBs || calculateBsEquivalent(resumen.especial?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalEfectivoMesBs || calculateBsEquivalent(resumen.especial?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPuntoMesBs || calculateBsEquivalent(resumen.especial?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.especial?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalVentasAnioBs || calculateBsEquivalent(resumen.especial?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.especial?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPuntoAnioBs || calculateBsEquivalent(resumen.especial?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.especial?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.especial?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.especial?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Super Especiales */}
            <tr>
              <td className="py-2 px-4 border">Super Especiales</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalVentasDiaBs || calculateBsEquivalent(resumen.superEspecial?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.superEspecial?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPuntoDiaBs || calculateBsEquivalent(resumen.superEspecial?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.superEspecial?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalVentasSemanaBs || calculateBsEquivalent(resumen.superEspecial?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.superEspecial?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.superEspecial?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.superEspecial?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalVentasMesBs || calculateBsEquivalent(resumen.superEspecial?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalEfectivoMesBs || calculateBsEquivalent(resumen.superEspecial?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPuntoMesBs || calculateBsEquivalent(resumen.superEspecial?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.superEspecial?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalVentasAnioBs || calculateBsEquivalent(resumen.superEspecial?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.superEspecial?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPuntoAnioBs || calculateBsEquivalent(resumen.superEspecial?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.superEspecial?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.superEspecial?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.superEspecial?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumenVentas;