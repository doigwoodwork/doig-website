// pages_other.jsx — Testimonios, FAQ, Contacto

import React, { useState } from 'react'
import { useLang, useT, useRoute, Img, WAIcon, CTABlock } from './components.jsx'
import { PROJECTS } from './data.jsx'
import { SEO } from './SEO.jsx'
import { supabase } from './lib/supabase.js'

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
                  <Img src={it.img || PROJECTS[i % PROJECTS.length].img} alt={it.author} aspect="4/5" />
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
                  <Img src={it.img || PROJECTS[(i + 1) % PROJECTS.length].img} alt={it.author} aspect="4/5" />
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
  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'FAQ — Custom Kitchen Questions Answered' : 'Preguntas Frecuentes — Cocinas a Medida'}
        description={lang === 'en' ? 'Common questions about custom kitchens: timelines, pricing, materials, and installation. Everything you need to know before starting your project.' : 'Preguntas comunes sobre cocinas a medida: tiempos, precios, materiales e instalación. Todo lo que necesitas saber antes de iniciar tu proyecto.'}
        canonical={lang === 'en' ? '/en/faq' : '/faq'}
        lang={lang}
      />
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

// Web3Forms — reemplaza WEB3FORMS_KEY con tu access key real (https://web3forms.com)
// El destino del correo se configura al registrar la key en web3forms.com con doigwoodwork@gmail.com
const WEB3FORMS_KEY = 'c5559ddd-0463-4c7d-8247-336939a5a22d';

const COUNTRY_CODE_MAP = {
  '+52': 'México',
  '+1':  'USA',
};

function ContactoPage() {
  const t = useT();
  const { lang } = useLang();
  const [tier, setTier] = useState(null);
  const [countryCode, setCountryCode] = useState('+52');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get('name');
    const email = fd.get('email');
    const phoneNum = fd.get('phone');
    const city = fd.get('city');
    const message = fd.get('message');
    const fullPhone = phoneNum ? `${countryCode} ${phoneNum}` : null;

    if (phoneNum) {
      fd.set('phone', fullPhone);
    }
    fd.append('access_key', WEB3FORMS_KEY);
    fd.append('subject', 'Nueva cotización desde doigwoodwork.com');
    fd.append('from_name', 'Doig Woodwork — Web');
    fd.append('tier', tier || 'No especificado');

    // Insert into Supabase ERP (fire and forget — don't block on it)
    const lead = {
      opportunity_name: `${name} - Web`,
      contact_name: name,
      email: email,
      phone: fullPhone,
      city: city || null,
      country: COUNTRY_CODE_MAP[countryCode] ?? countryCode,
      stage: 'nuevo',
      lead_type: 'lead',
      source: 'website_contact_form',
      properties: {
        interest_type: 'Cocina',
        estilo_puertas: tier || null,
        initial_message: message || null,
        lang: lang,
      },
      is_legacy_migration: false,
    };
    supabase.from('leads').insert(lead).then(({ error }) => {
      if (error) console.error('Lead insert error:', error);
    });

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || t.contactoPage.errorGeneric);
      }
    } catch (err) {
      setErrorMsg(t.contactoPage.errorConnection);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'Contact — Request Your Custom Kitchen Quote' : 'Contacto — Solicita tu Cotización de Cocina a Medida'}
        description={lang === 'en' ? 'Ready to renovate your kitchen? Contact us via WhatsApp or fill out the form. Serving Tijuana, San Diego, Mexicali, and Ensenada.' : '¿Lista para renovar tu cocina? Contáctanos por WhatsApp o llena el formulario. Atendemos Tijuana, San Diego, Mexicali y Ensenada.'}
        canonical={lang === 'en' ? '/en/contacto' : '/contacto'}
        lang={lang}
      />
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{t.contactoPage.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '14ch' }} dangerouslySetInnerHTML={{ __html: t.contactoPage.headline }} />
          <p className="lead" style={{ marginTop: 32, maxWidth: '60ch' }}>{t.contact.sub}</p>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page">
          <div className="contacto-grid">
            <div>
              {submitted ? (
                <div style={{ padding: 'var(--s-7)', background: 'var(--bone-50)', border: '1px solid var(--line)' }}>
                  <div className="display-m">{t.contactoPage.thanks}</div>
                  <p className="body-l" style={{ marginTop: 16 }}>{t.contactoPage.thanksMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
                  {/* honeypot anti-spam */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                  <div className="form-fields-grid">
                    <div className="form-row">
                      <label>{t.contact.fields.name}</label>
                      <input className="input" name="name" required placeholder={t.contactoPage.namePlaceholder} />
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.email}</label>
                      <input className="input" name="email" type="email" required placeholder={t.contactoPage.emailPlaceholder} />
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.phone}</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <select
                          className="input"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          style={{ width: 80, flexShrink: 0 }}
                        >
                          <option value="+52">+52</option>
                          <option value="+1">+1</option>
                        </select>
                        <input
                          className="input"
                          name="phone"
                          type="tel"
                          placeholder={t.contactoPage.phonePlaceholder}
                          maxLength={10}
                          pattern="[0-9]{10}"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.city}</label>
                      <input className="input" name="city" placeholder={t.contactoPage.cityPlaceholder} />
                    </div>
                  </div>
                  <div className="form-row">
                    <label>{t.contact.fields.tier}</label>
                    <div className="chip-group">
                      {t.contact.chips.map(c => (
                        <div key={c} className={`chip ${tier === c ? 'on' : ''}`} onClick={() => setTier(c)}>{c}</div>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <label>{t.contact.fields.msg}</label>
                    <textarea className="textarea" name="message" placeholder={t.contactoPage.msgPlaceholder} />
                  </div>
                  {errorMsg && (
                    <div style={{ padding: 12, border: '1px solid #c44', background: '#fff5f5', color: '#a22', fontSize: 14 }}>
                      {errorMsg}
                    </div>
                  )}
                  <div className="contacto-submit-row">
                    <button type="submit" disabled={sending} className="btn btn-primary btn-lg">
                      {sending ? t.contactoPage.sending : t.contact.submit} <span className="arrow">→</span>
                    </button>
                    <span className="mono" style={{ color: 'var(--ink-60)' }}>{t.contact.or}</span>
                    <a href="https://wa.me/526644987845" target="_blank" className="btn btn-wa btn-lg"><WAIcon /> WhatsApp</a>
                  </div>
                </form>
              )}
            </div>

            <aside style={{ padding: 'var(--s-6)', background: 'var(--bone-50)', border: '1px solid var(--line)', alignSelf: 'start' }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>{t.contactoPage.directContact}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
                <div>
                  <div className="mono" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-40)' }}>{t.contactoPage.whatsapp}</div>
                  <a href="https://wa.me/526644987845" className="display-s" style={{ fontSize: 22 }}>+52 664 498 7845</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-40)' }}>{t.contactoPage.email}</div>
                  <a href="mailto:doigwoodwork@gmail.com" style={{ fontSize: 15 }}>doigwoodwork@gmail.com</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-40)' }}>{t.contactoPage.workshop}</div>
                  <div style={{ fontSize: 15 }}>Tijuana, Baja California</div>
                  <div className="small">{t.contactoPage.hours}</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export { TestimoniosPage, FaqPage, ContactoPage };
