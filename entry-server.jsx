// entry-server.jsx — SSR entry point, solo usado en build time
// El browser nunca carga este archivo.

import React from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { COPY } from './data.jsx'

// Importar componentes que NO usan window/document directamente
import { LangCtx, RouteCtx, Nav, Footer } from './components.jsx'
import HomePage from './pages_home.jsx'
import CocinasPage from './pages_cocinas.jsx'
import ProcesoPage from './pages_proceso.jsx'
import { TestimoniosPage, FaqPage, ContactoPage } from './pages_other.jsx'

// Polyfill mínimo para que componentes que leen window no exploten en Node
if (typeof window === 'undefined') {
  global.window = {
    __TWEAK_DEFAULTS: {},
    location: { pathname: '/' },
    history: { pushState: () => {} },
    scrollTo: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    parent: { postMessage: () => {} },
  }
  global.localStorage = { getItem: () => null, setItem: () => {} }
  global.document = {
    body: { classList: { toggle: () => {} } },
    documentElement: { style: { setProperty: () => {} } },
  }
}

const PAGE_MAP = {
  home: HomePage,
  cocinas: CocinasPage,
  proceso: ProcesoPage,
  testimonios: TestimoniosPage,
  faq: FaqPage,
  contacto: ContactoPage,
}

export function render(route, lang) {
  const helmetContext = {}
  const Page = PAGE_MAP[route] || HomePage

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <LangCtx.Provider value={{ lang, setLang: () => {} }}>
        <RouteCtx.Provider value={{ route, go: () => {} }}>
          <div>
            <Nav />
            <main id="main-content">
              <Page />
            </main>
            <Footer />
          </div>
        </RouteCtx.Provider>
      </LangCtx.Provider>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return {
    html,
    helmet: {
      title: helmet?.title?.toString() || '',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
    }
  }
}
