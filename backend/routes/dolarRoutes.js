const express = require('express');
const router = express.Router();
const { getDolarRate } = require('../controllers/dolarController');
router.get('/', getDolarRate);
module.exports = router;
