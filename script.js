/* ATOLLOM AI — Main Script */
(function(){
'use strict';

// === SECURITY / ANTI-F12 (MODO DIOS) ===
// Deshabilitar Clic Derecho
document.addEventListener('contextmenu', e => e.preventDefault());

// Deshabilitar atajos de teclado de DevTools y Visualización de Código
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
  ) {
    e.preventDefault();
  }
});

// Trampa de Consola (Congela al usuario si logra abrir DevTools)
setInterval(function() {
  const before = new Date().getTime();
  debugger;
  const after = new Date().getTime();
  if (after - before > 100) {
    document.body.innerHTML = '<div style="background:#0A1628;color:#CCFF00;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:2rem;text-align:center;">ATOLLOM SECURITY<br>INSPECTION BLOCKED</div>';
  }
}, 1000);

// === I18N TRANSLATIONS ===
const T = {
es: {
'nav.home':'Inicio','nav.solutions':'Soluciones','nav.demo':'Demo','nav.arch':'Arquitectura','nav.contact':'Contacto','nav.cta':'Agenda una Demo',
'hero.badge':'Plataforma de IA Empresarial','hero.h1a':'Inteligencia Artificial que ','hero.h1b':'Transforma tu Operación',
'hero.h2':'Automatiza análisis y multiplica tus resultados financieros conectando IA con tus sistemas de gestión.',
'hero.cta1':'Agenda una Demo','hero.cta2':'Conoce Más','hero.stat1':'Tenants Activos','hero.stat2':'Uptime','hero.stat3':'API Requests / día',
'showcase.label':'Potencia Ejecutiva','showcase.title':'Todo el Poder en una Pantalla','showcase.subtitle':'Dashboards inteligentes que transforman datos complejos en decisiones claras e inmediatas.',
'showcase.f1.title':'Análisis Multi-Tenant','showcase.f1.desc':'Gestiona múltiples empresas desde un solo panel con segregación segura de datos.',
'showcase.f2.title':'Reportes en Tiempo Real','showcase.f2.desc':'Obtén métricas financieras, inventarios y proyecciones al instante mediante chat.',
'showcase.f3.title':'Integración Universal','showcase.f3.desc':'Conexión agnóstica con cualquier sistema de gestión empresarial del mercado.',
'showcase.mobile.label':'Experiencia Móvil','showcase.mobile.title':'Tu Negocio en la Palma de tu Mano',
'showcase.mobile.desc':'Accede a reportes, análisis y visualizaciones desde cualquier dispositivo. La inteligencia de Atollom te acompaña donde vayas.',
'showcase.mobile.cta':'Solicitar Acceso',
'about.label':'¿Qué es Atollom AI?','about.title':'El Puente entre tus Datos y tus Decisiones',
'about.subtitle':'Transformamos bases de datos complejas y estructuras de gestión empresarial en conversaciones fluidas y comprensibles mediante IA generativa.',
'about.p1.title':'Reportes Financieros Instantáneos','about.p1.desc':'Estados financieros, balances y análisis de rentabilidad en segundos a través de una interfaz de chat intuitiva.',
'about.p2.title':'Análisis de Inventarios','about.p2.desc':'Control inteligente de stock, alertas de reabastecimiento y optimización de cadena de suministro en tiempo real.',
'about.p3.title':'Proyecciones de Ventas','about.p3.desc':'Modelos predictivos que anticipan tendencias de mercado y oportunidades de crecimiento con precisión.',
'about.tagline':'Habla con tus datos. Sin procesos lentos. Sin intermediarios.',
'about.sectors.title':'Sectores que Transformamos','about.s1':'Usuarios de ERPs','about.s2':'Sector Médico','about.s3':'Turismo de Lujo','about.s4':'Retail & Moda','about.s5':'Restaurantes','about.s6':'E-commerce','about.s7':'Y cualquier industria',
'sandbox.label':'Demo Interactiva','sandbox.title':'Experimenta el Poder de Atollom AI','sandbox.subtitle':'Selecciona una industria y descubre cómo nuestra IA transforma datos en decisiones estratégicas.',
'sandbox.t1':'Clínica Médica','sandbox.t2':'Retail / Moda','sandbox.t3':'Restaurante','sandbox.t4':'Yates de Lujo','sandbox.t5':'E-commerce','sandbox.insight':'Análisis Atollom AI',
'sandbox.cta.text':'¿Quieres ver esto con TUS datos reales?','sandbox.cta.btn':'Agenda una Demo Personalizada',
'arch.label':'Arquitectura Inteligente','arch.title':'Cuatro Agentes. Un Solo Objetivo.','arch.subtitle':'Nuestro sistema no es un simple chat. Es un pipeline robusto de 4 agentes especializados que procesan cada consulta con precisión quirúrgica.',
'arch.a1.title':'Estrategia','arch.a1.desc':'Identifica la consulta y dirige al área correcta del sistema para su procesamiento óptimo.',
'arch.a2.title':'Analista de Datos','arch.a2.desc':'Extrae y procesa números reales de tus sistemas de gestión con precisión absoluta.',
'arch.a3.title':'Visualizador','arch.a3.desc':'Transforma los datos procesados en gráficas y visualizaciones de alto impacto ejecutivo.',
'arch.a4.title':'Supervisor','arch.a4.desc':'Valida la precisión y seguridad de cada respuesta antes de entregarla al usuario.',
'sec.label':'Seguridad Empresarial','sec.title':'Blindaje de Nivel Bancario','sec.subtitle':'Tu información es sagrada. Implementamos los más altos estándares de seguridad para proteger cada byte de tus datos.',
'sec.s1.title':'Encriptación End-to-End','sec.s1.desc':'Toda la comunicación entre tu sistema y Atollom viaja encriptada con protocolos AES-256 y TLS 1.3.',
'sec.s2.title':'Zero Trust Architecture','sec.s2.desc':'Cada solicitud se valida independientemente. Sin confianza implícita. Cada acceso es verificado y auditado.',
'sec.s3.title':'ERP Agnóstico','sec.s3.desc':'Conexión segura con cualquier sistema de gestión empresarial sin exponer credenciales ni datos sensibles.',
'contact.label':'Contacto','contact.title':'¿Listo para Transformar tu Operación?','contact.subtitle':'Cuéntanos sobre tu negocio y te mostraremos cómo Atollom AI puede optimizar tus resultados.',
'contact.direct':'Contacto Directo','contact.wa.cta':'Escríbenos por WhatsApp','contact.response':'Tiempo de Respuesta',
'contact.response.desc':'Respondemos en menos de 2 horas en horario laboral. Para consultas urgentes, usa el chat o WhatsApp.',
'form.name':'Nombre completo *','form.company':'Empresa *','form.email':'Email *','form.phone':'Teléfono','form.message':'¿Cómo podemos ayudarte?','form.submit':'Enviar Mensaje',
'footer.privacy':'Aviso de Privacidad','footer.terms':'Términos de Servicio','footer.rights':'Todos los derechos reservados.',
'chat.status':'En línea','chat.placeholder':'Escribe tu mensaje...',
'cookie.text':'Este sitio utiliza cookies esenciales para su funcionamiento.','cookie.accept':'Aceptar',
'privacy.title':'Aviso de Privacidad Integral','terms.title':'Términos de Servicio',
'sandbox.c.m1':'Cirugías / mes','sandbox.c.m2':'Implantes en stock crítico','sandbox.c.m3':'Margen de utilidad','sandbox.c.m4':'Nivel de optimización',
'sandbox.r.m1':'Ticket promedio MXN','sandbox.r.m2':'Tasa de devoluciones','sandbox.r.m3':'Ventas mensuales','sandbox.r.m4':'Devoluciones Chaqueta Tech',
'sandbox.re.m1':'Hora pico','sandbox.re.m2':'Desperdicio de insumos','sandbox.re.m3':'Margen en bebidas','sandbox.re.m4':'Potencial de mejora',
'sandbox.y.m1':'Ocupación temporada alta','sandbox.y.m2':'Ingreso por extras','sandbox.y.m3':'Segmento de mercado','sandbox.y.m4':'Potencial catering',
'sandbox.e.m1':'CAC (MXN)','sandbox.e.m2':'Tasa de conversión','sandbox.e.m3':'Tiempo en sitio (min)','sandbox.e.m4':'Engagement actual',
},
en: {
'nav.home':'Home','nav.solutions':'Solutions','nav.demo':'Demo','nav.arch':'Architecture','nav.contact':'Contact','nav.cta':'Book a Demo',
'hero.badge':'Enterprise AI Platform','hero.h1a':'Artificial Intelligence that ','hero.h1b':'Transforms Your Operations',
'hero.h2':'Automate analysis and multiply financial results by connecting AI with your management systems.',
'hero.cta1':'Book a Demo','hero.cta2':'Learn More','hero.stat1':'Active Tenants','hero.stat2':'Uptime','hero.stat3':'API Requests / day',
'showcase.label':'Executive Power','showcase.title':'All the Power in One Screen','showcase.subtitle':'Smart dashboards that transform complex data into clear, immediate decisions.',
'showcase.f1.title':'Multi-Tenant Analysis','showcase.f1.desc':'Manage multiple companies from a single panel with secure data segregation.',
'showcase.f2.title':'Real-Time Reports','showcase.f2.desc':'Get financial metrics, inventories and projections instantly through chat.',
'showcase.f3.title':'Universal Integration','showcase.f3.desc':'Agnostic connection with any enterprise management system on the market.',
'showcase.mobile.label':'Mobile Experience','showcase.mobile.title':'Your Business in the Palm of Your Hand',
'showcase.mobile.desc':'Access reports, analysis and visualizations from any device. Atollom intelligence goes wherever you go.',
'showcase.mobile.cta':'Request Access',
'about.label':'What is Atollom AI?','about.title':'The Bridge Between Your Data and Your Decisions',
'about.subtitle':'We transform complex databases and business management structures into fluid, understandable conversations through generative AI.',
'about.p1.title':'Instant Financial Reports','about.p1.desc':'Financial statements, balances and profitability analysis in seconds through an intuitive chat interface.',
'about.p2.title':'Inventory Analysis','about.p2.desc':'Smart stock control, restocking alerts and supply chain optimization in real time.',
'about.p3.title':'Sales Projections','about.p3.desc':'Predictive models that anticipate market trends and growth opportunities with precision.',
'about.tagline':'Talk to your data. No slow processes. No intermediaries.',
'about.sectors.title':'Sectors We Transform','about.s1':'ERP Users','about.s2':'Medical Sector','about.s3':'Luxury Tourism','about.s4':'Retail & Fashion','about.s5':'Restaurants','about.s6':'E-commerce','about.s7':'And any industry',
'sandbox.label':'Interactive Demo','sandbox.title':'Experience the Power of Atollom AI','sandbox.subtitle':'Select an industry and discover how our AI transforms data into strategic decisions.',
'sandbox.t1':'Medical Clinic','sandbox.t2':'Retail / Fashion','sandbox.t3':'Restaurant','sandbox.t4':'Luxury Yachts','sandbox.t5':'E-commerce','sandbox.insight':'Atollom AI Analysis',
'sandbox.cta.text':'Want to see this with YOUR real data?','sandbox.cta.btn':'Book a Personalized Demo',
'arch.label':'Intelligent Architecture','arch.title':'Four Agents. One Goal.','arch.subtitle':'Our system is not a simple chat. It is a robust pipeline of 4 specialized agents that process every query with surgical precision.',
'arch.a1.title':'Strategy','arch.a1.desc':'Identifies the query and routes it to the correct system area for optimal processing.',
'arch.a2.title':'Data Analyst','arch.a2.desc':'Extracts and processes real numbers from your management systems with absolute precision.',
'arch.a3.title':'Visualizer','arch.a3.desc':'Transforms processed data into high-impact executive graphics and visualizations.',
'arch.a4.title':'Supervisor','arch.a4.desc':'Validates the accuracy and security of every response before delivering it to the user.',
'sec.label':'Enterprise Security','sec.title':'Bank-Level Security','sec.subtitle':'Your information is sacred. We implement the highest security standards to protect every byte of your data.',
'sec.s1.title':'End-to-End Encryption','sec.s1.desc':'All communication between your system and Atollom travels encrypted with AES-256 and TLS 1.3 protocols.',
'sec.s2.title':'Zero Trust Architecture','sec.s2.desc':'Every request is validated independently. No implicit trust. Every access is verified and audited.',
'sec.s3.title':'ERP Agnostic','sec.s3.desc':'Secure connection with any enterprise management system without exposing credentials or sensitive data.',
'contact.label':'Contact','contact.title':'Ready to Transform Your Operations?','contact.subtitle':'Tell us about your business and we\'ll show you how Atollom AI can optimize your results.',
'contact.direct':'Direct Contact','contact.wa.cta':'Write us on WhatsApp','contact.response':'Response Time',
'contact.response.desc':'We respond in less than 2 hours during business hours. For urgent inquiries, use chat or WhatsApp.',
'form.name':'Full name *','form.company':'Company *','form.email':'Email *','form.phone':'Phone','form.message':'How can we help you?','form.submit':'Send Message',
'footer.privacy':'Privacy Policy','footer.terms':'Terms of Service','footer.rights':'All rights reserved.',
'chat.status':'Online','chat.placeholder':'Type your message...',
'cookie.text':'This site uses essential cookies for its operation.','cookie.accept':'Accept',
'privacy.title':'Privacy Policy','terms.title':'Terms of Service',
'sandbox.c.m1':'Surgeries / month','sandbox.c.m2':'Critical stock implants','sandbox.c.m3':'Utility margin','sandbox.c.m4':'Optimization level',
'sandbox.r.m1':'Average ticket MXN','sandbox.r.m2':'Return rate','sandbox.r.m3':'Monthly sales','sandbox.r.m4':'Tech Jacket returns',
'sandbox.re.m1':'Peak hours','sandbox.re.m2':'Ingredient waste','sandbox.re.m3':'Beverage margin','sandbox.re.m4':'Improvement potential',
'sandbox.y.m1':'High season occupancy','sandbox.y.m2':'Revenue from extras','sandbox.y.m3':'Market segment','sandbox.y.m4':'Catering potential',
'sandbox.e.m1':'CAC (MXN)','sandbox.e.m2':'Conversion rate','sandbox.e.m3':'Time on site (min)','sandbox.e.m4':'Current engagement',
}};

