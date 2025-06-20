import React, { useState, useEffect } from "react";
import { API_URL } from "../services/api";

const ResumenProduccion = () => {
  const [resumen, setResumen] = useState({
    // Estructura inicial que espera tu tabla
    totalProduccionDia: 0,
    totalProduccionSemana: 0,
    totalProduccionMes: 0,
    totalProduccionAnio: 0,
    totalPrecioMayor: 0,
    totalPrecioDetal: 0,
    totalMaquinaSoftDia: 0,
    totalMaquinaSoftSemana: 0,
    totalMaquinaSoftMes: 0,
    totalMaquinaSoftAnio: 0,
    totalMaquinaMantecadoraDia: 0,
    totalMaquinaMantecadoraSemana: 0,
    totalMaquinaMantecadoraMes: 0,
    totalMaquinaMantecadoraAnio: 0,
    normal: {},
    especial: {},
    superEspecial: {},
    "1lt": {},
    "2lt": {},
    "4lt": {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/produccion/resumen`);
        if (!response.ok) throw new Error('Error al obtener datos');
        const data = await response.json();
        
        // Procesamiento adicional para asegurar que todos los campos existan
        const processedData = {
          ...resumen, // Valores iniciales
          ...data,    // Datos del backend
          normal: { ...resumen.normal, ...(data.normal || {}) },
          especial: { ...resumen.especial, ...(data.especial || {}) },
          superEspecial: { ...resumen.superEspecial, ...(data.superEspecial || {}) },
          "1lt": { ...resumen["1lt"], ...(data["1lt"] || {}) },
          "2lt": { ...resumen["2lt"], ...(data["2lt"] || {}) },
          "4lt": { ...resumen["4lt"], ...(data["4lt"] || {}) }
        };
        
        setResumen(processedData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching production data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumen();
  }, []);

  if (loading) return <div>Cargando resumen de producción...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resumen de Producción</h2>
           {/* Tarjeta informativa */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          <strong>Fecha actual:</strong> {new Date().toLocaleDateString()} | 
          <strong> Última actualización:</strong> {new Date().toLocaleTimeString()}
        </p>
      </div>
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
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.totalMaquinaMantecadoraAnio)}</td>
            </tr>

                     {/* Fila para Normales */}
            <tr>
              <td className="py-2 px-4 border">Normales</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.normal?.totalMaquinaMantecadoraAnio)}</td>
            </tr>

            {/* Fila para Especiales */}
            <tr>
              <td className="py-2 px-4 border">Especiales</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.especial?.totalMaquinaMantecadoraAnio)}</td>
            </tr>

            {/* Fila para Super Especiales */}
            <tr>
              <td className="py-2 px-4 border">Super Especiales</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen.superEspecial?.totalMaquinaMantecadoraAnio)}</td>
            </tr>

            {/* Fila para Helados de Envase 1lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 1lt</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["1lt"]?.totalMaquinaMantecadoraAnio)}</td>
            </tr>

            {/* Fila para Helados de Envase 2lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 2lt</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["2lt"]?.totalMaquinaMantecadoraAnio)}</td>
            </tr>

            {/* Fila para Helados de Envase 4lt */}
            <tr>
              <td className="py-2 px-4 border">Envase 4lt</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalProduccionDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalProduccionSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalProduccionMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalProduccionAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalPrecioMayor)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalPrecioDetal)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaSoftDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaSoftSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaSoftMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaSoftAnio)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaMantecadoraDia)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaMantecadoraSemana)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaMantecadoraMes)}</td>
              <td className="py-2 px-4 border text-center">{formatNumber(resumen["4lt"]?.totalMaquinaMantecadoraAnio)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumenProduccion;