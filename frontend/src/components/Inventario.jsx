import React, { useState, useEffect } from "react";
import { getHelados } from "../services/api";

const Inventario = () => {
  const [inventario, setInventario] = useState({
    normal: {},
    especial: {},
    superEspecial: {},
    '1lt': {},
    '2lt': {},
    '4lt': {}
  });
  const [totalInventario, setTotalInventario] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el color según el tipo de helado
  const getTypeColor = (tipo) => {
    switch(tipo) {
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'especial':
        return 'bg-purple-100 text-purple-800';
      case 'super_especial':
      case 'superEspecial':
        return 'bg-yellow-100 text-yellow-800';
      case '1lt':
        return 'bg-orange-100 text-orange-800';
      case '2lt':
        return 'bg-red-100 text-red-800';
      case '4lt':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para formatear el nombre del tipo
  const formatTypeName = (tipo) => {
    switch(tipo) {
      case 'normal':
        return 'Normal';
      case 'especial':
        return 'Especial';
      case 'super_especial':
      case 'superEspecial':
        return 'Super Especial';
      case '1lt':
        return 'Envase 1lt';
      case '2lt':
        return 'Envase 2lt';
      case '4lt':
        return 'Envase 4lt';
      default:
        return tipo;
    }
  };

  // Cargar datos desde la API
  useEffect(() => {
    const fetchInventario = async () => {
      try {
        setLoading(true);
        const response = await getHelados();
        
        // Verificar y extraer los datos de la respuesta
        let data = response;
        
        // Si la respuesta es un objeto con propiedad data
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          data = response.data || response.helados || response.result || response;
        }
        
        // Verificar si ahora es un array
        if (!Array.isArray(data)) {
          throw new Error("Formato de datos no válido. Se esperaba un array de helados.");
        }

        // Procesar los datos para agrupar por tipo
        const processedInventario = {
          normal: {},
          especial: {},
          superEspecial: {},
          '1lt': {},
          '2lt': {},
          '4lt': {}
        };
        
        let total = 0;
        
        data.forEach(helado => {
          const tipo = helado.tipo === 'super_especial' ? 'superEspecial' : helado.tipo;
          const clave = `${helado.sabor} - ${tipo}`;
          
          if (processedInventario[tipo]) {
            processedInventario[tipo][clave] = (processedInventario[tipo][clave] || 0) + helado.cantidad;
            total += helado.cantidad;
          }
        });
        
        setInventario(processedInventario);
        setTotalInventario(total);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar el inventario:', err);
        setError(err.message || "Error al cargar el inventario. Por favor, intente nuevamente.");
        setLoading(false);
      }
    };
    
    fetchInventario();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario Actual</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando inventario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario Actual</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario Actual</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sabor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Inventario Disponible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Helados Normales */}
            {Object.entries(inventario.normal || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('normal')}`}>
                      {formatTypeName('normal')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}

            {/* Helados Especiales */}
            {Object.entries(inventario.especial || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('especial')}`}>
                      {formatTypeName('especial')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}

            {/* Helados Super Especiales */}
            {Object.entries(inventario.superEspecial || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('superEspecial')}`}>
                      {formatTypeName('superEspecial')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}

            {/* Helados de Envase 1lt */}
            {Object.entries(inventario['1lt'] || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('1lt')}`}>
                      {formatTypeName('1lt')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}

            {/* Helados de Envase 2lt */}
            {Object.entries(inventario['2lt'] || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('2lt')}`}>
                      {formatTypeName('2lt')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}

            {/* Helados de Envase 4lt */}
            {Object.entries(inventario['4lt'] || {}).map(([clave, valor]) => {
              const [sabor, tipo] = clave.split(' - ');
              return (
                <tr key={clave} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sabor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor('4lt')}`}>
                      {formatTypeName('4lt')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{valor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Total en inventario:</span>
          <span className="text-2xl font-bold text-green-600">{totalInventario}</span>
        </div>
      </div>
    </div>
  );
};

export default Inventario;