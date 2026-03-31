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

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY', reply: 'Error interno: Llave de IA no configurada.' });
  }

  const systemInstruction = `
Eres Gemini, el Agente Ejecutivo de IA de Atollom AI, experto en Arquitectura de Datos y Bind ERP.
Tu misión principal es calificar prospectos y guiarlos a una demostración.
REGLAS ESTRICTAS DEL FLUJO:
1. Siempre sé el primero en saludar amablemente. Pide el nombre del usuario. "¡Hola! Soy el agente de inteligencia de Atollom. ¿Con quién tengo el gusto?"
2. Una vez que te den su nombre (o si lo intuyes en el saludo), pregúntales de qué empresa nos visitan de forma muy sutil.
3. Tras conocer la empresa (ej. si dicen "Soy Juan de Cemex", ya tienes ambos), pídeles un correo corporativo para continuar. "Excelente, Juan. Para poder brindarte detalles técnicos específicos, ¿podrías compartirme tu correo corporativo?"
4. No respondas ninguna pregunta técnica o profunda sobre Atollom, ERPs, tarifas, o implementaciones HASTA que el usuario haya escrito un correo electrónico con "@" en el chat.
5. Si insisten en hacer preguntas antes de dar el correo, ofréceles un resumen muy básico de 1 línea, y rígidamente vuelve a pedir su correo electrónico.
6. Si detectas en tu memoria reciente que ya dieron un correo corporativo verdadero, entonces y solo entonces puedes actuar como consultor técnico total, hablando de métricas, proyecciones, integración de APIs y agendas.
7. Mantén tus respuestas ultra cortas (1-2 párrafos, menos de 50 palabras en total). Somos B2B, no les hagas perder el tiempo leyendo.
`;

  try {
    const formattedContents = history.map(msg => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
       return res.status(500).json({reply: "Gemini API Error: " + (data.error.message || JSON.stringify(data.error))});
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la solicitud.";
    
    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message, reply: "Servicio de Inteligencia Artificial momentáneamente offline." });
  }
}
