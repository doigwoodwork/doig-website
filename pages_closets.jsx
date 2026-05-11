// pages_closets.jsx — Página de closets a medida

import React, { useState } from 'react'
import { useLang, useT, useRoute, Img, SectionHeader, CTABlock } from './components.jsx'
import { SEO } from './SEO.jsx'

const STYLES_ES = [
  {
    id: 'walk-in',
    name: 'Walk-In Closet',
    tagline: 'El guardarropa que siempre quisiste.',
    description: 'Un cuarto dedicado exclusivamente a tu ropa, zapatos y accesorios. Diseñado desde cero para maximizar cada centímetro: cajones, zapateras, islas centrales, iluminación integrada. Para habitaciones principales con espacio generoso.',
    features: ['Diseño personalizado por arquitecto', 'Zapatera, cajoneras e islas', 'Iluminación LED integrada', 'Acabados: melamina, madera o laca'],
    img: null,
  },
  {
    id: 'empotrado',
    name: 'Closet Empotrado',
    tagline: 'Aprovecha cada centímetro del espacio.',
    description: 'Se integra perfectamente al espacio existente, desde piso hasta techo. Ideal para recámaras, pasillos y espacios irregulares. Sin espacio desperdiciado — cada módulo diseñado para lo que guardas.',
    features: ['De piso a techo sin huecos', 'Puertas corredizas o abatibles', 'Interiores configurables', 'Espejo integrado disponible'],
    img: null,
  },
  {
    id: 'ninos',
    name: 'Closet Infantil',
    tagline: 'Crece con tus hijos.',
    description: 'Diseñado con alturas adaptadas y espacios para juguetes, libros y ropa. Modular para reconfigurarse conforme cambian las necesidades. Colores y acabados que combinan con el cuarto.',
    features: ['Alturas adaptadas a niños', 'Cajones amplios para juguetes', 'Reconfiguración futura sencilla', 'Acabados seguros y duraderos'],
    img: null,
  },
]

const STYLES_EN = [
  {
    id: 'walk-in',
    name: 'Walk-In Closet',
    tagline: 'The wardrobe you always wanted.',
    description: 'A room dedicated exclusively to your clothes, shoes, and accessories. Designed from scratch to maximize every inch: drawers, shoe racks, center islands, integrated lighting. For master bedrooms with generous space.',
    features: ['Custom design by architect', 'Shoe rack, drawers & islands', 'Integrated LED lighting', 'Finishes: laminate, wood, or lacquer'],
    img: null,
  },
  {
    id: 'built-in',
    name: 'Built-In Closet',
    tagline: 'Make the most of every inch.',
    description: 'Integrates seamlessly into the existing space, floor to ceiling. Ideal for bedrooms, hallways, and irregular spaces. No wasted space — every module designed for what you store.',
    features: ['Floor to ceiling, no gaps', 'Sliding or hinged doors', 'Configurable interiors', 'Integrated mirror available'],
    img: null,
  },
  {
    id: 'kids',
    name: "Kids' Closet",
    tagline: 'Grows with your children.',
    description: 'Designed with adapted heights and spaces for toys, books, and clothing. Modular to reconfigure as needs change. Colors and finishes that match the room.',
    features: ['Heights adapted for children', 'Large drawers for toys', 'Easy future reconfiguration', 'Safe and durable finishes'],
    img: null,
  },
]

const FAQ_ES = [
  { q: '¿Fabrican closets a medida desde cero?', a: 'Sí. Cada closet se diseña según las medidas exactas de tu espacio y tus necesidades de almacenamiento. No usamos módulos prefabricados.' },
  { q: '¿Cuánto tiempo toma un closet?', a: 'Un closet empotrado estándar toma entre 3 y 5 semanas desde la cotización hasta la instalación. Un walk-in closet completo puede tomar de 6 a 10 semanas según la complejidad.' },
  { q: '¿Trabajan en San Diego?', a: 'Sí. Fabricamos en Tijuana e instalamos en San Diego, Rosarito, Ensenada y Mexicali.' },
  { q: '¿Pueden incluir iluminación?', a: 'Sí. Diseñamos e instalamos iluminación LED integrada como parte del proyecto, o coordinamos con tu electricista.' },
  { q: '¿Qué materiales usan?', a: 'Estructura en triplay Birch 3/4". Para frentes: melamina Arauco/Vesto, lacas o maderas finas como nogal y encino. Los mismos materiales de nuestras cocinas.' },
]

