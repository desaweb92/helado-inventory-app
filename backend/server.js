const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
}));
app.use(express.json());

// Configuración
const CONFIG = {
  updateInterval: 60 * 60 * 1000, // 1 hora
  defaultRate: 36.50, // Solo como último recurso
  apiSources: [
    // Fuente primaria
    {
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parser: (data) => data?.promedio || data?.compra || data?.venta || null
    },
    // Fuente alternativa
    {
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parser: (data) => data?.promedio || data?.compra || data?.venta || null
    }
  ]
};

let tasaBCV = {
  fecha: new Date().toISOString().split('T')[0],
  valor: CONFIG.defaultRate,
  ultimaActualizacion: new Date().toISOString(),
  fuente: 'default',
  estado: 'inicializando'
};

// Función de actualización mejorada
const actualizarTasaBCV = async () => {
  let lastError = null;
  
  for (const source of CONFIG.apiSources) {
    try {
      const response = await axios.get(source.url, {
        headers: { 'Authorization': `Bearer ${CONFIG.apiKey}` },
        timeout: 5000 // 5 segundos de timeout
      });

      const rateValue = source.parser(response.data);

      if (rateValue && !isNaN(rateValue)) {
        tasaBCV = {
          valor: parseFloat(rateValue),
          fecha: new Date().toISOString().split('T')[0],
          ultimaActualizacion: new Date().toISOString(),
          fuente: new URL(source.url).hostname,
          estado: 'actualizado'
        };
        console.log(`✅ Tasa actualizada desde ${source.url}: ${rateValue}`);
        return;
      }
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Error con ${source.url}:`, error.message);
      // Continuar con la siguiente fuente
    }
  }

  // Si llegamos aquí, todas las fuentes fallaron
  if (tasaBCV.estado !== 'inicializando') {
    console.log('Todas las fuentes fallaron. Manteniendo valor anterior.');
    tasaBCV.estado = 'error: manteniendo valor anterior';
  } else {
    console.log('Todas las fuentes fallaron. Usando valor por defecto.');
    tasaBCV = {
      valor: CONFIG.defaultRate,
      fecha: new Date().toISOString().split('T')[0],
      ultimaActualizacion: new Date().toISOString(),
      fuente: 'valor por defecto',
      estado: 'error: usando valor por defecto'
    };
  }
  
  if (lastError) {
    console.error('Último error:', lastError.message);
  }
};

// Eliminé el endpoint /api/set-tasa ya que no deberías permitir actualización manual
// si quieres que solo tome los valores de la API

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de tasa BCV! Usa /api/tasa para obtener la tasa actual.');
});

// Endpoints
app.get('/api/tasa', (req, res) => {
  res.json(tasaBCV);
});

app.post('/api/actualizar', async (req, res) => {
  await actualizarTasaBCV();
  res.json(tasaBCV);
});



// Iniciar servidor
const startServer = async () => {
  try {
    await actualizarTasaBCV(); // Primera actualización

    setInterval(actualizarTasaBCV, CONFIG.updateInterval); // Actualización periódica

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor BCV corriendo en http://localhost:${PORT}`);
      console.log(`- Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`- Última tasa: ${tasaBCV.valor} Bs/USD`);
      console.log(`- Fuente: ${tasaBCV.fuente}`);
      console.log(`- Estado: ${tasaBCV.estado}`);
      console.log(`- Actualización automática cada ${CONFIG.updateInterval / (60 * 1000)} minutos\n`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();