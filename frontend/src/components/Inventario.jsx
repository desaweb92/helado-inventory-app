import React from "react";

const Inventario = ({ inventarioActual, totalInventario }) => {
  // Función para obtener el color según el tipo de helado
  const getTypeColor = (tipo) => {
    switch(tipo) {
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'especial':
        return 'bg-purple-100 text-purple-800';
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
      case 'superEspecial':
        return 'Super Especial';
      case '1lt':
        return 'Tarro 1lt';
      case '2lt':
        return 'Tarro 2lt';
      case '4lt':
        return 'Tarro 4lt';
      default:
        return tipo;
    }
  };

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
            {Object.entries(inventarioActual.normal || {}).map(([clave, valor]) => {
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
            {Object.entries(inventarioActual.especial || {}).map(([clave, valor]) => {
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
            {Object.entries(inventarioActual.superEspecial || {}).map(([clave, valor]) => {
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

            {/* Helados de Tarro 1lt */}
            {Object.entries(inventarioActual['1lt'] || {}).map(([clave, valor]) => {
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

            {/* Helados de Tarro 2lt */}
            {Object.entries(inventarioActual['2lt'] || {}).map(([clave, valor]) => {
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

            {/* Helados de Tarro 4lt */}
            {Object.entries(inventarioActual['4lt'] || {}).map(([clave, valor]) => {
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