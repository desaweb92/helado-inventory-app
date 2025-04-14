const mongoose = require('mongoose');
const EmpleadoSchema = new mongoose.Schema({
  nombre: String,
  documento: String,
  cargo: String,
  salario: Number,
  observaciones: String,
  horasTrabajadas: Number,
  heladosHechos: Number,
});
module.exports = mongoose.model('Empleado', EmpleadoSchema);
