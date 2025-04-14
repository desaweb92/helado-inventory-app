import React from 'react';
import { jsPDF } from 'jspdf';
const Report = ({ helados }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Inventario de Helados', 10, 10);
    helados.forEach((helado, index) => {
      doc.text(`${index + 1}. ${helado.sabor} - ${helado.cantidad} unidades`, 10, 20 + index * 10);
    });
    doc.save('inventario.pdf');
  };
  return (
    <div>
      <button onClick={generatePDF}>Descargar PDF</button>
    </div>
  );
};
export default Report;
