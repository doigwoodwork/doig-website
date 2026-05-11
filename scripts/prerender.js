// scripts/prerender.js
// Corre después de vite build. Genera HTML estático por ruta en dist/.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')

// [outputFile, routeProp, langProp]
const ROUTES = [
  ['index.html',                'home',        'es'],
  ['cocinas/index.html',        'cocinas',     'es'],
  ['proceso/index.html',        'proceso',     'es'],
  ['testimonios/index.html',    'testimonios', 'es'],
  ['faq/index.html',            'faq',         'es'],
  ['contacto/index.html',       'contacto',    'es'],
  ['en/index.html',             'home',        'en'],
  ['en/cocinas/index.html',     'cocinas',     'en'],
  ['en/proceso/index.html',     'proceso',     'en'],
  ['en/testimonios/index.html', 'testimonios', 'en'],
  ['en/faq/index.html',         'faq',         'en'],
  ['en/contacto/index.html',    'contacto',    'en'],
]

async function run() {
  // Cargar el SSR bundle que vite compiló (file:// URL requerido en Windows)
  const serverPath = join(distDir, 'server', 'entry-server.js')
  const serverUrl = `file:///${serverPath.replace(/\\/g, '/')}`
  const { render } = await import(serverUrl)
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

  let success = 0
  for (const [file, route, lang] of ROUTES) {
    try {
      const { html, helmet } = render(route, lang)

      // Inyectar helmet tags justo antes de </head>
      let output = template.replace(
        '</head>',
        `${helmet.title}\n${helmet.meta}\n${helmet.link}\n</head>`
      )
      // Inyectar HTML renderizado en el div root
      output = output.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )

      const outPath = join(distDir, file)
      const outDir = dirname(outPath)
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
      writeFileSync(outPath, output)
      console.log(`  ✓ /${file}`)
      success++
    } catch (err) {
      console.error(`  ✗ /${file} — ${err.message}`)
    }
  }

  console.log(`\n✅ Prerender: ${success}/${ROUTES.length} rutas generadas`)
  if (success < ROUTES.length) process.exit(1)
}

run()
