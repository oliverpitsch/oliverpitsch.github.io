#!/usr/bin/env node
/**
 * Simple OG image generator for articles.
 * Generates a 1200x630 PNG per article at public/og/{slug}.png
 * using lightweight SVG + resvg.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.join(process.cwd(), 'content', 'articles');
const outDir = path.join(process.cwd(), 'public', 'og');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function truncate(str, max=120){
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

// Use single quotes for font family names with spaces to avoid breaking XML attribute quoting
const fontStack = "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

for (const file of fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))) {
  try {
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const { data } = matter(raw);
    const slug = (data.slug || file.replace(/\.md$/, ''));
    const title = (data.Title || slug).toString();
    const description = truncate((data.description || '').toString(), 140);
    const date = data.date ? new Date(data.date).toISOString().slice(0,10) : '';

    const safeTitle = escapeXML(title);
    const safeDesc = escapeXML(description);

    // Manual naive wrap for description (split into ~50 char lines)
    const descLines = [];
    if (safeDesc) {
      let remaining = safeDesc;
      while (remaining.length > 0 && descLines.length < 4) {
        let slice = remaining.slice(0, 50);
        const lastSpace = slice.lastIndexOf(' ');
        if (remaining.length > 50 && lastSpace > 30) {
          slice = slice.slice(0, lastSpace);
        }
        descLines.push(slice);
        remaining = remaining.slice(slice.length).trimStart();
      }
    }

    const descTspans = descLines.map((l,i) => `<tspan x="80" dy="${i===0?0:38}">${l}</tspan>`).join('');

    const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="#0f172a" offset="0%" />
      <stop stop-color="#1e293b" offset="50%" />
      <stop stop-color="#334155" offset="100%" />
    </linearGradient>
  </defs>
  <rect fill="url(#grad)" width="1200" height="630" />
  <g fill="#fff" font-family="${fontStack}">
    <text x="80" y="150" font-size="52" font-weight="600">${safeTitle}</text>
    ${descLines.length ? `<text x="80" y="230" font-size="30" fill="#cbd5e1" font-weight="400">${descTspans}</text>` : ''}
    ${date ? `<text x="80" y="560" font-size="26" fill="#64748b" font-weight="400">${date}</text>` : ''}
    <text x="80" y="600" font-size="26" fill="#818cf8" font-weight="500">pitsch.me</text>
  </g>
</svg>`;

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
    const pngData = resvg.render().asPng();
    fs.writeFileSync(path.join(outDir, `${slug}.png`), pngData);
    console.log(`Generated OG image: og/${slug}.png`);
  } catch (e) {
    console.error('Failed to generate OG for', file, e.message);
  }
}

function escapeXML(str){
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}
