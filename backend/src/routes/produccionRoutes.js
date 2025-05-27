const express = require('express');
const router = express.Router();
const {
  agregarHelado,
  obtenerHelados,
  getResumenProduccion
} = require('../controllers/JS_produccionController');

// POST /api/produccion
router.post('/', agregarHelado);

// GET /api/produccion
router.get('/', obtenerHelados);

// GET /api/produccion/resumen
router.get('/resumen', getResumenProduccion);

module.exports = router;