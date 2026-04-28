// engineering.jsx — "Cabinet engineering" section, replaces the tiers block on home.
// Technical-drawing aesthetic: exploded base cabinet with 6 numbered callouts.

const ENG_COPY = {
  es: {
    eyebrow: '— Ingeniería',
    headline: 'Anatomía de un gabinete',
    body: 'Manejamos la misma estructura de gabinetes y cajones para todas nuestras cocinas, lo que cambia son el estilo de puertas y el acabado de preferencia.',
    specLabel: 'Especificación estándar',
    callouts: [
      { n: '01', title: 'Gabinetes de triplay birch', spec: '3/4 DE PULGADA', body: 'Estructura de triplay de madera birch con sellado transparente. Resistente a humedad y olores. ' },
      { n: '02', title: 'Cajones de triplay birch', spec: 'Cajones sólidos', body: 'Cajones de madera sólida ensamblados con tornillos en diagonal ocultos. Más resistentes que grapados o atornillados — línea Merivobox de Blum disponible bajo petición.' },
      { n: '03', title: 'Rieles de Cierre Lento', spec: 'Extensión total', body: 'Todos los cajones cierran solos sin golpe. Extensión total para acceso completo al fondo. Incluído en todos los proyectos — rieles Blum undermount disponibles bajo petición.' },
      { n: '04', title: 'Bisagras de Cierre Lento', spec: 'Ajuste 3D', body: 'Bisagras ocultas con amortiguador integrado. Ajuste en tres ejes después de instaladas — si la casa se asienta, las puertas se pueden recalibrar sin cambiar herraje.' },
      { n: '05', title: 'Frentes Personalizados', spec: 'Melamina o madera', body: 'Según el nivel: Liso Moderno, Shaker Regular, o\nInset con Bastidor' },
      { n: '06', title: 'Acabado Resistente', spec: 'Sellado multicapa', body: 'Estructura de triplay de madera birch con sellado transparente. Resistente a humedad y olores.' },
    ],
    standards: [
      { k: 'Estructura', v: 'Triplay Birch ¾"' },
      { k: 'Herrajes', v: 'Rieles y bisagras de cierre lento' },
      { k: 'Ensamble', v: 'Con tornillo oculto, sin grapas' },
      { k: 'Garantía', v: 'En fabricación, instalación y herrajes' },
    ],
  },
  en: {
    eyebrow: '— Engineering',
    headline: 'How a Bien cabinet is built.',
    body: 'Every kitchen is assembled with the same six technical decisions. There is no "basic" tier in the structure — the difference between a Kitchen A and a AAA lives in the fronts and hardware, not in what holds your kitchen together over time.',
    specLabel: 'Standard spec',
    callouts: [
      { n: '01', title: 'Baltic Birch Box', spec: '¾" · 13-ply', body: 'Baltic birch plywood structure with transparent seal. Resists humidity and odors. Unlike MDF, it does not swell when moisture finds it.' },
      { n: '02', title: 'Dovetail Joints', spec: 'Solid drawers', body: 'Solid-wood drawers assembled with dovetail joints. Stronger than stapled or screwed boxes — they hold weight and daily use without coming apart.' },
      { n: '03', title: 'Soft-Close Rails', spec: 'Full extension', body: 'Every drawer closes itself, no slam. Full extension so you can reach the back. Included on every tier, not an upsell.' },
      { n: '04', title: 'Soft-Close Hinges', spec: '3D adjustable', body: 'Concealed hinges with integrated dampeners. Three-axis adjustment after install — if the house settles, doors can be re-tuned without replacing hardware.' },
      { n: '05', title: 'Custom Fronts', spec: 'Melamine or wood', body: 'Depending on tier: Arauco/Vesto melamine (Kitchen A), fine woods with ABS edging (AA), or solid wood with custom finish (AAA).' },
      { n: '06', title: 'Durable Finish', spec: 'Multi-coat seal', body: 'Lacquers and seals applied in-booth with controlled cure time. Resists scratches, grease stains, and common household cleaners.' },
    ],
    standards: [
      { k: 'Structure', v: 'Baltic Birch ¾"' },
      { k: 'Base hardware', v: 'Soft-close included' },
      { k: 'Assembly', v: 'Dovetail · blind nail' },
      { k: 'Warranty', v: '1-year service' },
    ],
  },
};

