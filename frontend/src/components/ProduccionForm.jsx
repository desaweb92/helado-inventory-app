import React from "react";

const ProduccionForm = ({ formData, setFormData, handleSubmitProduccion, editIndex }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registro de Helados</h1>
      <form onSubmit={handleSubmitProduccion} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Sabor:</label>
          <input
            type="text"
            name="sabor"
            value={formData.sabor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Tipo:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="normal">Normal</option>
            <option value="especial">Especial</option>
            <option value="superEspecial">Super Especial</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Precio al por mayor (USD):</label>
          <div className="flex">
            <input
              type="number"
              name="precioMayor"
              value={formData.precioMayor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
            />
            <span className="ml-2 p-2 bg-gray-200 rounded">USD</span>
          </div>
        </div>
        <div>
          <label className="block mb-1">Precio al detal (Bs):</label>
          <div className="flex">
            <input
              type="number"
              name="precioDetal"
              value={formData.precioDetal}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
            />
            <span className="ml-2 p-2 bg-gray-200 rounded">Bs</span>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Cantidad (unidades):</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Máquina:</label>
          <select
            name="maquina"
            value={formData.maquina}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="soft">Soft</option>
            <option value="mantecadora">Mantecadora</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <button
            type="submit"
            className="md:w-[20%] w-full bg-green text-white px-4 py-2 rounded-lg hover:bg-fucshia"
          >
            {editIndex !== null ? "Actualizar producción" : "Guardar producción"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProduccionForm;