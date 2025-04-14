import React, { useState } from 'react';
import axios from 'axios';
const HeladoForm = () => {
  const [formData, setFormData] = useState({
    sabor: '',
    tipo: '',
    precioMayor: 0,
    precioDetal: 0,
    cantidad: 0,
  });
  const { sabor, tipo, precioMayor, precioDetal, cantidad } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/helados', formData);
    setFormData({
      sabor: '',
      tipo: '',
      precioMayor: 0,
      precioDetal: 0,
      cantidad: 0,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="sabor" value={sabor} onChange={onChange} placeholder="Sabor" />
      <input type="text" name="tipo" value={tipo} onChange={onChange} placeholder="Tipo" />
      <input type="number" name="precioMayor" value={precioMayor} onChange={onChange} placeholder="Precio Mayor" />
      <input type="number" name="precioDetal" value={precioDetal} onChange={onChange} placeholder="Precio Detal" />
      <input type="number" name="cantidad" value={cantidad} onChange={onChange} placeholder="Cantidad" />
      <button type="submit">Agregar Helado</button>
    </form>
  );
};
export default HeladoForm;
