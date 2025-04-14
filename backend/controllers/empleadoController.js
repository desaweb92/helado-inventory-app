const Empleado = require('../models/Empleado');
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
exports.addEmpleado = async (req, res) => {
  const { nombre, documento, cargo, salario, observaciones } = req.body;
  try {
    const newEmpleado = new Empleado({
      nombre,
      documento,
      cargo,
      salario,
      observaciones,
      horasTrabajadas: 0,
      heladosHechos: 0,
    });
    const empleado = await newEmpleado.save();
    res.json(empleado);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