let currentLang = 'es';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[lang][key]) el.textContent = T[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (T[lang][key]) el.placeholder = T[lang][key];
  });
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.innerHTML = lang === 'es' 
      ? '<span class="active-lang">ES</span> | <span>EN</span>'
      : '<span>ES</span> | <span class="active-lang">EN</span>';
  }
}

// === NAVBAR ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(currentLang === 'es' ? 'en' : 'es');
});

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    
    if (isDecimal) {
      el.textContent = prefix + current.toFixed(1) + suffix;
    } else {
      el.textContent = prefix + Math.floor(current).toLocaleString() + (target >= 600 && suffix === '' ? '+' : suffix);
    }
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// === SCROLL REVEAL ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate counters
      entry.target.querySelectorAll('[data-counter]').forEach(el => {
        if (!el.dataset.animated) {
          el.dataset.animated = '1';
          animateCounter(el);
        }
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .hero-stats').forEach(el => {
  observer.observe(el);
});

// === SANDBOX TABS ===
document.getElementById('sandboxTabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.sandbox-tab');
  if (!tab) return;
  const tabId = tab.dataset.tab;
  
  document.querySelectorAll('.sandbox-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sandbox-panel').forEach(p => p.classList.remove('active'));
  
  tab.classList.add('active');
  document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
});

