// pages_cocinas.jsx — Kitchen catalog organized by the 3 styles from home
// Reuses copy and photos from KitchenStyles (kitchen_styles.jsx) so the story matches.

function getStylesData(lang) {
  return lang === 'en' ? [
    {
      id: 'lisa',
      num: '01',
      name: 'Flat Modern',
      tagline: 'Clean, handleless, minimalist.',
      images: ['images/lisa-moderna-01.jpg', 'images/lisa-moderna-03.jpg', 'images/lisa-moderna-04.jpg', 'images/lisa-moderna-05.jpg'],
      description: 'Doors with no moldings or frames. The cleanest, most contemporary look — where the kitchen reads as a single continuous surface. Ideal for open-plan homes and anyone who wants the kitchen to disappear into the architecture.',
      features: [
        'Flat, frameless door',
        'Integrated or push-to-open handles',
        'Matte, satin or woodgrain finishes',
        'Works in any material — laminate, wood veneer, lacquer',
      ],
      bestFor: 'Modern homes · Apartments · Open layouts',
    },
    {
      id: 'shaker',
      num: '02',
      name: 'Regular Shaker',
      tagline: 'Timeless, classic, warm.',
      images: ['images/shaker-regular-03.jpg', 'images/shaker-regular-04.jpg', 'images/shaker-regular-00.jpg', 'images/shaker-regular-01.jpg'],
      description: 'The most recognized style in the world. A flat center panel surrounded by a raised frame, usually 2–3" wide. Balanced between traditional and transitional — it dresses up without feeling fussy. A safe, lasting choice.',
      features: [
        'Framed center panel (2–3" frame)',
        'Pairs with any finish — white, wood, colored',
        'Standard pulls or knobs',
        'Great resale value — universally loved',
      ],
      bestFor: 'Family homes · Traditional + transitional spaces',
    },
    {
      id: 'inset',
      num: '03',
      name: 'Inset with Frame',
      tagline: 'Heritage craftsmanship.',
      images: ['images/inset-00.jpg', 'images/inset-01.jpg', 'images/inset-02.jpg', 'images/inset-03.jpg'],
      description: 'The most demanding construction we offer. The door sits flush inside a visible face-frame — tolerances are measured in millimeters. Highest-end look, references American heritage cabinetry. The choice for a project where the kitchen is the hero.',
      features: [
        'Door inset flush with face-frame',
        'Visible frame around every door',
        'Hand-fit, tight tolerances',
        'Premium hardware options',
      ],
      bestFor: 'Luxury homes · Heritage-style projects · Statement kitchens',
    },
  ] : [
    {
      id: 'lisa',
      num: '01',
      name: 'Cocina Lisa Moderna',
      tagline: 'Limpia, sin manijas, minimalista.',
      images: ['images/lisa-moderna-01.jpg', 'images/lisa-moderna-03.jpg', 'images/lisa-moderna-04.jpg', 'images/lisa-moderna-05.jpg'],
      description: 'Puertas sin molduras ni marcos. Un look más moderno — la cocina se ve como una superficie continua. Ideal para espacios abiertos y para quien quiere que la cocina se integre al resto de la arquitectura.',
      features: [
        'Puerta lisa, sin marcos',
        'Bisagras y rieles de cierre lento',
        'Acabados mate o semimate',
        'Disponible en 2 acabados: melamina y poliuretano',
      ],
      bestFor: 'Casas modernas · Departamentos · Espacios abiertos',
    },
    {
      id: 'shaker',
      num: '02',
      name: 'Cocina Shaker Regular',
      tagline: 'Atemporal, clásica, cálida.',
      images: ['images/shaker-regular-03.jpg', 'images/shaker-regular-04.jpg', 'images/shaker-regular-00.jpg', 'images/shaker-regular-01.jpg'],
      description: 'El estilo más reconocido del mundo. Panel central plano rodeado de un marco resaltado, normalmente de 5–7 cm. Equilibrado entre tradicional y transicional — se ve elegante sin sentirse recargado. Una apuesta segura y duradera.',
      features: [
        'Panel central con marco (5cm/2in)',
        'Acabados a color y a tinta',
        'Para un resultado más personalizado y elegante',
        'Disponible en maderas birch, encino, nogal',
      ],
      bestFor: 'Casas familiares · Espacios tradicionales y transicionales',
    },
    {
      id: 'inset',
      num: '03',
      name: 'Cocina Inset con Bastidor',
      tagline: 'Carpintería de alta gama.',
      images: ['images/inset-00.jpg', 'images/inset-01.jpg', 'images/inset-02.jpg', 'images/inset-03.jpg'],
      description: 'La construcción más exigente que fabricamos. La puerta se coloca a ras dentro de un bastidor visible — las tolerancias se miden en milímetros. El look más alto de gama, referencia la carpintería americana de herencia. Para proyectos donde la cocina es la protagonista.',
      features: [
        'Puerta a ras con el bastidor',
        'Bastidor visible alrededor de cada puerta',
        'Ajuste manual, tolerancias mínimas',
        'Herrajes premium disponibles',
      ],
      bestFor: 'Casas de lujo · Proyectos estilo heritage · Cocinas protagonistas',
    },
  ];
}

