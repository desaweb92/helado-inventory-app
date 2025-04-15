import React, { useEffect, useState } from "react";

const VentasForm = ({ ventaData, setVentaData, handleSubmitVenta, produccionDia }) => {
  const [saboresDisponibles, setSaboresDisponibles] = useState([]);
  const [saboresSeleccionados, setSaboresSeleccionados] = useState([]);

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

      setSaboresSeleccionados(newSabores);
      setVentaData({
        ...ventaData,
        precioTotal: precioTotal.toString(),
        cantidadVendida: cantidadTotal.toString(),
        sabores: newSabores.map((sabor) => sabor.sabor).join(", "),
      });
    };

    calcularPrecios();
  }, [saboresSeleccionados, ventaData, produccionDia]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevasVentas = saboresSeleccionados.map((sabor) => ({
      fecha: new Date().toLocaleDateString(),
      tipoVenta: ventaData.tipoVenta,
      cantidadVendida: sabor.cantidad,
      precioTotal: sabor.precioTotalSabor,
      sabores: sabor.sabor,
      tipoHelado: sabor.tipoHelado,
      metodoPago: ventaData.metodoPago,
    }));
    handleSubmitVenta(nuevasVentas);
    setSaboresSeleccionados([]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Registro de Ventas</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Tipo de Venta:</label>
          <select
            name="tipoVenta"
            value={ventaData.tipoVenta}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
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
          >
            <option value="Punto">Punto</option>
            <option value="Pago movil">Pago movil</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>
        {saboresSeleccionados.map((sabor, index) => (
          <div key={index} className="md:col-span-2 flex items-center mb-2">
            <select
              value={sabor.sabor}
              onChange={(e) => handleSaborChange(e, index)}
              className="w-full px-3 py-2 border rounded-lg mr-2"
            >
              <option value="">Seleccionar sabor</option>
              {saboresDisponibles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={sabor.tipoHelado}
              onChange={(e) => handleTipoHeladoChange(e, index)}
              className="w-full px-3 py-2 border rounded-lg mr-2"
            >
              <option value="normal">Normal</option>
              <option value="especial">Especial</option>
            </select>
            <input
              type="number"
              value={sabor.cantidad}
              onChange={(e) => handleCantidadChange(e, index)}
              className="w-full px-3 py-2 border rounded-lg mr-2"
            />
            <input
              type="number"
              value={sabor.precioTotalSabor}
              className="w-full px-3 py-2 border rounded-lg mr-2"
              readOnly
            />
            <button
              type="button"
              onClick={() => removeSabor(index)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        ))}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={addSabor}
            className="md:w-[20%] w-full bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Agregar Sabor
          </button>
          <button
            type="submit"
            className="md:w-[20%] w-full bg-green text-white px-4 py-2 rounded-lg hover:bg-fucshia"
          >
            Registrar Venta
          </button>
        </div>
      </form>
    </div>
  );
};

export default VentasForm;
