const { supabase } = require('../config/JS_supabaseClient');

// Función para agregar helados (nueva)
exports.agregarHelado = async (req, res) => {
  try {
    const { sabor, tipo, precio_mayor, precio_detal, cantidad, maquina, monedaMayor, monedaDetal } = req.body;

console.log('Datos recibidos RAW:', req.body);
console.log('Valores antes de insertar:');
console.log('precio_mayor:', precio_mayor, typeof precio_mayor);
console.log('precio_detal:', precio_detal, typeof precio_detal);
console.log('cantidad:', cantidad, typeof cantidad);




    // Validación mejorada
    if (!sabor || !cantidad || !maquina || !precio_mayor || !precio_detal) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: sabor, cantidad o máquina'
      });
    }

    // Conversión numérica definitiva
    const parseNumber = (val) => {
      if (val === null || val === undefined || val === '') return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    };
console.log('parseInt(precio_mayor):', parseInt(precio_mayor), typeof parseInt(precio_mayor));
console.log('parseInt(precio_detal):', parseInt(precio_detal), typeof parseInt(precio_detal));
console.log('parseInt(cantidad):', parseInt(cantidad), typeof parseInt(cantidad));
    const insertData = {
      sabor,
      tipo: tipo || 'normal',
      precio_mayor: parseInt(precio_mayor) || 0,
      precio_detal: parseInt(precio_detal) || 0,
      moneda_mayor: monedaMayor || 'USD',
      moneda_detal: monedaDetal || 'Bs',
      cantidad: parseInt(cantidad) || 0,
      maquina: maquina || 'soft',
      fecha: new Date().toISOString()
    };

    console.log('Datos procesados para INSERT:', insertData);

    const { data, error } = await supabase
      .from('produccion')
      .insert([insertData])
      .select();

    if (error) {
      console.error('Error de Supabase:', error);
      throw new Error(`Error de base de datos: ${error.message}`);
    }

    console.log('Inserción exitosa:', data);
    return res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Error completo en agregarHelado:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Error al guardar en la base de datos'
    });
  }
};

// Función para obtener helados (nueva)
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

