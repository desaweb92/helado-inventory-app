import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Report = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const data = [
      ['Sabor', 'Tipo', 'Precio al por mayor', 'Precio al detal'],
      ['Vainilla', 'Normal', '$10', '$15'],
      ['Chocolate', 'Especial', '$20', '$25'],
    ];

    doc.autoTable({
      head: [['Inventario de Helados']],
      body: data,
    });

    doc.save('inventario.pdf');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Reporte de Inventario</h1>
      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Descargar PDF
      </button>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Sabor</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Precio al por mayor</th>
            <th className="border p-2">Precio al detal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Vainilla</td>
            <td className="border p-2">Normal</td>
            <td className="border p-2">$10</td>
            <td className="border p-2">$15</td>
          </tr>
          <tr>
            <td className="border p-2">Chocolate</td>
            <td className="border p-2">Especial</td>
            <td className="border p-2">$20</td>
            <td className="border p-2">$25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Report;