// === CHAT WIDGET ===
const chatFab = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

let chatHistory = [];
let leadEnviado = false;

// === FALLBACK ENGINE (funciona sin API o en errores) ===
let fbStep = 0;
let fbData = { name: '', need: '', company: '', email: '', phone: '', hours: '', method: '' };

function fallbackEngine(input) {
  const t = (input || '').trim();
  const low = t.toLowerCase();

  if (fbStep === 0) {
    fbStep = 1;
    return '¡Hola! Soy tu **Consultor Atollom AI**. 👋\n\n¿Con quién tengo el gusto y qué solución de IA buscas para tu empresa? (Ej. WhatsApp AI, Agente ERP, o algo a medida).';
  }
  
  if (fbStep === 1) {
    fbData.name = t;
    fbStep = 2;
    return `Es un placer, **${t}**. Entiendo perfectamente. Para darte una propuesta ajustada, ¿en qué **empresa** trabajas actualmente?`;
  }

  if (fbStep === 2) {
    fbData.company = t;
    fbStep = 3;
    return `Excelente. Para enviarte detalles técnicos y casos de éxito de **${t}**, ¿podrías compartirme tu **correo corporativo** y un **teléfono** de contacto?`;
  }

  if (fbStep === 3) {
    // Almacenamos lo que venga como contacto, intentando separar email
    fbData.email = t.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)?.[0] || 'Pendiente';
    fbData.phone = t.replace(/[^\d+ ]/g, '') || 'Pendiente';
    fbStep = 4;
    return `¡Recibido! 🚀 Por último, ¿en qué **horario** te vendría bien que te contactemos y por qué **medio** prefieres que lo hagamos (WhatsApp, Llamada o Correo)?`;
  }

  if (fbStep === 4) {
    fbData.hours = t;
    fbStep = 5;
    return `✅ **¡Todo listo!** Un consultor especialista se pondrá en contacto contigo muy pronto.\n\nMientras tanto, ¿quieres que te explique cómo funciona nuestra **Integración de WhatsApp** o el **Mapeo de ERP** para tu industria?`;
  }

  if (low.includes('whatsapp')) {
    return '📱 **WhatsApp AI Atollom**\n\n- **Atención 24/7:** Resolvemos dudas y cerramos ventas mientras duermes.\n- **Memoria de Cliente:** La IA recuerda compras previas y preferencias.\n- **Cierre de Citas:** Se integra con tu calendario para agendar visitas.\n\n¿Quieres que agendemos una demo para ver esto en vivo?';
  }
  if (low.includes('erp') || low.includes('bind') || low.includes('mapeo')) {
    return '📊 **Mapeo de ERP (Bind & Otros)**\n\n- **Insights en segundos:** Deja de bajar archivos Excel cada mañana.\n- **Agente Analista:** Pregúntale "¿Cuánto margen tuve hoy?" y obtén la respuesta al instante.\n- **Dashboard en Mano:** Visualiza KPIs financieros y de stock desde tu móvil.\n\nEs la herramienta definitiva para directores generales.';
  }

  return '¿Te gustaría profundizar en **Integración de WhatsApp**, **Agente ERP** o agendar una **Reunión Estratégica**?';
}

