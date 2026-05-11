import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, '..', 'public', 'images')

await sharp(join(imagesDir, 'lisa-moderna-01.webp'))
  .resize(1200, 630, {
    fit: 'cover',
    position: 'centre'
  })
  .jpeg({ quality: 90 })
  .toFile(join(imagesDir, 'og-image.jpg'))

console.log('✅ og-image.jpg generada — 1200×630px')
