import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ProduccionForm from "./components/ProduccionForm";
import VentasForm from "./components/VentasForm";
import Inventario from "./components/Inventario";
import ProduccionTable from "./components/ProduccionTable";
import VentasTable from "./components/VentasTable";
import Filtros from "./components/Filtros";
import ResumenVentas from "./components/ResumenVentas";
import ResumenProduccion from "./components/ResumenProduccion";

const HeladoApp = () => {
  // Estado para datos de producción
  const [formData, setFormData] = useState({
    sabor: "",
    tipo: "normal", // Ahora incluye "1lt", "2lt", "4lt"
    precio_mayor: "",
    precio_detal: "",
    monedaMayor: "USD",
    monedaDetal: "Bs",
    cantidad: "",
    maquina: "soft",
  });

  // Estado para datos de ventas
  const [ventaData, setVentaData] = useState({
    tipoVenta: "mayor",
    cantidadVendida: "",
    precioTotal: "",
    sabores: "",
    tipoHelado: "normal", // Ahora incluye "1lt", "2lt", "4lt"
    metodoPago: "Punto",
    productoEspecial: "", // Nuevo campo para barquillas/sundae
  });

  // Estados para los registros
  const [produccionDia, setProduccionDia] = useState([]);
  const [ventasDia, setVentasDia] = useState([]);
  
  // Inventario actualizado con helados de tarro
  const [inventario, setInventario] = useState({
    normal: {},
    especial: {},
    superEspecial: {},
    "1lt": {},
    "2lt": {},
    "4lt": {},
  });

  // Filtros
  const [filtros, setFiltros] = useState({
    sabor: "",
    medioPago: "",
    maquina: "",
    tipo: "",
    dia: "",
    mes: "",
    anio: "",
    temporada: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("produccion");

  // Resumen de ventas actualizado
  const [resumenVentas, setResumenVentas] = useState({
    totalVentasDia: 0,
    totalVentasMes: 0,
    totalVentasAnio: 0,
    totalVentasSemana: 0,
    totalEfectivoDia: 0,
    totalEfectivoMes: 0,
    totalEfectivoAnio: 0,
    totalEfectivoSemana: 0,
    totalPuntoDia: 0,
    totalPuntoMes: 0,
    totalPuntoAnio: 0,
    totalPuntoSemana: 0,
    totalPagoMovilDia: 0,
    totalPagoMovilMes: 0,
    totalPagoMovilAnio: 0,
    totalPagoMovilSemana: 0,
    totalBarquillaBolitas: 0,
    totalBarquillaSoft: 0,
    totalSundae: 0,
  });

  // Resumen de producción actualizado
  const [resumenProduccion, setResumenProduccion] = useState({
    totalProduccionDia: 0,
    totalProduccionMes: 0,
    totalProduccionAnio: 0,
    totalProduccionSemana: 0,
    totalPrecioMayor: 0,
    totalPrecioDetal: 0,
    totalMaquinaSoftDia: 0,
    totalMaquinaSoftMes: 0,
    totalMaquinaSoftAnio: 0,
    totalMaquinaSoftSemana: 0,
    totalMaquinaMantecadoraDia: 0,
    totalMaquinaMantecadoraMes: 0,
    totalMaquinaMantecadoraAnio: 0,
    totalMaquinaMantecadoraSemana: 0,
    normal: {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    },
    especial: {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    },
    superEspecial: {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    },
    "1lt": {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    },
    "2lt": {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    },
    "4lt": {
      totalProduccionDia: 0,
      totalProduccionMes: 0,
      totalProduccionAnio: 0,
      totalProduccionSemana: 0,
      totalPrecioMayor: 0,
      totalPrecioDetal: 0,
      totalMaquinaSoftDia: 0,
      totalMaquinaSoftMes: 0,
      totalMaquinaSoftAnio: 0,
      totalMaquinaSoftSemana: 0,
      totalMaquinaMantecadoraDia: 0,
      totalMaquinaMantecadoraMes: 0,
      totalMaquinaMantecadoraAnio: 0,
      totalMaquinaMantecadoraSemana: 0
    }
  });

  // Efecto para actualizar inventario
  useEffect(() => {
    const nuevoInventario = produccionDia.reduce((acc, item) => {
      const clave = `${item.sabor} - ${item.tipo}`;
      const producida = parseInt(item.cantidad || 0, 10);
      
      if (!acc[item.tipo]) {
        acc[item.tipo] = {};
      }
      
      if (acc[item.tipo][clave]) {
        acc[item.tipo][clave] += producida;
      } else {
        acc[item.tipo][clave] = producida;
      }
      return acc;
    }, { normal: {}, especial: {}, superEspecial: {}, "1lt": {}, "2lt": {}, "4lt": {} });

    setInventario(nuevoInventario);
  }, [produccionDia]);

  // Efecto para resumen de ventas
  useEffect(() => {
    const calcularResumenVentas = () => {
      const filtradas = aplicarFiltrosVentas();
      
      const resumen = {
        totalVentasDia: 0,
        totalVentasSemana: 0,
        totalVentasMes: 0,
        totalVentasAnio: 0,
        totalEfectivoDia: 0,
        totalEfectivoSemana: 0,
        totalEfectivoMes: 0,
        totalEfectivoAnio: 0,
        totalPuntoDia: 0,
        totalPuntoSemana: 0,
        totalPuntoMes: 0,
        totalPuntoAnio: 0,
        totalPagoMovilDia: 0,
        totalPagoMovilSemana: 0,
        totalPagoMovilMes: 0,
        totalPagoMovilAnio: 0,
        totalBarquillaBolitas: 0,
        totalBarquillaSoft: 0,
        totalSundae: 0,
      };
    
      // Procesar ventas del día (filtradas)
       filtradas.forEach(venta => {
    const precioTotal = parseFloat(venta.precioTotal || 0);
    const tipo = (venta.tipoHelado || 'normal').toLowerCase();
        
        // Productos especiales
        if (venta.productoEspecial) {
          if (venta.productoEspecial === 'barquilla_bolitas') {
            resumen.totalBarquillaBolitas += precioTotal;
          } else if (venta.productoEspecial === 'barquilla_soft') {
            resumen.totalBarquillaSoft += precioTotal;
          } else if (venta.productoEspecial === 'sundae') {
            resumen.totalSundae += precioTotal;
          }
        }
        
        // Totales generales
        resumen.totalVentasDia += precioTotal;
        if (venta.metodoPago === 'Efectivo') {
          resumen.totalEfectivoDia += precioTotal;
        } else if (venta.metodoPago === 'Punto') {
          resumen.totalPuntoDia += precioTotal;
        } else if (venta.metodoPago === 'PagoMovil') {
          resumen.totalPagoMovilDia += precioTotal;
        }
      });
    
      // Procesar ventas semanal, mensual y anual
      ventasDia.forEach(venta => {
        const precioTotal = parseFloat(venta.precioTotal || 0);
        const tipo = (venta.tipoHelado || 'normal').toLowerCase();
        const fechaSplit = venta.fecha.split('/');
        const mes = fechaSplit[1];
        const anio = fechaSplit[2];
        const fecha = new Date(venta.fecha.split('/').reverse().join('-'));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
    
        // Totales generales
        if (mes === filtros.mes) {
          resumen.totalVentasMes += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.totalEfectivoMes += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.totalPuntoMes += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.totalPagoMovilMes += precioTotal;
          }
        }
        
        if (anio === filtros.anio) {
          resumen.totalVentasAnio += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.totalEfectivoAnio += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.totalPuntoAnio += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.totalPagoMovilAnio += precioTotal;
          }
        }
        
        if (fecha >= startOfWeek && fecha <= endOfWeek) {
          resumen.totalVentasSemana += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.totalEfectivoSemana += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.totalPuntoSemana += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.totalPagoMovilSemana += precioTotal;
          }
        }
      });
    
      setResumenVentas(resumen);
    };

    calcularResumenVentas();
  }, [ventasDia, filtros]);

  // Efecto para resumen de producción
  useEffect(() => {
    const calcularResumenProduccion = () => {
      const filtradas = aplicarFiltros();
      
      const resumen = {
        totalProduccionDia: 0,
        totalProduccionSemana: 0,
        totalProduccionMes: 0,
        totalProduccionAnio: 0,
        totalPrecioMayor: 0,
        totalPrecioDetal: 0,
        totalMaquinaSoftDia: 0,
        totalMaquinaSoftSemana: 0,
        totalMaquinaSoftMes: 0,
        totalMaquinaSoftAnio: 0,
        totalMaquinaMantecadoraDia: 0,
        totalMaquinaMantecadoraSemana: 0,
        totalMaquinaMantecadoraMes: 0,
        totalMaquinaMantecadoraAnio: 0,
        normal: { ...resumenProduccion.normal },
        especial: { ...resumenProduccion.especial },
        superEspecial: { ...resumenProduccion.superEspecial },
        "1lt": { ...resumenProduccion["1lt"] },
        "2lt": { ...resumenProduccion["2lt"] },
        "4lt": { ...resumenProduccion["4lt"] }
      };

       // Reiniciar los totales por tipo
    Object.keys(resumen).forEach(key => {
      if (typeof resumen[key] === 'object') {
        Object.keys(resumen[key]).forEach(subKey => {
          if (subKey.startsWith('total')) {
            resumen[key][subKey] = 0;
          }
        });
      }
    });
    
      // Procesar producción del día (filtrada)
      filtradas.forEach(item => {
        const cantidad = parseInt(item.cantidad || 0);
        const tipo = item.tipo.toLowerCase();
        const precio_mayor = parseFloat(item.precio_mayor || 0);
        const precio_detal = parseFloat(item.precio_detal || 0);

        resumen.totalPrecioMayor += precio_mayor;
        resumen.totalPrecioDetal += precio_detal;
        
        // Totales generales
        resumen.totalProduccionDia += cantidad;
        if (item.maquina === 'soft') {
          resumen.totalMaquinaSoftDia += cantidad;
        } else {
          resumen.totalMaquinaMantecadoraDia += cantidad;
        }
        
        // Por tipo
        if (resumen[tipo]) {
          resumen[tipo].totalProduccionDia += cantidad;
          resumen[tipo].totalPrecioMayor += precio_mayor;
          resumen[tipo].totalPrecioDetal += precio_detal;
          
          if (item.maquina === 'soft') {
            resumen[tipo].totalMaquinaSoftDia += cantidad;
          } else {
            resumen[tipo].totalMaquinaMantecadoraDia += cantidad;
          }
        }
      });
    
      // Procesar producción semanal, mensual y anual
      produccionDia.forEach(item => {
        const cantidad = parseInt(item.cantidad || 0);
        const tipo = item.tipo.toLowerCase();
        const fechaSplit = item.fecha.split('/');
        const mes = fechaSplit[1];
        const anio = fechaSplit[2];
        const fecha = new Date(item.fecha.split('/').reverse().join('-'));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
    
        // Totales generales
        if (mes === filtros.mes) {
          resumen.totalProduccionMes += cantidad;
          if (item.maquina === 'soft') {
            resumen.totalMaquinaSoftMes += cantidad;
          } else {
            resumen.totalMaquinaMantecadoraMes += cantidad;
          }
        }
        
        if (anio === filtros.anio) {
          resumen.totalProduccionAnio += cantidad;
          if (item.maquina === 'soft') {
            resumen.totalMaquinaSoftAnio += cantidad;
          } else {
            resumen.totalMaquinaMantecadoraAnio += cantidad;
          }
        }
        
        if (fecha >= startOfWeek && fecha <= endOfWeek) {
          resumen.totalProduccionSemana += cantidad;
          if (item.maquina === 'soft') {
            resumen.totalMaquinaSoftSemana += cantidad;
          } else {
            resumen.totalMaquinaMantecadoraSemana += cantidad;
          }
        }
    
        // Por tipo
        if (resumen[tipo]) {
          if (mes === filtros.mes) {
            resumen[tipo].totalProduccionMes += cantidad;
            if (item.maquina === 'soft') {
              resumen[tipo].totalMaquinaSoftMes += cantidad;
            } else {
              resumen[tipo].totalMaquinaMantecadoraMes += cantidad;
            }
          }
          
          if (anio === filtros.anio) {
            resumen[tipo].totalProduccionAnio += cantidad;
            if (item.maquina === 'soft') {
              resumen[tipo].totalMaquinaSoftAnio += cantidad;
            } else {
              resumen[tipo].totalMaquinaMantecadoraAnio += cantidad;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen[tipo].totalProduccionSemana += cantidad;
            if (item.maquina === 'soft') {
              resumen[tipo].totalMaquinaSoftSemana += cantidad;
            } else {
              resumen[tipo].totalMaquinaMantecadoraSemana += cantidad;
            }
          }
        }
      });
    
      setResumenProduccion(resumen);
    };

    calcularResumenProduccion();
  }, [produccionDia, filtros]);

  // Obtener tasa BCV
  useEffect(() => {
    const fetchTasaBCV = async () => {
      try {
        const response = await fetch('https://api.bcv.org.ve/api/tasas');
        const data = await response.json();
        const tasaUsd = data.usd || 36.5;
        setVentaData(prev => ({ ...prev, tasaBcv: tasaUsd }));
      } catch (error) {
        console.error("Error obteniendo tasa BCV:", error);
        setVentaData(prev => ({ ...prev, tasaBcv: 36.5 }));
      }
    };
  
    fetchTasaBCV();
    const interval = setInterval(fetchTasaBCV, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Calcular total inventario
  const totalInventario = Object.values(inventario).reduce(
    (total, tipo) => total + Object.values(tipo).reduce(
      (subtotal, cantidad) => subtotal + cantidad, 0
    ), 0
  );

  // Manejar submit de producción
const handleSubmitProduccion = (e) => {
  e.preventDefault();

  if (!formData.precio_mayor || !formData.precio_detal) {
    alert('Los campos de precio no pueden estar vacíos');
    return;
  }

  if (isNaN(parseFloat(formData.precio_mayor)) || isNaN(parseFloat(formData.precio_detal))) {
    alert('Los campos de precio deben ser numéricos');
    return;
  }

  const nuevaProduccion = {
    ...formData,
    fecha: new Date().toLocaleDateString(),
    monedaMayor: formData.monedaMayor || "USD",
    monedaDetal: formData.monedaDetal || "Bs"
  };

  console.log('Datos de producción:', nuevaProduccion); // Agrega este log para depurar

  if (editIndex !== null) {
    const actualizada = [...produccionDia];
    actualizada[editIndex] = nuevaProduccion;
    setProduccionDia(actualizada);
    setEditIndex(null);
  } else {
    setProduccionDia([...produccionDia, nuevaProduccion]);
  }

  setFormData({
    sabor: "",
    tipo: "normal",
    precio_mayor: "",
    precio_detal: "",
    monedaMayor: "USD",
    monedaDetal: "Bs",
    cantidad: "",
    maquina: "soft",
  });
};


  // Manejar submit de ventas
  const handleSubmitVenta = (nuevasVentas) => {
    setVentasDia([...ventasDia, ...nuevasVentas]);

    const nuevoInventario = { ...inventario };
    
    nuevasVentas.forEach(venta => {
      // Solo actualizar inventario si no es un producto especial
      if (!venta.productoEspecial) {
        const clave = `${venta.sabores} - ${venta.tipoHelado}`;
        if (nuevoInventario[venta.tipoHelado] && nuevoInventario[venta.tipoHelado][clave]) {
          nuevoInventario[venta.tipoHelado][clave] -= venta.cantidadVendida;
        }
      }
    });

    setInventario(nuevoInventario);

    setVentaData({
      tipoVenta: "mayor",
      cantidadVendida: "",
      precioTotal: "", 
      precioTotalBs: "",
      sabores: "",
      tipoHelado: "normal",
      metodoPago: "Punto",
      productoEspecial: "",
    });
  };

  // Funciones de edición y eliminación
  const handleEdit = (index) => {
    setFormData(produccionDia[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = produccionDia.filter((_, i) => i !== index);
    setProduccionDia(updated);
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const datosConMoneda = produccionDia.map(item => ({
      ...item,
      precio_mayor: `${item.precio_mayor} ${item.monedaMayor}`,
      precio_detal: `${item.precio_detal} ${item.monedaDetal}`
    }));
    const ws = XLSX.utils.json_to_sheet(produccionDia);
    const wb = { Sheets: { Producción: ws }, SheetNames: ["Producción"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "produccion_helados.xlsx");
  };

  // Exportar a PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      const colorPrincipal = '#E91E63';
      const colorSecundario = '#4CAF50';
      const pageWidth = doc.internal.pageSize.getWidth();
      
      doc.addImage('https://i.imgur.com/GkhD8en.jpg', 'JPEG', pageWidth - 30, 10, 20, 20);
      
      doc.setFontSize(18);
      doc.setTextColor(colorPrincipal);
      doc.text("Reporte de Producción de Helados", pageWidth / 2, 20, { align: 'center' });

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Nota: Los precios al por mayor se registran en USD y los precios al detal en Bs", 14, 30);
      doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 35);
      
      autoTable(doc, {
        startY: 45,
        head: [
          [
            { content: "Fecha", styles: { fillColor: colorSecundario } },
            { content: "Sabor", styles: { fillColor: colorSecundario } },
            { content: "Tipo", styles: { fillColor: colorSecundario } },
            { content: "Precio Mayor", styles: { fillColor: colorSecundario } },
            { content: "Precio Detal", styles: { fillColor: colorSecundario } },
            { content: "Cantidad", styles: { fillColor: colorSecundario } },
            { content: "Máquina", styles: { fillColor: colorSecundario } }
          ]
        ],
        body: produccionDia.map((item) => [
          item.fecha,
          item.sabor,
          item.tipo,
          `${item.precio_mayor} ${item.monedaMayor}`,
          `${item.precio_detal} ${item.monedaDetal}`,
          `${item.cantidad}`,
          item.maquina
        ]),
        headStyles: {
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        margin: { left: 14, right: 14 },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak'
        }
      });
      
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setDrawColor(colorPrincipal);
      doc.setLineWidth(0.3);
      doc.line(14, finalY, pageWidth - 14, finalY);
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text("Helados para todos - Sistema de Producción", pageWidth / 2, finalY + 10, { align: 'center' });
      
      doc.save(`reporte_produccion_${new Date().getTime()}.pdf`);
      
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Ocurrió un error al generar el reporte. Por favor intente nuevamente.");
    }
  };

  // Aplicar filtros
  const aplicarFiltros = () => {
    return produccionDia.filter((item) => {
      const fechaSplit = item.fecha.split("/");
      const [dia, mes, anio] = fechaSplit;

      let fechaValida = true;
      if (
        filtros.sabor &&
        !item.sabor.toLowerCase().includes(filtros.sabor.toLowerCase())
      ) {
        fechaValida = false;
      }
      if (filtros.maquina && item.maquina !== filtros.maquina) {
        fechaValida = false;
      }
      if (filtros.tipo && item.tipo !== filtros.tipo) {
        fechaValida = false;
      }
      if (filtros.dia && dia !== filtros.dia) {
        fechaValida = false;
      }
      if (filtros.mes && mes !== filtros.mes) {
        fechaValida = false;
      }
      if (filtros.anio && anio !== filtros.anio) {
        fechaValida = false;
      }

      if (filtros.temporada === "3") {
        const mesNum = parseInt(mes, 10);
        if (!(mesNum >= 1 && mesNum <= 3)) {
          fechaValida = false;
        }
      }
      if (filtros.temporada === "6") {
        const mesNum = parseInt(mes, 10);
        if (!(mesNum >= 1 && mesNum <= 6)) {
          fechaValida = false;
        }
      }

      return fechaValida;
    });
  };

  // Aplicar filtros de ventas
  const aplicarFiltrosVentas = () => {
    return ventasDia.filter((venta) => {
      const fechaSplit = venta.fecha.split("/");
      const [dia, mes, anio] = fechaSplit;

      let fechaValida = true;
      if (
        filtros.sabor &&
        !venta.sabores.toLowerCase().includes(filtros.sabor.toLowerCase())
      ) {
        fechaValida = false;
      }
      if (filtros.medioPago && venta.metodoPago !== filtros.medioPago) {
        fechaValida = false;
      }
      if (filtros.tipo && venta.tipoHelado !== filtros.tipo) {
        fechaValida = false;
      }
      if (filtros.dia && dia !== filtros.dia) {
        fechaValida = false;
      }
      if (filtros.mes && mes !== filtros.mes) {
        fechaValida = false;
      }
      if (filtros.anio && anio !== filtros.anio) {
        fechaValida = false;
      }

      return fechaValida;
    });
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      sabor: "",
      medioPago: "",
      maquina: "",
      tipo: "",
      dia: "",
      mes: "",
      anio: "",
      temporada: "",
    });
  };

  // Renderizado
  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => setActiveSection("produccion")}
          className={`mr-2 px-4 py-2 rounded-lg ${
            activeSection === "produccion" ? "bg-green text-white" : "bg-gray-300 text-black"
          }`}
        >
          Producción del día
        </button>
        <button
          onClick={() => setActiveSection("inventario")}
          className={`mr-2 px-4 py-2 rounded-lg ${
            activeSection === "inventario" ? "bg-green text-white" : "bg-gray-300 text-black"
          }`}
        >
          Inventario actual
        </button>
        <button
          onClick={() => setActiveSection("ventas")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "ventas" ? "bg-green text-white" : "bg-gray-300 text-black"
          }`}
        >
          Ventas
        </button>
      </div>

      {activeSection === "produccion" && (
        <div>
          <ProduccionForm
            formData={formData}
            setFormData={setFormData}
            handleSubmitProduccion={handleSubmitProduccion}
            editIndex={editIndex}
          />
          <div className="mt-4">
            <button
              onClick={exportToExcel}
              className="mr-2 bg-green text-white px-4 py-2 rounded-lg hover:bg-fucshia"
            >
              Exportar a Excel
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Exportar a PDF
            </button>
          </div>
          <ProduccionTable
            produccionDia={produccionDia}
            aplicarFiltros={aplicarFiltros}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <ResumenProduccion resumen={resumenProduccion} />
        </div>
      )}

      {activeSection === "inventario" && (
        <Inventario inventarioActual={inventario} totalInventario={totalInventario} />
      )}

      {activeSection === "ventas" && (
        <div>
          <VentasForm
            ventaData={ventaData}
            setVentaData={setVentaData}
            handleSubmitVenta={handleSubmitVenta}
            produccionDia={produccionDia}
          />
          <VentasTable ventasDia={ventasDia} />
          <ResumenVentas resumen={resumenVentas} />
        </div>
      )}

     <Filtros 
  filtros={filtros} 
  setFiltros={setFiltros} 
  limpiarFiltros={limpiarFiltros}
  tipoTabla={activeSection === 'produccion' ? 'produccion' : 'ventas'}
  datosFiltrados={activeSection === 'produccion' ? aplicarFiltros() : aplicarFiltrosVentas()}
/>
    </div>
  );
};

export default HeladoApp;