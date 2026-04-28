// pages_home.jsx — Home page

function HomePage() {
  const t = useT();
  const { lang } = useLang();
  const { go } = useRoute();

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero">
        <div className="page">
          <div style={{ marginBottom: 'var(--s-6)' }}>
            <span className="eyebrow">{t.hero.eyebrow}</span>
          </div>
          <div className="hero-grid">
            <div>
              <h1 className="hero-title">
                <span className="sub-line">{t.hero.line1}</span>
                <span className="sub-line"><em>{t.hero.line2}</em></span>
                <span className="sub-line">{t.hero.line3}</span>
              </h1>
              <p className="lead" style={{ marginTop: 32, maxWidth: '52ch' }}>{t.hero.sub}</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
                <a href="https://wa.me/526644987845" target="_blank" className="btn btn-wa btn-lg">
                  <WAIcon /> {t.hero.primary}
                </a>
                <button className="btn btn-ghost btn-lg" onClick={() => go('proceso')}>
                  {t.hero.secondary} <span className="arrow">→</span>
                </button>
              </div>
            </div>
            <div>
              <Img src="images/hero.jpg" alt="Kitchen hero" aspect="4/5" label="Cocina destacada" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-60)' }}>
                <span>— Liso / Encino Shaker mixto</span>
                <span>Rosarito ‘25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={['Diseño', 'Fabricación', 'Instalación', 'A la medida', 'Calidad garantizada', 'Tijuana · San Diego']} />

      {/* MANIFESTO */}
      <section className="section">
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-9)', alignItems: 'start' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 24 }}>{t.manifesto.eyebrow}</div>
              <h2 className="display-l" style={{ margin: 0 }}>{t.manifesto.headline}</h2>
            </div>
            <div>
              <p className="lead" style={{ margin: 0 }}>{t.manifesto.body}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s-5)', marginTop: 'var(--s-7)' }}>
                {t.manifesto.stats.map((s, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                    <div className="display" style={{ fontSize: 'clamp(32px, 3.2vw, 44px)', lineHeight: 1, letterSpacing: '-0.01em' }}>{s.n}</div>
                    <div className="mono" style={{ color: 'var(--ink-60)', marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 11 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KITCHEN STYLES — 4 door types */}
      <KitchenStyles lang={lang} go={go} />

      {/* ENGINEERING */}
      <EngineeringSection />

      {/* PROCESS PREVIEW */}
      <section className="section">
        <div className="page">
          <SectionHeader
            eyebrow={t.proceso.eyebrow}
            headline={t.proceso.headline}
            body={t.proceso.body}
            align="split"
            cta={<button className="btn btn-ghost btn-sm" onClick={() => go('proceso')} style={{ marginTop: 24 }}>Ver proceso completo <span className="arrow">→</span></button>}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--s-5)', marginTop: 'var(--s-6)' }}>
            {t.proceso.phases.map((p, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--ink)', paddingTop: 16 }}>
                <div className="mono" style={{ color: 'var(--walnut)', fontWeight: 500 }}>{p.n}</div>
                <h4 className="display-s" style={{ marginTop: 8, fontSize: 22, lineHeight: 1.15 }}>{p.title}</h4>
                <div className="mono" style={{ marginTop: 16, color: 'var(--ink-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.12em' }}>→ {p.deliverable}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section" style={{ background: 'var(--bone-50)' }}>
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--s-8)', alignItems: 'stretch' }}>
            <Img src={t.testimonios.list[0].img || PHOTOS.kitchen2} alt={t.testimonios.list[0].author} aspect="3/4" label="Cliente" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>— Testimonios</div>
              <blockquote style={{
                margin: 0,
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                lineHeight: 1.25,
                letterSpacing: '-0.005em',
              }}>
                <span style={{ color: 'var(--walnut)' }}>“</span>
                {t.testimonios.list[0].quote}
                <span style={{ color: 'var(--walnut)' }}>”</span>
              </blockquote>
              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{t.testimonios.list[0].author}</div>
                  <div className="small">{t.testimonios.list[0].project}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => go('testimonios')}>Ver más <span className="arrow">→</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
}

window.HomePage = HomePage;
