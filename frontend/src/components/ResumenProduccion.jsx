import React from "react";

const ResumenProduccion = ({ resumen }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Producción</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Producción Día</th>
            <th className="py-2 px-4 border-b">Producción Mes</th>
            <th className="py-2 px-4 border-b">Producción Año</th>
            <th className="py-2 px-4 border-b">Producción Semana</th>
            <th className="py-2 px-4 border-b">Producción Máquina Soft Día</th>
            <th className="py-2 px-4 border-b">Producción Máquina Soft Mes</th>
            <th className="py-2 px-4 border-b">Producción Máquina Soft Año</th>
            <th className="py-2 px-4 border-b">Producción Máquina Soft Semana</th>
            <th className="py-2 px-4 border-b">Producción Máquina Mantecadora Día</th>
            <th className="py-2 px-4 border-b">Producción Máquina Mantecadora Mes</th>
            <th className="py-2 px-4 border-b">Producción Máquina Mantecadora Año</th>
            <th className="py-2 px-4 border-b">Producción Máquina Mantecadora Semana</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">{resumen.totalProduccionDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalProduccionMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalProduccionAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalProduccionSemana}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaSoftDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaSoftMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaSoftAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaSoftSemana}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaMantecadoraDia}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaMantecadoraMes}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaMantecadoraAnio}</td>
            <td className="py-2 px-4 border-b">{resumen.totalMaquinaMantecadoraSemana}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResumenProduccion;
