import React from "react";

const ResumenProduccion = ({ resumen }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Producción</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Tipo/Máquina</th>
              <th className="py-2 px-4 border">Producción Día</th>
              <th className="py-2 px-4 border">Producción Semana</th>
              <th className="py-2 px-4 border">Producción Mes</th>
              <th className="py-2 px-4 border">Producción Año</th>
              <th className="py-2 px-4 border">Precio Mayor (USD)</th>
              <th className="py-2 px-4 border">Precio Detal (Bs)</th>
              <th className="py-2 px-4 border">Soft Día</th>
              <th className="py-2 px-4 border">Soft Semana</th>
              <th className="py-2 px-4 border">Soft Mes</th>
              <th className="py-2 px-4 border">Soft Año</th>
              <th className="py-2 px-4 border">Mantecadora Día</th>
              <th className="py-2 px-4 border">Mantecadora Semana</th>
              <th className="py-2 px-4 border">Mantecadora Mes</th>
              <th className="py-2 px-4 border">Mantecadora Año</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila para Total General */}
            <tr className="bg-gray-50">
              <td className="py-2 px-4 border font-semibold">Total General</td>
              <td className="py-2 px-4 border text-center">{resumen.totalProduccionDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalProduccionSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalProduccionMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalProduccionAnio}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPrecioMayor}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalPrecioDetal}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaSoftDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaSoftSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaSoftMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaSoftAnio}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaMantecadoraDia}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaMantecadoraSemana}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaMantecadoraMes}</td>
              <td className="py-2 px-4 border text-center">{resumen.totalMaquinaMantecadoraAnio}</td>
            </tr>

            {/* Fila para Normales */}
            <tr>
              <td className="py-2 px-4 border">Normales</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalProduccionDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalProduccionSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalProduccionMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalProduccionAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPrecioMayor || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalPrecioDetal || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaSoftDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaSoftSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaSoftMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaSoftAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaMantecadoraDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaMantecadoraSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaMantecadoraMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.normal?.totalMaquinaMantecadoraAnio || 0}</td>
            </tr>

            {/* Fila para Especiales */}
            <tr>
              <td className="py-2 px-4 border">Especiales</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalProduccionDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalProduccionSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalProduccionMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalProduccionAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPrecioMayor || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalPrecioDetal || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaSoftDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaSoftSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaSoftMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaSoftAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaMantecadoraDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaMantecadoraSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaMantecadoraMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.especial?.totalMaquinaMantecadoraAnio || 0}</td>
            </tr>

            {/* Fila para Super Especiales */}
            <tr>
              <td className="py-2 px-4 border">Super Especiales</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalProduccionDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalProduccionSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalProduccionMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalProduccionAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPrecioMayor || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalPrecioDetal || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaSoftDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaSoftSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaSoftMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaSoftAnio || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaMantecadoraDia || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaMantecadoraSemana || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaMantecadoraMes || 0}</td>
              <td className="py-2 px-4 border text-center">{resumen.superEspecial?.totalMaquinaMantecadoraAnio || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumenProduccion;