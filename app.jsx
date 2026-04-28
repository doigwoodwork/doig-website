// app.jsx — root component

const { useState: useStateR, useEffect: useEffectR } = React;

function App() {
  const [lang, setLang] = useStateR(() => {
    try { return localStorage.getItem('doig_lang') || (window.__TWEAK_DEFAULTS?.language || 'es'); }
    catch { return 'es'; }
  });
  const [route, setRoute] = useStateR(() => {
    try { return localStorage.getItem('doig_route') || 'home'; }
    catch { return 'home'; }
  });
  const [tweaksVisible, setTweaksVisible] = useStateR(false);

  useEffectR(() => { try { localStorage.setItem('doig_lang', lang); } catch {} }, [lang]);
  useEffectR(() => {
    try { localStorage.setItem('doig_route', route); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Edit mode protocol
  useEffectR(() => {
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
          <Page />
          <Footer />
          <TweaksPanel visible={tweaksVisible} onClose={() => setTweaksVisible(false)} />
        </div>
      </RouteCtx.Provider>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
