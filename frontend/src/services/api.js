const API_URL = 'http://localhost:3001/api';

export const createHelado = async (heladoData) => {
  try {
    const response = await fetch(`${API_URL}/helados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...heladoData,
        cantidad: Number(heladoData.cantidad),
        precioMayor: heladoData.precioMayor ? Number(heladoData.precioMayor) : null,
        precioDetal: heladoData.precioDetal ? Number(heladoData.precioDetal) : null
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al crear helado');
    }
    
    return data;
  } catch (error) {
    console.error('Error en createHelado:', error);
    throw error;
  }
};

export const getHelados = async () => {
  try {
    const response = await fetch(`${API_URL}/helados`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener helados');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getHelados:', error);
    throw error;
  }
};