function CocinasPage() {
  const { lang } = useLang();
  const t = useT();
  const { go } = useRoute();

  const COPY = lang === 'en' ? {
    eyebrow: '— Kitchens',
    title1: 'Three styles,',
    title2: 'every project',
    titleEm: 'one of a kind.',
    lead: 'Every kitchen we build starts by picking a door style — and ends with finishes, hardware and layout tailored to the space. These are the three styles we fabricate, with projects we\'ve delivered in each.',
    scrollCta: 'Scroll to explore',
    featuresLabel: 'What defines it',
    bestForLabel: 'Ideal for',
    galleryLabel: 'Projects in this style',
    ctaLabel: 'Quote a kitchen in this style',
    indexLabel: 'Index',
  } : {
    eyebrow: '— Cocinas',
    title1: 'Tres estilos,',
    title2: 'cada proyecto',
    titleEm: 'único.',
    lead: 'Cada cocina arranca eligiendo un estilo de puerta — y termina con acabados, herrajes y layout hechos a la medida del espacio. Estos son los tres estilos que fabricamos, con proyectos reales entregados en cada uno.',
    scrollCta: 'Baja para explorar',
    featuresLabel: 'Qué la define',
    bestForLabel: 'Ideal para',
    galleryLabel: 'Proyectos en este estilo',
    ctaLabel: 'Cotizar una cocina en este estilo',
    indexLabel: 'Índice',
  };

  const STYLES = getStylesData(lang);

  const jumpTo = (id) => {
    const el = document.getElementById(`style-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="section">
        <div className="page">
          <div className="eyebrow" style={{ marginBottom: 24 }}>{COPY.eyebrow}</div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '16ch' }}>
            {COPY.title1}<br/>
            {COPY.title2} <em style={{ color: 'var(--walnut)' }}>{COPY.titleEm}</em>
          </h1>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 'var(--s-8)',
            marginTop: 'var(--s-8)',
            alignItems: 'end',
          }} className="cocinas-hero-grid">
            <p className="lead" style={{ maxWidth: '52ch', margin: 0 }}>{COPY.lead}</p>

            {/* Index — quick jump links */}
            <div>
              <div className="mono" style={{
                fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--ink-60)', marginBottom: 16,
              }}>{COPY.indexLabel}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {STYLES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => jumpTo(s.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr auto',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px 0',
                      borderTop: '1px solid var(--line)',
                      background: 'transparent',
                      border: 'none',
                      borderTop: '1px solid var(--line)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      font: 'inherit',
                      color: 'inherit',
                    }}
                    className="cocinas-index-row"
                  >
                    <span className="mono" style={{
                      fontSize: 12, color: 'var(--walnut)', fontWeight: 500,
                    }}>{s.num}</span>
                    <span style={{ fontSize: 17, fontWeight: 500 }}>{s.name}</span>
                    <span className="arrow" style={{ color: 'var(--ink-60)' }}>↓</span>
                  </button>
                ))}
                <div style={{ borderTop: '1px solid var(--line)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES — alternating layout, full-bleed image on top, editorial content below */}
      {STYLES.map((s, i) => (
        <StyleSection key={s.id} style={s} copy={COPY} onCTA={() => go && go('contacto')} index={i} />
      ))}

      <CTABlock />
    </div>
  );
}

function StyleSection({ style, copy, onCTA, index }) {
  const [mainIdx, setMainIdx] = React.useState(0);
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? 'var(--bone)' : 'var(--bone-50)';

  return (
    <section
      id={`style-${style.id}`}
      className="section"
      style={{ background: sectionBg, scrollMarginTop: 80 }}
    >
      <div className="page">
        {/* Section marker */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderTop: '1px solid var(--ink)',
          paddingTop: 24,
          marginBottom: 40,
        }}>
          <div className="mono" style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.08em',
          }}>{style.num} / {String(3).padStart(2, '0')}</div>
          <div className="mono" style={{
            fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--ink-60)',
          }}>{style.tagline}</div>
        </div>

        {/* Title */}
        <h2 className="display-xl" style={{ margin: 0, maxWidth: '18ch', marginBottom: 'var(--s-7)' }}>
          {style.name}
        </h2>

        {/* Main image + side thumbs — constrained width, balanced proportions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px',
          gap: 16,
          maxWidth: 960,
        }}>
          <div style={{
            position: 'relative',
            aspectRatio: '4 / 3',
            overflow: 'hidden',
            background: '#e8e3d9',
          }}>
            <img
              key={style.id + '-' + mainIdx}
              src={style.images[mainIdx]}
              alt={style.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                animation: 'fadeIn 400ms ease',
              }}
            />
            <div className="mono" style={{
              position: 'absolute', top: 14, left: 14,
              background: 'var(--ink)', color: 'var(--bone)',
              padding: '5px 10px', fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              {String(mainIdx + 1).padStart(2, '0')} / {String(style.images.length).padStart(2, '0')}
            </div>
          </div>

          {/* Vertical thumbs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {style.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setMainIdx(i)}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer',
                  background: '#e8e3d9',
                  opacity: mainIdx === i ? 1 : 0.5,
                  outline: mainIdx === i ? '2px solid var(--walnut)' : 'none',
                  outlineOffset: mainIdx === i ? -2 : 0,
                  transition: 'opacity 200ms ease',
                }}
                aria-label={`Foto ${i + 1}`}
              >
                <img src={src} alt="" style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                }}/>
              </button>
            ))}
          </div>
        </div>

        {/* Content — two columns: description + features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--s-8)',
          marginTop: 'var(--s-7)',
          alignItems: 'start',
        }} className="cocinas-content-grid">
          <div>
            <p className="lead" style={{ margin: 0, maxWidth: '52ch' }}>{style.description}</p>

            <div style={{ marginTop: 'var(--s-7)' }}>
              <div className="mono" style={{
                fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--ink-60)', marginBottom: 8,
              }}>{copy.bestForLabel}</div>
              <div style={{ fontSize: 18, fontWeight: 400 }}>{style.bestFor}</div>
            </div>

            <button
              className="btn btn-primary"
              style={{ marginTop: 'var(--s-7)' }}
              onClick={onCTA}
            >
              {copy.ctaLabel} <span className="arrow">→</span>
            </button>
          </div>

          <div>
            <div className="mono" style={{
              fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--ink-60)', marginBottom: 20,
            }}>{copy.featuresLabel}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {style.features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr',
                    gap: 12,
                    padding: '16px 0',
                    borderTop: '1px solid var(--line)',
                    fontSize: 15,
                  }}
                >
                  <span className="mono" style={{
                    fontSize: 11, color: 'var(--walnut)', fontWeight: 500, paddingTop: 3,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{f}</span>
                </li>
              ))}
              <li style={{ borderTop: '1px solid var(--line)', height: 0 }} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CocinasPage = CocinasPage;
