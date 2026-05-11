// scripts/convert-to-webp.js
// Convierte todas las imágenes JPG de public/images/ a WebP
// Requiere: npm install sharp (ya está en devDependencies)

import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

const files = readdirSync(imagesDir).filter(f =>
  ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
)

for (const file of files) {
  const inputPath = join(imagesDir, file)
  const outputName = basename(file, extname(file)) + '.webp'
  const outputPath = join(imagesDir, outputName)

  if (existsSync(outputPath)) {
    console.log(`  skip (exists): ${outputName}`)
    continue
  }

  try {
    await sharp(inputPath)
      .webp({ quality: 82 })
      .toFile(outputPath)
    console.log(`  ✓ ${file} → ${outputName}`)
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`)
  }
}

console.log('\n✅ Conversión WebP completa')
