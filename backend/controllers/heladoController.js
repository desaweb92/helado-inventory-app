const Helado = require('../models/Helado');
exports.getHelados = async (req, res) => {
  try {
    const helados = await Helado.find();
    res.json(helados);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
exports.addHelado = async (req, res) => {
  const { sabor, tipo, precioMayor, precioDetal, cantidad } = req.body;
  try {
    const newHelado = new Helado({
      sabor,
      tipo,
      precioMayor,
      precioDetal,
      cantidad,
    });
    const helado = await newHelado.save();
    res.json(helado);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