function CabinetDiagram({ activeNum, onHover }) {
  // Isometric base cabinet in line-art, inspired by industrial spec drawings.
  // viewBox: 600 wide × 680 tall. Cabinet body on top, exploded drawers + slides below.
  //
  // Isometric offsets: depth line goes up-right at ~30°. Use dx=90, dy=-45 for the depth vector.
  // Front face is drawn straight-on; top and right face follow isometric projection.

  const stroke = '#1A1916';
  const mid = 'rgba(26,25,22,0.45)';
  const faint = 'rgba(26,25,22,0.18)';
  const accent = 'var(--walnut, #7A5632)';
  const bone = '#F2EDE4';
  const SW = 1.2;        // main outline stroke width
  const SW_THIN = 0.7;   // secondary lines

  // Front face rectangle of the cabinet body
  const F = { x: 120, y: 90, w: 300, h: 340 };  // left, top, width, height
  // Depth projection vector
  const dx = 78, dy = -42;

  // Derived points (F = front; B = back shifted by dx/dy)
  const F_TL = { x: F.x, y: F.y };
  const F_TR = { x: F.x + F.w, y: F.y };
  const F_BL = { x: F.x, y: F.y + F.h };
  const F_BR = { x: F.x + F.w, y: F.y + F.h };
  const B_TL = { x: F_TL.x + dx, y: F_TL.y + dy };
  const B_TR = { x: F_TR.x + dx, y: F_TR.y + dy };

  // Drawer rail (top): a horizontal band across the front, with a sash below
  const RAIL_Y = F.y + 70; // top drawer front bottom
  const SASH_Y = RAIL_Y + 14;

  // Right door open ~ 100°: the open door is drawn as a parallelogram extending to the right
  // Hinges on the right side of center; door front at x ≈ F.x + F.w/2 + 6 (reveal)
  // Door extends right by ~110 (toward viewer direction)
  const doorLeft = F.x + F.w / 2 + 3;
  const doorOpenDX = 108;
  const doorOpenDY = -28; // slight upward tilt for perspective

  // Cabinet interior back panel (visible behind open door)
  const interiorBackX = doorLeft - 2;
  const interiorBackW = F.w / 2 - 5;

  // Dots — anchored to visual features on the diagram
  const dots = [
    { n: '01', cx: B_TL.x + 35, cy: B_TL.y + 40 },      // Top rear corner — carcass
    { n: '02', cx: F.x + 120, cy: F.y + 520 },          // Lower exploded drawer box — dovetail/joinery
    { n: '03', cx: F.x + 240, cy: F.y + 595 },          // Slide rail under drawer
    { n: '04', cx: doorLeft + 8, cy: F.y + 170 },       // Hinge point (right side of center stile, near top)
    { n: '05', cx: F.x + F.w/4, cy: F.y + F.h - 80 },   // Left door face — fronts
    { n: '06', cx: F.x + F.w + 18, cy: F.y + F.h + 10 },// Outer right edge bottom — finish
  ];

  return (
    <svg
      viewBox="0 0 600 720"
      width="100%"
      style={{ display: 'block', maxHeight: 720 }}
      aria-label="Diagrama técnico de gabinete"
    >
      <defs>
        <pattern id="grid-bg" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(26,25,22,0.04)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Background + corner marks */}
      <rect width="600" height="720" fill="url(#grid-bg)" />
      <g stroke={mid} strokeWidth="1" fill="none">
        <path d="M 20 20 L 40 20 M 20 20 L 20 40" />
        <path d="M 580 20 L 560 20 M 580 20 L 580 40" />
        <path d="M 20 700 L 40 700 M 20 700 L 20 680" />
        <path d="M 580 700 L 560 700 M 580 700 L 580 680" />
      </g>

      {/* =========================================================
          CABINET BODY — isometric line-art
          Drawing order (back to front):
          1. Back of the open top (interior ceiling/back wall)
          2. Right side face
          3. Top face (rim visible above the drawer)
          4. Front carcass outline
          5. Top drawer front + sash
          6. Closed left door
          7. Open right door (swung forward-right)
          8. Toe kick
          ========================================================= */}

      {/* Interior back wall (visible through open door) */}
      <rect
        x={interiorBackX} y={F.y}
        width={interiorBackW} height={F.h}
        fill="#F7F3E9" stroke="none"
      />

      {/* TOP face (isometric parallelogram) — open cabinet top rim */}
      <polygon
        points={`${F_TL.x},${F_TL.y} ${F_TR.x},${F_TR.y} ${B_TR.x},${B_TR.y} ${B_TL.x},${B_TL.y}`}
        fill="#FBF8F1" stroke={stroke} strokeWidth={SW} strokeLinejoin="round"
      />
      {/* Inside thickness of top rim (second line to suggest material thickness) */}
      <polygon
        points={`${F_TL.x + 8},${F_TL.y + 4} ${F_TR.x - 8},${F_TR.y + 4} ${B_TR.x - 8},${B_TR.y + 4} ${B_TL.x + 8},${B_TL.y + 4}`}
        fill="none" stroke={stroke} strokeWidth={SW_THIN}
      />

      {/* RIGHT side face */}
      <polygon
        points={`${F_TR.x},${F_TR.y} ${B_TR.x},${B_TR.y} ${B_TR.x},${B_TR.y + F.h} ${F_TR.x},${F_BR.y}`}
        fill="#F7F3E9" stroke={stroke} strokeWidth={SW} strokeLinejoin="round"
      />

      {/* FRONT carcass outline */}
      <rect
        x={F.x} y={F.y} width={F.w} height={F.h}
        fill="none" stroke={stroke} strokeWidth={SW}
      />

      {/* TOP DRAWER front (spans full width, ~50px tall) */}
      <rect x={F.x + 2} y={F.y + 20} width={F.w - 4} height={50}
            fill="#FBF8F1" stroke={stroke} strokeWidth={SW}/>
      {/* Drawer split line (two drawer fronts side-by-side) */}
      <line x1={F.x + F.w/2} y1={F.y + 22} x2={F.x + F.w/2} y2={F.y + 68}
            stroke={stroke} strokeWidth={SW_THIN}/>
      {/* Drawer pulls (pill-shaped) */}
      <rect x={F.x + F.w/4 - 20} y={F.y + 43} width={40} height={5} rx="2.5"
            fill={stroke}/>
      <rect x={F.x + (3*F.w)/4 - 20} y={F.y + 43} width={40} height={5} rx="2.5"
            fill={stroke}/>

      {/* Horizontal sash/rail under drawer */}
      <line x1={F.x} y1={SASH_Y} x2={F.x + F.w} y2={SASH_Y}
            stroke={stroke} strokeWidth={SW}/>

      {/* LEFT DOOR (closed) */}
      <rect
        x={F.x + 4} y={SASH_Y + 6}
        width={F.w/2 - 8} height={F.h - (SASH_Y + 6 - F.y) - 6}
        fill="#FBF8F1" stroke={stroke} strokeWidth={SW}
      />
      {/* Left door pull (vertical bar, right edge) */}
      <line
        x1={F.x + F.w/2 - 12} y1={SASH_Y + 70}
        x2={F.x + F.w/2 - 12} y2={SASH_Y + 100}
        stroke={stroke} strokeWidth="2.2" strokeLinecap="round"
      />

      {/* RIGHT DOOR (open, swung outward to the right) */}
      {/* The door is a parallelogram from the hinge (near center stile) extending outward */}
      {(() => {
        const h1x = doorLeft;                        // hinge point top
        const h1y = SASH_Y + 6;
        const h2x = doorLeft;                        // hinge point bottom
        const h2y = F.y + F.h - 6;
        const f1x = h1x + doorOpenDX;                // front top corner
        const f1y = h1y + doorOpenDY;
        const f2x = h2x + doorOpenDX;                // front bottom corner
        const f2y = h2y + doorOpenDY;
        return (
          <>
            {/* Outer door panel */}
            <polygon
              points={`${h1x},${h1y} ${f1x},${f1y} ${f2x},${f2y} ${h2x},${h2y}`}
              fill="#FBF8F1" stroke={stroke} strokeWidth={SW} strokeLinejoin="round"
            />
            {/* Door thickness (thin strip on outer edge) */}
            <polygon
              points={`${f1x},${f1y} ${f1x + 6},${f1y - 3} ${f2x + 6},${f2y - 3} ${f2x},${f2y}`}
              fill="#F7F3E9" stroke={stroke} strokeWidth={SW_THIN} strokeLinejoin="round"
            />
            {/* Pull on open door (near outer edge) */}
            <line
              x1={f1x - 12} y1={f1y + 65}
              x2={f2x - 12} y2={f2y - (f2y - f1y - 65)}
              stroke={stroke} strokeWidth="2.2" strokeLinecap="round"
            />
            {/* HINGE plates inside (small rectangles on the hinge edge) */}
            <rect x={h1x - 2} y={h1y + 20} width="18" height="7" rx="1"
                  fill="#E8E3D6" stroke={stroke} strokeWidth={SW_THIN}/>
            <rect x={h2x - 2} y={h2y - 27} width="18" height="7" rx="1"
                  fill="#E8E3D6" stroke={stroke} strokeWidth={SW_THIN}/>
          </>
        );
      })()}

      {/* TOE KICK (recessed base) — shown as shorter rect set back from front */}
      <rect x={F.x + 14} y={F.y + F.h + 2} width={F.w - 28} height="20"
            fill="#F7F3E9" stroke={stroke} strokeWidth={SW}/>
      {/* Small depth cue for toe kick (diagonal from right bottom corner) */}
      <line x1={F.x + F.w - 14} y1={F.y + F.h + 2}
            x2={F.x + F.w - 14 + 18} y2={F.y + F.h + 2 - 10}
            stroke={stroke} strokeWidth={SW_THIN}/>

      {/* DIMENSION — HEIGHT (left of cabinet) */}
      <g stroke={mid} strokeWidth="0.7" fill="none">
        <line x1={F.x - 30} y1={F.y} x2={F.x - 20} y2={F.y}/>
        <line x1={F.x - 30} y1={F.y + F.h + 22} x2={F.x - 20} y2={F.y + F.h + 22}/>
        <line x1={F.x - 25} y1={F.y} x2={F.x - 25} y2={F.y + F.h + 22}/>
        {/* arrowheads */}
        <path d={`M ${F.x - 28},${F.y + 8} L ${F.x - 25},${F.y} L ${F.x - 22},${F.y + 8}`}/>
        <path d={`M ${F.x - 28},${F.y + F.h + 14} L ${F.x - 25},${F.y + F.h + 22} L ${F.x - 22},${F.y + F.h + 14}`}/>
      </g>
      <text x={F.x - 38} y={F.y + F.h / 2 + 4}
            textAnchor="middle"
            transform={`rotate(-90 ${F.x - 38} ${F.y + F.h / 2 + 4})`}
            fontFamily="var(--f-mono, monospace)" fontSize="11" fill={mid}>
        34½"
      </text>

      {/* DIMENSION — DEPTH (bottom, along the projection vector) */}
      {(() => {
        const sx = F.x + F.w + 14;
        const sy = F.y + F.h + 28;
        const ex = sx + dx * 0.7;
        const ey = sy + dy * 0.7;
        return (
          <>
            <g stroke={mid} strokeWidth="0.7" fill="none">
              <line x1={sx} y1={sy} x2={ex} y2={ey}/>
              <line x1={sx - 4} y1={sy - 4} x2={sx + 4} y2={sy + 4}/>
              <line x1={ex - 4} y1={ey - 4} x2={ex + 4} y2={ey + 4}/>
            </g>
            <text
              x={(sx + ex)/2 + 4}
              y={(sy + ey)/2 + 16}
              fontFamily="var(--f-mono, monospace)"
              fontSize="11"
              fill={mid}
              textAnchor="middle"
            >
              24"
            </text>
          </>
        );
      })()}

      {/* =========================================================
          EXPLODED DRAWER SECTION BELOW (mirrors the reference)
          Shows two drawer boxes with slides, set floating to suggest
          how drawers engage rails.
          ========================================================= */}
      <g transform="translate(70, 500)">
        {/* Header line */}
        <line x1="0" y1="-20" x2="460" y2="-20" stroke={faint} strokeWidth="0.6" strokeDasharray="4 4"/>
        <text x="0" y="-28" fontFamily="var(--f-mono, monospace)" fontSize="9"
              fill={mid} letterSpacing="1">VISTA DESPIEZO · CAJONES</text>

        {/* Left drawer box (isometric) */}
        <g>
          {/* Back line (drawer interior opening) */}
          <polygon points="10,25 160,25 190,5 40,5" fill="none" stroke={stroke} strokeWidth={SW_THIN}/>
          {/* Left side */}
          <polygon points="10,25 10,80 40,60 40,5" fill="#FBF8F1" stroke={stroke} strokeWidth={SW}/>
          {/* Front */}
          <polygon points="10,25 160,25 160,80 10,80" fill="#F7F3E9" stroke={stroke} strokeWidth={SW}/>
          {/* Drawer pull */}
          <rect x="60" y="48" width="50" height="4" rx="2" fill={stroke}/>
          {/* Dovetail hint on front-left corner */}
          <g stroke={stroke} strokeWidth={SW_THIN} fill="none">
            <line x1="10" y1="32" x2="40" y2="12"/>
            <line x1="10" y1="44" x2="40" y2="24"/>
            <line x1="10" y1="56" x2="40" y2="36"/>
            <line x1="10" y1="68" x2="40" y2="48"/>
          </g>
          {/* Slide rail (bottom of drawer box, extending to the right) */}
          <line x1="10" y1="92" x2="200" y2="92" stroke={stroke} strokeWidth="1.5"/>
          <line x1="10" y1="97" x2="200" y2="97" stroke={stroke} strokeWidth="0.8"/>
          <circle cx="195" cy="94" r="3" fill={stroke}/>
          <circle cx="15" cy="94" r="2" fill={stroke}/>
        </g>

        {/* Right drawer box (mirror, offset) */}
        <g transform="translate(240, 0)">
          <polygon points="10,25 160,25 190,5 40,5" fill="none" stroke={stroke} strokeWidth={SW_THIN}/>
          <polygon points="10,25 10,80 40,60 40,5" fill="#FBF8F1" stroke={stroke} strokeWidth={SW}/>
          <polygon points="10,25 160,25 160,80 10,80" fill="#F7F3E9" stroke={stroke} strokeWidth={SW}/>
          <rect x="60" y="48" width="50" height="4" rx="2" fill={stroke}/>
          <g stroke={stroke} strokeWidth={SW_THIN} fill="none">
            <line x1="10" y1="32" x2="40" y2="12"/>
            <line x1="10" y1="44" x2="40" y2="24"/>
            <line x1="10" y1="56" x2="40" y2="36"/>
            <line x1="10" y1="68" x2="40" y2="48"/>
          </g>
          <line x1="10" y1="92" x2="200" y2="92" stroke={stroke} strokeWidth="1.5"/>
          <line x1="10" y1="97" x2="200" y2="97" stroke={stroke} strokeWidth="0.8"/>
          <circle cx="195" cy="94" r="3" fill={stroke}/>
          <circle cx="15" cy="94" r="2" fill={stroke}/>
        </g>
      </g>

      {/* =========================================================
          CALLOUT DOTS
          ========================================================= */}
      {dots.map(d => {
        const active = activeNum === d.n;
        return (
          <g key={d.n}
             onMouseEnter={() => onHover(d.n)}
             onMouseLeave={() => onHover(null)}
             style={{ cursor: 'pointer' }}>
            {active && <circle cx={d.cx} cy={d.cy} r="18" fill={accent} opacity="0.18"/>}
            <circle cx={d.cx} cy={d.cy} r="12"
                    fill={active ? accent : stroke}
                    stroke={bone} strokeWidth="2"/>
            <text x={d.cx} y={d.cy + 3.5} textAnchor="middle"
                  fontFamily="var(--f-mono, monospace)" fontSize="10" fontWeight="600" fill={bone}>
              {d.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EngineeringSection() {
  const { lang } = useLang();
  const t = ENG_COPY[lang];
  const [active, setActive] = useState(null);

  return (
    <section className="section" style={{ background: 'var(--bone-50)' }}>
      <div className="page">
        <SectionHeader
          eyebrow={t.eyebrow}
          headline={t.headline}
          body={t.body}
          align="split"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: 'var(--s-8)',
          alignItems: 'start',
          marginTop: 'var(--s-8)',
        }} className="eng-grid">
          {/* DIAGRAM PANEL */}
          <div style={{
            background: 'var(--bone)',
            border: '1px solid var(--line)',
            padding: 'var(--s-6)',
            position: 'relative',
          }}>
            {/* Spec-sheet header row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              borderBottom: '1px solid var(--line)', paddingBottom: 12, marginBottom: 16,
              fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: 'var(--ink-60)',
            }}>
              <span>Gabinete base · módulo estándar</span>
              <span>Rev. 2024</span>
            </div>

            <CabinetDiagram activeNum={active} onHover={setActive} />

            {/* Standards footer */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
              borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 8,
            }} className="eng-standards">
              {t.standards.map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--ink-60)', marginBottom: 6,
                  }}>{s.k}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CALLOUT LIST */}
          <div>
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 11, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: 'var(--ink-60)', marginBottom: 20,
            }}>
              {t.specLabel}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {t.callouts.map(c => {
                const on = active === c.n;
                return (
                  <li key={c.n}
                      onMouseEnter={() => setActive(c.n)}
                      onMouseLeave={() => setActive(null)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '36px 1fr auto',
                        gap: 16,
                        padding: '18px 0',
                        borderTop: '1px solid var(--line)',
                        cursor: 'default',
                        transition: 'background 200ms ease, padding 200ms ease',
                        background: on ? 'rgba(122, 86, 50, 0.04)' : 'transparent',
                        paddingLeft: on ? 12 : 0,
                        paddingRight: on ? 12 : 0,
                      }}>
                    <div style={{
                      fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 600,
                      color: on ? 'var(--walnut)' : 'var(--ink)',
                      transition: 'color 200ms ease',
                    }}>{c.n}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 4 }}>{c.title}</div>
                      <div style={{ fontSize: 14, color: 'var(--ink-70, #55524B)', lineHeight: 1.5 }}>{c.body}</div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--f-mono)', fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: 'var(--ink-60)', whiteSpace: 'nowrap',
                      alignSelf: 'start', paddingTop: 3,
                    }}>{c.spec}</div>
                  </li>
                );
              })}
              <li style={{ borderTop: '1px solid var(--line)', height: 0 }}/>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Make globally available
Object.assign(window, { EngineeringSection });