function addMsg(text, sender) {
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function processChat(input) {
  if (!input.trim()) return;
  addMsg(input, 'user');
  chatInput.value = '';

  chatHistory.push({ role: 'user', text: input });

  // Interceptor: captura email en cuanto aparece en el mensaje
  const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  if (!leadEnviado && emailMatch && emailMatch[0]) {
    sendLead(emailMatch[0]);
    leadEnviado = true;
  }

  showTyping();

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history: chatHistory })
  })
  .then(res => res.json())
  .then(data => {
    removeTyping();
    if (data.useFallback || !data.reply || data.reply.startsWith('Gemini API Error:')) {
      const reply = fallbackEngine(input);
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'bot', text: reply });
    } else {
      addMsg(data.reply, 'bot');
      chatHistory.push({ role: 'bot', text: data.reply });
    }
  })
  .catch(() => {
    removeTyping();
    const reply = fallbackEngine(input);
    addMsg(reply, 'bot');
    chatHistory.push({ role: 'bot', text: reply });
  });
}

function sendLead(email) {
  // Enviar Lead a nuestra propia API (Supabase + Email)
  fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      history: chatHistory,
      source: 'Atollom AI Agent'
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) console.log('Lead sincronizado.');
  })
  .catch(err => {
    console.warn('Error en persistencia:', err);
  });
}

