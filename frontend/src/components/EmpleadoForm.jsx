import React, { useState } from 'react';

const EmpleadoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    cargo: '',
    salario: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el empleado
    console.log('Empleado guardado:', formData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Registro de Empleados</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Documento:</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cargo:</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salario:</label>
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Observaciones:</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EmpleadoForm;
