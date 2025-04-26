import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
      if (acc[item.tipo][clave]) {
        acc[item.tipo][clave] += producida;
      } else {
        acc[item.tipo][clave] = producida;
      }
      return acc;
    }, { normal: {}, especial: {} });

    setInventario(nuevoInventario);
  }, [produccionDia]);

  useEffect(() => {
    // Calcular resumen de ventas
    const calcularResumenVentas = () => {
      const filtradas = aplicarFiltrosVentas();
      const totalVentasDia = filtradas.reduce((total, venta) => total + parseFloat(venta.precioTotal || 0), 0);
      const totalVentasMes = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes) {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);
      const totalVentasAnio = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio) {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalEfectivoDia = filtradas.reduce((total, venta) => venta.metodoPago === "Efectivo" ? total + parseFloat(venta.precioTotal || 0) : total, 0);
      const totalEfectivoMes = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes && venta.metodoPago === "Efectivo") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);
      const totalEfectivoAnio = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio && venta.metodoPago === "Efectivo") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalPuntoDia = filtradas.reduce((total, venta) => venta.metodoPago === "Punto" ? total + parseFloat(venta.precioTotal || 0) : total, 0);
      const totalPuntoMes = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes && venta.metodoPago === "Punto") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);
      const totalPuntoAnio = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio && venta.metodoPago === "Punto") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalPagoMovilDia = filtradas.reduce((total, venta) => venta.metodoPago === "PagoMovil" ? total + parseFloat(venta.precioTotal || 0) : total, 0);
      const totalPagoMovilMes = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes && venta.metodoPago === "PagoMovil") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);
      const totalPagoMovilAnio = ventasDia.reduce((total, venta) => {
        const fechaSplit = venta.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio && venta.metodoPago === "PagoMovil") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalVentasSemana = ventasDia.reduce((total, venta) => {
        const fecha = new Date(venta.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek) {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalEfectivoSemana = ventasDia.reduce((total, venta) => {
        const fecha = new Date(venta.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek && venta.metodoPago === "Efectivo") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalPuntoSemana = ventasDia.reduce((total, venta) => {
        const fecha = new Date(venta.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek && venta.metodoPago === "Punto") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      const totalPagoMovilSemana = ventasDia.reduce((total, venta) => {
        const fecha = new Date(venta.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek && venta.metodoPago === "PagoMovil") {
          return total + parseFloat(venta.precioTotal || 0);
        }
        return total;
      }, 0);

      setResumenVentas({
        totalVentasDia,
        totalVentasMes,
        totalVentasAnio,
        totalVentasSemana,
        totalEfectivoDia,
        totalEfectivoMes,
        totalEfectivoAnio,
        totalEfectivoSemana,
        totalPuntoDia,
        totalPuntoMes,
        totalPuntoAnio,
        totalPuntoSemana,
        totalPagoMovilDia,
        totalPagoMovilMes,
        totalPagoMovilAnio,
        totalPagoMovilSemana,
      });
    };

    calcularResumenVentas();
  }, [ventasDia, filtros]);

  useEffect(() => {
    // Calcular resumen de producción
    const calcularResumenProduccion = () => {
      const filtradas = aplicarFiltros();
      const totalProduccionDia = filtradas.reduce((total, item) => total + parseInt(item.cantidad || 0), 0);
      const totalProduccionMes = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes) {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);
      const totalProduccionAnio = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio) {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      const totalMaquinaSoftDia = filtradas.reduce((total, item) => item.maquina === "soft" ? total + parseInt(item.cantidad || 0) : total, 0);
      const totalMaquinaSoftMes = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes && item.maquina === "soft") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);
      const totalMaquinaSoftAnio = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio && item.maquina === "soft") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      const totalMaquinaMantecadoraDia = filtradas.reduce((total, item) => item.maquina === "mantecadora" ? total + parseInt(item.cantidad || 0) : total, 0);
      const totalMaquinaMantecadoraMes = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const mes = fechaSplit[1];
        if (mes === filtros.mes && item.maquina === "mantecadora") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);
      const totalMaquinaMantecadoraAnio = produccionDia.reduce((total, item) => {
        const fechaSplit = item.fecha.split("/");
        const anio = fechaSplit[2];
        if (anio === filtros.anio && item.maquina === "mantecadora") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      const totalProduccionSemana = produccionDia.reduce((total, item) => {
        const fecha = new Date(item.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek) {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      const totalMaquinaSoftSemana = produccionDia.reduce((total, item) => {
        const fecha = new Date(item.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek && item.maquina === "soft") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      const totalMaquinaMantecadoraSemana = produccionDia.reduce((total, item) => {
        const fecha = new Date(item.fecha.split("/").reverse().join("-"));
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(fecha.getDate() - fecha.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (fecha >= startOfWeek && fecha <= endOfWeek && item.maquina === "mantecadora") {
          return total + parseInt(item.cantidad || 0);
        }
        return total;
      }, 0);

      setResumenProduccion({
        totalProduccionDia,
        totalProduccionMes,
        totalProduccionAnio,
        totalProduccionSemana,
        totalMaquinaSoftDia,
        totalMaquinaSoftMes,
        totalMaquinaSoftAnio,
        totalMaquinaSoftSemana,
        totalMaquinaMantecadoraDia,
        totalMaquinaMantecadoraMes,
        totalMaquinaMantecadoraAnio,
        totalMaquinaMantecadoraSemana,
      });
    };

    calcularResumenProduccion();
  }, [produccionDia, filtros]);

  const totalInventario = Object.values(inventario.normal).reduce(
    (total, cantidad) => total + cantidad,
    0
  ) + Object.values(inventario.especial).reduce(
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
      if (nuevoInventario[venta.tipoHelado][clave]) {
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
    const doc = new jsPDF();
    doc.text("Reporte de Producción de Helados", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Fecha", "Sabor", "Cantidad", "Máquina"]],
      body: produccionDia.map((item) => [
        item.fecha,
        item.sabor,
        item.cantidad,
        item.maquina,
      ]),
    });
    doc.save("produccion_helados.pdf");
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
