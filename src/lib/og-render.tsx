/* eslint-disable @next/next/no-img-element */
import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';
import { brandMark } from '@/components/layout/BrandMark';
import type { OgCard } from '@/lib/og-cards';
import { OG_SIZE } from '@/lib/og-meta';

/* Light-scheme tokens from globals.css. Satori has no CSS variables. */
const c = {
  canvas: '#f8fafc',
  surface: '#ffffff',
  ink: '#1e293b',
  inkMuted: '#5d6d84',
  line: '#e2e8f0',
  accentSoft: '#eef0ff',
  stripes: ['#4338ca', '#6366f1', '#a5b4fc'],
};

const root = process.cwd();
const fontDir = path.join(root, 'src', 'assets', 'og');
const font = (file: string) => fs.readFileSync(path.join(fontDir, file));

let fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts'];
function loadFonts() {
  fonts ??= [
    { name: 'Geist', data: font('Geist-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Geist', data: font('Geist-Medium.ttf'), weight: 500, style: 'normal' },
    { name: 'Geist', data: font('Geist-SemiBold.ttf'), weight: 600, style: 'normal' },
    { name: 'Geist Mono', data: font('GeistMono-Medium.ttf'), weight: 500, style: 'normal' },
  ];
  return fonts;
}

const mime: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

/** Inline a file from /public as a data URI; satori cannot fetch during a static build. */
function publicImage(src: string): string | undefined {
  const file = path.join(root, 'public', src);
  if (!fs.existsSync(file)) return undefined;
  const type = mime[path.extname(file).toLowerCase()] ?? 'image/png';
  return `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;
}

/** Step the title down as it grows so long article titles still fit in three or four lines. */
function titleSize(title: string): number {
  const n = title.length;
  if (n <= 14) return 92;
  if (n <= 36) return 64;
  if (n <= 56) return 54;
  if (n <= 80) return 46;
  return 40;
}

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 82) / 97} viewBox={brandMark.viewBox} fill="none">
      {brandMark.paths.map(({ d, evenOdd }) => (
        <path
          key={d}
          d={d}
          fillRule={evenOdd ? 'evenodd' : undefined}
          clipRule={evenOdd ? 'evenodd' : undefined}
          fill={c.ink}
        />
      ))}
    </svg>
  );
}

export function renderOgCard(card: OgCard): ImageResponse {
  const portrait = publicImage('/images/oliver-pitsch-2025.png');
  const hero = card.visual.kind === 'image' ? publicImage(card.visual.src) : undefined;
  const showPortrait = card.visual.kind === 'portrait' && portrait;
  const size = titleSize(card.title);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: c.canvas,
          fontFamily: 'Geist',
          color: c.ink,
        }}
      >
        {/* The three-stripe brand edge that opens every page. */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {c.stripes.map((color) => (
            <div key={color} style={{ height: 6, background: color }} />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'stretch',
            gap: 64,
            padding: '60px 80px 60px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: size,
                  fontWeight: 600,
                  lineHeight: 1.04,
                  letterSpacing: '-0.035em',
                  textWrap: 'balance',
                }}
              >
                {card.title}
              </div>
              {card.subtitle && (
                <div
                  style={{
                    marginTop: 24,
                    fontSize: 28,
                    lineHeight: 1.4,
                    color: c.inkMuted,
                    textWrap: 'pretty',
                  }}
                >
                  {card.subtitle}
                </div>
              )}
            </div>

            {/* The brand mark is a signature, so it signs off below the content. */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <Mark size={112} />
              <div style={{ fontFamily: 'Geist Mono', fontSize: 22, color: c.inkMuted }}>
                {['pitsch.me', card.detail].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>

          {showPortrait && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={portrait}
                alt=""
                width={340}
                height={340}
                style={{ borderRadius: 999, background: c.accentSoft, objectFit: 'cover' }}
              />
            </div>
          )}

          {hero && (
            <div
              style={{
                display: 'flex',
                width: 420,
                borderRadius: 28,
                overflow: 'hidden',
                border: `1px solid ${c.line}`,
                background: c.surface,
              }}
            >
              <img
                src={hero}
                alt=""
                width={420}
                height={492}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Text-only cards carry the favicon squircle so the right half is never empty. */}
          {card.visual.kind === 'none' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 280,
                  height: 280,
                  borderRadius: 63,
                  overflow: 'hidden',
                }}
              >
                {c.stripes.map((color) => (
                  <div key={color} style={{ flex: 1, background: color }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: loadFonts() },
  );
}
