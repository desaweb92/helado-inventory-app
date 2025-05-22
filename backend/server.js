const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { agregarHelado, obtenerHelados } = require('./src/controllers/JS_fieldoController');

// Configuración mejorada de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configuración BCV
const CONFIG = {
  updateInterval: 60 * 60 * 1000, // 1 hora
  apiSources: [
    {
      name: 'BCV Oficial',
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parser: (data) => data?.promedio || null
    }
  ]
};

// Datos de tasas
let tasaActual = {
  valor: null,
  fecha: null,
  ultimaActualizacion: null,
  fuente: null,
  estado: 'inicializando'
};

// Función para obtener tasa BCV
async function obtenerTasaDeFuentes(fuentes) {
  const source = fuentes[0];
  try {
    console.log(`Consultando fuente: ${source.name}`);
    const response = await axios.get(source.url, { timeout: 5000 });
    const tasa = source.parser(response.data);

    if (tasa && !isNaN(tasa)) {
      console.log(`Tasa obtenida de ${source.name}: ${tasa}`);
      return {
        valor: parseFloat(tasa),
        fuente: source.name
      };
    }
  } catch (error) {
    console.warn(`Error con ${source.name}:`, error.message);
  }
  return null;
}

// Actualización de tasa BCV
const actualizarTasaBCV = async () => {
  try {
    const tasaResultado = await obtenerTasaDeFuentes(CONFIG.apiSources);
    if (tasaResultado) {
      tasaActual = {
        valor: tasaResultado.valor,
        fecha: new Date().toISOString().split('T')[0],
        ultimaActualizacion: new Date().toISOString(),
        fuente: tasaResultado.fuente,
        estado: 'actualizado'
      };
    } else {
      throw new Error('La fuente falló');
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    tasaActual.estado = 'error: ' + error.message;
  }
};

// Endpoints de Tasas BCV
app.get('/api/tasa', (req, res) => {
  if (tasaActual.valor === null) {
    res.status(503).json({
      error: 'Tasa no disponible',
      estado: tasaActual.estado
    });
  } else {
    res.json(tasaActual);
  }
});

app.post('/api/actualizar', async (req, res) => {
  await actualizarTasaBCV();
  res.json({
    mensaje: 'Tasa actualizada manualmente',
    tasa: tasaActual
  });
});

app.post('/api/helados', async (req, res) => {
  try {
    const resultado = await agregarHelado(req, res);
    return resultado;
  } catch (error) {
    console.error('Error en endpoint /api/helados:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/helados', async (req, res) => {
  try {
    const resultado = await obtenerHelados(req, res);
    return resultado;
  } catch (error) {
    console.error('Error obteniendo helados:', error);
    return res.status(500).json({ error: 'Error al obtener helados' });
  }
});

// Iniciar servidor con manejo mejorado de errores
const startServer = async () => {
  try {
    await actualizarTasaBCV();
    setInterval(actualizarTasaBCV, CONFIG.updateInterval);

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`- Endpoints disponibles:`);
      console.log(`  • GET /api/tasa`);
      console.log(`  • POST /api/actualizar`);
      console.log(`  • POST /api/helados`);
      console.log(`  • GET /api/helados`);
      console.log(`- Tasa BCV actual: ${tasaActual.valor || 'No disponible'} Bs/USD\n`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no capturado:', err);
});

startServer();