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

            {/* Fila para Barquilla Bolitas */}
            <tr>
              <td className="py-2 px-4 border">Barquilla Bolitas</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalVentasDiaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPuntoDiaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalVentasSemanaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalVentasMesBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalEfectivoMesBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPuntoMesBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalVentasAnioBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPuntoAnioBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_bolitas?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_bolitas?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.barquilla_bolitas?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Barquilla Soft */}
            <tr>
              <td className="py-2 px-4 border">Barquilla Soft</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalVentasDiaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPuntoDiaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalVentasSemanaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalVentasMesBs || calculateBsEquivalent(resumen.barquilla_soft?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalEfectivoMesBs || calculateBsEquivalent(resumen.barquilla_soft?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPuntoMesBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalVentasAnioBs || calculateBsEquivalent(resumen.barquilla_soft?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.barquilla_soft?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPuntoAnioBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_soft?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_soft?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.barquilla_soft?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Barquilla Yogurt */}
            <tr>
              <td className="py-2 px-4 border">Barquilla Yogurt</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalVentasDiaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPuntoDiaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalVentasSemanaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalVentasMesBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalEfectivoMesBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPuntoMesBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalVentasAnioBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPuntoAnioBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.barquilla_yogurt?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.barquilla_yogurt?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.barquilla_yogurt?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Envase 1lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 1lt</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalVentasDiaBs || calculateBsEquivalent(resumen["1lt"]?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalEfectivoDiaBs || calculateBsEquivalent(resumen["1lt"]?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPuntoDiaBs || calculateBsEquivalent(resumen["1lt"]?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen["1lt"]?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalVentasSemanaBs || calculateBsEquivalent(resumen["1lt"]?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen["1lt"]?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPuntoSemanaBs || calculateBsEquivalent(resumen["1lt"]?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen["1lt"]?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalVentasMesBs || calculateBsEquivalent(resumen["1lt"]?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalEfectivoMesBs || calculateBsEquivalent(resumen["1lt"]?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPuntoMesBs || calculateBsEquivalent(resumen["1lt"]?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPagoMovilMesBs || calculateBsEquivalent(resumen["1lt"]?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalVentasAnioBs || calculateBsEquivalent(resumen["1lt"]?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalEfectivoAnioBs || calculateBsEquivalent(resumen["1lt"]?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPuntoAnioBs || calculateBsEquivalent(resumen["1lt"]?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["1lt"]?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["1lt"]?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen["1lt"]?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Envase 2lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 2lt</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalVentasDiaBs || calculateBsEquivalent(resumen["2lt"]?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalEfectivoDiaBs || calculateBsEquivalent(resumen["2lt"]?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPuntoDiaBs || calculateBsEquivalent(resumen["2lt"]?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen["2lt"]?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalVentasSemanaBs || calculateBsEquivalent(resumen["2lt"]?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen["2lt"]?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPuntoSemanaBs || calculateBsEquivalent(resumen["2lt"]?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen["2lt"]?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalVentasMesBs || calculateBsEquivalent(resumen["2lt"]?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalEfectivoMesBs || calculateBsEquivalent(resumen["2lt"]?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPuntoMesBs || calculateBsEquivalent(resumen["2lt"]?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPagoMovilMesBs || calculateBsEquivalent(resumen["2lt"]?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalVentasAnioBs || calculateBsEquivalent(resumen["2lt"]?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalEfectivoAnioBs || calculateBsEquivalent(resumen["2lt"]?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPuntoAnioBs || calculateBsEquivalent(resumen["2lt"]?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["2lt"]?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["2lt"]?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen["2lt"]?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Envase 4lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 4lt</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalVentasDiaBs || calculateBsEquivalent(resumen["4lt"]?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalEfectivoDiaBs || calculateBsEquivalent(resumen["4lt"]?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPuntoDiaBs || calculateBsEquivalent(resumen["4lt"]?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen["4lt"]?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalVentasSemanaBs || calculateBsEquivalent(resumen["4lt"]?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen["4lt"]?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPuntoSemanaBs || calculateBsEquivalent(resumen["4lt"]?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen["4lt"]?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalVentasMesBs || calculateBsEquivalent(resumen["4lt"]?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalEfectivoMesBs || calculateBsEquivalent(resumen["4lt"]?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPuntoMesBs || calculateBsEquivalent(resumen["4lt"]?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPagoMovilMesBs || calculateBsEquivalent(resumen["4lt"]?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalVentasAnioBs || calculateBsEquivalent(resumen["4lt"]?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalEfectivoAnioBs || calculateBsEquivalent(resumen["4lt"]?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPuntoAnioBs || calculateBsEquivalent(resumen["4lt"]?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen["4lt"]?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen["4lt"]?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen["4lt"]?.totalPagoMovilAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
            </tr>

            {/* Fila para Sundae */}
            <tr>
              <td className="py-2 px-4 border">Sundae</td>
              
              {/* Ventas Día */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalVentasDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalVentasDiaBs || calculateBsEquivalent(resumen.sundae?.totalVentasDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalEfectivoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalEfectivoDiaBs || calculateBsEquivalent(resumen.sundae?.totalEfectivoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPuntoDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPuntoDiaBs || calculateBsEquivalent(resumen.sundae?.totalPuntoDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPagoMovilDia)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPagoMovilDiaBs || calculateBsEquivalent(resumen.sundae?.totalPagoMovilDia, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Semana */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalVentasSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalVentasSemanaBs || calculateBsEquivalent(resumen.sundae?.totalVentasSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalEfectivoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalEfectivoSemanaBs || calculateBsEquivalent(resumen.sundae?.totalEfectivoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPuntoSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPuntoSemanaBs || calculateBsEquivalent(resumen.sundae?.totalPuntoSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPagoMovilSemana)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPagoMovilSemanaBs || calculateBsEquivalent(resumen.sundae?.totalPagoMovilSemana, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Mes */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalVentasMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalVentasMesBs || calculateBsEquivalent(resumen.sundae?.totalVentasMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalEfectivoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalEfectivoMesBs || calculateBsEquivalent(resumen.sundae?.totalEfectivoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPuntoMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPuntoMesBs || calculateBsEquivalent(resumen.sundae?.totalPuntoMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPagoMovilMes)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPagoMovilMesBs || calculateBsEquivalent(resumen.sundae?.totalPagoMovilMes, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              
              {/* Ventas Año */}
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalVentasAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalVentasAnioBs || calculateBsEquivalent(resumen.sundae?.totalVentasAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalEfectivoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalEfectivoAnioBs || calculateBsEquivalent(resumen.sundae?.totalEfectivoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPuntoAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPuntoAnioBs || calculateBsEquivalent(resumen.sundae?.totalPuntoAnio, resumen.tasaBcv), false)}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border text-center">
                <div className="flex flex-col">
                  <span>{formatAmount(resumen.sundae?.totalPagoMovilAnio)}</span>
                  <span className="text-xs text-gray-500">
                    {formatAmount(resumen.sundae?.totalPagoMovilAnioBs || calculateBsEquivalent(resumen.sundae?.totalPagoMovilAnio, resumen.tasaBcv), false)}
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