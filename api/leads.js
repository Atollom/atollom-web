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
    return res.status(400).json({ error: 'Email inválido o ausente.' });
  }

  // Sanitizar y limitar history
  const safeHistory = Array.isArray(history)
    ? history.slice(0, MAX_HISTORY_ITEMS).map(msg => ({
        role: String(msg.role || '').slice(0, 10),
        text: String(msg.text || '').slice(0, MAX_TEXT_LENGTH)
      }))
    : [];

  // Sanitizar source
  const safeSource = typeof source === 'string'
    ? source.slice(0, 100)
    : 'Atollom Web';

  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_ANON_KEY;

  if (!sbUrl || !sbKey) {
    console.error("Falta configuración de Supabase.");
    return res.status(500).json({ error: 'Atollom Server Error: Credentials not found.' });
  }

  try {
    // Insertamos el lead en la tabla 'leads' usando la API PostgREST nativa de Supabase
    // Esto evita dependencias pesadas en el servidor.
    const response = await fetch(`${sbUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': sbKey,
        'Authorization': `Bearer ${sbKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        history: safeHistory,
        source: safeSource,
        created_at: new Date().toISOString()
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al persistir en DB.');
    }

    return res.status(201).json({ success: true, leadId: data[0]?.id });

  } catch (err) {
    console.error("Lead Error:", err.message);
    return res.status(500).json({ error: 'Error procesando lead. Fallback activo.', details: err.message });
  }
}
