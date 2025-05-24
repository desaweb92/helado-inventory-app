require('dotenv').config({ path: '../backend/env/.env' }); // Carga específica del .env

// Verificación explícita de variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('❌ Error: Variables de Supabase no configuradas');
  console.log('Ubicación actual del .env:', require('path').resolve(__dirname, 'env/.env'));
  console.log('Contenido requerido en .env:');
  console.log('SUPABASE_URL=https://tu_proyecto.supabase.co');
  console.log('SUPABASE_KEY=tu_clave_anon_publica');
  process.exit(1);
}

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { agregarHelado, obtenerHelados } = require('./src/controllers/JS_fieldoController');

// Configuración CORS (original)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configuración BCV (original sin cambios)
const CONFIG = {
  updateInterval: 60 * 60 * 1000,
  apiSources: [
    {
      name: 'BCV Oficial',
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parser: (data) => data?.promedio || null
    }
  ]
};

let tasaActual = {
  valor: null,
  fecha: null,
  ultimaActualizacion: null,
  fuente: null,
  estado: 'inicializando'
};

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

// Endpoints (originales)
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

// Inicio del servidor (original)
const startServer = async () => {
  try {
    await actualizarTasaBCV();
    setInterval(actualizarTasaBCV, CONFIG.updateInterval);

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`- Tasa BCV actual: ${tasaActual.valor || 'No disponible'} Bs/USD\n`);
    });
  } catch (error) {
    console.error('❌ Error crítico al iniciar:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Error no capturado:', err);
});

startServer();