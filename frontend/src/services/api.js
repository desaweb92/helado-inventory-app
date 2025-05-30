export const API_URL = 'http://localhost:3001/api';

export const createHelado = async (heladoData) => {
  try {
    // Validación básica
    if (!heladoData.sabor || !heladoData.tipo || !heladoData.cantidad || !heladoData.precio_mayor || !heladoData.precio_detal ) {
      throw new Error('Faltan campos obligatorios');
    }

    // Convertir valores numéricos
    const precio_mayor = parseInt(heladoData.precio_mayor);
    const precio_detal = parseInt(heladoData.precio_detal);
    const cantidad = parseInt(heladoData.cantidad);

    // Validación adicional
   if (isNaN(precio_mayor) || isNaN(precio_detal)) {
      throw new Error('Los precios deben ser números válidos');
    }


    const response = await fetch(`${API_URL}/produccion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sabor: heladoData.sabor,
        tipo: heladoData.tipo === 'superEspecial' ? 'super_especial' : heladoData.tipo,
        precio_mayor: precio_mayor,
        precio_detal: precio_detal,
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

