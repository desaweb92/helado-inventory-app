const { createClient } = require('@supabase/supabase-js')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../env/.env') })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

console.log('URL:', supabaseUrl) // Para depuración
console.log('KEY:', supabaseKey ? '***' : 'No encontrada') // No mostrar clave completa

if (!supabaseUrl || !supabaseKey) {
  throw new Error('❌ Faltan SUPABASE_URL o SUPABASE_KEY en .env')
}

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase