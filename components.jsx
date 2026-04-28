// components.jsx — shared UI components

const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

// ============== Language context ==============
const LangCtx = createContext({ lang: 'es', setLang: () => {} });
const useLang = () => useContext(LangCtx);
const useT = () => {
  const { lang } = useLang();
  return COPY[lang];
};

// ============== Router ==============
const RouteCtx = createContext({ route: 'home', go: () => {} });
const useRoute = () => useContext(RouteCtx);

// ============== Nav ==============
function Nav() {
  const { lang, setLang } = useLang();
  const { route, go } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();
  const items = [
    { k: 'home', l: t.nav.home },
    { k: 'cocinas', l: t.nav.cocinas },
    { k: 'proceso', l: t.nav.proceso },
    { k: 'testimonios', l: t.nav.testimonios },
    // { k: 'faq', l: t.nav.faq }, // oculto temporalmente — pendiente mejoras
  ];

  const handleNav = (k) => {
    go(k);
    setMobileOpen(false);
  };

  return (
    <nav className={`nav ${mobileOpen ? 'nav-mobile-open' : ''}`}>
      <div className="nav-inner">
        <a className="brand" onClick={(e) => { e.preventDefault(); handleNav('home'); }} href="#">
          <span className="brand-wm">Doig</span>
          <span className="brand-tag">Woodwork · {t.tagline}</span>
        </a>
        <ul className="nav-links hide-mobile">
          {items.map(it => (
            <li key={it.k}>
              <a
                href={`#${it.k}`}
                onClick={(e) => { e.preventDefault(); go(it.k); }}
                className={route === it.k ? 'active' : ''}
              >{it.l}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right hide-mobile">
          <button className="lang-toggle" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
            <span className={lang === 'es' ? 'on' : ''}>ES</span>
            <span>/</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => go('contacto')}>
            {t.nav.contacto} <span className="arrow">→</span>
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="nav-hamburger show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          aria-expanded={mobileOpen}
        >
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
          <span className="nav-hamburger-line" />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`nav-mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <ul className="nav-mobile-links">
          {items.map(it => (
            <li key={it.k}>
              <a
                href={`#${it.k}`}
                onClick={(e) => { e.preventDefault(); handleNav(it.k); }}
                className={route === it.k ? 'active' : ''}
              >{it.l}</a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-footer">
          <button className="lang-toggle" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
            <span className={lang === 'es' ? 'on' : ''}>ES</span>
            <span>/</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>
          <button className="btn btn-primary" onClick={() => handleNav('contacto')}>
            {t.nav.contacto} <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ============== Footer ==============
function Footer() {
  const t = useT();
  const { go } = useRoute();
  return (
    <footer className="footer">
      <div className="page">
        <div className="footer-grid">
          <div>
            <div className="footer-wm">Doig</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-20)', marginTop: 8 }}>
              {t.tagline}
            </div>
            <div style={{ marginTop: 32, maxWidth: 320, color: 'var(--bone-200)', fontSize: 14, lineHeight: 1.6 }}>
              {t.footer.tagline}
            </div>
          </div>
          <div>
            <h4>{t.footer.nav}</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); go('home'); }}>{t.nav.home}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); go('cocinas'); }}>{t.nav.cocinas}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); go('proceso'); }}>{t.nav.proceso}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); go('testimonios'); }}>{t.nav.testimonios}</a></li>
              {/* <li><a href="#" onClick={(e) => { e.preventDefault(); go('faq'); }}>{t.nav.faq}</a></li> */}
            </ul>
          </div>
          <div>
            <h4>{t.footer.contact}</h4>
            <ul>
              <li><a href="tel:+526644987845">+52 664 498 7845</a></li>
              <li><a href="mailto:doigwoodwork@gmail.com">doigwoodwork@gmail.com</a></li>
              <li><a href="https://wa.me/526644987845" target="_blank">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.social}</h4>
            <ul>
              <li><a href="https://instagram.com/doigwoodwork" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://facebook.com/doigwoodwork" target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="https://www.tiktok.com/@doigwoodwork" target="_blank" rel="noopener">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>{t.footer.legal}</span>
          <span>Tijuana · San Diego · Rosarito · Ensenada · Mexicali</span>
        </div>
      </div>
    </footer>
  );
}

// ============== Image w/ placeholder fallback ==============
function Img({ src, alt, aspect, label, className = '', style }) {
  const [err, setErr] = useState(false);
  const wrapperStyle = { aspectRatio: aspect || '4/3', ...style };
  if (err || !src) {
    return (
      <div className={`img-ph ${className}`} style={wrapperStyle}>
        <span>{label || alt || 'Imagen'}</span>
      </div>
    );
  }
  return (
    <div className={`img-frame ${className}`} style={wrapperStyle}>
      <img src={src} alt={alt} onError={() => setErr(true)} loading="lazy" />
    </div>
  );
}