const FAQ_EN = [
  { q: 'Do you build custom closets from scratch?', a: 'Yes. Every closet is designed to the exact measurements of your space and storage needs. We don\'t use prefabricated modules.' },
  { q: 'How long does a closet take?', a: 'A standard built-in closet takes 3–5 weeks from quote to installation. A full walk-in closet can take 6–10 weeks depending on complexity.' },
  { q: 'Do you work in San Diego?', a: 'Yes. We build in Tijuana and install in San Diego, Rosarito, Ensenada, and Mexicali.' },
  { q: 'Can you include lighting?', a: 'Yes. We design and install integrated LED lighting as part of the project, or coordinate with your electrician.' },
  { q: 'What materials do you use?', a: 'Structure in 3/4" Birch plywood. For fronts: Arauco/Vesto laminate, lacquers, or fine woods like walnut and oak — the same materials as our kitchens.' },
]

export default function ClosetsPage() {
  const { lang } = useLang()
  const { go } = useRoute()
  const [activeStyle, setActiveStyle] = useState(null)

  const STYLES = lang === 'en' ? STYLES_EN : STYLES_ES
  const FAQ = lang === 'en' ? FAQ_EN : FAQ_ES
  const active = STYLES.find(s => s.id === activeStyle) || STYLES[0]

  const seoTitle = lang === 'en'
    ? 'Custom Closets in Tijuana & San Diego — Design & Build'
    : 'Closets a Medida en Tijuana — Diseño y Fabricación'
  const seoDesc = lang === 'en'
    ? 'Walk-in closets and built-in wardrobes custom-designed and built in Tijuana. We install in San Diego & Baja California. Free quote.'
    : 'Closets personalizados diseñados y fabricados a la medida en Tijuana. Walk-in closets, empotrados e infantiles. Instalamos en San Diego y Baja California. Cotización sin costo.'

  return (
    <div className="page-enter">
      <SEO
        title={seoTitle}
        description={seoDesc}
        canonical={lang === 'en' ? '/en/closets' : '/closets'}
        lang={lang}
      />

      {/* HERO */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + var(--s-8))' }}>
        <div className="page">
          <div style={{ marginBottom: 'var(--s-6)' }}>
            <span className="eyebrow">
              {lang === 'en' ? 'Custom Closets · Tijuana & San Diego' : 'Closets a Medida · Tijuana y San Diego'}
            </span>
          </div>
          <h1 className="display-xl" style={{ margin: 0, maxWidth: '16ch' }}>
            {lang === 'en'
              ? <>Closets built <em style={{ color: 'var(--walnut)' }}>for how you live.</em></>
              : <>Closets hechos <em style={{ color: 'var(--walnut)' }}>para como vives.</em></>
            }
          </h1>
          <p className="body-l" style={{ maxWidth: '52ch', marginTop: 'var(--s-5)', color: 'var(--ink-60)' }}>
            {lang === 'en'
              ? 'Custom-designed, built in our workshop, and installed in your home. Every module built for what you actually store — not what fits in a catalog.'
              : 'Diseñados a tu medida, fabricados en nuestro taller, instalados en tu casa. Cada módulo pensado para lo que tú guardas — no lo que cabe en un catálogo.'
            }
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 'var(--s-6)', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/526644987845?text=Hola,%20me%20interesa%20cotizar%20un%20closet%20a%20medida"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-lg"
            >
              {lang === 'en' ? 'WhatsApp Quote' : 'Cotizar por WhatsApp'}
            </a>
            <button className="btn btn-outline btn-lg" onClick={() => go('contacto')}>
              {lang === 'en' ? 'Contact form →' : 'Formulario de contacto →'}
            </button>
          </div>
        </div>
      </section>

      {/* TIPOS */}
      <section className="section">
        <div className="page">
          <SectionHeader
            eyebrow={lang === 'en' ? '— Types' : '— Tipos'}
            headline={lang === 'en' ? 'Three closet types, endless configurations.' : 'Tres tipos de closet, infinitas configuraciones.'}
            body={lang === 'en'
              ? 'Every project starts with a site visit to measure and understand how you use the space. Then we design, build, and install.'
              : 'Cada proyecto empieza con una visita a domicilio para medir y entender cómo usas el espacio. Luego diseñamos, fabricamos e instalamos.'
            }
          />

          {/* Style tabs */}
          <div style={{ display: 'flex', gap: 8, marginTop: 'var(--s-7)', flexWrap: 'wrap' }}>
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveStyle(s.id)}
                className={`btn btn-sm ${(activeStyle || STYLES[0].id) === s.id ? 'btn-primary' : 'btn-outline'}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Active style detail */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-7)', marginTop: 'var(--s-6)', alignItems: 'start' }}
               className="responsive-grid">
            <div>
              <p className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>{active.tagline}</p>
              <h2 className="display-m" style={{ margin: '0 0 var(--s-4)' }}>{active.name}</h2>
              <p className="body-l" style={{ color: 'var(--ink-60)', marginBottom: 'var(--s-5)' }}>{active.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {active.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
                    <span style={{ color: 'var(--walnut)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Img
              src={active.img || null}
              alt={`${active.name} a medida en Tijuana`}
              aspect="4/3"
              label={active.name}
            />
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{ background: 'var(--bone-100)' }}>
        <div className="page">
          <SectionHeader
            eyebrow={lang === 'en' ? '— Why Doig' : '— Por qué Doig'}
            headline={lang === 'en' ? 'Same workshop, same standards.' : 'El mismo taller, los mismos estándares.'}
            body={lang === 'en'
              ? 'We\'ve been building custom kitchens since 2019. Closets follow the exact same process: site visit, 3D design approval, fabrication, installation.'
              : 'Llevamos fabricando cocinas a medida desde 2019. Los closets siguen el mismo proceso: visita, aprobación de diseño 3D, fabricación, instalación.'
            }
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-5)', marginTop: 'var(--s-7)' }}
               className="responsive-grid-3">
            {[
              {
                n: '500+',
                label: lang === 'en' ? 'Custom projects delivered' : 'Proyectos entregados',
              },
              {
                n: '6+',
                label: lang === 'en' ? 'Years building in Tijuana' : 'Años fabricando en Tijuana',
              },
              {
                n: '1 año',
                label: lang === 'en' ? 'Warranty on every closet' : 'Garantía en cada closet',
              },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 'var(--s-5)', background: 'white', borderRadius: 12 }}>
                <div className="display-l" style={{ color: 'var(--walnut)' }}>{stat.n}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 8 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="page">
          <SectionHeader
            eyebrow={lang === 'en' ? '— FAQ' : '— Preguntas frecuentes'}
            headline={lang === 'en' ? 'Common questions about custom closets.' : 'Lo que más nos preguntan sobre closets.'}
          />
          <div style={{ marginTop: 'var(--s-7)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQ.map((item, i) => (
              <details key={i} style={{ borderTop: '1px solid var(--bone-200)', padding: 'var(--s-4) 0' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 15, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q}
                  <span style={{ color: 'var(--walnut)', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ marginTop: 12, color: 'var(--ink-60)', fontSize: 14, lineHeight: 1.7, maxWidth: '64ch' }}>{item.a}</p>
              </details>
            ))}
            <div style={{ borderTop: '1px solid var(--bone-200)' }} />
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  )
}
