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
  const [formData, setFormData] = useState({
    sabor: "",
    tipo: "normal",
    precioMayor: "",
    precioDetal: "",
    cantidad: "",
    maquina: "soft",
  });

  const [ventaData, setVentaData] = useState({
    tipoVenta: "mayor",
    cantidadVendida: "",
    precioTotal: "",
    sabores: "",
    tipoHelado: "normal",
    metodoPago: "Punto",
  });

  const [produccionDia, setProduccionDia] = useState([]);
  const [ventasDia, setVentasDia] = useState([]);
  const [inventario, setInventario] = useState({
    normal: {},
    especial: {},
    superEspecial: {},
  });
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
  });

  const [resumenProduccion, setResumenProduccion] = useState({
    totalProduccionDia: 0,
    totalProduccionMes: 0,
    totalProduccionAnio: 0,
    totalProduccionSemana: 0,
    totalMaquinaSoftDia: 0,
    totalMaquinaSoftMes: 0,
    totalMaquinaSoftAnio: 0,
    totalMaquinaSoftSemana: 0,
    totalMaquinaMantecadoraDia: 0,
    totalMaquinaMantecadoraMes: 0,
    totalMaquinaMantecadoraAnio: 0,
    totalMaquinaMantecadoraSemana: 0,
  });

  useEffect(() => {
    // Actualizar el inventario cuando cambie la producción del día
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
    }, { normal: {}, especial: {}, superEspecial: {} });

    setInventario(nuevoInventario);
  }, [produccionDia]);

  useEffect(() => {
    // Calcular resumen de ventas
    const calcularResumenVentas = () => {
      const filtradas = aplicarFiltrosVentas();
      
      // Inicializar el objeto de resumen
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
        normal: {
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
          totalPagoMovilAnio: 0
        },
        especial: {
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
          totalPagoMovilAnio: 0
        },
        superEspecial: {
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
          totalPagoMovilAnio: 0
        }
      };
    
      // Procesar ventas del día (filtradas)
      filtradas.forEach(venta => {
        const precioTotal = parseFloat(venta.precioTotal || 0);
        const tipo = venta.tipoHelado.toLowerCase();
        
        // Totales generales
        resumen.totalVentasDia += precioTotal;
        if (venta.metodoPago === 'Efectivo') {
          resumen.totalEfectivoDia += precioTotal;
        } else if (venta.metodoPago === 'Punto') {
          resumen.totalPuntoDia += precioTotal;
        } else if (venta.metodoPago === 'PagoMovil') {
          resumen.totalPagoMovilDia += precioTotal;
        }
        
        // Por tipo
        if (tipo === 'normal') {
          resumen.normal.totalVentasDia += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.normal.totalEfectivoDia += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.normal.totalPuntoDia += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.normal.totalPagoMovilDia += precioTotal;
          }
        } else if (tipo === 'especial') {
          resumen.especial.totalVentasDia += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.especial.totalEfectivoDia += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.especial.totalPuntoDia += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.especial.totalPagoMovilDia += precioTotal;
          }
        } else if (tipo === 'superespecial') {
          resumen.superEspecial.totalVentasDia += precioTotal;
          if (venta.metodoPago === 'Efectivo') {
            resumen.superEspecial.totalEfectivoDia += precioTotal;
          } else if (venta.metodoPago === 'Punto') {
            resumen.superEspecial.totalPuntoDia += precioTotal;
          } else if (venta.metodoPago === 'PagoMovil') {
            resumen.superEspecial.totalPagoMovilDia += precioTotal;
          }
        }
      });
    
      // Procesar ventas semanal, mensual y anual
      ventasDia.forEach(venta => {
        const precioTotal = parseFloat(venta.precioTotal || 0);
        const tipo = venta.tipoHelado.toLowerCase();
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
    
        // Por tipo
        if (tipo === 'normal') {
          if (mes === filtros.mes) {
            resumen.normal.totalVentasMes += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.normal.totalEfectivoMes += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.normal.totalPuntoMes += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.normal.totalPagoMovilMes += precioTotal;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.normal.totalVentasAnio += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.normal.totalEfectivoAnio += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.normal.totalPuntoAnio += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.normal.totalPagoMovilAnio += precioTotal;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.normal.totalVentasSemana += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.normal.totalEfectivoSemana += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.normal.totalPuntoSemana += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.normal.totalPagoMovilSemana += precioTotal;
            }
          }
        } else if (tipo === 'especial') {
          if (mes === filtros.mes) {
            resumen.especial.totalVentasMes += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.especial.totalEfectivoMes += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.especial.totalPuntoMes += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.especial.totalPagoMovilMes += precioTotal;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.especial.totalVentasAnio += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.especial.totalEfectivoAnio += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.especial.totalPuntoAnio += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.especial.totalPagoMovilAnio += precioTotal;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.especial.totalVentasSemana += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.especial.totalEfectivoSemana += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.especial.totalPuntoSemana += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.especial.totalPagoMovilSemana += precioTotal;
            }
          }
        } else if (tipo === 'superespecial') {
          if (mes === filtros.mes) {
            resumen.superEspecial.totalVentasMes += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.superEspecial.totalEfectivoMes += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.superEspecial.totalPuntoMes += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.superEspecial.totalPagoMovilMes += precioTotal;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.superEspecial.totalVentasAnio += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.superEspecial.totalEfectivoAnio += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.superEspecial.totalPuntoAnio += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.superEspecial.totalPagoMovilAnio += precioTotal;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.superEspecial.totalVentasSemana += precioTotal;
            if (venta.metodoPago === 'Efectivo') {
              resumen.superEspecial.totalEfectivoSemana += precioTotal;
            } else if (venta.metodoPago === 'Punto') {
              resumen.superEspecial.totalPuntoSemana += precioTotal;
            } else if (venta.metodoPago === 'PagoMovil') {
              resumen.superEspecial.totalPagoMovilSemana += precioTotal;
            }
          }
        }
      });
    
      setResumenVentas(resumen);
    };

    calcularResumenVentas();
  }, [ventasDia, filtros]);

  useEffect(() => {
    // Calcular resumen de producción
    const calcularResumenProduccion = () => {
      const filtradas = aplicarFiltros();
      
      // Inicializar el objeto de resumen
      const resumen = {
        totalProduccionDia: 0,
        totalProduccionSemana: 0,
        totalProduccionMes: 0,
        totalProduccionAnio: 0,
        totalMaquinaSoftDia: 0,
        totalMaquinaSoftSemana: 0,
        totalMaquinaSoftMes: 0,
        totalMaquinaSoftAnio: 0,
        totalMaquinaMantecadoraDia: 0,
        totalMaquinaMantecadoraSemana: 0,
        totalMaquinaMantecadoraMes: 0,
        totalMaquinaMantecadoraAnio: 0,
        normal: {
          totalProduccionDia: 0,
          totalProduccionSemana: 0,
          totalProduccionMes: 0,
          totalProduccionAnio: 0,
          totalMaquinaSoftDia: 0,
          totalMaquinaSoftSemana: 0,
          totalMaquinaSoftMes: 0,
          totalMaquinaSoftAnio: 0,
          totalMaquinaMantecadoraDia: 0,
          totalMaquinaMantecadoraSemana: 0,
          totalMaquinaMantecadoraMes: 0,
          totalMaquinaMantecadoraAnio: 0
        },
        especial: {
          totalProduccionDia: 0,
          totalProduccionSemana: 0,
          totalProduccionMes: 0,
          totalProduccionAnio: 0,
          totalMaquinaSoftDia: 0,
          totalMaquinaSoftSemana: 0,
          totalMaquinaSoftMes: 0,
          totalMaquinaSoftAnio: 0,
          totalMaquinaMantecadoraDia: 0,
          totalMaquinaMantecadoraSemana: 0,
          totalMaquinaMantecadoraMes: 0,
          totalMaquinaMantecadoraAnio: 0
        },
        superEspecial: {
          totalProduccionDia: 0,
          totalProduccionSemana: 0,
          totalProduccionMes: 0,
          totalProduccionAnio: 0,
          totalMaquinaSoftDia: 0,
          totalMaquinaSoftSemana: 0,
          totalMaquinaSoftMes: 0,
          totalMaquinaSoftAnio: 0,
          totalMaquinaMantecadoraDia: 0,
          totalMaquinaMantecadoraSemana: 0,
          totalMaquinaMantecadoraMes: 0,
          totalMaquinaMantecadoraAnio: 0
        }
      };
    
      // Procesar producción del día (filtrada)
      filtradas.forEach(item => {
        const cantidad = parseInt(item.cantidad || 0);
        const tipo = item.tipo.toLowerCase();
        
        // Totales generales
        resumen.totalProduccionDia += cantidad;
        if (item.maquina === 'soft') {
          resumen.totalMaquinaSoftDia += cantidad;
        } else {
          resumen.totalMaquinaMantecadoraDia += cantidad;
        }
        
        // Por tipo
        if (tipo === 'normal') {
          resumen.normal.totalProduccionDia += cantidad;
          if (item.maquina === 'soft') {
            resumen.normal.totalMaquinaSoftDia += cantidad;
          } else {
            resumen.normal.totalMaquinaMantecadoraDia += cantidad;
          }
        } else if (tipo === 'especial') {
          resumen.especial.totalProduccionDia += cantidad;
          if (item.maquina === 'soft') {
            resumen.especial.totalMaquinaSoftDia += cantidad;
          } else {
            resumen.especial.totalMaquinaMantecadoraDia += cantidad;
          }
        } else if (tipo === 'superespecial') {
          resumen.superEspecial.totalProduccionDia += cantidad;
          if (item.maquina === 'soft') {
            resumen.superEspecial.totalMaquinaSoftDia += cantidad;
          } else {
            resumen.superEspecial.totalMaquinaMantecadoraDia += cantidad;
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
        if (tipo === 'normal') {
          if (mes === filtros.mes) {
            resumen.normal.totalProduccionMes += cantidad;
            if (item.maquina === 'soft') {
              resumen.normal.totalMaquinaSoftMes += cantidad;
            } else {
              resumen.normal.totalMaquinaMantecadoraMes += cantidad;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.normal.totalProduccionAnio += cantidad;
            if (item.maquina === 'soft') {
              resumen.normal.totalMaquinaSoftAnio += cantidad;
            } else {
              resumen.normal.totalMaquinaMantecadoraAnio += cantidad;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.normal.totalProduccionSemana += cantidad;
            if (item.maquina === 'soft') {
              resumen.normal.totalMaquinaSoftSemana += cantidad;
            } else {
              resumen.normal.totalMaquinaMantecadoraSemana += cantidad;
            }
          }
        } else if (tipo === 'especial') {
          if (mes === filtros.mes) {
            resumen.especial.totalProduccionMes += cantidad;
            if (item.maquina === 'soft') {
              resumen.especial.totalMaquinaSoftMes += cantidad;
            } else {
              resumen.especial.totalMaquinaMantecadoraMes += cantidad;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.especial.totalProduccionAnio += cantidad;
            if (item.maquina === 'soft') {
              resumen.especial.totalMaquinaSoftAnio += cantidad;
            } else {
              resumen.especial.totalMaquinaMantecadoraAnio += cantidad;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.especial.totalProduccionSemana += cantidad;
            if (item.maquina === 'soft') {
              resumen.especial.totalMaquinaSoftSemana += cantidad;
            } else {
              resumen.especial.totalMaquinaMantecadoraSemana += cantidad;
            }
          }
        } else if (tipo === 'superespecial') {
          if (mes === filtros.mes) {
            resumen.superEspecial.totalProduccionMes += cantidad;
            if (item.maquina === 'soft') {
              resumen.superEspecial.totalMaquinaSoftMes += cantidad;
            } else {
              resumen.superEspecial.totalMaquinaMantecadoraMes += cantidad;
            }
          }
          
          if (anio === filtros.anio) {
            resumen.superEspecial.totalProduccionAnio += cantidad;
            if (item.maquina === 'soft') {
              resumen.superEspecial.totalMaquinaSoftAnio += cantidad;
            } else {
              resumen.superEspecial.totalMaquinaMantecadoraAnio += cantidad;
            }
          }
          
          if (fecha >= startOfWeek && fecha <= endOfWeek) {
            resumen.superEspecial.totalProduccionSemana += cantidad;
            if (item.maquina === 'soft') {
              resumen.superEspecial.totalMaquinaSoftSemana += cantidad;
            } else {
              resumen.superEspecial.totalMaquinaMantecadoraSemana += cantidad;
            }
          }
        }
      });
    
      setResumenProduccion(resumen);
    };

    calcularResumenProduccion();
  }, [produccionDia, filtros]);

  const totalInventario = Object.values(inventario.normal).reduce(
    (total, cantidad) => total + cantidad,
    0
  ) + Object.values(inventario.especial).reduce(
    (total, cantidad) => total + cantidad,
    0
  ) + Object.values(inventario.superEspecial).reduce(
    (total, cantidad) => total + cantidad,
    0
  );

  const handleSubmitProduccion = (e) => {
    e.preventDefault();

    const nuevaProduccion = {
      ...formData,
      fecha: new Date().toLocaleDateString(),
    };

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
      precioMayor: "",
      precioDetal: "",
      cantidad: "",
      maquina: "soft",
    });
  };

  const handleSubmitVenta = (nuevasVentas) => {
    setVentasDia([...ventasDia, ...nuevasVentas]);

    const nuevoInventario = { ...inventario };
    nuevasVentas.forEach(venta => {
      const clave = `${venta.sabores} - ${venta.tipoHelado}`;
      if (nuevoInventario[venta.tipoHelado] && nuevoInventario[venta.tipoHelado][clave]) {
        nuevoInventario[venta.tipoHelado][clave] -= venta.cantidadVendida;
      }
    });

    setInventario(nuevoInventario);

    setVentaData({
      tipoVenta: "mayor",
      cantidadVendida: "",
      precioTotal: "",
      sabores: "",
      tipoHelado: "normal",
      metodoPago: "Punto",
    });
  };

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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(produccionDia);
    const wb = { Sheets: { Producción: ws }, SheetNames: ["Producción"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "produccion_helados.xlsx");
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Configuración de estilos
      const colorPrincipal = '#E91E63'; // Fucsia
      const colorSecundario = '#4CAF50'; // Verde
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Logo (reemplaza con tu imagen)
      const logoUrl = 'https://i.imgur.com/GkhD8en.jpg';
      doc.addImage(logoUrl, 'JPEG', pageWidth - 30, 10, 20, 20);
      
      // Encabezado
      doc.setFontSize(18);
      doc.setTextColor(colorPrincipal);
      doc.text("Reporte de Producción de Helados", pageWidth / 2, 20, { align: 'center' });
      
      // Fecha del reporte
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generado: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Tabla con estilos
      autoTable(doc, {
        startY: 40,
        head: [
          [
            { content: "Fecha", styles: { fillColor: colorSecundario } },
            { content: "Sabor", styles: { fillColor: colorSecundario } },
            { content: "Tipo", styles: { fillColor: colorSecundario } },
            { content: "Cantidad", styles: { fillColor: colorSecundario } },
            { content: "Máquina", styles: { fillColor: colorSecundario } }
          ]
        ],
        body: produccionDia.map((item) => [
          item.fecha,
          item.sabor,
          item.tipo,
          `${item.cantidad}`,
          item.maquina
        ]),
        headStyles: {
          textColor: 255, // Texto blanco
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
      
      // Pie de página
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setDrawColor(colorPrincipal);
      doc.setLineWidth(0.3);
      doc.line(14, finalY, pageWidth - 14, finalY);
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text("Helados para todos - Sistema de Producción", pageWidth / 2, finalY + 10, { align: 'center' });
      
      // Guardar PDF
      doc.save(`reporte_produccion_${new Date().getTime()}.pdf`);
      
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Ocurrió un error al generar el reporte. Por favor intente nuevamente.");
    }
  };
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

      <Filtros filtros={filtros} setFiltros={setFiltros} limpiarFiltros={limpiarFiltros} />
    </div>
  );
};

export default HeladoApp;