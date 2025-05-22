const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const { agregarHelado, obtenerHelados } = require('./src/controllers/JS_fieldoController')

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',
}));
app.use(express.json());


// Configuración
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


// Función para obtener tasa de la fuente del BCV
async function obtenerTasaDeFuentes(fuentes) {
  const source = fuentes[0]; // Solo usamos la primera fuente
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


// Actualización con datos reales
const actualizarTasaBCV = async () => {
  try {
    // 1. Obtener tasa actual de la fuente del BCV
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


// Endpoint principal
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


// Endpoint para forzar actualización
app.post('/api/actualizar', async (req, res) => {
  await actualizarTasaBCV();
  res.json({
    mensaje: 'Tasa actualizada manualmente',
    tasa: tasaActual
  });
});

// Helados
app.post('/api/helados', agregarHelado)
app.get('/api/helados', obtenerHelados)
// Iniciar servidor
const startServer = async () => {
  try {
    await actualizarTasaBCV(); // Primera actualización al iniciar


    // Programar actualizaciones periódicas
    setInterval(actualizarTasaBCV, CONFIG.updateInterval);


    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor BCV corriendo en http://localhost:${PORT}`);
      console.log(`- Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`- Última tasa: ${tasaActual.valor !== null ? tasaActual.valor + ' Bs/USD' : 'No disponible'}`);
      console.log(`- Fuente: ${tasaActual.fuente || 'No disponible'}`);
      console.log(`- Estado: ${tasaActual.estado}`);
      console.log(`- Actualización automática cada ${CONFIG.updateInterval / (60 * 1000)} minutos\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};


startServer();





