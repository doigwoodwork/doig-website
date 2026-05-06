import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f));

  console.log(`Found ${jpgFiles.length} JPG images to optimize\n`);
  console.log('Image'.padEnd(35) + 'Before'.padStart(12) + 'After'.padStart(12) + 'Saved'.padStart(12));
  console.log('-'.repeat(71));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of jpgFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const stats = fs.statSync(filePath);
    const beforeSize = stats.size;
    totalBefore += beforeSize;

    try {
      // Read file into buffer first to avoid file locking issues
      const inputBuffer = fs.readFileSync(filePath);

      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      let pipeline = sharp(inputBuffer);

      // Resize if wider than MAX_WIDTH
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      // Compress with quality setting
      const buffer = await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();

      // Only save if smaller
      if (buffer.length < beforeSize) {
        fs.writeFileSync(filePath, buffer);
        const afterSize = buffer.length;
        totalAfter += afterSize;
        const saved = beforeSize - afterSize;
        const percent = ((saved / beforeSize) * 100).toFixed(1);

        console.log(
          file.padEnd(35) +
          formatSize(beforeSize).padStart(12) +
          formatSize(afterSize).padStart(12) +
          `${formatSize(saved)} (${percent}%)`.padStart(12)
        );
      } else {
        totalAfter += beforeSize;
        console.log(
          file.padEnd(35) +
          formatSize(beforeSize).padStart(12) +
          'skipped'.padStart(12) +
          '(already optimal)'.padStart(12)
        );
      }
    } catch (err) {
      totalAfter += beforeSize;
      console.log(
        file.padEnd(35) +
        formatSize(beforeSize).padStart(12) +
        'ERROR'.padStart(12) +
        err.message.substring(0, 30).padStart(12)
      );
    }
  }

  console.log('-'.repeat(71));
  console.log(
    'TOTAL'.padEnd(35) +
    formatSize(totalBefore).padStart(12) +
    formatSize(totalAfter).padStart(12) +
    formatSize(totalBefore - totalAfter).padStart(12)
  );
  console.log(`\nTotal saved: ${formatSize(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

optimizeImages().catch(console.error);
