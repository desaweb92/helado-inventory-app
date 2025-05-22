const supabase = require('../config/JS_supabaseClient')

exports.agregarHelado = async (req, res) => {
  const { sabor, tipo, cantidad, maquina } = req.body

  try {
    const { data, error } = await supabase
      .from('produccion')
      .insert([{ sabor, tipo, cantidad, maquina }])
      .select()

    if (error) throw error
    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.obtenerHelados = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('produccion')
      .select('*')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}