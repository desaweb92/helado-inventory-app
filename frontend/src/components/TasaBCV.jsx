import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const TasaBCV = () => {
  const [tasa, setTasa] = useState({
    valor: 36.50,
    fecha: new Date().toISOString().split('T')[0],
    ultimaActualizacion: new Date().toISOString(),
    fuente: 'valor inicial'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualValue, setManualValue] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);

  // Configuración
  const CONFIG = {
    apiUrl: process.env.REACT_APP_BCV_API_URL || 'http://localhost:3001/api',
    updateInterval: 60 * 60 * 1000, // 1 hora
    defaultRate: 36.50
  };

  // Función principal para obtener la tasa
  const fetchTasaBCV = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${CONFIG.apiUrl}/tasa`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      setTasa({
        ...data,
        ultimaActualizacion: new Date().toISOString()
      });

    } catch (err) {
      console.error("Error al obtener tasa BCV:", err);
      setError(err.message);

      // Mantener el último valor válido
      setTasa(prev => ({
        ...prev,
        estado: 'error: usando valor anterior'
      }));

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualización automática periódica
  useEffect(() => {
    let intervalId;

    const startAutoUpdate = async () => {
      await fetchTasaBCV(); // Primera carga

      if (autoUpdate) {
        intervalId = setInterval(fetchTasaBCV, CONFIG.updateInterval);
      }
    };

    startAutoUpdate();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoUpdate]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${CONFIG.apiUrl}/actualizar`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Error en la actualización');
      }

      const data = await response.json();
      setTasa(data.tasa);

    } catch (err) {
      console.error("Error al actualizar tasa:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetManual = async () => {
    if (!manualValue || isNaN(manualValue)) {
      setError("Por favor ingrese un valor numérico válido");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${CONFIG.apiUrl}/set-tasa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor: parseFloat(manualValue),
          fuente: 'manual'
        })
      });

      if (!response.ok) {
        throw new Error('Error al guardar la tasa manual');
      }

      const data = await response.json();
      setTasa(data.tasa);
      setManualValue('');
      setError(null);

    } catch (err) {
      console.error("Error al establecer tasa:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoUpdate = () => {
    setAutoUpdate(!autoUpdate);
    if (!autoUpdate) {
      fetchTasaBCV(); // Actualizar inmediatamente al reactivar
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasa BCV</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Actualización automática</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={toggleAutoUpdate}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta de valor actual */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Valor actual</h3>
            <p className="text-2xl font-bold text-blue-600">1 USD = {tasa.valor.toFixed(2)} Bs</p>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p>Actualizado: {new Date(tasa.ultimaActualizacion).toLocaleString()}</p>
              <p>Fuente: {tasa.fuente || 'No especificada'}</p>
              {tasa.estado && <p>Estado: {tasa.estado}</p>}
            </div>
          </div>

          {/* Actualización automática */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`flex items-center justify-center gap-2 ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded transition-colors`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Actualizando...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualizar ahora
                </>
              )}
            </button>
            <p className="text-xs text-gray-500">Obtiene el valor más reciente del BCV</p>
          </div>

          {/* Establecer manualmente */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={manualValue}
                onChange={(e) => {
                  setManualValue(e.target.value);
                  setError(null);
                }}
                placeholder="Ej: 36.50"
                className="border border-gray-300 p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
              <button
                onClick={handleSetManual}
                disabled={loading || !manualValue}
                className={`${(!manualValue || loading) ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded transition-colors`}
              >
                Establecer
              </button>
            </div>
            <p className="text-xs text-gray-500">Para ingresar un valor manualmente</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasaBCV;