// ============== Section header ==============
function SectionHeader({ eyebrow, headline, body, align = 'start', cta }) {
  return (
    <div className={`section-header-grid${align === 'split' ? ' is-split' : ''}`}>
      <div style={{ maxWidth: align === 'split' ? 'none' : '720px' }}>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</div>}
        {headline && <h2 className="display-l" style={{ margin: 0 }}>{headline}</h2>}
      </div>
      {body && (
        <div style={{ maxWidth: '48ch', paddingBottom: 4 }}>
          <p className="body-l" style={{ margin: 0 }}>{body}</p>
          {cta}
        </div>
      )}
    </div>
  );
}

// ============== WhatsApp icon ==============
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// ============== CTA block ==============
function CTABlock() {
  const t = useT();
  const { go } = useRoute();
  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'var(--bone)', margin: '0' }}>
      <div className="page">
        <div className="cta-grid">
          <div>
            <div className="eyebrow" style={{ color: 'var(--ink-20)', marginBottom: 16 }}>{t.cta.eyebrow}</div>
            <h2 className="display-l" style={{ margin: 0, color: 'var(--bone)' }}>{t.cta.headline}</h2>
            <p className="body-l" style={{ color: 'var(--bone-200)', marginTop: 24, maxWidth: '48ch' }}>{t.cta.body}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="https://wa.me/526644987845" target="_blank" className="btn btn-wa btn-lg">
                <WAIcon /> {t.cta.primary}
              </a>
              <button className="btn btn-ghost btn-lg" onClick={() => go('contacto')} style={{ color: 'var(--bone)', borderColor: 'rgba(242,237,228,0.3)' }}>
                {t.cta.secondary} <span className="arrow">→</span>
              </button>
            </div>
          </div>
          <div className="cta-doig-text" style={{
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(80px, 14vw, 240px)',
            lineHeight: 0.85,
            fontStyle: 'italic',
            color: 'var(--bone)',
            textAlign: 'right',
            opacity: 0.9,
          }}>
            Doig
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== Marquee ==============
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="marquee-item">{it}</span>
        ))}
      </div>
    </div>
  );
}

// ============== Tweaks panel ==============
function TweaksPanel({ visible, onClose }) {
  const { lang, setLang } = useLang();
  const [tweaks, setTweaks] = useState(window.__TWEAK_DEFAULTS || {});

  useEffect(() => {
    // apply palette
    document.body.classList.toggle('palette-ink', tweaks.palette === 'ink');
    // apply fonts
    document.documentElement.style.setProperty('--f-display', `'${tweaks.displayFont || 'Instrument Serif'}', Georgia, serif`);
    document.documentElement.style.setProperty('--f-body', `'${tweaks.bodyFont || 'Geist'}', system-ui, sans-serif`);
  }, [tweaks]);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="tweaks">
      <h3>
        Tweaks
        <span className="close" onClick={onClose}>✕</span>
      </h3>

      <div className="tweaks-row">
        <label>Idioma / Language</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="tweaks-row">
        <label>Display font</label>
        <select value={tweaks.displayFont || 'Instrument Serif'} onChange={(e) => update('displayFont', e.target.value)}>
          <option>Instrument Serif</option>
          <option>Playfair Display</option>
          <option>Cormorant Garamond</option>
          <option>DM Serif Display</option>
        </select>
      </div>

      <div className="tweaks-row">
        <label>Body font</label>
        <select value={tweaks.bodyFont || 'Geist'} onChange={(e) => update('bodyFont', e.target.value)}>
          <option>Geist</option>
          <option>Manrope</option>
          <option>DM Sans</option>
          <option>Work Sans</option>
        </select>
      </div>

      <div className="tweaks-row">
        <label>Paleta / Palette</label>
        <select value={tweaks.palette || 'bone'} onChange={(e) => update('palette', e.target.value)}>
          <option value="bone">Bone (claro)</option>
          <option value="ink">Ink (oscuro)</option>
        </select>
      </div>

      <div style={{ fontSize: 11, color: 'var(--ink-60)', marginTop: 16, lineHeight: 1.4, fontFamily: 'var(--f-mono)' }}>
        Tweaks are visible only when the "Tweaks" toolbar toggle is on.
      </div>
    </div>
  );
}

Object.assign(window, {
  LangCtx, useLang, useT, RouteCtx, useRoute,
  Nav, Footer, Img, SectionHeader, WAIcon, CTABlock, Marquee, TweaksPanel,
});
