const mongoose = require('mongoose');
const VentaSchema = new mongoose.Schema({
  tipoVenta: String,
  cantidad: Number,
  total: Number,
  fecha: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Venta', VentaSchema);
