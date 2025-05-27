require('dotenv').config(); // Esto ahora buscará en backend/.env
const { createClient } = require('@supabase/supabase-js');

// Verificación con console.log para diagnóstico
console.log('URL:', process.env.SUPABASE_URL);
console.log('KEY:', process.env.SUPABASE_KEY?.slice(0, 10) + '...');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error(`
    ERROR: Variables no cargadas correctamente. Verifica:
    1. Que el archivo .env esté en backend/.env
    2. Que no tenga extensión oculta (.env.txt)
    3. Que los nombres de variables sean exactos
  `);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = { supabase };