import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartRef = useRef(null);

  const inventoryData = {
    labels: ['Helado 1', 'Helado 2', 'Helado 3'],
    datasets: [
      {
        label: 'Cantidad',
        data: [10, 20, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
      },
    ],
  };

  const salesData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      {
        label: 'Ventas',
        data: [100, 150, 200, 250, 300],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">Inventario</h2>
          <Bar ref={chartRef} data={inventoryData} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Ventas</h2>
          <Line ref={chartRef} data={salesData} />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Valor del Dólar</h2>
        <p>Valor actual: $1.20 (Última actualización: 2023-10-01)</p>
      </div>
    </div>
  );
};

export default Dashboard;
