// Kitchen Styles — interactive tab selector (home page)
// Option C: 4 tabs up top, big content panel below. Responsive.

function KitchenStyles({ lang = 'es', go }) {
  const [active, setActive] = React.useState(0);
  const [imgIdx, setImgIdx] = React.useState(0);

  // Reset image index when switching styles
  React.useEffect(() => { setImgIdx(0); }, [active]);

  const STYLES = lang === 'en' ? [
    {
      id: 'lisa',
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
      name: 'Cocina Lisa Moderna',
      tagline: 'Limpia, sin manijas, minimalista.',
      images: ['images/lisa-moderna-01.jpg', 'images/lisa-moderna-03.jpg', 'images/lisa-moderna-04.jpg', 'images/lisa-moderna-05.jpg'],
      description: 'Puertas sin molduras ni marcos. Un look mas moderno — la cocina se ve como una superficie continua. Ideal para espacios abiertos y para quien quiere que la cocina se integre al resto de la arquitectura.',
      features: [
        'Puerta lisa, sin marcos',
        'Bisagras y rieles de cierre lento',
        'Acabados mate o semimate',
        'Disponible en 2 acabados : melamina y poliuretano',
      ],
      bestFor: 'Casas modernas · Departamentos · Espacios abiertos',
    },
    {
      id: 'shaker',
      name: 'Cocina Shaker Regular',
      tagline: 'Atemporal, clásica, cálida.',
      images: ['images/shaker-regular-03.jpg', 'images/shaker-regular-04.jpg', 'images/shaker-regular-00.jpg', 'images/shaker-regular-01.jpg'],
      description: 'El estilo más reconocido del mundo. Panel central plano rodeado de un marco resaltado, normalmente de 5–7 cm. Equilibrado entre tradicional y transicional — se ve elegante sin sentirse recargado. Una apuesta segura y duradera.',
      features: [
        'Panel central con marco (5cm/2in)',
        'Acabados a color y a tinta',
        'Para un resultado mas personalizado y elegante',
        'Disponible en maderas birch, encino, nogal.',
      ],
      bestFor: 'Casas familiares · Espacios tradicionales y transicionales',
    },
    {
      id: 'inset',
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

  const current = STYLES[active];

  const copy = lang === 'en' ? {
    eyebrow: '— Styles',
    headline: 'Three door styles.',
    body: 'Every project starts by choosing a door style. Here are the three we build.',
    featuresLabel: 'What defines it',
    bestForLabel: 'Best for',
    cta: 'Get a quote for this style',
  } : {
    eyebrow: '— Estilos',
    headline: 'Estilos de cocinas',
    body: 'Elige de nuestros 3 estilos para tu cocina. Cada estilo cuenta con diferentes materiales y acabados para tu elección.',
    featuresLabel: 'Qué la define',
    bestForLabel: 'Ideal para',
    cta: 'Cotizar este estilo',
  };

  return (
    <section className="section ks-section">
      <div className="page">
        <div className="ks-header">
          <div className="eyebrow">{copy.eyebrow}</div>
          <h2 className="display ks-headline" style={{ whiteSpace: 'pre-line' }}>{copy.headline}</h2>
          <p className="ks-lede">{copy.body}</p>
        </div>

        {/* Tab selector */}
        <div className="ks-tabs" role="tablist" aria-label="Kitchen door styles">
          {STYLES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              className={`ks-tab ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="ks-tab-num mono">0{i + 1}</span>
              <span className="ks-tab-name">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="ks-panel">
          <div className="ks-image-col">
            <div className="ks-image-wrap">
              <img
                key={current.id + '-' + imgIdx}
                src={current.images[imgIdx]}
                alt={current.name}
                className="ks-image"
              />
              <div className="ks-image-tag mono">0{active + 1} / 0{STYLES.length}</div>
            </div>
            {current.images.length > 1 && (
              <div className="ks-thumbs" role="tablist" aria-label="Fotos">
                {current.images.map((src, i) => (
                  <button
                    key={i}
                    className={`ks-thumb ${imgIdx === i ? 'is-active' : ''}`}
                    onClick={() => setImgIdx(i)}
                    aria-label={`Foto ${i + 1}`}
                    aria-selected={imgIdx === i}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ks-content">
            <div className="ks-tagline mono">{current.tagline}</div>
            <h3 className="display ks-title">{current.name}</h3>
            <p className="ks-description">{current.description}</p>

            <div className="ks-features-block">
              <div className="ks-features-label mono">{copy.featuresLabel}</div>
              <ul className="ks-features">
                {current.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="ks-bestfor">
              <span className="ks-bestfor-label mono">{copy.bestForLabel} — </span>
              <span className="ks-bestfor-value">{current.bestFor}</span>
            </div>

            <button className="btn btn-primary ks-cta" onClick={() => go && go('contacto')}>
              {copy.cta} <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.KitchenStyles = KitchenStyles;
