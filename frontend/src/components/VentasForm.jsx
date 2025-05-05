import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const VentasForm = ({ ventaData, setVentaData, handleSubmitVenta, produccionDia }) => {
  const [saboresDisponibles, setSaboresDisponibles] = useState([]);
  const [saboresSeleccionados, setSaboresSeleccionados] = useState([]);
  const logoOriginalAncho = 800; // Ancho original en píxeles de tu imagen
const logoOriginalAlto = 600; 
  const logoAncho = 30; 
  const logoAlto = (logoAncho * logoOriginalAlto) / logoOriginalAncho;
  // Función para generar la factura en PDF
  const generarFacturaPDF = (venta) => {
    try {
      const doc = new jsPDF();
      
      // Colores corporativos
      const colorFucsia = '#E91E63';
      const colorVerde = '#4CAF50';
      const colorVerdeOscuro = '#388E3C';
      
      // Logo (reemplaza con tu imagen base64 o URL)
      const logoUrl = 'https://i.imgur.com/GkhD8en.jpg'; // Reemplaza esto con tu logo
      doc.addImage(logoUrl, 'JPEG', 150, 15, logoAncho, logoAlto);
      
      // Fecha alineada a la izquierda
      const fecha = new Date();
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Fecha: ${fechaFormateada}`, 14, 20);
      
      // Encabezado con colores corporativos
      doc.setFontSize(18);
      doc.setTextColor(colorFucsia);
      doc.text("Helados para todos", 105, 30, { align: "center" });
      
      doc.setFontSize(14);
      doc.setTextColor(colorVerde);
      doc.text("FACTURA", 105, 40, { align: "center" });
      
      // Línea decorativa
      doc.setDrawColor(colorFucsia);
      doc.setLineWidth(0.5);
      doc.line(14, 45, 196, 45);
      
      // Información de la factura
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Factura #${Math.floor(Math.random() * 10000)}`, 14, 55);
      
      // Datos del cliente
      doc.setFontSize(12);
      doc.setTextColor(colorFucsia);
      doc.text("Datos del Cliente", 14, 65);
      
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.text("Nombre: Cliente General", 14, 75);
      doc.text("RIF/CI: ----------", 14, 85);
      doc.text("Dirección: ----------", 14, 95);
      
      // Línea decorativa
      doc.setDrawColor(colorVerde);
      doc.line(14, 100, 196, 100);
      
      // Detalles de la venta
      doc.setFontSize(12);
      doc.setTextColor(colorFucsia);
      doc.text("Detalles de la Venta", 14, 110);
      
      // Tabla con estilo verde
      autoTable(doc, {
        startY: 120,
        head: [['Producto', 'Tipo', 'Cantidad', 'P. Unitario', 'Subtotal']],
        body: [
          [
            venta.sabores || 'N/A',
            venta.tipoHelado === 'normal' ? 'Normal' :
            venta.tipoHelado === 'especial' ? 'Especial' : 'Super Especial',
            venta.cantidadVendida || 0,
            `$${(venta.precioTotal / (venta.cantidadVendida || 1)).toFixed(2)}`,
            `$${(venta.precioTotal || 0).toFixed(2)}`
          ]
        ],
        theme: 'grid',
        headStyles: {
          fillColor: colorVerdeOscuro,
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          textColor: 60,
          fontSize: 9
        },
        alternateRowStyles: {
          fillColor: [238, 238, 238]
        },
        margin: { left: 14, right: 14 }
      });
      
      // Totales con estilo
      const subtotal = parseFloat(venta.precioTotal) || 0;
      const iva = subtotal * 0.16;
      const total = subtotal + iva;
      
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.text("Subtotal:", 150, doc.lastAutoTable.finalY + 15);
      doc.text(`$${subtotal.toFixed(2)}`, 180, doc.lastAutoTable.finalY + 15, { align: "right" });
      
      doc.text("IVA (16%):", 150, doc.lastAutoTable.finalY + 25);
      doc.text(`$${iva.toFixed(2)}`, 180, doc.lastAutoTable.finalY + 25, { align: "right" });
      
      doc.setFontSize(11);
      doc.setTextColor(colorFucsia);
      doc.setFont(undefined, 'bold');
      doc.text("TOTAL:", 150, doc.lastAutoTable.finalY + 35);
      doc.text(`$${total.toFixed(2)}`, 180, doc.lastAutoTable.finalY + 35, { align: "right" });
      
      // Método de pago
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.text(`Método de Pago: ${venta.metodoPago || 'No especificado'}`, 14, doc.lastAutoTable.finalY + 50);
      
      // Pie de página con estilo
      doc.setDrawColor(colorVerde);
      doc.line(14, doc.lastAutoTable.finalY + 60, 196, doc.lastAutoTable.finalY + 60);
      
      doc.setFontSize(9);
      doc.setTextColor(colorFucsia);
      doc.text("¡Gracias por su compra!", 105, doc.lastAutoTable.finalY + 70, { align: "center" });
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text("Helados para todos - RIF:  J-50502124-9", 105, doc.lastAutoTable.finalY + 80, { align: "center" });
      doc.text("Teléfono: 0412-3689362, 0412-0837988, 0424-9559493 | @heladosparatodos.mat", 105, doc.lastAutoTable.finalY + 86, { align: "center" });
      
      // Guardar el PDF
      doc.save(`factura_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar la factura. Por favor intente nuevamente.");
    }
  };
  
  

  const handleChange = (e) => {
    setVentaData({ ...ventaData, [e.target.name]: e.target.value });
  };

  const handleSaborChange = (e, index) => {
    const newSabores = [...saboresSeleccionados];
    newSabores[index].sabor = e.target.value;
    setSaboresSeleccionados(newSabores);
  };

  const handleTipoHeladoChange = (e, index) => {
    const newSabores = [...saboresSeleccionados];
    newSabores[index].tipoHelado = e.target.value;
    setSaboresSeleccionados(newSabores);
  };

  const handleCantidadChange = (e, index) => {
    const newSabores = [...saboresSeleccionados];
    newSabores[index].cantidad = parseInt(e.target.value, 10) || 0;
    setSaboresSeleccionados(newSabores);
  };

  const addSabor = () => {
    setSaboresSeleccionados([
      ...saboresSeleccionados,
      { sabor: "", cantidad: 0, precioTotalSabor: 0, tipoHelado: "normal" },
    ]);
  };

  const removeSabor = (index) => {
    const newSabores = saboresSeleccionados.filter((_, i) => i !== index);
    setSaboresSeleccionados(newSabores);
  };

  useEffect(() => {
    // Obtener los sabores disponibles de la producción
    const sabores = [...new Set(produccionDia.map((item) => item.sabor))];
    setSaboresDisponibles(sabores);
  }, [produccionDia]);

  useEffect(() => {
    const calcularPrecios = () => {
      let precioTotal = 0;
      let cantidadTotal = 0;
  
      const newSabores = saboresSeleccionados.map((sabor) => {
        const produccion = produccionDia.find(
          (item) => item.sabor === sabor.sabor && item.tipo === sabor.tipoHelado
        );
        if (produccion) {
          const precio =
            ventaData.tipoVenta === "mayor" ? produccion.precioMayor : produccion.precioDetal;
          const precioTotalSabor = precio * sabor.cantidad;
          precioTotal += precioTotalSabor;
          cantidadTotal += sabor.cantidad;
          return { ...sabor, precioTotalSabor };
        }
        return sabor;
      });
  
      // Comparar antes de actualizar
      if (JSON.stringify(newSabores) !== JSON.stringify(saboresSeleccionados)) {
        setSaboresSeleccionados(newSabores);
      }
  
      const newVentaData = {
        ...ventaData,
        precioTotal: precioTotal.toString(),
        cantidadVendida: cantidadTotal.toString(),
        sabores: newSabores.map((sabor) => `${sabor.sabor} (${sabor.tipoHelado})`).join(", "),
      };
  
      // Comparar antes de actualizar
      if (JSON.stringify(newVentaData) !== JSON.stringify(ventaData)) {
        setVentaData(newVentaData);
      }
    };
  
    calcularPrecios();
  }, [saboresSeleccionados, ventaData.tipoVenta, produccionDia]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const nuevasVentas = saboresSeleccionados.map((sabor) => ({
        fecha: new Date().toLocaleDateString('es-ES'),
        tipoVenta: ventaData.tipoVenta,
        cantidadVendida: sabor.cantidad,
        precioTotal: sabor.precioTotalSabor,
        sabores: sabor.sabor,
        tipoHelado: sabor.tipoHelado,
        metodoPago: ventaData.metodoPago,
      }));
      
      // Primero procesar la venta
      await handleSubmitVenta(nuevasVentas);
      
      // Luego generar los PDFs
      nuevasVentas.forEach(venta => {
        setTimeout(() => generarFacturaPDF(venta), 100);
      });
      
      setSaboresSeleccionados([]);
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      alert("Hubo un error al procesar la venta. Por favor intente nuevamente.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Tipo de Venta:</label>
          <select
            name="tipoVenta"
            value={ventaData.tipoVenta}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="mayor">Al por mayor</option>
            <option value="detal">Al detal</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Precio Total:</label>
          <input
            type="number"
            name="precioTotal"
            value={ventaData.precioTotal}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700">Cantidad Total:</label>
          <input
            type="number"
            name="cantidadVendida"
            value={ventaData.cantidadVendida}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700">Método de Pago:</label>
          <select
            name="metodoPago"
            value={ventaData.metodoPago}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="Punto">Punto</option>
            <option value="PagoMovil">Pago móvil</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>
        {saboresSeleccionados.map((sabor, index) => (
          <div key={index} className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm">Sabor</label>
              <select
                value={sabor.sabor}
                onChange={(e) => handleSaborChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Seleccionar</option>
                {saboresDisponibles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm">Tipo</label>
              <select
                value={sabor.tipoHelado}
                onChange={(e) => handleTipoHeladoChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="normal">Normal</option>
                <option value="especial">Especial</option>
                <option value="superEspecial">Super Especial</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm">Cantidad</label>
              <input
                type="number"
                value={sabor.cantidad}
                onChange={(e) => handleCantidadChange(e, index)}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm">Subtotal</label>
              <input
                type="number"
                value={sabor.precioTotalSabor}
                className="w-full px-3 py-2 border rounded-lg"
                readOnly
              />
            </div>
            <div className="col-span-1 flex items-end">
              <button
                type="button"
                onClick={() => removeSabor(index)}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={addSabor}
            className="md:w-[20%] w-full bg-[#4CAF50] text-white px-4 py-2 rounded-lg mb-4"
          >
            Agregar Sabor
          </button>
          <button
            type="submit"
            className="md:w-[20%] w-full bg-[#E91E63] text-white px-4 py-2 rounded-lg hover:bg-green-700"
            disabled={saboresSeleccionados.length === 0}
          >
            Registrar Venta y descargar factura
          </button>
        </div>
      </form>
    </div>
  );
};


export default VentasForm;