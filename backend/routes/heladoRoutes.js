const express = require('express');
const router = express.Router();
const { getHelados, addHelado } = require('../controllers/heladoController');
router.get('/', getHelados);
router.post('/', addHelado);
module.exports = router;
