import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const VentasForm = ({
  ventaData,
  setVentaData,
  handleSubmitVenta,
  produccionDia,
}) => {
  const [saboresDisponibles, setSaboresDisponibles] = useState([]);
  const [saboresSeleccionados, setSaboresSeleccionados] = useState([]);
  const [productosEspeciales, setProductosEspeciales] = useState([]);
  const [tasaBCV, setTasaBCV] = useState({ valor: 0, fecha: '' });
  const logoOriginalAncho = 800;
  const logoOriginalAlto = 600;
  const logoAncho = 30;
  const logoAlto = (logoAncho * logoOriginalAlto) / logoOriginalAncho;

  const fetchTasaBCV = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasa');
      if (!response.ok) throw new Error("Error al obtener tasa BCV");
      const data = await response.json();
      setTasaBCV(data);
    } catch (error) {
      console.error("Error obteniendo tasa BCV:", error);
    }
  };

  useEffect(() => {
    fetchTasaBCV();
  }, []);

  const generarFacturaPDF = async (venta) => {
    try {
      const doc = new jsPDF();
  
      // Colores corporativos
      const colorFucsia = "#E91E63";
      const colorVerde = "#4CAF50";
      const colorVerdeOscuro = "#388E3C";
  
      // Logo
      const logoUrl = "https://i.imgur.com/GkhD8en.jpg";
      doc.addImage(logoUrl, "JPEG", 150, 15, logoAncho, logoAlto);
  
      // Fecha
      const fecha = new Date();
      const fechaFormateada = `${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Fecha: ${fechaFormateada}`, 14, 20);
  
      // Encabezado
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
  
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Tipo de Venta: ${venta.tipoVenta === "mayor" ? "Al por mayor (USD)" : "Al detal (Bs)"}`,
        14,
        60
      );
      doc.text(
        `Tasa BCV: 1 USD = ${parseFloat(venta.tasaBcv || 0).toFixed(2)} Bs`,
        14,
        65
      );
  
      // Datos del cliente
      doc.setFontSize(12);
      doc.setTextColor(colorFucsia);
      doc.text("Datos del Cliente", 14, 75);
  
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.text("Nombre: Cliente General", 14, 85);
      doc.text("RIF/CI: ----------", 14, 95);
      doc.text("Dirección: ----------", 14, 105);
  
      // Línea decorativa
      doc.setDrawColor(colorVerde);
      doc.line(14, 115, 196, 115);
  
      // Detalles de la venta
      doc.setFontSize(12);
      doc.setTextColor(colorFucsia);
      doc.text("Detalles de la Venta", 14, 125);
  
      // Preparar los datos para la tabla
      const items = [];
      
      // Agregar sabores normales
      venta.saboresNormales.forEach(item => {
        items.push([
          item.sabor,
          item.tipoHelado === "normal" ? "Normal" : 
          item.tipoHelado === "especial" ? "Especial" : "Super Especial",
          item.cantidad,
          (parseFloat(item.precioUnitario) || 0).toFixed(2),
          (parseFloat(item.precioTotalSabor) || 0).toFixed(2),
          (parseFloat(item.precioTotalSaborBs) || 0).toFixed(2)
        ]);
      });
      
      // Agregar productos especiales
      venta.productosEspeciales.forEach(item => {
        let tipo = "";
        if (item.tipoProducto === "barquilla_bolitas") tipo = `Barquilla bolita (${item.bolitas === "doble" ? "Doble" : "Simple"})`;
        else if (item.tipoProducto === "barquilla_soft") tipo = "Barquilla soft";
        else if (item.tipoProducto === "barquilla_yogurt") tipo = "Barquilla yogurt";
        else if (item.tipoProducto === "1lt") tipo = "Envase 1lt";
        else if (item.tipoProducto === "2lt") tipo = "Envase 2lt";
        else if (item.tipoProducto === "4lt") tipo = "Envase 4lt";
        else if (item.tipoProducto === "sundae") tipo = "Sundae";
        
        items.push([
          item.sabor,
          tipo,
          item.cantidad,
          (parseFloat(item.precioUnitario) || 0).toFixed(2),
          (parseFloat(item.precioTotalSabor) || 0).toFixed(2),
          (parseFloat(item.precioTotalSaborBs) || 0).toFixed(2)
        ]);
      });
  
      // Tabla con estilo verde
      autoTable(doc, {
        startY: 135,
        head: [[
          "Producto", 
          "Tipo", 
          "Cantidad", 
          `P. Unitario (${venta.moneda})`, 
          `Subtotal (${venta.moneda})`,
          "Subtotal (Bs)"
        ]],
        body: items,
        theme: "grid",
        headStyles: {
          fillColor: colorVerdeOscuro,
          textColor: 255,
          fontStyle: "bold",
          fontSize: 10,
        },
        bodyStyles: {
          textColor: 60,
          fontSize: 9,
        },
        alternateRowStyles: {
          fillColor: [238, 238, 238],
        },
        margin: { left: 14, right: 14 },
      });
  
 // Totales con mejor espaciado
const subtotal = parseFloat(venta.precioTotal) || 0;
const subtotalBs = parseFloat(venta.precioTotalBs) || 0;

// Ajusta el espacio después de la tabla (15 = posición inicial)
const startY = doc.lastAutoTable.finalY + 15;


// Subtotal
doc.setFontSize(10);
doc.setTextColor(60);
doc.text("Subtotal:", 130, startY);
doc.text(`${venta.moneda} ${subtotal.toFixed(2)}`, 180, startY, { align: "right" });
doc.text(`Bs ${subtotalBs.toFixed(2)}`, 180, startY + 5, { align: "right" });

// Espacio extra antes del TOTAL (10 = espacio adicional)
const espacioExtra = 10;

// TOTAL (más destacado)
doc.setFontSize(11);
doc.setTextColor(colorFucsia); // Usa tu color corporativo (#E91E63)
doc.setFont(undefined, "bold");
doc.text("TOTAL:", 130, startY + 5 + espacioExtra);
doc.text(`${venta.moneda} ${subtotal.toFixed(2)}`, 180, startY + 5 + espacioExtra, { align: "right" });
doc.text(`Bs ${subtotalBs.toFixed(2)}`, 180, startY + 10 + espacioExtra, { align: "right" });
  
      // Tasa BCV
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Tasa BCV: 1 USD = ${(parseFloat(tasaBCV.valor) || 0).toFixed(2)} Bs (${tasaBCV.fecha || 'No disponible'})`,
        14,
        doc.lastAutoTable.finalY + 45
      );
  
      // Método de pago
      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.text(
        `Método de Pago: ${venta.metodoPago || "No especificado"}`,
        14,
        doc.lastAutoTable.finalY + 50
      );
  
      // Pie de página
      doc.setDrawColor(colorVerde);
      doc.line(
        14,
        doc.lastAutoTable.finalY + 60,
        196,
        doc.lastAutoTable.finalY + 60
      );
  
      doc.setFontSize(9);
      doc.setTextColor(colorFucsia);
      doc.text("¡Gracias por su compra!", 105, doc.lastAutoTable.finalY + 70, {
        align: "center",
      });
  
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        "Helados para todos - RIF: J-50502124-9",
        105,
        doc.lastAutoTable.finalY + 80,
        { align: "center" }
      );
      doc.text(
        "Teléfono: 0412-3689362, 0412-0837988, 0424-9559493 | @heladosparatodos.mat",
        105,
        doc.lastAutoTable.finalY + 86,
        { align: "center" }
      );
  
      doc.save(`factura_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar la factura. Por favor intente nuevamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setVentaData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'tipoVenta') {
        const newSabores = saboresSeleccionados.map(sabor => {
          const produccion = produccionDia.find(
            item => item.sabor === sabor.sabor && item.tipo === sabor.tipoHelado
          );
          if (produccion) {
            const precioUnitario = newData.tipoVenta === "mayor" 
              ? produccion.precio_mayor 
              : produccion.precio_detal;
            return {
              ...sabor,
              precioUnitario,
              precioTotalSabor: precioUnitario * sabor.cantidad
            };
          }
          return sabor;
        });
        setSaboresSeleccionados(newSabores);
        
        const newProductos = productosEspeciales.map(producto => ({
          ...producto,
          precioUnitario: newData.tipoVenta === "mayor" ? producto.precio_mayor : producto.precio_detal,
          precioTotalSabor: (newData.tipoVenta === "mayor" ? producto.precio_mayor : producto.precio_detal) * producto.cantidad
        }));
        setProductosEspeciales(newProductos);
      }
      
      return newData;
    });
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
    newSabores[index].precioTotalSabor = (newSabores[index].precioUnitario || 0) * newSabores[index].cantidad;
    setSaboresSeleccionados(newSabores);
  };

  const handleProductoEspecialChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].tipoProducto = e.target.value;
    newProductos[index].precio_mayor = "";
    newProductos[index].precio_detal = "";
    newProductos[index].precioUnitario = "";
    newProductos[index].precioTotalSabor = 0;
    newProductos[index].bolitas = "simple"; // Valor por defecto

     // Si es yogurt, establecer el sabor como "yogurt"
  if (e.target.value === "barquilla_yogurt") {
    newProductos[index].sabor = "yogurt";
  } else {
    newProductos[index].sabor = "";
  }
  
  setProductosEspeciales(newProductos);
  };
  

  const handleProductoPrecioMayorChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].precio_mayor = e.target.value;
    
    if (ventaData.tipoVenta === "mayor") {
      newProductos[index].precioUnitario = parseFloat(e.target.value) || 0;
      newProductos[index].precioTotalSabor = newProductos[index].precioUnitario * (newProductos[index].cantidad || 0);
    }
    
    setProductosEspeciales(newProductos);
  };

  const handleProductoPrecioDetalChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].precio_detal = e.target.value;
    
    if (ventaData.tipoVenta === "detal") {
      newProductos[index].precioUnitario = parseFloat(e.target.value) || 0;
      newProductos[index].precioTotalSabor = newProductos[index].precioUnitario * (newProductos[index].cantidad || 0);
    }
    
    setProductosEspeciales(newProductos);
  };

  const handleProductoSaborChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].sabor = e.target.value;
    setProductosEspeciales(newProductos);
  };

  const handleProductoCantidadChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].cantidad = parseInt(e.target.value, 10) || 0;
    newProductos[index].precioTotalSabor = (newProductos[index].precioUnitario || 0) * newProductos[index].cantidad;
    setProductosEspeciales(newProductos);
  };

  const handleBolitaChange = (e, index) => {
    const newProductos = [...productosEspeciales];
    newProductos[index].bolitas = e.target.value;
    setProductosEspeciales(newProductos);
  };

  const addSabor = () => {
    setSaboresSeleccionados([
      ...saboresSeleccionados,
      { 
        sabor: "", 
        cantidad: 0, 
        precioUnitario: 0,
        precioTotalSabor: 0, 
        tipoHelado: "normal" 
      },
    ]);
  };

  const addProducto = () => {
    setProductosEspeciales([
      ...productosEspeciales,
      { 
        tipoProducto: "barquilla_bolitas",
        sabor: "",
        cantidad: 0,
        precio_mayor: "",
        precio_detal: "",
        precioUnitario: "",
        precioTotalSabor: 0,
        tipoHelado: "especial",
        bolitas: "simple" // Valor por defecto
      },
    ]);
  };

  const removeSabor = (index) => {
    const newSabores = saboresSeleccionados.filter((_, i) => i !== index);
    setSaboresSeleccionados(newSabores);
  };

  const removeProducto = (index) => {
    const newProductos = productosEspeciales.filter((_, i) => i !== index);
    setProductosEspeciales(newProductos);
  };

  useEffect(() => {
    const sabores = [...new Set(produccionDia.map((item) => item.sabor))];
    setSaboresDisponibles(sabores);
  }, [produccionDia]);

  useEffect(() => {
    const calcularPrecios = () => {
      let precioTotal = 0;
      let precioTotalBs = 0;
      let cantidadTotal = 0;
  
      // Calcular para sabores normales
      const newSabores = saboresSeleccionados.map((sabor) => {
        const produccion = produccionDia.find(
          (item) => item.sabor === sabor.sabor && item.tipo === sabor.tipoHelado
        );
        if (produccion) {
          const precioUnitario = ventaData.tipoVenta === "mayor"
            ? parseFloat(produccion.precio_mayor)
            : parseFloat(produccion.precio_detal);
          
          const precioTotalSabor = precioUnitario * sabor.cantidad;
          
          if (ventaData.tipoVenta === "mayor") {
            precioTotal += precioTotalSabor;
            precioTotalBs += precioTotalSabor * parseFloat(tasaBCV.valor);
          } else {
            precioTotalBs += precioTotalSabor;
            precioTotal += precioTotalSabor / parseFloat(tasaBCV.valor);
          }
          
          cantidadTotal += sabor.cantidad;
          return { 
            ...sabor, 
            precioUnitario,
            precioTotalSabor,
            precioTotalSaborBs: ventaData.tipoVenta === "mayor"
              ? precioTotalSabor * parseFloat(tasaBCV.valor)
              : precioTotalSabor
          };
        }
        return sabor;
      });
  
      // Calcular para productos especiales
      const newProductos = productosEspeciales.map(producto => {
        const precioTotalSabor = producto.precioTotalSabor || 0;
        
        if (ventaData.tipoVenta === "mayor") {
          precioTotal += precioTotalSabor;
          precioTotalBs += precioTotalSabor * parseFloat(tasaBCV.valor);
        } else {
          precioTotalBs += precioTotalSabor;
          precioTotal += precioTotalSabor / parseFloat(tasaBCV.valor);
        }
        
        cantidadTotal += producto.cantidad || 0;
        return {
          ...producto,
          precioTotalSabor,
          precioTotalSaborBs: ventaData.tipoVenta === "mayor"
            ? precioTotalSabor * parseFloat(tasaBCV.valor)
            : precioTotalSabor
        };
      });
  
      if (JSON.stringify(newSabores) !== JSON.stringify(saboresSeleccionados)) {
        setSaboresSeleccionados(newSabores);
      }
      
      if (JSON.stringify(newProductos) !== JSON.stringify(productosEspeciales)) {
        setProductosEspeciales(newProductos);
      }
  
      const newVentaData = {
        ...ventaData,
        precioTotal: precioTotal.toFixed(2),
        precioTotalBs: precioTotalBs.toFixed(2),
        cantidadVendida: cantidadTotal.toString(),
        sabores: [
          ...newSabores.map((sabor) => `${sabor.sabor} (${sabor.tipoHelado})`),
          ...newProductos.map(producto => {
            let tipo = "";
            if (producto.tipoProducto === "barquilla_bolitas") tipo = `Barquilla bolita (${producto.bolitas === "doble" ? "Doble" : "Simple"})`;
            else if (producto.tipoProducto === "barquilla_soft") tipo = "Barquilla soft";
            else if (producto.tipoProducto === "barquilla_yogurt") tipo = "Barquilla yogurt";
            else if (producto.tipoProducto === "1lt") tipo = "Envase 1lt";
            else if (producto.tipoProducto === "2lt") tipo = "Envase 2lt";
            else if (producto.tipoProducto === "4lt") tipo = "Envase 4lt";
            else if (producto.tipoProducto === "sundae") tipo = "Sundae";
            return `${producto.sabor} (${tipo})`;
          })
        ].join(", "),
        tasaBcv: parseFloat(tasaBCV.valor)
      };
  
      if (JSON.stringify(newVentaData) !== JSON.stringify(ventaData)) {
        setVentaData(newVentaData);
      }
    };
  
    calcularPrecios();
  }, [saboresSeleccionados, productosEspeciales, ventaData.tipoVenta, produccionDia, tasaBCV]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Preparar datos de sabores normales
      const saboresNormales = saboresSeleccionados.map((sabor) => ({
        sabor: sabor.sabor,
        cantidad: sabor.cantidad,
        precioUnitario: parseFloat(sabor.precioUnitario) || 0,
        precioTotalSabor: ventaData.tipoVenta === "mayor" 
          ? parseFloat(sabor.precioTotalSabor) 
          : parseFloat(sabor.precioTotalSabor) / parseFloat(tasaBCV.valor),
        precioTotalSaborBs: ventaData.tipoVenta === "mayor"
          ? parseFloat(sabor.precioTotalSabor) * parseFloat(tasaBCV.valor)
          : parseFloat(sabor.precioTotalSabor),
        tipoHelado: sabor.tipoHelado,
        productoEspecial: ""
      }));
      
      // Preparar datos de productos especiales
      const productosEspecialesData = productosEspeciales.map((producto) => ({
        tipoProducto: producto.tipoProducto,
        sabor: producto.sabor,
        cantidad: producto.cantidad,
        precioUnitario: parseFloat(producto.precioUnitario) || 0,
        precioTotalSabor: ventaData.tipoVenta === "mayor" 
          ? parseFloat(producto.precioTotalSabor) 
          : parseFloat(producto.precioTotalSabor) / parseFloat(tasaBCV.valor),
        precioTotalSaborBs: ventaData.tipoVenta === "mayor"
          ? parseFloat(producto.precioTotalSabor) * parseFloat(tasaBCV.valor)
          : parseFloat(producto.precioTotalSabor),
        tipoHelado: producto.tipoProducto,
        productoEspecial: producto.tipoProducto,
        bolitas: producto.tipoProducto === "barquilla_bolitas" ? producto.bolitas : undefined
      }));
  
      // Crear objeto de venta consolidada
      const ventaConsolidada = {
        fecha: new Date().toLocaleDateString("es-ES"),
        tipoVenta: ventaData.tipoVenta,
        cantidadVendida: ventaData.cantidadVendida,
        precioTotal: ventaData.precioTotal,
        precioTotalBs: ventaData.precioTotalBs,
        metodoPago: ventaData.metodoPago,
        observaciones: ventaData.observaciones,
        tasaBcv: parseFloat(tasaBCV.valor),
        moneda: ventaData.tipoVenta === "mayor" ? "USD" : "Bs",
        saboresNormales,
        productosEspeciales: productosEspecialesData
      };
  
      // Enviar todas las ventas al backend
      await handleSubmitVenta([ventaConsolidada]);
      
      // Generar una sola factura
      setTimeout(() => generarFacturaPDF(ventaConsolidada), 100);
  
      // Limpiar el formulario
      setSaboresSeleccionados([]);
      setProductosEspeciales([]);
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      alert("Hubo un error al procesar la venta. Por favor intente nuevamente.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
      <div className="bg-blue-50 p-3 rounded mb-4">
        {tasaBCV.valor ? (
          <p className="text-sm">
            <span className="font-semibold">Tasa BCV actual: </span>
            1 USD = {parseFloat(tasaBCV.valor).toFixed(2)} Bs (Actualizado: {tasaBCV.fecha})
          </p>
        ) : (
          <p className="text-sm">Cargando tasa BCV...</p>
        )}
        <button
          type="button"
          onClick={fetchTasaBCV}
          className="text-xs text-blue-600 hover:underline mt-1"
        >
          Actualizar tasa
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Precio Total ({ventaData.tipoVenta === "mayor" ? "USD" : "Bs"}):</label>
            <input
              type="text"
              value={ventaData.precioTotal}
              className="w-full px-3 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Precio Total (Bs):</label>
            <input
              type="text"
              value={ventaData.precioTotalBs || "0.00"}
              className="w-full px-3 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Tasa BCV:</label>
            <input
              type="text"
              value={tasaBCV.valor ? `1 USD = ${parseFloat(tasaBCV.valor).toFixed(2)} Bs` : "Cargando..."}
              className="w-full px-3 py-2 border rounded-lg"
              readOnly
            />
          </div>
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

        <div className="md:col-span-2">
          <label className="block text-gray-700">Observaciones:</label>
          <textarea
            name="observaciones"
            value={ventaData.observaciones || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="2"
            placeholder="Ingrese cualquier comentario sobre la venta"
          />
        </div>

        {/* Sección de sabores normales */}
        {saboresSeleccionados.length > 0 && (
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Helados Normales</h3>
            {saboresSeleccionados.map((sabor, index) => (
              <div
                key={`sabor-${index}`}
                className="md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 mb-4"
              >
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
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={`${ventaData.tipoVenta === "mayor" ? "USD" : "Bs"} ${(parseFloat(sabor.precioTotalSabor) || 0).toFixed(2)}`}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      readOnly
                    />
                    <input
                      type="text"
                      value={`Bs ${(ventaData.tipoVenta === "mayor" 
                        ? (parseFloat(sabor.precioTotalSabor) || 0) * parseFloat(tasaBCV.valor)
                        : (parseFloat(sabor.precioTotalSabor) || 0)
                      ).toFixed(2)}`}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      readOnly
                    />
                  </div>
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
          </div>
        )}

        {/* Sección de productos especiales */}
        {productosEspeciales.length > 0 && (
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Productos Especiales</h3>
            {productosEspeciales.map((producto, index) => (
              <div
                key={`producto-${index}`}
                className="md:col-span-2 grid grid-cols-1 md:grid-cols-6 gap-2 mb-4"
              >
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm">Producto</label>
                  <select
                    value={producto.tipoProducto}
                    onChange={(e) => handleProductoEspecialChange(e, index)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="barquilla_bolitas">Barquilla bolita</option>
                    <option value="barquilla_soft">Barquilla soft</option>
                    <option value="barquilla_yogurt">Barquilla yogurt</option>
                    <option value="1lt">Envase 1lt</option>
                    <option value="2lt">Envase 2lt</option>
                    <option value="4lt">Envase 4lt</option>
                    <option value="sundae">Sundae</option>
                  </select>
                </div>
                    {/* Mostrar selector de sabor solo si NO es yogurt */}
        {producto.tipoProducto !== "barquilla_yogurt" && (
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm">Sabor</label>
            <select
              value={producto.sabor}
              onChange={(e) => handleProductoSaborChange(e, index)}
              className="w-full px-3 py-2 border rounded-lg"
              required={producto.tipoProducto !== "barquilla_yogurt"}
            >
              <option value="">Seleccionar</option>
              {saboresDisponibles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Mostrar campo fijo de sabor yogurt si es yogurt */}
        {producto.tipoProducto === "barquilla_yogurt" && (
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm">Sabor</label>
            <input
              type="text"
              value="yogurt"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              readOnly
            />
          </div>
        )}
                {producto.tipoProducto === "barquilla_bolitas" && (
                  <div className="col-span-1">
                    <label className="block text-gray-700 text-sm">Bolitas</label>
                    <select
                      value={producto.bolitas}
                      onChange={(e) => handleBolitaChange(e, index)}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    >
                      <option value="simple">1 bolita</option>
                      <option value="doble">2 bolitas</option>
                    </select>
                  </div>
                )}
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm">Cantidad</label>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleProductoCantidadChange(e, index)}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm">
                    {ventaData.tipoVenta === "mayor" ? "Precio Unitario (USD)" : "Precio Unitario (Bs)"}
                  </label>
                  <input
                    type="number"
                    value={ventaData.tipoVenta === "mayor" ? producto.precio_mayor : producto.precio_detal}
                    onChange={ventaData.tipoVenta === "mayor" 
                      ? (e) => handleProductoPrecioMayorChange(e, index)
                      : (e) => handleProductoPrecioDetalChange(e, index)}
                    className="w-full px-3 py-2 border rounded-lg"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 text-sm">Subtotal</label>
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={`${ventaData.tipoVenta === "mayor" ? "USD" : "Bs"} ${(parseFloat(producto.precioTotalSabor) || 0).toFixed(2)}`}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      readOnly
                    />
                    <input
                      type="text"
                      value={`${ventaData.tipoVenta === "mayor" ? "Bs" : "USD"} ${(ventaData.tipoVenta === "mayor" 
                        ? (parseFloat(producto.precioTotalSabor) || 0) * parseFloat(tasaBCV.valor)
                        : (parseFloat(producto.precioTotalSabor) || 0) / parseFloat(tasaBCV.valor)
                      ).toFixed(2)}`}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeProducto(index)}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={addSabor}
              className="md:w-[200px] w-full bg-[#4CAF50] text-white px-4 py-2 rounded-lg"
            >
              Agregar sabor
            </button>
            <button
              type="button"
              onClick={addProducto}
              className="md:w-[200px] w-full bg-[#308b15] text-white px-4 py-2 rounded-lg"
            >
              Agregar producto especial
            </button>
          </div>
          <button
            type="submit"
            className="md:w-[200px] w-full bg-[#E91E63] text-white px-4 py-2 rounded-lg hover:bg-green-700"
            disabled={saboresSeleccionados.length === 0 && productosEspeciales.length === 0}
          >
            Registrar venta y descargar factura
          </button>
        </div>
      </form>
    </div>
  );
};

export default VentasForm;