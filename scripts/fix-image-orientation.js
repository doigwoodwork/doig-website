import sharp from 'sharp';
import { readdir, rename } from 'fs/promises';
import { join } from 'path';

const dir = 'public/images';
const files = await readdir(dir);
const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of images) {
  const path = join(dir, file);
  const before = await sharp(path).metadata();

  await sharp(path)
    .rotate()        // auto-rotate based on EXIF, then strips EXIF orientation
    .toFile(path + '.tmp');

  await rename(path + '.tmp', path);

  const after = await sharp(path).metadata();
  const changed = before.width !== after.width || before.height !== after.height;
  console.log(`${changed ? '🔄' : '✓'} ${file} ${changed ? `(${before.width}x${before.height} → ${after.width}x${after.height})` : ''}`);
}

console.log(`\nDone. ${images.length} images processed.`);