chatFab.addEventListener('click', () => {
  chatFab.classList.add('hidden');
  chatWindow.classList.add('open');
  if (chatHistory.length === 0) {
    showTyping();
    
    const initMsg = { role: 'user', text: 'Hola' };
    chatHistory.push(initMsg);
    
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: chatHistory })
    })
    .then(res => res.json())
    .then(data => {
      removeTyping();
      if (data.useFallback || !data.reply || data.reply.startsWith('Gemini API Error:')) {
        const reply = fallbackEngine('Hola');
        addMsg(reply, 'bot');
        chatHistory.push({ role: 'bot', text: reply });
      } else {
        addMsg(data.reply, 'bot');
        chatHistory.push({ role: 'bot', text: data.reply });
      }
    }).catch(() => {
      removeTyping();
      const reply = fallbackEngine('Hola');
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'bot', text: reply });
    });
  }
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
  chatFab.classList.remove('hidden');
});

chatSend.addEventListener('click', () => processChat(chatInput.value));
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') processChat(chatInput.value);
});

// === MODALS ===
window.openModal = function(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeModal = function(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
};
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) closeModal(m.id);
  });
});

// === COOKIE BANNER ===
if (!localStorage.getItem('atollom_cookies')) {
  setTimeout(() => document.getElementById('cookieBanner').classList.add('show'), 2000);
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem('atollom_cookies', '1');
  document.getElementById('cookieBanner').classList.remove('show');
});

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
});

// === SMOOTH SCROLL FOR SAFARI ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

})();
