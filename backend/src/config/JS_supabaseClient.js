const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL y Key deben estar definidas en las variables de entorno'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false // Opcional, dependiendo de tus necesidades
  }
});

// Verificar conexión al iniciar
(async () => {
  try {
    const { data, error } = await supabase
      .from('produccion')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Conexión a Supabase verificada');
  } catch (error) {
    console.error('❌ Error conectando a Supabase:', error.message);
  }
})();

module.exports = supabase;