// app.jsx — root component

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { LangCtx, RouteCtx, Nav, Footer, TweaksPanel } from './components.jsx'
import HomePage from './pages_home.jsx'
import CocinasPage from './pages_cocinas.jsx'
import ProcesoPage from './pages_proceso.jsx'
import { TestimoniosPage, FaqPage, ContactoPage } from './pages_other.jsx'

// Parse URL to get initial route and language
function parseURL() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  let lang = 'es';
  let route = 'home';

  // Check if first segment is 'en'
  if (segments[0] === 'en') {
    lang = 'en';
    segments.shift(); // Remove 'en' from segments
  }

  // Map remaining path to route
  const validRoutes = ['cocinas', 'proceso', 'testimonios', 'faq', 'contacto'];
  if (segments[0] && validRoutes.includes(segments[0])) {
    route = segments[0];
  }

  return { lang, route };
}

// Build URL from route and language
function buildURL(route, lang) {
  const base = lang === 'en' ? '/en' : '';
  if (route === 'home') return base || '/';
  return `${base}/${route}`;
}

function App() {
  const [lang, setLang] = useState(() => {
    const { lang: urlLang } = parseURL();
    // URL takes priority, then localStorage, then default ES
    if (window.location.pathname !== '/') return urlLang;
    try {
      const stored = localStorage.getItem('doig_lang');
      return stored === 'en' ? 'en' : 'es';
    }
    catch { return 'es'; }
  });
  const [route, setRoute] = useState(() => {
    const { route: urlRoute } = parseURL();
    return urlRoute;
  });
  const [tweaksVisible, setTweaksVisible] = useState(false);

  useEffect(() => { try { localStorage.setItem('doig_lang', lang); } catch {} }, [lang]);

  // Update URL when route or lang changes
  useEffect(() => {
    const newURL = buildURL(route, lang);
    if (window.location.pathname !== newURL) {
      window.history.pushState({}, '', newURL);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route, lang]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { lang: urlLang, route: urlRoute } = parseURL();
      setLang(urlLang);
      setRoute(urlRoute);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Edit mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', handler);
  }, []);

  const go = (r) => setRoute(r);

  let Page;
  switch (route) {
    case 'cocinas': Page = CocinasPage; break;
    case 'proceso': Page = ProcesoPage; break;
    case 'testimonios': Page = TestimoniosPage; break;
    case 'faq': Page = FaqPage; break;
    case 'contacto': Page = ContactoPage; break;
    default: Page = HomePage;
  }

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <RouteCtx.Provider value={{ route, go }}>
        <div data-screen-label={`${route}`}>
          <Nav />
          <main id="main-content">
            <Page />
          </main>
          <Footer />
          <TweaksPanel visible={tweaksVisible} onClose={() => setTweaksVisible(false)} />
        </div>
      </RouteCtx.Provider>
    </LangCtx.Provider>
  );
}

export default App;
