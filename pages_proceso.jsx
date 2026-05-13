// pages_proceso.jsx — Process detail

import React from 'react'
import { useLang, useT, useRoute, SectionHeader, CTABlock } from './components.jsx'
import { SEO } from './SEO.jsx'

function ProcesoPage() {
  const t = useT();
  const { lang } = useLang();
  const { go } = useRoute();

  // Cargar script de Instagram para embeds
  React.useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="page-enter">
      <SEO
        title={lang === 'en' ? 'Our Process — Custom Kitchen in 5 Steps' : 'Nuestro Proceso — De la Medición a la Instalación en 5 Pasos'}
        description={lang === 'en' ? 'From measurements to installation: see how we design, build, and deliver your custom kitchen in Tijuana. Timeline, payment schedule, and warranty included.' : 'Así fabricamos tu cocina: visita de medición, diseño 3D, fabricación, instalación y garantía. Conoce el proceso completo y el esquema de pagos de Doig Woodwork.'}
        canonical={lang === 'en' ? '/en/proceso' : '/proceso'}
        lang={lang}
      />
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{t.proceso.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '14ch' }} dangerouslySetInnerHTML={{ __html: t.procesoPage.heroHeadline }} />
          <p className="lead" style={{ marginTop: 32, maxWidth: '60ch' }}>
            {t.procesoPage.heroLead}
          </p>
        </div>
      </section>

      {/* VIDEO SECTION — Cómo cotizar */}
      <section style={{ paddingBottom: 'var(--s-8)' }}>
        <div className="page">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            border: '1px solid var(--line)',
            background: 'var(--bone-50)',
            overflow: 'hidden',
          }} className="proceso-video-grid">

            {/* Instagram embed */}
            <div style={{ background: 'var(--ink)', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DKdUTngM9F_/"
                data-instgrm-version="14"
                style={{
                  background: 'var(--ink)',
                  border: 'none',
                  borderRadius: 0,
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  minWidth: 0,
                }}
              />
            </div>

            {/* Copy */}
            <div style={{ padding: 'var(--s-7) var(--s-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="eyebrow" style={{ color: 'var(--walnut)', marginBottom: 'var(--s-3)' }}>
                {lang === 'en' ? '— In 60 seconds' : '— En 60 segundos'}
              </div>
              <h2 className="display-m" style={{ margin: '0 0 var(--s-4)' }}>
                {lang === 'en'
                  ? 'How to quote a custom kitchen in Tijuana?'
                  : '¿Cómo cotizar una cocina integral a medida en Tijuana?'
                }
              </h2>
              <p className="body-l" style={{ color: 'var(--ink-60)', marginBottom: 'var(--s-5)', maxWidth: '46ch' }}>
                {lang === 'en'
                  ? 'The full process in under 60 seconds: home visit, measurements, 3D design, fabrication, and installation. Transparent from day one.'
                  : 'Todo el proceso en menos de 60 segundos: visita a domicilio, medidas, diseño 3D, fabricación e instalación. Transparente desde el primer día.'
                }
              </p>

              {/* Keyword chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--s-5)' }}>
                {(lang === 'en'
                  ? ['Custom kitchen quote', 'Fabrication process', 'Tijuana kitchen', 'How it works']
                  : ['Cotizar cocina Tijuana', 'Proceso fabricación', 'Cocina a medida', 'Primera visita']
                ).map(chip => (
                  <span key={chip} style={{
                    background: 'var(--bone)',
                    border: '1px solid var(--line)',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontSize: 11,
                    color: 'var(--ink-60)',
                  }}>{chip}</span>
                ))}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => go('contacto')}
                style={{ alignSelf: 'flex-start' }}
              >
                {lang === 'en' ? 'Start my quote →' : 'Iniciar mi cotización →'}
              </button>

              <p className="small" style={{ marginTop: 'var(--s-3)', color: 'var(--ink-60)', fontStyle: 'italic' }}>
                {lang === 'en'
                  ? 'Or keep reading for the full process breakdown below.'
                  : 'O sigue leyendo para ver el proceso completo en detalle.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--s-10)' }}>
        <div className="page">
          {t.proceso.phases.map((p, i) => (
            <div className="phase-card" key={i}>
              <div className="phase-num">{p.n}</div>
              <div>
                <h2 className="display-m" style={{ margin: 0 }}>{p.title}</h2>
                <div className="mono" style={{ marginTop: 12, color: 'var(--ink-40)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.12em' }}>
                  {t.procesoPage.deliverableLabel} → {p.deliverable}
                </div>
              </div>
              <div>
                <p className="body-l" style={{ margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment plans */}
      {/* Pagos — unified section */}
      <section className="section" style={{ background: 'var(--bone-50)' }}>
        <div className="page">
          <SectionHeader
            eyebrow={t.procesoPage.paymentEyebrow}
            headline={t.procesoPage.paymentHeadline}
            body={t.procesoPage.paymentBody}
            align="split"
          />

          {/* Two-column layout: schedule + methods */}
          <div className="proceso-payment-grid">

            {/* LEFT — schedule */}
            <div>
              <div className="mono" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-40)', marginBottom: 24 }}>
                {t.procesoPage.scheduleLabel}
              </div>
              <div style={{ display: 'grid', gap: 0, border: '1px solid var(--ink)' }}>
                {t.procesoPage.scheduleRows.map((s, i, arr) => (
                  <div key={i} className="payment-schedule-row" style={{
                    borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
                    background: 'white',
                  }}>
                    <div className="display payment-schedule-pct" style={{ fontSize: 56, lineHeight: 0.95, fontStyle: 'italic', color: 'var(--walnut)' }}>{s.n}</div>
                    <div>
                      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', marginBottom: 4 }}>{s.k}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.45 }}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-60)', fontStyle: 'italic' }}>
                {t.procesoPage.scheduleNote}
              </div>
            </div>

            {/* RIGHT — methods */}
            <div>
              <div className="mono" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-40)', marginBottom: 24 }}>
                {t.procesoPage.methodsLabel}
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  {
                    k: t.procesoPage.methods[0].k,
                    d: t.procesoPage.methods[0].d,
                    badge: t.procesoPage.methods[0].badge,
                    highlight: true,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="10" width="28" height="18" rx="1" />
                        <circle cx="18" cy="19" r="4" />
                        <path d="M8 14v10M28 14v10" />
                      </svg>
                    ),
                  },
                  {
                    k: t.procesoPage.methods[1].k,
                    d: t.procesoPage.methods[1].d,
                    badge: t.procesoPage.methods[1].badge,
                    highlight: false,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 14h20l-4-4M30 22H10l4 4" />
                      </svg>
                    ),
                  },
                  {
                    k: t.procesoPage.methods[2].k,
                    d: t.procesoPage.methods[2].d,
                    badge: t.procesoPage.methods[2].badge,
                    highlight: false,
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="8" width="28" height="20" rx="2" />
                        <path d="M4 15h28M9 23h6" />
                      </svg>
                    ),
                  },
                ].map((m, i) => (
                  <div key={i} className="payment-method-row" style={{
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr auto',
                    alignItems: 'center',
                    gap: 20,
                    padding: '20px 24px',
                    background: m.highlight ? 'var(--ink)' : 'white',
                    color: m.highlight ? 'var(--bone)' : 'var(--ink)',
                    border: '1px solid ' + (m.highlight ? 'var(--ink)' : 'var(--line)'),
                  }}>
                    <div style={{ color: m.highlight ? 'var(--bone)' : 'var(--walnut)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.icon}</div>
                    <div>
                      <div className="display-s" style={{ fontSize: 22, margin: 0, lineHeight: 1.1 }}>{m.k}</div>
                      <div style={{ fontSize: 13, color: m.highlight ? 'rgba(250,246,240,0.7)' : 'var(--ink-60)', marginTop: 2 }}>{m.d}</div>
                    </div>
                    <span className="mono payment-method-badge" style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '6px 10px',
                      border: '1px solid ' + (m.highlight ? 'var(--bone)' : 'var(--ink-60)'),
                      color: m.highlight ? 'var(--bone)' : 'var(--ink-60)',
                      whiteSpace: 'nowrap',
                    }}>{m.badge}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-60)', fontStyle: 'italic' }}>
                {t.procesoPage.methodsNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="section">
        <div className="page">
          <SectionHeader
            eyebrow={t.procesoPage.warrantyEyebrow}
            headline={t.procesoPage.warrantyHeadline}
            body={t.procesoPage.warrantyBody}
            align="split"
          />
          <div className="warranty-grid">
            {t.procesoPage.warranties.map((s, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                <h3 className="display-s" style={{ margin: 0 }}>{s.k}</h3>
                <div style={{ marginTop: 8, color: 'var(--ink-60)' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
}

export default ProcesoPage;
