const express = require('express');
const router = express.Router();
const { getEmpleados, addEmpleado } = require('../controllers/empleadoController');
router.get('/', getEmpleados);
router.post('/', addEmpleado);
module.exports = router;
