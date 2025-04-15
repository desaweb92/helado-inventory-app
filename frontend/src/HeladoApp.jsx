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
          Ventas del día
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
        </div>
      )}

      <Filtros filtros={filtros} setFiltros={setFiltros} limpiarFiltros={limpiarFiltros} />
    </div>
  );
};

export default HeladoApp;
