// Rate limiting en memoria (Simple)
const rateLimitMap = new Map();
const LIMIT = 10; // Peticiones máximas
const WINDOW_MS = 60000; // Por minuto (60s)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Identificar IP del cliente
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Limpiar mapa antiguo (Recolección de basura)
  const now = Date.now();
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.timestamp > WINDOW_MS) rateLimitMap.delete(key);
  }

  // Revisar Rate Limit
  const userRecord = rateLimitMap.get(ip) || { count: 0, timestamp: now };
  if (userRecord.count >= LIMIT && (now - userRecord.timestamp) < WINDOW_MS) {
    return res.status(429).json({ error: 'Demasiadas peticiones. Por favor, espera un minuto.' });
  }

  // Actualizar contador
  userRecord.count++;
  if (userRecord.count === 1) userRecord.timestamp = now;
  rateLimitMap.set(ip, userRecord);

  const { history } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;

  if (!Array.isArray(history) || history.length === 0) {
    return res.status(400).json({ reply: 'Historial de chat inválido.' });
  }

  // Log de diagnóstico para el panel de Vercel (no se ve en el navegador)
  console.log(`[API Chat] Solicitud recibida. Estado de API Key: ${apiKey ? 'Detectada (Largo: ' + apiKey.length + ')' : 'NO DETECTADA'}`);

  if (!apiKey || apiKey.trim() === '') {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY', reply: 'Error interno: Vercel no detecta la llave de IA. Revisa tus Environment Variables.' });
  }

  const systemInstruction = `
Eres el Consultor Senior de Atollom AI. Tu objetivo es ser un "vendedor amigable", experto y persuasivo que ayuda a empresas a dar el siguiente paso en su transformación digital.

TU MISIÓN PRINCIPAL:
Descubrir la necesidad del cliente y recolectar sus datos de contacto de forma natural y profesional.

ESTILO Y TONO:
- Amigable, ejecutivo, consultivo y B2B.
- Respuestas breves (menos de 60 palabras).
- Usa Markdown para resaltar puntos clave.

FLUJO DE CONVERSACIÓN (Paso a paso):
1. Saludo y Descubrimiento: "¡Hola! Soy el consultor de Atollom AI. ¿Con quién tengo el gusto y qué solución de IA estás buscando para tu empresa? (Ej. Integración para WhatsApp, Agentes de Mapeo de ERP, o algo a medida)".
2. Identificar Necesidad: Escucha lo que buscan y valida cómo Atollom puede ayudarles (ERP, WhatsApp, Automatización).
3. Datos de Empresa: Pregunta el nombre de su organización.
4. Contacto Directo: Solicita Correo Corporativo y Teléfono.
5. Logística de Cierre: Pregunta en qué horarios les vendría bien que los contactemos y por qué medio prefieren (WhatsApp, Llamada o Correo).

REGLAS CRÍTICAS:
- No des insights técnicos profundos ni simules datos de ERP hasta que el usuario haya mostrado interés y dado su nombre/empresa.
- Si preguntan por WhatsApp AI: Explica que podemos automatizar ventas y atención 24/7 con IA personalizada.
- Si preguntan por ERP: Explica que nuestros agentes mapean datos de Bind ERP (o cualquier ERP) para visualización ejecutiva en tiempo real.
`;

  try {
    const safeHistory = history.slice(-10); // últimos 10 mensajes (post-calificación)
    const formattedContents = safeHistory.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: String(msg.text || '').slice(0, 2000) }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      signal: AbortSignal.timeout(15000),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.2, maxOutputTokens: 200 }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Error:", data.error);
      const code = data.error.code || 0;
      const msg = data.error.message || '';
      // Quota / rate limit: signal frontend to use local fallback silently
      if (code === 429 || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('rate')) {
        return res.status(200).json({ useFallback: true });
      }
      return res.status(200).json({ useFallback: true });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la solicitud.";

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message, reply: "Servicio de Inteligencia Artificial momentáneamente offline." });
  }
}
