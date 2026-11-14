import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const widths = [320, 480, 640, 960, 1280, 1920];
const directory = 'public/_responsive';

async function imagesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? imagesIn(file) : /\.(png|jpe?g|webp)$/i.test(file) ? [file] : [];
  }));
  return files.flat().sort();
}

export async function prepareImages() {
  await mkdir(directory, { recursive: true });
  const manifest = {};
  for (const file of await imagesIn('public/projects')) {
    const input = await readFile(file);
    const { width, height } = await sharp(input).metadata();
    const hash = createHash('sha256').update(input).digest('hex').slice(0, 12);
    const name = path.basename(file, path.extname(file));
    const variants = [];
    for (const size of [...new Set([...widths.filter(size => size < width), width])]) {
      const output = await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 90, effort: 5 }).toBuffer();
      if (output.length >= input.length && size === width) {
        variants.push({ width: size, src: '/' + file.slice('public/'.length) });
      } else {
        const src = `/_responsive/${name}-${hash}-${size}.webp`;
        await writeFile('public' + src, output);
        variants.push({ width: size, src });
      }
    }
    manifest['/' + file.slice('public/'.length)] = { width, height, variants };
  }
  await writeFile('src/lib/responsive-images.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Prepared responsive variants for ${Object.keys(manifest).length} images.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  await prepareImages();
}
