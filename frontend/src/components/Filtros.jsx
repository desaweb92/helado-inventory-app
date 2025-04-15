import React from "react";

const Filtros = ({ filtros, setFiltros, limpiarFiltros }) => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          name="sabor"
          placeholder="Filtrar por sabor"
          value={filtros.sabor}
          onChange={(e) => setFiltros({ ...filtros, sabor: e.target.value })}
          className="px-2 py-1 border rounded"
        />
        <select
          name="maquina"
          value={filtros.maquina}
          onChange={(e) =>
            setFiltros({ ...filtros, maquina: e.target.value })
          }
          className="px-2 py-1 border rounded"
        >
          <option value="">Todas las máquinas</option>
          <option value="soft">Soft</option>
          <option value="mantecadora">Mantecadora</option>
        </select>
        <select
          name="filtroTipo"
          value={filtros.tipo}
          onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          className="px-2 py-1 border rounded"
        >
          <option value="">Todos los tipos</option>
          <option value="normal">Normal</option>
          <option value="especial">Especial</option>
        </select>
        <input
          type="text"
          name="dia"
          placeholder="Día"
          value={filtros.dia}
          onChange={(e) => setFiltros({ ...filtros, dia: e.target.value })}
          className="px-2 py-1 border rounded"
        />
        <input
          type="text"
          name="mes"
          placeholder="Mes"
          value={filtros.mes}
          onChange={(e) => setFiltros({ ...filtros, mes: e.target.value })}
          className="px-2 py-1 border rounded"
        />
        <input
          type="text"
          name="anio"
          placeholder="Año"
          value={filtros.anio}
          onChange={(e) => setFiltros({ ...filtros, anio: e.target.value })}
          className="px-2 py-1 border rounded"
        />
        <select
          name="temporada"
          value={filtros.temporada}
          onChange={(e) =>
            setFiltros({ ...filtros, temporada: e.target.value })
          }
          className="px-2 py-1 border rounded"
        >
          <option value="">Temporada</option>
          <option value="3">3 Meses</option>
          <option value="6">6 Meses</option>
        </select>
      </div>
      <div className="mt-4">
        <button
          onClick={limpiarFiltros}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default Filtros;
