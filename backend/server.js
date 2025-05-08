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
  defaultRate: 36.50,
  apiSources: [
    {
      name: 'DolarAPI Oficial',
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parser: (data) => data?.promedio || data?.compra || data?.venta || null
    },
    {
      name: 'BCV No Oficial',
      url: 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv',
      parser: (data) => data?.price || null
    }
  ],
  // Fuentes alternativas para días sábado
  fuentesSabado: [
    {
      name: 'EnParaleloVzla',
      url: 'https://enparalelovzla.com/api',
      parser: (data) => data?.rates?.BCV || null
    },
    {
      name: 'Monitor Dolar',
      url: 'https://monitordolarvzla.com/api',
      parser: (data) => data?.bcv || null
    }
  ]
};

// Datos de tasas
let tasaActual = {
  valor: CONFIG.defaultRate,
  fecha: new Date().toISOString().split('T')[0],
  ultimaActualizacion: new Date().toISOString(),
  fuente: 'default',
  estado: 'inicializando'
};

// Tasa del próximo lunes (para usar los sábados)
let tasaProximoLunes = null;

// Utilidades de fecha
function getDiaSemana() {
  return new Date().getDay();
}

function esSabado() {
  return getDiaSemana() === 6;
}

function esViernes() {
  return getDiaSemana() === 5;
}

function getFechaProximoLunes() {
  const hoy = new Date();
  const diasHastaLunes = hoy.getDay() === 0 ? 1 : 8 - hoy.getDay();
  const proximoLunes = new Date(hoy);
  proximoLunes.setDate(hoy.getDate() + diasHastaLunes);
  return proximoLunes.toISOString().split('T')[0];
}

// Función para obtener tasa de múltiples fuentes
async function obtenerTasaDeFuentes(fuentes) {
  for (const source of fuentes) {
    try {
      const response = await axios.get(source.url, { timeout: 5000 });
      const tasa = source.parser(response.data);
      
      if (tasa && !isNaN(tasa)) {
        return {
          valor: parseFloat(tasa),
          fuente: source.name
        };
      }
    } catch (error) {
      console.warn(`Error con ${source.name}:`, error.message);
    }
  }
  return null;
}

// Actualización con datos reales
const actualizarTasaBCV = async () => {
  try {
    // 1. Obtener tasa actual de fuentes principales
    const tasaResultado = await obtenerTasaDeFuentes(CONFIG.apiSources);
    
    if (tasaResultado) {
      tasaActual = {
        valor: tasaResultado.valor,
        fecha: new Date().toISOString().split('T')[0],
        ultimaActualizacion: new Date().toISOString(),
        fuente: tasaResultado.fuente,
        estado: 'actualizado'
      };

      // 2. Si es viernes o sábado, intentar obtener tasa para el próximo lunes
      if (esViernes() || esSabado()) {
        const tasaFutura = await obtenerTasaDeFuentes(CONFIG.fuentesSabado);
        
        if (tasaFutura) {
          tasaProximoLunes = {
            valor: tasaFutura.valor,
            fecha: getFechaProximoLunes(),
            fuente: tasaFutura.fuente,
            obtenidoEl: new Date().toISOString()
          };
          console.log(`📌 Tasa para próximo lunes obtenida: ${tasaFutura.valor} de ${tasaFutura.fuente}`);
        }
      }
    } else {
      throw new Error('Todas las fuentes fallaron');
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    tasaActual.estado = 'error: ' + error.message;
  }
};

// Endpoint principal
app.get('/api/tasa', (req, res) => {
  if (esSabado()) {
    if (tasaProximoLunes) {
      res.json({
        valor: tasaProximoLunes.valor,
        fecha: tasaProximoLunes.fecha,
        ultimaActualizacion: tasaProximoLunes.obtenidoEl,
        fuente: tasaProximoLunes.fuente,
        estado: 'tasa del próximo lunes',
        esTasaFutura: true
      });
    } else {
      res.status(503).json({
        ...tasaActual,
        error: 'Tasa del próximo lunes no disponible',
        accionRecomendada: 'Usando tasa actual hasta obtener tasa futura',
        esTasaFutura: false
      });
    }
  } else {
    res.json(tasaActual);
  }
});

// Endpoint para obtener solo la tasa actual
app.get('/api/tasa-actual', (req, res) => {
  res.json(tasaActual);
});

// Endpoint para forzar actualización
app.post('/api/actualizar', async (req, res) => {
  await actualizarTasaBCV();
  res.json({
    mensaje: 'Tasa actualizada manualmente',
    tasa: tasaActual,
    tasaProximoLunes: esSabado() ? tasaProximoLunes : null
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    await actualizarTasaBCV(); // Primera actualización al iniciar
    
    // Programar actualizaciones periódicas
    setInterval(actualizarTasaBCV, CONFIG.updateInterval);

    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor BCV corriendo en http://localhost:${PORT}`);
      console.log(`- Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`- Última tasa: ${tasaActual.valor} Bs/USD`);
      console.log(`- Fuente: ${tasaActual.fuente}`);
      console.log(`- Estado: ${tasaActual.estado}`);
      console.log(`- Actualización automática cada ${CONFIG.updateInterval / (60 * 1000)} minutos\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();