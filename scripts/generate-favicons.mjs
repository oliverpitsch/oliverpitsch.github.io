// Renders the three-stripe brand mark into the favicon set.
// Run with: node scripts/generate-favicons.mjs
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const STRIPES = ['#4338ca', '#6366f1', '#a5b4fc'];
const ROOT = path.join(import.meta.dirname, '..');
const PNG_DIR = path.join(ROOT, 'public/images/favicons');

// App-icon rounding: iOS uses a corner radius of ~22.4% of the icon's width.
const RADIUS = 48 * 0.224;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <clipPath id="squircle"><rect width="48" height="48" rx="${RADIUS.toFixed(2)}"/></clipPath>
  <g clip-path="url(#squircle)">
${STRIPES.map((color, i) => `    <rect width="48" height="16" y="${i * 16}" fill="${color}"/>`).join('\n')}
  </g>
</svg>
`;

// iOS masks the apple-touch icon itself, so that one stays a full-bleed square.
const squareSvg = svg.replace(' clip-path="url(#squircle)"', '');

/** Wraps a PNG buffer in a single-image .ico container. */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size < 256 ? size : 0, 6);
  header.writeUInt8(size < 256 ? size : 0, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18);
  return Buffer.concat([header, png]);
}

/** Renders the mark at `size`, rasterising the SVG well above the target size. */
const render = (size, source = svg) =>
  sharp(Buffer.from(source), { density: 384 }).resize(size, size).png().toBuffer();

await writeFile(path.join(ROOT, 'src/app/icon.svg'), svg);

for (const size of [16, 32, 96]) {
  await writeFile(path.join(PNG_DIR, `favicon-${size}.png`), await render(size));
}

await writeFile(path.join(PNG_DIR, 'apple-touch-icon.png'), await render(180, squareSvg));
await writeFile(path.join(ROOT, 'src/app/favicon.ico'), pngToIco(await render(32), 32));

console.log('Favicons written.');
