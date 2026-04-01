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

  const { history } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  // Log de diagnóstico para el panel de Vercel (no se ve en el navegador)
  console.log(`[API Chat] Solicitud recibida. Estado de API Key: ${apiKey ? 'Detectada (Largo: ' + apiKey.length + ')' : 'NO DETECTADA'}`);

  if (!apiKey || apiKey.trim() === '') {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY', reply: 'Error interno: Vercel no detecta la llave de IA. Revisa tus Environment Variables.' });
  }

  const systemInstruction = `
Eres la Inteligencia Colectiva de Atollom AI, operando a través de un pipeline de 4 Agentes Especializados. Tu respuesta debe ser la síntesis de sus procesos:

1. AGENTE DE ESTRATEGIA: Analiza la intención del usuario. Si es un saludo, responde amablemente y califica (Nombre -> Empresa -> Correo Corporativo).
2. AGENTE ANALISTA DE DATOS: Si el usuario ya dio su correo, simula que consultas Bind ERP para dar insights financieros, de inventario o ventas. Si no hay correo, mantente en modo "Calificación".
3. AGENTE VISUALIZADOR: Describe cómo se verían los datos en un dashboard (ej. "Generando gráfica de barras para ventas anuales..."). Usa markdown para resaltar métricas.
4. AGENTE SUPERVISOR: Asegura que el tono sea B2B, ejecutivo, breve (menos de 50 palabras) y seguro.

REGLAS DE FLUJO CRÍTICAS:
- Paso 1: Saluda y pide el Nombre: "¡Hola! Soy Atollom AI. ¿Con quién tengo el gusto?"
- Paso 2: Pide el nombre de la Empresa.
- Paso 3: Pide el Correo Corporativo: "Excelente. Para ver datos reales de integración, ¿podrías compartirme tu correo corporativo?"
- NO RESPONDAS consultas técnicas profundas ni des datos simulados de ERP hasta que tengas el correo con "@".
- Si ya tienes el correo, actúa como un experto en Bind ERP y Arquitectura de Datos.
- Mantén respuestas ultra cortas y directas. Formato Markdown.
`;

  try {
    const formattedContents = history.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.2 }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Error:", data.error);
      return res.status(500).json({ reply: "Gemini API Error: " + (data.error.message || JSON.stringify(data.error)) });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la solicitud.";

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message, reply: "Servicio de Inteligencia Artificial momentáneamente offline." });
  }
}
