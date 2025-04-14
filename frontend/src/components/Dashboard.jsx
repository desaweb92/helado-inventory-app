import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Report from './Report';
const Dashboard = () => {
  const [helados, setHelados] = useState([]);
  useEffect(() => {
    const fetchHelados = async () => {
      const res = await axios.get('http://localhost:5000/api/helados');
      setHelados(res.data);
    };
    fetchHelados();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Report helados={helados} />

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="list-disc list-inside">
        {helados.map(helado => (
          <li key={helado._id} className="mb-2">
            {helado.sabor} - {helado.cantidad} unidades
          </li>
        ))}
      </ul>
    </div>
    
  );
};
export default Dashboard;
