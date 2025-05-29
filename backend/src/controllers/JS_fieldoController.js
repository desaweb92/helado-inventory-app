const supabase = require('../config/JS_supabaseClient');

exports.agregarHelado = async (req, res) => {
  try {
    const { sabor, tipo, precio_mayor, precio_detal, cantidad, maquina, monedaMayor, monedaDetal } = req.body;

    // Validación mejorada
    if (!sabor || !cantidad || !maquina || !precio_mayor || !precio_detal) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: sabor, cantidad o máquina'
      });
    }

    const { data, error } = await supabase
      .from('produccion')
      .insert([{
        sabor,
        tipo: tipo || 'normal',
        precio_mayor: parseInt(precio_mayor),
        precio_detal: parseInt(precio_detal),
        moneda_mayor: monedaMayor || 'USD',
        moneda_detal: monedaDetal || 'Bs',
        cantidad: parseInt(cantidad),
        maquina
      }])
      .select();

    if (error) throw error;
    
    return res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Error en agregarHelado:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Error al guardar en la base de datos'
    });
  }
};

exports.obtenerHelados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produccion')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error en obtenerHelados:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener los datos'
    });
  }
};