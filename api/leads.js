// Vercel Serverless Function: Manejador de Leads para Supabase
const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
const MAX_HISTORY_ITEMS = 50;
const MAX_TEXT_LENGTH = 2000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, history, source } = req.body || {};

  // Validar email
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    console.warn("Lead sin email válido, guardando como prospecto parcial.");
  }

  // Sanitizar y limitar history
  const safeHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_ITEMS).map(msg => ({
        role: String(msg.role || '').slice(0, 10),
        text: String(msg.text || '').slice(0, MAX_TEXT_LENGTH)
      }))
    : [];

  const safeSource = typeof source === 'string' ? source.slice(0, 100) : 'Atollom Web';
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_ANON_KEY;

  try {
    // 1. Notificación Inmediata por Email (FormSubmit)
    // Usamos FormSubmit como bridge para que el usuario reciba el correo al instante.
    if (email && EMAIL_REGEX.test(email.trim())) {
      // Extraer datos clave de la conversación
      const userMsgs = safeHistory.filter(m => m.role === 'user').map(m => m.text);
      const botMsgs  = safeHistory.filter(m => m.role === 'bot' || m.role === 'model').map(m => m.text);

      // El flujo es: Hola → nombre+necesidad → empresa → email/tel → horario
      const nombre    = userMsgs[1] || 'No indicado';
      const empresa   = userMsgs[2] || 'No indicada';
      const contacto  = userMsgs[3] || email;
      const horario   = userMsgs[4] || 'No indicado';
      const necesidad = botMsgs[1]  || 'Ver conversación';

      const emailBody = {
        _subject: `🚀 NUEVO LEAD — ${empresa} | ${email}`,
        'Email':         email,
        'Nombre':        nombre,
        'Empresa':       empresa,
        'Contacto':      contacto,
        'Horario':       horario,
        'Necesidad':     necesidad,
        'Fuente':        safeSource,
        'Fecha':         new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
        _template: 'table',
        _captcha: 'false'
      };

      fetch('https://formsubmit.co/ajax/ventas@atollom.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailBody)
      }).catch(e => console.error("Error enviando email:", e));
    }

    // 2. Persistencia en Base de Datos (Supabase)
    if (sbUrl && sbKey) {
      await fetch(`${sbUrl}/rest/v1/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': sbKey,
          'Authorization': `Bearer ${sbKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: email ? email.toLowerCase() : 'prospecto@atollom.com',
          history: safeHistory,
          source: safeSource,
          created_at: new Date().toISOString()
        })
      });
    }

    return res.status(201).json({ success: true, message: 'Lead procesado correctamente.' });

  } catch (err) {
    console.error("Lead Handler Error:", err.message);
    return res.status(500).json({ error: 'Error procesando lead.', details: err.message });
  }
}
