import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Filtros = ({ 
  filtros, 
  setFiltros, 
  limpiarFiltros,
  tipoTabla
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros en móvil
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleDateSelect = (ranges) => {
    setDateRange(ranges.selection);
    setFiltros({
      ...filtros,
      fechaInicio: ranges.selection.startDate,
      fechaFin: ranges.selection.endDate
    });
  };

  const aplicarRangoFechas = () => {
    setShowDatePicker(false);
  };

  // Filtros básicos que siempre se muestran
  const basicFilters = (
    <>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sabor</label>
        <input
          type="text"
          name="sabor"
          placeholder="Buscar sabor..."
          value={filtros.sabor}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="col-span-2 relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rango de fechas</label>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left bg-white flex items-center justify-between"
        >
          <span>
            {filtros.fechaInicio && filtros.fechaFin 
              ? `${filtros.fechaInicio.toLocaleDateString()} - ${filtros.fechaFin.toLocaleDateString()}`
              : "Seleccionar fechas"}
          </span>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        {showDatePicker && (
          <div className="absolute z-20 mt-1 bg-white p-2 border rounded-lg shadow-lg w-full max-w-xs">
            <DateRangePicker
              ranges={[dateRange]}
              onChange={handleDateSelect}
              months={1}
              direction="vertical"
              scroll={{ enabled: true }}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button 
                onClick={() => setShowDatePicker(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button 
                onClick={aplicarRangoFechas}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Filtros avanzados que se pueden ocultar en móvil
  const advancedFilters = (
    <>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
        <select
          name="periodo"
          value={filtros.periodo}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos los periodos</option>
          <option value="dia">Hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
          <option value="trimestre">Este trimestre</option>
          <option value="semestre">Este semestre</option>
          <option value="anio">Este año</option>
        </select>
      </div>

      {/* Filtros específicos para producción */}
      {tipoTabla === 'produccion' && (
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Máquina</label>
          <select
            name="maquina"
            value={filtros.maquina}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las máquinas</option>
            <option value="soft">Soft</option>
            <option value="mantecadora">Mantecadora</option>
          </select>
        </div>
      )}

      {/* Filtros específicos para ventas */}
      {tipoTabla === 'ventas' && (
        <>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
            <select
              name="medioPago"
              value={filtros.medioPago}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los métodos</option>
              <option value="Punto">Punto</option>
              <option value="PagoMovil">Pago Móvil</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de venta</label>
            <select
              name="tipoVenta"
              value={filtros.tipoVenta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="mayor">Al por mayor</option>
              <option value="detal">Al detal</option>
            </select>
          </div>
        </>
      )}

      {/* Filtros de tipo de helado */}
      {(tipoTabla === 'produccion' || tipoTabla === 'ventas') && (
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de helado</label>
          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="normal">Normal</option>
            <option value="especial">Especial</option>
            <option value="superEspecial">Super Especial</option>
          </select>
        </div>
      )}

      {/* Filtros por temporada */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Temporada</label>
        <select
          name="temporada"
          value={filtros.temporada}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las temporadas</option>
          <option value="alta">Temporada alta</option>
          <option value="baja">Temporada baja</option>
          <option value="navidad">Navidad</option>
          <option value="verano">Verano</option>
        </select>
      </div>

      {/* Filtros por día/mes/año */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha específica</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <select
              name="dia"
              value={filtros.dia}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            >
              <option value="">Día</option>
              {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="mes"
              value={filtros.mes}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            >
              <option value="">Mes</option>
              <option value="1">Ene</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Abr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Ago</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dic</option>
            </select>
          </div>
          <div>
            <select
              name="anio"
              value={filtros.anio}
              onChange={handleChange}
              className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            >
              <option value="">Año</option>
              {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Filtros Avanzados</h2>
        <div className="flex space-x-2">
          <button
            onClick={limpiarFiltros}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar
          </button>
          {/* Botón para mostrar/ocultar filtros en móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {showFilters ? 'Menos' : 'Más'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {basicFilters}
        
        {/* En móvil, los filtros avanzados se muestran/ocultan */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block col-span-2`}>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {advancedFilters}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtros;