const apiKey = process.env.GEMINI_API_KEY;
const history = [
  { role: 'user', text: 'Hola' },
  { role: 'bot', text: '¡Hola! Soy Atollom AI. ¿Con quién tengo el gusto?' },
  { role: 'user', text: 'hola me llamo juan' }
];

const systemInstruction = `Eres la Inteligencia Colectiva de Atollom AI...`;

const formattedContents = history.map(msg => ({
  role: msg.role === 'bot' ? 'model' : 'user',
  parts: [{ text: msg.text }]
}));

async function run() {
  if (!apiKey) {
    console.error("Falta configurar GEMINI_API_KEY en variables de entorno.");
    return;
  }
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: formattedContents,
      system_instruction: { parts: [{ text: systemInstruction }] },
      generation_config: { temperature: 0.2 }
    })
  });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
