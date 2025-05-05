import React from "react";

const Inventario = ({ inventarioActual, totalInventario }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Inventario Actual</h2>
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Sabor - Tipo</th>
            <th className="border px-4 py-2">Inventario Disponible</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(inventarioActual.normal).map(([clave, valor]) => (
            <tr key={clave}>
              <td className="border px-4 py-2">{clave}</td>
              <td className="border px-4 py-2">{valor}</td>
            </tr>
          ))}
          {Object.entries(inventarioActual.especial).map(([clave, valor]) => (
            <tr key={clave}>
              <td className="border px-4 py-2">{clave}</td>
              <td className="border px-4 py-2">{valor}</td>
            </tr>
          ))}
           {Object.entries(inventarioActual.superEspecial).map(([clave, valor]) => (
            <tr key={clave}>
              <td className="border px-4 py-2">{clave}</td>
              <td className="border px-4 py-2">{valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 font-bold border px-4 py-2">
        <p>
          Total stock: <span className="text-green">{totalInventario}</span>
        </p>
      </div>
    </div>
  );
};

export default Inventario;
