export const API_URL = 'http://localhost:3001/api';

export const createHelado = async (heladoData) => {
  try {
    // Validación básica
    if (!heladoData.sabor || !heladoData.tipo || !heladoData.cantidad) {
      throw new Error('Faltan campos obligatorios');
    }

    // Convertir valores numéricos
    const precioMayor = heladoData.precioMayor ? 
      parseFloat(heladoData.precioMayor) : null;
    const precioDetal = heladoData.precioDetal ? 
      parseFloat(heladoData.precioDetal) : null;
    const cantidad = parseInt(heladoData.cantidad);

    // Validación adicional
    if (precioMayor !== null && isNaN(precioMayor)) {
      throw new Error('Precio al por mayor debe ser un número válido');
    }

    const response = await fetch(`${API_URL}/produccion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sabor: heladoData.sabor,
        tipo: heladoData.tipo === 'superEspecial' ? 'super_especial' : heladoData.tipo,
        precio_mayor: precioMayor,
        precio_detal: precioDetal,
        moneda_mayor: heladoData.monedaMayor,
        moneda_detal: heladoData.monedaDetal,
        cantidad: cantidad,
        maquina: heladoData.maquina
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al guardar la producción');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en createHelado:', error);
    throw error;
  }
};

export const getHelados = async () => {
  try {
    const response = await fetch(`${API_URL}/produccion`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener producción');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getHelados:', error);
    throw error;
  }
};