/* Bot de demostración basado en reglas. Sin red, sin llaves, sin IA.
   El producto real usa IA y los datos del negocio del cliente. */
(function (root) {
  var GIROS = {
    dentista: {
      nombre: 'Clínica Dental Ejemplo', emoji: '🦷', etiqueta: 'Dentista',
      horario: 'Lunes a viernes de 9:00 a 19:00 y sábados de 9:00 a 14:00. Domingo cerrado.',
      ubicacion: 'Estamos en una dirección de ejemplo. En tu bot va la dirección real y el link de Google Maps.',
      servicio: 'la consulta',
      precios: 'Precios de ejemplo: consulta de valoración $350, limpieza dental $600, resina desde $700, extracción desde $800, blanqueamiento desde $2,500. Ortodoncia se cotiza en consulta.',
      servicios: 'Valoración, limpieza, resinas, extracciones, blanqueamiento y ortodoncia.',
      extra: [
        { k: ['dolor', 'duele', 'muela', 'urgencia', 'inflam', 'sangr'], r: 'Lamento que te duela. Si el dolor es fuerte, lo mejor es verte pronto: te paso con una persona del consultorio para buscarte un hueco hoy mismo.', humano: true },
        { k: ['ortodoncia', 'brackets', 'frenos dentales'], r: 'La ortodoncia se cotiza después de una valoración, porque depende de cada caso. La consulta de valoración cuesta $350 (precio de ejemplo). ¿Quieres agendarla?' },
        { k: ['limpieza'], r: 'La limpieza dental cuesta $600 (precio de ejemplo) y dura unos 40 minutos. ¿Te agendo una cita?' },
        { k: ['blanqueamiento', 'blanquear'], r: 'El blanqueamiento va desde $2,500 (precio de ejemplo); en la valoración te dicen cuál opción te conviene. ¿Agendamos?' },
        { k: ['niño', 'niños', 'hijo', 'hija', 'infantil', 'pediatr'], r: 'Sí, atendemos niños. Para la primera visita conviene una valoración tranquila. ¿Quieres agendarla?' }
      ]
    },
    taller: {
      nombre: 'Taller Mecánico Ejemplo', emoji: '🔧', etiqueta: 'Taller mecánico',
      horario: 'Lunes a viernes de 8:30 a 18:00 y sábados de 8:30 a 14:00.',
      ubicacion: 'Estamos en una dirección de ejemplo. En tu bot va la dirección real y el link de Google Maps.',
      servicio: 'la revisión',
      precios: 'Precios de ejemplo: afinación menor desde $900, cambio de aceite y filtro desde $650, balatas delanteras desde $1,100 con mano de obra, diagnóstico con escáner $400. Siempre se cotiza antes de tocar el coche.',
      servicios: 'Afinación, frenos, suspensión, cambio de aceite, diagnóstico con escáner y mecánica general.',
      extra: [
        { k: ['frenos', 'balata', 'balatas', 'chillan', 'rechinan'], r: 'Con frenos no conviene esperar. Las balatas delanteras van desde $1,100 con mano de obra (precio de ejemplo), pero se confirma al revisar. ¿Te agendo una revisión?' },
        { k: ['aceite'], r: 'El cambio de aceite y filtro va desde $650 (precio de ejemplo), según el tipo de aceite de tu coche. ¿Quieres apartar horario?' },
        { k: ['afinacion', 'afinar'], r: 'La afinación menor va desde $900 (precio de ejemplo). Para cotizarte bien necesito marca y año del coche; eso lo ve la persona del taller. ¿Agendamos la revisión?' },
        { k: ['no prende', 'no arranca', 'se calienta', 'humo', 'grua', 'tirado', 'varado'], r: 'Eso suena urgente. Te paso con una persona del taller para ver cómo atenderte lo antes posible.', humano: true },
        { k: ['garantia'], r: 'Los trabajos llevan garantía por escrito; el plazo exacto lo define cada taller. En tu bot va la política real.' },
        { k: ['escaner', 'diagnostico', 'check engine', 'testigo'], r: 'El diagnóstico con escáner cuesta $400 (precio de ejemplo). ¿Quieres agendar?' }
      ]
    },
    aire: {
      nombre: 'Climas del Pacífico (ejemplo)', emoji: '❄️', etiqueta: 'Aire acondicionado',
      horario: 'Lunes a sábado de 8:00 a 18:00. Urgencias de verano: se atienden por mensaje.',
      ubicacion: 'Vamos a domicilio en la zona que cubra el negocio. En tu bot va tu zona real de servicio.',
      servicio: 'la visita',
      precios: 'Precios de ejemplo: mantenimiento de minisplit desde $650, carga de gas desde $900, instalación de minisplit desde $1,800, diagnóstico a domicilio $350. Se confirma al revisar el equipo.',
      servicios: 'Mantenimiento, instalación, reparación y carga de gas de minisplit y aire de ventana.',
      extra: [
        { k: ['no enfria', 'no enfría', 'no enfrie', 'no enfria bien', 'calienta', 'gotea', 'tira agua', 'huele', 'ruido'], r: 'Gracias por contarme. Con eso un técnico puede orientarte mejor: ¿te agendo una visita de diagnóstico ($350, precio de ejemplo)?' },
        { k: ['mantenimiento', 'limpieza'], r: 'El mantenimiento de minisplit va desde $650 (precio de ejemplo) e incluye limpieza de unidades. ¿Agendamos?' },
        { k: ['instalacion', 'instalar', 'minisplit nuevo', 'cotizacion', 'cotizar'], r: 'La instalación de minisplit va desde $1,800 (precio de ejemplo); depende de la distancia de tubería y el tipo de pared. ¿Te agendo una visita para cotizar?' },
        { k: ['gas', 'recarga', 'carga de gas'], r: 'La carga de gas va desde $900 (precio de ejemplo), pero si pierde gas conviene revisar la fuga. ¿Agendo visita?' },
        { k: ['urgente', 'urgencia', 'hoy mismo', 'ya mismo', 'emergencia'], r: 'Entiendo que es urgente. Te paso con una persona para ver si hay un técnico disponible hoy.', humano: true }
      ]
    },
    estetica: {
      nombre: 'Estética Ejemplo', emoji: '💇', etiqueta: 'Estética',
      horario: 'Martes a sábado de 10:00 a 19:00. Domingo y lunes cerrado.',
      ubicacion: 'Estamos en una dirección de ejemplo. En tu bot va la dirección real y el link de Google Maps.',
      servicio: 'tu cita',
      precios: 'Precios de ejemplo: corte dama desde $250, corte caballero $150, tinte desde $700, manicure $180, uñas de gel desde $350, peinado desde $300.',
      servicios: 'Corte, tinte, peinado, manicure, uñas de gel y tratamientos capilares.',
      extra: [
        { k: ['queja', 'molesta', 'me quedo mal', 'me quedó mal', 'reclamo', 'reclamar', 'reclamacion'], r: 'Lamento eso. Prefiero que te atienda directamente una persona para resolverlo bien.', humano: true },
        { k: ['tinte', 'color', 'mechas', 'balayage'], r: 'El tinte va desde $700 (precio de ejemplo); el precio final depende del largo y del tono. Una persona puede confirmarte con una foto. ¿Quieres agendar?' },
        { k: ['corte'], r: 'Corte dama desde $250 y caballero $150 (precios de ejemplo). ¿Te agendo una cita?' },
        { k: ['unas', 'uñas', 'manicure', 'gel', 'acrilico'], r: 'Manicure $180 y uñas de gel desde $350 (precios de ejemplo). ¿Agendamos?' },
        { k: ['novia', 'boda', 'xv', 'quince', 'evento'], r: 'Para eventos se arma un paquete a la medida y conviene apartar fecha con tiempo. Te paso con una persona para que lo platiquen.', humano: true },
      ]
    }
  };

  function norm(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function has(n, words) {
    for (var i = 0; i < words.length; i++) {
      var w = norm(words[i]);
      if (!w) continue;
      if (w.indexOf(' ') > -1) { if (n.indexOf(w) > -1) return true; }
      else if ((' ' + n + ' ').indexOf(' ' + w + ' ') > -1) return true;
      else if (w.length >= 5 && n.indexOf(w) > -1) return true; /* prefijo/raiz: "agendar" en "agendarme" */
    }
    return false;
  }

  var HUMANO = 'No quiero inventarte nada y que te quedes con una respuesta mala. Te paso con una persona del negocio; en cuanto vea el chat te responde. 🙋';
  var DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo', 'hoy', 'manana', 'pasado', 'semana', 'proxima', 'proximo', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  function createBot(key) {
    var g = GIROS[key];
    var st = { step: null, nombre: null, fecha: null, fallos: 0 };

    function out(text, o) { var r = { text: text }; if (o) for (var k in o) r[k] = o[k]; return r; }
    function handoff(prefix) { st.step = null; return [out((prefix ? prefix + ' ' : '') + HUMANO, { handoff: true })]; }

    function startCita() {
      st.step = 'nombre';
      return [out('Claro, te ayudo a agendar ' + g.servicio + '. ¿Cómo te llamas?')];
    }

    function reply(text) {
      var n = norm(text);
      if (!n) return [out('Se me fue el mensaje en blanco. ¿Me lo repites?')];

      /* escape: pedir humano siempre funciona, incluso a media cita */
      if (has(n, ['persona', 'humano', 'alguien', 'asesor', 'encargado', 'dueño', 'dueno', 'agente', 'gente real', 'hablar con']) && !has(n, ['mi nombre', 'me llamo'])) return handoff();

      /* escape: una queja o reclamo siempre va con una persona, en cualquier giro y a media cita */
      if (has(n, ['queja', 'reclamo', 'reclamar', 'reclamacion', 'molesto', 'molesta', 'me quedo mal', 'pesimo', 'devolucion', 'reembolso'])) return handoff('Lamento eso. Prefiero que te atienda directamente una persona para resolverlo bien.');

      if (has(n, ['cancelar', 'cancela', 'ya no', 'olvidalo', 'mejor no']) && st.step) {
        st.step = null; return [out('Sin problema, lo dejamos aquí. Si quieres retomarlo, solo dime. 👍')];
      }

      if (st.step === 'nombre') {
        var nm = String(text).replace(/^(hola[, ]*)?(me llamo|mi nombre es|soy|me dicen|es)\s+/i, '').replace(/[^\p{L} '.-]/gu, '').trim();
        if (nm.length < 2 || nm.split(' ').length > 5 || has(n, ['precio', 'horario', 'cuanto', 'donde'])) {
          st.fallosNombre = (st.fallosNombre || 0) + 1;
          if (st.fallosNombre >= 2) { st.fallosNombre = 0; return handoff(); }
          return [out('Para apartar tu lugar necesito tu nombre. ¿Cómo te llamas?')];
        }
        st.fallosNombre = 0;
        nm = nm.split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
        st.nombre = nm; st.step = 'fecha';
        return [out('Mucho gusto, ' + nm.split(' ')[0] + '. ¿Para qué día y a qué hora te acomoda? (por ejemplo: "el jueves a las 5")')];
      }
      if (st.step === 'fecha') {
        var okFecha = /\d/.test(n) || has(n, DIAS);
        if (!okFecha) return [out('No alcancé a entender el día. ¿Me lo dices así: "mañana a las 10" o "viernes 15 a las 4"?')];
        st.fecha = String(text).trim(); st.step = 'confirma';
        return [out('Listo, confirmo: ' + st.nombre + ', ' + st.fecha + '. ¿Es correcto? (sí / no)')];
      }
      if (st.step === 'confirma') {
        if (has(n, ['si', 'sip', 'correcto', 'asi es', 'ok', 'dale', 'va', 'confirmo', 'claro', 'perfecto', 'exacto'])) {
          var f = st.fecha, nom = st.nombre; st.step = null;
          return [out('Quedó registrada tu solicitud, ' + nom.split(' ')[0] + ' (' + f + '). Una persona del negocio la confirma contigo por este mismo chat. En el producto real esto llega al dueño con tus datos ya capturados. ✅', { cita: true })];
        }
        if (has(n, ['no', 'nop', 'incorrecto', 'cambiar', 'otro'])) { st.step = 'fecha'; return [out('Va, ¿para qué día y hora entonces?')]; }
        return [out('¿Me confirmas con un "sí" o un "no"?')];
      }

      /* intents globales */
      if (has(n, ['gracias', 'muchas gracias', 'te agradezco', 'excelente', 'perfecto gracias'])) return [out('¡Con gusto! Aquí estamos cuando gustes. 😊')];
      if (has(n, ['adios', 'bye', 'hasta luego', 'nos vemos'])) return [out('¡Hasta pronto! Que tengas buen día. 👋')];
      if (has(n, ['cita', 'agendar', 'agenda', 'apartar', 'reservar', 'reserva', 'turno', 'quiero ir', 'quisiera ir', 'disponibilidad', 'hay lugar', 'espacio'])) return startCita();

      /* extras del giro antes que genéricos para que "precio de limpieza" caiga en limpieza */
      for (var i = 0; i < g.extra.length; i++) {
        if (has(n, g.extra[i].k)) {
          var e = g.extra[i];
          if (e.humano) return handoff(e.r);
          return [out(e.r)];
        }
      }
      if (has(n, ['horario', 'horarios', 'hora', 'abren', 'abierto', 'abierta', 'cierran', 'cierra', 'atienden', 'domingo', 'sabado', 'abrir', 'a que hora'])) return [out(g.horario)];
      if (has(n, ['precio', 'precios', 'cuesta', 'cuestan', 'costo', 'costos', 'cobran', 'cuanto', 'tarifa', 'tarifas', 'presupuesto', 'barato'])) return [out(g.precios)];
      if (has(n, ['donde', 'ubicacion', 'direccion', 'domicilio', 'quedan', 'llegar', 'mapa', 'zona', 'cubren'])) return [out(g.ubicacion)];
      if (has(n, ['servicios', 'ofrecen', 'hacen', 'trabajan', 'dan servicio', 'que tienen', 'menu'])) return [out('Ofrecemos: ' + g.servicios + ' ¿Quieres precios o agendar?')];
      if (has(n, ['pago', 'pagar', 'tarjeta', 'efectivo', 'transferencia', 'factura', 'meses sin intereses'])) return [out('Las formas de pago y si se factura las define cada negocio; en tu bot van las reales. Para este ejemplo, te paso con una persona si quieres confirmarlo.')];
      if (has(n, ['hola', 'buenas', 'buenos dias', 'buen dia', 'buenas tardes', 'buenas noches', 'que tal', 'saludos', 'hey', 'ola'])) return [out('¡Hola! Soy el asistente de ' + g.nombre + '. Puedo darte horarios, precios, ubicación o agendar. ¿Qué necesitas?')];

      /* no entendió: segundo fallo seguido → humano; primero → pide reformular */
      st.fallos++;
      if (st.fallos >= 2) { st.fallos = 0; return handoff(); }
      return [out('No estoy seguro de haber entendido. ¿Quieres horarios, precios, ubicación o agendar? Si prefieres, escribe "persona" y te paso con alguien.')];
    }

    var wrapped = function (t) {
      var r = reply(t);
      if (!r[0].handoff && r[0].text.indexOf('No estoy seguro') !== 0) st.fallos = 0;
      return r;
    };

    return {
      giro: g,
      greet: function () { return [out('¡Hola! Soy el asistente virtual de ' + g.nombre + ' (demostración). ¿En qué te puedo ayudar?')]; },
      reply: wrapped
    };
  }

  var api = { GIROS: GIROS, createBot: createBot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RecepcionBot = api;
})(typeof window !== 'undefined' ? window : this);
