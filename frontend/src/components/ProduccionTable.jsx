import React from "react";

const ProduccionTable = ({ produccionDia, aplicarFiltros, handleEdit, handleDelete }) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">Producción del día</h2>
      {aplicarFiltros().length === 0 ? (
        <p>No hay registros aún.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Sabor</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Máquina</th>
              <th className="p-2 border">Cantidad</th>
              <th className="p-2 border">Precio al X mayor</th>
              <th className="p-2 border">Precio al detal</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aplicarFiltros().map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.fecha}</td>
                <td className="p-2 border">{item.sabor}</td>
                <td className="p-2 border">{item.tipo}</td>
                <td className="p-2 border">{item.maquina}</td>
                <td className="p-2 border">{item.cantidad}</td>
                <td className="p-2 border">{item.precioMayor}</td>
                <td className="p-2 border">{item.precioDetal}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProduccionTable;
