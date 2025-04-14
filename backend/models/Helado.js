const mongoose = require('mongoose');
const HeladoSchema = new mongoose.Schema({
  sabor: String,
  tipo: String,
  precioMayor: Number,
  precioDetal: Number,
  cantidad: Number,
});
module.exports = mongoose.model('Helado', HeladoSchema);
