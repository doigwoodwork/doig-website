// pages_other.jsx — Testimonios, FAQ, Contacto

function TestimoniosPage() {
  const t = useT();
  return (
    <div className="page-enter">
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{t.testimonios.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '14ch' }}>
            Clientes que <em style={{ color: 'var(--walnut)' }}>volvieron</em> por más.
          </h1>
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
  const [open, setOpen] = useState(0);
  return (
    <div className="page-enter">
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

function ContactoPage() {
  const t = useT();
  const [tier, setTier] = useState(null);
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
    fd.append('access_key', WEB3FORMS_KEY);
    fd.append('subject', 'Nueva cotización desde doigwoodwork.com');
    fd.append('from_name', 'Doig Woodwork — Web');
    fd.append('tier', tier || 'No especificado');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.');
      }
    } catch (err) {
      setErrorMsg('Error de conexión. Inténtalo de nuevo o escríbenos por WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page-enter">
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>— Cotización</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '14ch' }}>
            Empecemos tu <em style={{ color: 'var(--walnut)' }}>cocina</em>.
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: '60ch' }}>{t.contact.sub}</p>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page">
          <div className="contacto-grid">
            <div>
              {submitted ? (
                <div style={{ padding: 'var(--s-7)', background: 'var(--bone-50)', border: '1px solid var(--line)' }}>
                  <div className="display-m">Gracias.</div>
                  <p className="body-l" style={{ marginTop: 16 }}>Recibimos tu solicitud. Te escribimos en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
                  {/* honeypot anti-spam */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                  <div className="form-fields-grid">
                    <div className="form-row">
                      <label>{t.contact.fields.name}</label>
                      <input className="input" name="name" required placeholder="Tu nombre" />
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.email}</label>
                      <input className="input" name="email" type="email" required placeholder="tu@correo.com" />
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.phone}</label>
                      <input className="input" name="phone" placeholder="+52" />
                    </div>
                    <div className="form-row">
                      <label>{t.contact.fields.city}</label>
                      <input className="input" name="city" placeholder="Tijuana, San Diego…" />
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
                    <textarea className="textarea" name="message" placeholder="Tamaño aproximado, estilo deseado, plazos…" />
                  </div>
                  {errorMsg && (
                    <div style={{ padding: 12, border: '1px solid #c44', background: '#fff5f5', color: '#a22', fontSize: 14 }}>
                      {errorMsg}
                    </div>
                  )}
                  <div className="contacto-submit-row">
                    <button type="submit" disabled={sending} className="btn btn-primary btn-lg">
                      {sending ? 'Enviando…' : t.contact.submit} <span className="arrow">→</span>
                    </button>
                    <span className="mono" style={{ color: 'var(--ink-60)' }}>{t.contact.or}</span>
                    <a href="https://wa.me/526644987845" target="_blank" className="btn btn-wa btn-lg"><WAIcon /> WhatsApp</a>
                  </div>
                </form>
              )}
            </div>

            <aside style={{ padding: 'var(--s-6)', background: 'var(--bone-50)', border: '1px solid var(--line)', alignSelf: 'start' }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>— Contacto directo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
                <div>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-60)' }}>WhatsApp</div>
                  <a href="https://wa.me/526644987845" className="display-s" style={{ fontSize: 22 }}>+52 664 498 7845</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-60)' }}>Email</div>
                  <a href="mailto:hola@doigwoodwork.com" style={{ fontSize: 15 }}>hola@doigwoodwork.com</a>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-60)' }}>Taller</div>
                  <div style={{ fontSize: 15 }}>Tijuana, Baja California</div>
                  <div className="small">Lun–Vie · 9:00–18:00</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { TestimoniosPage, FaqPage, ContactoPage });
