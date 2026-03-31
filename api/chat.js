export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, leadData } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar GEMINI_API_KEY en Vercel', reply: 'Error interno: Llave de IA no configurada.' });
  }

  const systemInstruction = `
Eres el avatar ejecutivo de ATOLLOM AI, experto en Arquitectura de Datos y Bind ERP.
Tu meta es conversar con el CEO/Director de forma cortés, precisa y persuasiva.
Atollom AI ofrece dashboards inteligentes que se conectan a ERPs (como Bind) para análisis financiero, cadenas de suministro, e inventarios en tiempo real.
Siempre responde de forma concisa (menos de 40 palabras) y profesional. Utiliza formato markdown para negritas si quieres resaltar conceptos.
Si muestran interés serio, ínstalos a que agenden una demostración técnica dejando sus datos en el chat.
No prometas cosas que no ofrecemos. Mantén un tono formal, de consultoría tecnológica premium (estilo B2B SaaS).
Datos del prospecto con el que hablas: Empresa - ${leadData?.company || 'Desconocida'}, Nombre - ${leadData?.name || 'Cliente'}. Dirígete al usuario por su nombre ocasionalmente.
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.3 }
      })
    });

    const data = await response.json();
    
    if (data.error) {
       console.error("Gemini Error:", data.error);
       return res.status(500).json({reply: "Hubo un error de conexión con nuestros servidores de IA."});
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No pude procesar la solicitud.";
    
    return res.status(200).json({ reply: replyText });
  } catch (err) {
    return res.status(500).json({ error: err.message, reply: "Servicio de Inteligencia Artificial momentáneamente offline." });
  }
}
