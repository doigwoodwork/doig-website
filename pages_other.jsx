// pages_other.jsx — Testimonios, FAQ, Contacto

import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang, useT, useRoute, Img, WAIcon, CTABlock } from './components.jsx'
import { PROJECTS } from './data.jsx'
import { SEO } from './SEO.jsx'
import { supabase } from './lib/supabase.js'

const SESSION_KEY = 'doig_chat_session';
function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) { id = Math.random().toString(36).slice(2); sessionStorage.setItem(SESSION_KEY, id); }
    return id;
  } catch { return Math.random().toString(36).slice(2); }
}

function TestimoniosPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'Testimonials — Clients Who Trusted Doig Woodwork' : 'Testimonios — Clientes que Confiaron en Doig Woodwork'}
        description={lang === 'en' ? 'Read experiences from families in Tijuana and San Diego who renovated their kitchen with Doig Woodwork. Real projects, real results.' : 'Lee las experiencias de familias en Tijuana y San Diego que renovaron su cocina con Doig Woodwork. Proyectos reales, resultados reales.'}
        canonical={lang === 'en' ? '/en/testimonios' : '/testimonios'}
        lang={lang}
      />
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{t.testimonios.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '14ch' }} dangerouslySetInnerHTML={{ __html: t.testimonios.headline.replace('volvieron', '<em style="color: var(--walnut)">volvieron</em>').replace('came back', '<em style="color: var(--walnut)">came back</em>') }} />
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page">
          {t.testimonios.list.map((it, i) => (
            <div key={i} className="testimonio-grid" style={{
              gridTemplateColumns: i % 2 === 0 ? '1fr 1.4fr' : '1.4fr 1fr',
              padding: 'var(--s-8) 0',
              borderTop: i === 0 ? '1px solid var(--line)' : 'none',
              borderBottom: '1px solid var(--line)',
            }}>
              {i % 2 === 0 ? (
                <>
                  <Img src={it.img || PROJECTS[i % PROJECTS.length].img} alt={`${it.author} — cliente Doig Woodwork Tijuana`} aspect="4/5" />
                  <div>
                    <blockquote className="quote" style={{ margin: 0 }}>
                      <span style={{ color: 'var(--walnut)' }}>“</span>{it.quote}<span style={{ color: 'var(--walnut)' }}>”</span>
                    </blockquote>
                    <div style={{ marginTop: 32, display: 'flex', gap: 'var(--s-5)', alignItems: 'baseline' }}>
                      <div style={{ fontWeight: 500 }}>{it.author}</div>
                      <div className="small">{it.project}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <blockquote className="quote" style={{ margin: 0 }}>
                      <span style={{ color: 'var(--walnut)' }}>“</span>{it.quote}<span style={{ color: 'var(--walnut)' }}>”</span>
                    </blockquote>
                    <div style={{ marginTop: 32, display: 'flex', gap: 'var(--s-5)', alignItems: 'baseline' }}>
                      <div style={{ fontWeight: 500 }}>{it.author}</div>
                      <div className="small">{it.project}</div>
                    </div>
                  </div>
                  <Img src={it.img || PROJECTS[(i + 1) % PROJECTS.length].img} alt={`${it.author} — cliente Doig Woodwork Tijuana`} aspect="4/5" />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTABlock />
    </div>
  );
}

function FaqPage() {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map(it => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
  const faqJson = JSON.stringify(faqSchema).replace(/</g, '\\u003c');

  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'FAQ — Custom Kitchen Questions Answered' : 'Preguntas Frecuentes — Cocinas a Medida'}
        description={lang === 'en' ? 'Common questions about custom kitchens: timelines, pricing, materials, and installation. Everything you need to know before starting your project.' : 'Preguntas comunes sobre cocinas a medida: tiempos, precios, materiales e instalación. Todo lo que necesitas saber antes de iniciar tu proyecto.'}
        canonical={lang === 'en' ? '/en/faq' : '/faq'}
        lang={lang}
      />
      <Helmet>
        <script type="application/ld+json">{faqJson}</script>
      </Helmet>
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{t.faq.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '16ch' }}>
            {t.faq.headline}
          </h1>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page" style={{ maxWidth: 960 }}>
          <div>
            {t.faq.items.map((it, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{it.q}</span>
                  <span className="icon">+</span>
                </div>
                <div className="faq-a">
                  <p>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
}

function ContactoPage() {
  const t = useT();
  const { lang } = useLang();

  const CITY_REACTIONS_ES = {
    'Tijuana':   'Perfecto, trabajamos mucho en Tijuana.',
    'Rosarito':  'Buena zona, tenemos varios proyectos en Rosarito.',
    'Ensenada':  'Ensenada, anotado — hacemos entregas allá.',
    'San Diego': '¡San Diego! Genial, también trabajamos al otro lado.',
    'Mexicali':  'Mexicali, con gusto — coordinamos el proyecto sin problema.',
    'Otra':      'Sin problema, cuéntame más cuando hablemos.',
  };
  const CITY_REACTIONS_EN = {
    'Tijuana':   'Great, we work a lot in Tijuana.',
    'Rosarito':  'Nice area, we have several projects in Rosarito.',
    'Ensenada':  'Ensenada, got it — we deliver there.',
    'San Diego': 'San Diego! Perfect, we also work on that side.',
    'Mexicali':  'Mexicali, no problem — we coordinate remotely.',
    'Other':     'No problem, tell me more when we talk.',
  };
  const PROJECT_REACTIONS_ES = {
    'Cocina':                      'Una cocina, excelente.',
    'Closet':                      'Un closet, perfecto.',
    'Cocina + closet':             'Cocina y closet juntos, mejor precio en paquete.',
    'Carpintería para obra nueva': 'Obra nueva, perfecto — lo manejamos desde el principio.',
  };
  const PROJECT_REACTIONS_EN = {
    'Kitchen':                         'A kitchen, great choice.',
    'Closet':                          'A closet, perfect.',
    'Kitchen + Closet':                'Kitchen and closet together — better price as a package.',
    'Carpentry for new construction':  'New construction, perfect — we handle it from the start.',
  };

  const STEPS = lang === 'en' ? [
    {
      key: 'name', type: 'text', ph: 'Your full name...',
      q: "Hi, I'm Alfonso and I'll help you with your quote — just a couple of quick questions. What's your name?",
      react: () => null,
    },
    {
      key: 'phone', type: 'phone', ph: 'WhatsApp number...',
      q: (ans) => `Hi ${ans.name}, nice to meet you. What's your WhatsApp number? I'll send the quote there when it's ready.`,
      react: () => null,
    },
    {
      key: 'city', type: 'chips', ph: 'Or type your city...', chips: ['Tijuana','Rosarito','Ensenada','San Diego','Mexicali','Other'],
      q: () => "Got it, I have it noted. What city is your project in?",
      react: () => null,
    },
    {
      key: 'project', type: 'chips', ph: '', chips: ['Kitchen','Closet','Kitchen + Closet','Carpentry for new construction'],
      q: (ans) => `${CITY_REACTIONS_EN[ans.city] || 'Perfect.'} What are you looking to quote?`,
      react: () => null,
    },
    {
      key: 'timeline', type: 'chips', ph: '',chips: ['As soon as possible','In 1–3 months','In 3–6 months','Just exploring options'],
      q: (ans) => `${PROJECT_REACTIONS_EN[ans.project] || 'Perfect.'} When are you thinking of starting?`,
      react: () => null,
    },
    {
      key: 'email', type: 'text', ph: 'your@email.com',
      q: (ans) => `Almost done ${ans.name} — can you share your email? We use it to confirm your appointment.`,
      react: () => null,
    },
  ] : [
    {
      key: 'name', type: 'text', ph: 'Tu nombre completo...',
      q: () => "Hola, yo me llamo Alfonso y te ayudaré con tu cotización. ¿Cómo te llamas?",
      react: () => null,
    },
    {
      key: 'phone', type: 'phone', ph: 'Número de WhatsApp...',
      q: (ans) => `Hola ${ans.name}, qué gusto. ¿Cuál es tu número de WhatsApp? Ahí te mando la cotización cuando esté lista.`,
      react: () => null,
    },
    {
      key: 'city', type: 'chips', ph: 'O escribe tu ciudad...', chips: ['Tijuana','Rosarito','Ensenada','San Diego','Mexicali','Otra'],
      q: () => "Listo, ya lo tengo anotado. ¿Para qué ciudad es el proyecto?",
      react: () => null,
    },
    {
      key: 'project', type: 'chips', ph: '', chips: ['Cocina','Closet','Cocina + closet','Carpintería para obra nueva'],
      q: (ans) => `${CITY_REACTIONS_ES[ans.city] || 'Perfecto.'} ¿Qué trabajo te interesa cotizar?`,
      react: () => null,
    },
    {
      key: 'timeline', type: 'chips', ph: '', chips: ['Lo antes posible','En 1–3 meses','En 3–6 meses','Solo explorando opciones'],
      q: (ans) => `${PROJECT_REACTIONS_ES[ans.project] || 'Perfecto.'} ¿Cuándo estás pensando en iniciar?`,
      react: () => null,
    },
    {
      key: 'email', type: 'text', ph: 'tu@correo.com',
      q: (ans) => `Casi listo ${ans.name} — ¿me compartes tu correo? Lo usamos para confirmarte la cita.`,
      react: () => null,
    },
  ];

  const TRUST = lang === 'en'
    ? [['500+', 'Projects delivered'], ['4.4 ★', 'Google Reviews'], ['6 years', 'In Tijuana']]
    : [['500+', 'Proyectos entregados'], ['4.4 ★', 'Google Reviews'], ['6 años', 'En Tijuana']];

  const COUNTRY_CODES = [
    { code: '+52', flag: '🇲🇽', label: '+52' },
    { code: '+1',  flag: '🇺🇸', label: '+1'  },
    { code: '+34', flag: '🇪🇸', label: '+34' },
    { code: '+44', flag: '🇬🇧', label: '+44' },
    { code: '+55', flag: '🇧🇷', label: '+55' },
    { code: '+57', flag: '🇨🇴', label: '+57' },
    { code: '+54', flag: '🇦🇷', label: '+54' },
    { code: '+56', flag: '🇨🇱', label: '+56' },
    { code: '+51', flag: '🇵🇪', label: '+51' },
  ];

  const [messages, setMessages]   = useState([]);
  const [step, setStep]           = useState(-1);
  const [answers, setAnswers]     = useState({});
  const [busy, setBusy]           = useState(true);
  const [done, setDone]           = useState(false);
  const [textVal, setTextVal]     = useState('');
  const [phoneNum, setPhoneNum]   = useState('');
  const [countryCode, setCountryCode] = useState('+52');
  const [headerStatus, setHeaderStatus] = useState(lang === 'en' ? 'Typing...' : 'Escribiendo...');
  const messagesEndRef = React.useRef(null);
  const sessionId = React.useRef(getSessionId());

  React.useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [messages, busy]);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      const q0 = STEPS[0].q;
      await pushBot(typeof q0 === 'function' ? q0({}) : q0);
      setStep(0);
      setBusy(false);
      setHeaderStatus(lang === 'en' ? 'Usually replies within 24h' : 'Responde en menos de 24 hrs');
    }, 900);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  function pushBot(text) {
    return new Promise((res) => {
      setHeaderStatus(lang === 'en' ? 'Typing...' : 'Escribiendo...');
      setBusy(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text }]);
        setHeaderStatus(lang === 'en' ? 'Usually replies within 24h' : 'Responde en menos de 24 hrs');
        setBusy(false);
        res();
      }, 800);
    });
  }

  async function upsertLead(partial) {
    try {
      await supabase.from('leads').insert({
        opportunity_name: `${partial.name || 'Lead'} - Chat Web`,
        contact_name: partial.name || null,
        phone: partial.phone || null,
        email: partial.email || null,
        city: partial.city || null,
        stage: 'nuevo',
        lead_type: 'lead',
        source: 'website_chat_form',
        properties: {
          interest_type: partial.project || null,
          timeline: partial.timeline || null,
          lang,
          chat_session: sessionId.current,
          completion: `${Object.keys(partial).length}/6`,
        },
        is_legacy_migration: false,
      });
    } catch (e) {
      console.error('Lead insert error:', e);
    }
  }

  async function handleAnswer(val) {
    if (busy || done) return;
    const currentStep = step;
    const newAnswers = { ...answers, [STEPS[currentStep].key]: val };
    setAnswers(newAnswers);
    setMessages(prev => [...prev, { from: 'user', text: val }]);
    setTextVal('');
    setPhoneNum('');
    setBusy(true);

    // Guardar solo en paso 2 (phone) — captura abandono con datos de contacto
    const completedKeys = Object.keys(newAnswers);
    const isPhoneStep = newAnswers.phone && completedKeys.length === 2;
    if (isPhoneStep) await upsertLead(newAnswers);

    const nextStep = currentStep + 1;
    if (nextStep < STEPS.length) {
      const qRaw = STEPS[nextStep].q;
      const q = typeof qRaw === 'function' ? qRaw(newAnswers) : qRaw;
      await pushBot(q);
      setStep(nextStep);
    } else {
      const finMsg1 = lang === 'en'
        ? `That's everything ${newAnswers.name} 👌 We'll be in touch soon.`
        : `¡Listo ${newAnswers.name}! Ya tengo todo lo que necesito 👌`;
      const finMsg2 = lang === 'en'
        ? `We'll write to you at ${newAnswers.phone} to schedule your quote visit. You'll also get a confirmation at ${newAnswers.email}.`
        : `Te escribimos al ${newAnswers.phone} para agendar tu visita de cotización. También te llegará una confirmación a ${newAnswers.email}.`;
      await pushBot(finMsg1);
      await new Promise(r => setTimeout(r, 350));
      await pushBot(finMsg2);
      setDone(true);
      setHeaderStatus(lang === 'en' ? 'Request received' : 'Solicitud recibida');

      await supabase.from('leads').insert({
        opportunity_name: `${newAnswers.name} - Chat Web`,
        contact_name: newAnswers.name,
        phone: newAnswers.phone,
        email: newAnswers.email,
        city: newAnswers.city,
        stage: 'nuevo',
        lead_type: 'lead',
        source: 'website_chat_form',
        properties: {
          interest_type: newAnswers.project,
          timeline: newAnswers.timeline,
          lang,
          chat_session: sessionId.current,
          completion: '6/6',
        },
        is_legacy_migration: false,
      });
    }
  }

  const currentStepData = step >= 0 && step < STEPS.length ? STEPS[step] : null;

  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'Contact — Request Your Custom Kitchen Quote' : 'Contacto — Solicita tu Cotización de Cocina a Medida'}
        description={lang === 'en' ? 'Ready to renovate your kitchen? Chat with us to schedule a free quote visit. Serving Tijuana, San Diego, Mexicali, and Ensenada.' : '¿Listo para renovar tu cocina o closet? Completa el chat y agendamos tu cotización a domicilio o en nuestras oficinas.'}
        canonical={lang === 'en' ? '/en/contacto' : '/contacto'}
        lang={lang}
      />

      <section className="section" style={{ paddingBottom: 'var(--s-6)' }}>
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            {lang === 'en' ? '— Quote' : '— Cotización'}
          </div>
          <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            <span className="display-xl" style={{ display: 'block', color: 'var(--ink)' }}>
              {lang === 'en' ? 'Schedule your quote,' : 'Agenda tu cotización,'}
            </span>
            <span className="display-s" style={{ display: 'block', fontStyle: 'italic', color: 'var(--walnut)', marginTop: 'var(--s-2)' }}>
              {lang === 'en' ? 'at home or at our office.' : 'a domicilio o en nuestras oficinas.'}
            </span>
          </h1>
          <p className="lead" style={{ marginTop: 'var(--s-5)', maxWidth: '52ch' }}>
            {lang === 'en'
              ? 'We visit your space, take measurements, and present a proposal designed for you — no commitment.'
              : 'Visitamos tu espacio, tomamos medidas y te presentamos una propuesta diseñada para ti — sin compromiso.'
            }
          </p>

          <div style={{ display: 'flex', border: '1px solid var(--line)', marginTop: 'var(--s-6)', width: '100%', maxWidth: 560 }}>
            {TRUST.map(([n, l], i) => (
              <div key={i} style={{
                flex: 1, padding: 'var(--s-4) var(--s-3)', textAlign: 'center',
                borderRight: i < TRUST.length - 1 ? '1px solid var(--line)' : 'none',
                background: 'var(--bone-50)',
              }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--ink)' }}>{n}</div>
                <div className="small" style={{ marginTop: 4, color: 'var(--ink-60)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page">

          <p className="small" style={{ color: 'var(--ink-60)', marginBottom: 'var(--s-4)', maxWidth: '60ch' }}>
            {lang === 'en'
              ? 'Complete the chat to schedule your quote — 6 quick questions and our team will be in touch via WhatsApp.'
              : 'Completa el chat para agendar tu cotización — 6 preguntas rápidas y nuestro equipo se pone en contacto contigo por WhatsApp.'
            }
          </p>

          <div style={{ border: '1px solid var(--line-strong)', background: 'white', maxWidth: 640 }}>

            <div style={{ padding: 'var(--s-4) var(--s-5)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bone-100)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--walnut)' }}>D</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>Equipo Doig Woodwork</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1FAA58', flexShrink: 0 }} />
                  <span className="small" style={{ color: 'var(--ink-60)' }}>{headerStatus}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 3, padding: '10px var(--s-5) 6px' }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i < step ? 'var(--walnut)' : i === step ? 'var(--ink-40)' : 'var(--line)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>

            <div style={{ padding: 'var(--s-4) var(--s-5)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', height: 280, overflowY: 'auto' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                  {msg.from === 'bot' && (
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bone-100)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 10, color: 'var(--walnut)' }}>D</span>
                    </div>
                  )}
                  <div style={{
                    padding: '10px 14px',
                    fontSize: 14,
                    lineHeight: 1.5,
                    maxWidth: '82%',
                    background: msg.from === 'bot' ? 'var(--bone-50)' : 'var(--ink)',
                    color: msg.from === 'bot' ? 'var(--ink)' : 'var(--bone)',
                    borderRadius: msg.from === 'bot' ? '0 12px 12px 12px' : '12px 0 12px 12px',
                    border: msg.from === 'bot' ? '1px solid var(--line)' : 'none',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {busy && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bone-100)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 10, color: 'var(--walnut)' }}>D</span>
                  </div>
                  <div style={{ padding: '10px 14px', background: 'var(--bone-50)', border: '1px solid var(--line)', borderRadius: '0 12px 12px 12px', display: 'flex', gap: 4, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: '50%', background: 'var(--ink-40)',
                        animation: 'doigTyping 1.2s infinite',
                        animationDelay: `${i * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {done && (
                <div style={{ border: '1px solid var(--line)', background: 'var(--bone-50)', padding: 'var(--s-4)', marginTop: 'var(--s-2)' }}>
                  <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>
                    {lang === 'en' ? 'Request registered' : 'Solicitud registrada'}
                  </div>
                  {[
                    [lang === 'en' ? 'Name' : 'Nombre', answers.name],
                    ['WhatsApp', answers.phone],
                    [lang === 'en' ? 'Email' : 'Correo', answers.email],
                    [lang === 'en' ? 'City' : 'Ciudad', answers.city],
                    [lang === 'en' ? 'Project' : 'Proyecto', answers.project],
                    ['Timeline', answers.timeline],
                  ].map(([label, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)', fontSize: 13 }}>
                      <span className="small" style={{ color: 'var(--ink-60)' }}>{label}</span>
                      <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{val || '—'}</span>
                    </div>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div style={{ borderTop: '1px solid var(--line)', padding: 'var(--s-3) var(--s-5)', minHeight: 64, visibility: (!done && !busy && currentStepData) ? 'visible' : 'hidden' }}>
              {currentStepData && currentStepData.type === 'phone' && (
                <>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      className="input"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      style={{ width: 100, flexShrink: 0, padding: '10px 8px', fontSize: 13 }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
                      ))}
                    </select>
                    <input
                      className="input"
                      type="tel"
                      value={phoneNum}
                      onChange={e => setPhoneNum(e.target.value)}
                      placeholder={currentStepData.ph}
                      style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 0 }}
                      onKeyDown={e => e.key === 'Enter' && phoneNum.trim() && handleAnswer(countryCode + ' ' + phoneNum.trim())}
                      autoFocus
                    />
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => phoneNum.trim() && handleAnswer(countryCode + ' ' + phoneNum.trim())}
                      style={{ borderRadius: 999, flexShrink: 0 }}
                    >
                      →
                    </button>
                  </div>
                  <p className="small" style={{ color: 'var(--ink-60)', marginTop: 6 }}>
                    {lang === 'en' ? 'We\'ll write to you here to confirm your appointment' : 'Te escribiremos aquí para confirmar tu cita'}
                  </p>
                </>
              )}
              {currentStepData && currentStepData.type === 'text' && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    className="input"
                    type={currentStepData.key === 'email' ? 'email' : 'text'}
                    value={textVal}
                    onChange={e => setTextVal(e.target.value)}
                    placeholder={currentStepData.ph}
                    style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 0 }}
                    onKeyDown={e => e.key === 'Enter' && textVal.trim() && handleAnswer(textVal.trim())}
                    autoFocus
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => textVal.trim() && handleAnswer(textVal.trim())}
                    style={{ borderRadius: 999, flexShrink: 0 }}
                  >
                    →
                  </button>
                </div>
              )}
              {currentStepData && currentStepData.type === 'chips' && (
                <>
                  <div className="chip-group" style={{ marginBottom: currentStepData.ph ? 'var(--s-3)' : 0 }}>
                    {currentStepData.chips.map(c => (
                      <button key={c} className="chip" onClick={() => handleAnswer(c)}>{c}</button>
                    ))}
                  </div>
                  {currentStepData.ph && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 'var(--s-3)' }}>
                      <input
                        className="input"
                        value={textVal}
                        onChange={e => setTextVal(e.target.value)}
                        placeholder={currentStepData.ph}
                        style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 0 }}
                        onKeyDown={e => e.key === 'Enter' && textVal.trim() && handleAnswer(textVal.trim())}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => textVal.trim() && handleAnswer(textVal.trim())}
                        style={{ borderRadius: 999, flexShrink: 0 }}
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: 'var(--s-8)', paddingTop: 'var(--s-7)', borderTop: '1px solid var(--line)' }}>
            <div className="eyebrow" style={{ marginBottom: 'var(--s-5)' }}>
              {lang === 'en' ? '— Or contact us directly' : '— O contáctanos directo'}
            </div>
            <div className="contact-direct-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-4)', maxWidth: 560 }}>
              {[
                { label: 'WhatsApp', value: '+52 664 498 7845', sub: lang === 'en' ? 'Immediate response' : 'Respuesta inmediata', href: 'https://wa.me/526644987845' },
                { label: lang === 'en' ? 'Email' : 'Email', value: 'doigwoodwork@gmail.com', sub: lang === 'en' ? 'Formal projects' : 'Proyectos formales', href: 'mailto:doigwoodwork@gmail.com' },
                { label: lang === 'en' ? 'Workshop' : 'Taller', value: 'Tijuana, B.C.', sub: lang === 'en' ? 'Mon–Fri 9:00–18:00' : 'Lun–Vie 9:00–18:00', href: null },
              ].map((item, i) => (
                <div key={i} style={{ padding: 'var(--s-4)', background: 'var(--bone-50)', border: '1px solid var(--line)' }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', display: 'block', marginBottom: 4 }}>{item.value}</a>
                    : <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{item.value}</div>
                  }
                  <div className="small">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes doigTyping {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @media (max-width: 768px) {
          .contact-direct-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export { TestimoniosPage, FaqPage, ContactoPage };
