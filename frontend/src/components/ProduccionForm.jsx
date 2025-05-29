import React, { useState } from "react";
import { createHelado } from "../services/api";

const ProduccionForm = ({ onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    sabor: "",
    tipo: "normal",
    precio_mayor: "",
    precio_detal: "",
    monedaMayor: "USD",
    monedaDetal: "Bs",
    cantidad: "",
    maquina: "soft"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    // Preparar datos para enviar
      const datosParaEnviar = {
    ...formData,
    precio_mayor: Number(formData.precio_mayor),
    precio_detal: Number(formData.precio_detal),
    cantidad: Number(formData.cantidad)
  };

  console.log('Datos a enviar al backend:', datosParaEnviar);

    console.log('Datos a enviar:', datosParaEnviar);

    const response = await createHelado(datosParaEnviar);
    console.log("Respuesta del servidor:", response);

    // Resetear formulario
    setFormData({
      sabor: "",
      tipo: "normal",
      precio_mayor: "",
      precio_detal: "",
      monedaMayor: "USD",
      monedaDetal: "Bs",
      cantidad: "",
      maquina: "soft"
    });

    if (onSaveSuccess) onSaveSuccess();

  } catch (err) {
    console.error("Error al guardar:", err);
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4">Registro de Helados</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="1lt">Helado en envase 1lt</option>
            <option value="2lt">Helado en envase 2lt</option>
            <option value="4lt">Helado en envase 4lt</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Precio al por mayor:</label>
          <div className="flex">
            <input
              type="number"
              name="precio_mayor"
              value={formData.precio_mayor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
              required
            />
            <select
              name="monedaMayor"
              value={formData.monedaMayor}
              onChange={handleChange}
              className="ml-2 p-2 border rounded"
            >
              <option value="USD">USD</option>
              <option value="Bs">Bs</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1">Precio al detal:</label>
          <div className="flex">
            <input
              type="number"
              name="precio_detal"
              value={formData.precio_detal}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
              required
            />
            <select
              name="monedaDetal"
              value={formData.monedaDetal}
              onChange={handleChange}
              className="ml-2 p-2 border rounded"
            >
              <option value="Bs">Bs</option>
              <option value="USD">USD</option>
            </select>
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

          {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <button 
        type="submit" 
        disabled={isLoading}
        className="bg-green text-white px-4 py-2 rounded hover:bg-green"
      >
        {isLoading ? "Guardando..." : "Guardar Producción"}
      </button>
        </div>
      </form>
    </div>
  );
};

export default ProduccionForm;