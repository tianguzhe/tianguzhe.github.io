import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { apps } from '../src/data/apps.ts';

const output = 'public/images/optimized';
await mkdir(output, { recursive: true });
await mkdir('src/generated', { recursive: true });
const screenshots = [...apps.map((app) => app.screenshot), '/images/macclean-detail-v2.png'];
const manifest = {};
let sourceBytes = 0;
let compactBytes = 0;
for (const src of [...apps.map((app) => app.icon), ...screenshots]) {
  const source = join('public', src);
  const { width, height } = await sharp(source).metadata();
  const isIcon = src.endsWith('-icon.png');
  const widths = isIcon ? [240] : [...new Set([480, 768, 1280, 1920].map((size) => Math.min(size, width)))];
  const variants = [];
  for (const size of widths) {
    const name = `${basename(src, '.png')}-${size}.webp`;
    const path = join(output, name);
    await sharp(source).resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 92, effort: 5, lossless: isIcon }).toFile(path);
    variants.push({ src: `/images/optimized/${name}`, width: size });
  }
  manifest[src] = { width, height, variants };
  sourceBytes += (await stat(source)).size;
  compactBytes += (await stat(join('public', variants[0].src))).size;
}
await writeFile('src/generated/images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Images: ${Object.keys(manifest).length} originals, smallest variants ${Math.round(compactBytes / 1024)} KB (originals ${Math.round(sourceBytes / 1024)} KB).`);