exports.getResumenProduccion = async () => {
  try {
    // 1. Obtener todos los registros con console.log para diagnóstico
    const { data: registros, error } = await supabase
      .from('produccion')
      .select('*');

    if (error) throw error;

    console.log('Total registros:', registros.length);
    console.log('Tipos encontrados:', [...new Set(registros.map(r => r.tipo))]);
    console.log('Máquinas encontradas:', [...new Set(registros.map(r => r.maquina))]);

    // 2. Configuración de fechas (versión inmutable)
    const ahora = new Date();
    const hoy = new Date(ahora);
    hoy.setHours(0, 0, 0, 0);
    
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    
    // 3. Funciones de filtrado con logs de diagnóstico
    const crearFiltroFecha = (nombreFiltro, funcionFiltro) => {
      return (fecha) => {
        const result = funcionFiltro(fecha);
        console.log(`Filtro ${nombreFiltro}:`, { fecha, result });
        return result;
      };
    };

    const esHoy = crearFiltroFecha('hoy', (fecha) => {
      const fechaReg = new Date(fecha);
      fechaReg.setHours(0, 0, 0, 0);
      return fechaReg.getTime() === hoy.getTime();
    });

    const esEstaSemana = crearFiltroFecha('semana', (fecha) => {
      const fechaReg = new Date(fecha);
      return fechaReg >= inicioSemana;
    });

    const esEsteMes = crearFiltroFecha('mes', (fecha) => {
      const fechaReg = new Date(fecha);
      return fechaReg.getMonth() === hoy.getMonth() && 
             fechaReg.getFullYear() === hoy.getFullYear();
    });

    const esEsteAnio = crearFiltroFecha('año', (fecha) => {
      const fechaReg = new Date(fecha);
      return fechaReg.getFullYear() === hoy.getFullYear();
    });

    // 4. Función de cálculo con diagnóstico detallado
    const calcularTotal = (filtroFecha, tipo = null, maquina = null) => {
      const filtrados = registros.filter(item => {
        const cumpleTipo = tipo ? item.tipo === tipo : true;
        const cumpleMaquina = maquina ? item.maquina === maquina : true;
        const cumpleFecha = filtroFecha(item.fecha);
        
        if (tipo && maquina) {
          console.log('Registro:', {
            id: item.id,
            tipo: item.tipo,
            maquina: item.maquina,
            fecha: item.fecha,
            cumpleTipo,
            cumpleMaquina,
            cumpleFecha,
            cantidad: item.cantidad
          });
        }
        
        return cumpleTipo && cumpleMaquina && cumpleFecha;
      });

      const total = filtrados.reduce((sum, item) => sum + (Number(item.cantidad) || 0), 0);
      
      console.log('Cálculo total:', {
        tipo,
        maquina,
        filtro: filtroFecha.name,
        registrosFiltrados: filtrados.length,
        total
      });

      return total;
    };

    // 5. Construcción del resumen con verificación paso a paso
    const resumen = {
      // Totales generales
      totalProduccionDia: calcularTotal(esHoy),
      totalProduccionSemana: calcularTotal(esEstaSemana),
      totalProduccionMes: calcularTotal(esEsteMes),
      totalProduccionAnio: calcularTotal(esEsteAnio),
      totalPrecioMayor: registros.reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
      totalPrecioDetal: registros.reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
      totalMaquinaSoftDia: calcularTotal(esHoy, null, 'soft'),
      totalMaquinaSoftSemana: calcularTotal(esEstaSemana, null, 'soft'),
      totalMaquinaSoftMes: calcularTotal(esEsteMes, null, 'soft'),
      totalMaquinaSoftAnio: calcularTotal(esEsteAnio, null, 'soft'),
      totalMaquinaMantecadoraDia: calcularTotal(esHoy, null, 'mantecadora'),
      totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, null, 'mantecadora'),
      totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, null, 'mantecadora'),
      totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, null, 'mantecadora'),
      
      // Por tipo
      normal: {
        totalProduccionDia: calcularTotal(esHoy, 'normal'),
        totalProduccionSemana: calcularTotal(esEstaSemana, 'normal'),
        totalProduccionMes: calcularTotal(esEsteMes, 'normal'),
        totalProduccionAnio: calcularTotal(esEsteAnio, 'normal'),
        totalPrecioMayor: registros.filter(i => i.tipo === 'normal')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === 'normal')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, 'normal', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, 'normal', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, 'normal', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, 'normal', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, 'normal', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, 'normal', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, 'normal', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, 'normal', 'mantecadora')
      },
      especial: {
        totalProduccionDia: calcularTotal(esHoy, 'especial'),
        totalProduccionSemana: calcularTotal(esEstaSemana, 'especial'),
        totalProduccionMes: calcularTotal(esEsteMes, 'especial'),
        totalProduccionAnio: calcularTotal(esEsteAnio, 'especial'),
        totalPrecioMayor: registros.filter(i => i.tipo === 'especial')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === 'especial')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, 'especial', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, 'especial', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, 'especial', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, 'especial', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, 'especial', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, 'especial', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, 'especial', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, 'especial', 'mantecadora')
      },
      superEspecial: {
        totalProduccionDia: calcularTotal(esHoy, 'super_especial'),
        totalProduccionSemana: calcularTotal(esEstaSemana, 'super_especial'),
        totalProduccionMes: calcularTotal(esEsteMes, 'super_especial'),
        totalProduccionAnio: calcularTotal(esEsteAnio, 'super_especial'),
        totalPrecioMayor: registros.filter(i => i.tipo === 'super_especial')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === 'super_especial')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, 'super_especial', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, 'super_especial', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, 'super_especial', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, 'super_especial', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, 'super_especial', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, 'super_especial', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, 'super_especial', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, 'super_especial', 'mantecadora')
      },
      "1lt": {
        totalProduccionDia: calcularTotal(esHoy, '1lt'),
        totalProduccionSemana: calcularTotal(esEstaSemana, '1lt'),
        totalProduccionMes: calcularTotal(esEsteMes, '1lt'),
        totalProduccionAnio: calcularTotal(esEsteAnio, '1lt'),
        totalPrecioMayor: registros.filter(i => i.tipo === '1lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === '1lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, '1lt', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, '1lt', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, '1lt', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, '1lt', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, '1lt', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, '1lt', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, '1lt', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, '1lt', 'mantecadora')
      },
      "2lt": {
        totalProduccionDia: calcularTotal(esHoy, '2lt'),
        totalProduccionSemana: calcularTotal(esEstaSemana, '2lt'),
        totalProduccionMes: calcularTotal(esEsteMes, '2lt'),
        totalProduccionAnio: calcularTotal(esEsteAnio, '2lt'),
        totalPrecioMayor: registros.filter(i => i.tipo === '2lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === '2lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, '2lt', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, '2lt', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, '2lt', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, '2lt', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, '2lt', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, '2lt', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, '2lt', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, '2lt', 'mantecadora')
      },
      "4lt": {
        totalProduccionDia: calcularTotal(esHoy, '4lt'),
        totalProduccionSemana: calcularTotal(esEstaSemana, '4lt'),
        totalProduccionMes: calcularTotal(esEsteMes, '4lt'),
        totalProduccionAnio: calcularTotal(esEsteAnio, '4lt'),
        totalPrecioMayor: registros.filter(i => i.tipo === '4lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_mayor) || 0), 0),
        totalPrecioDetal: registros.filter(i => i.tipo === '4lt')
                                 .reduce((sum, i) => sum + (Number(i.precio_detal) || 0), 0),
        totalMaquinaSoftDia: calcularTotal(esHoy, '4lt', 'soft'),
        totalMaquinaSoftSemana: calcularTotal(esEstaSemana, '4lt', 'soft'),
        totalMaquinaSoftMes: calcularTotal(esEsteMes, '4lt', 'soft'),
        totalMaquinaSoftAnio: calcularTotal(esEsteAnio, '4lt', 'soft'),
        totalMaquinaMantecadoraDia: calcularTotal(esHoy, '4lt', 'mantecadora'),
        totalMaquinaMantecadoraSemana: calcularTotal(esEstaSemana, '4lt', 'mantecadora'),
        totalMaquinaMantecadoraMes: calcularTotal(esEsteMes, '4lt', 'mantecadora'),
        totalMaquinaMantecadoraAnio: calcularTotal(esEsteAnio, '4lt', 'mantecadora')
      }
    };

    return resumen;

  } catch (error) {
    console.error('Error en getResumenProduccion:', error);
    throw error;
  }
};