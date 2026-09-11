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
  ink: '#1e293b',
  inkMuted: '#5d6d84',
  accentSoft: '#eef0ff',
  indigo: '#4338ca',
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
          fill={c.indigo}
        />
      ))}
    </svg>
  );
}

type Size = { width: number; height: number };

const bannerTopics = ['Product', 'User Experience', 'AI Building'];

/** LinkedIn profile banner: the three practice areas under the three brand stripes, signed bottom right. */
export function renderLinkedInBanner({ width, height }: Size): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundImage: `linear-gradient(100deg, ${c.canvas} 35%, ${c.accentSoft} 100%)`,
          fontFamily: 'Geist',
          color: c.ink,
        }}
      >
        <div style={{ position: 'absolute', top: 52, left: 56, display: 'flex', gap: 48 }}>
          {bannerTopics.map((topic, i) => (
            <div key={topic} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 6, borderRadius: 3, background: c.stripes[i] }} />
              <div
                style={{
                  marginTop: 18,
                  padding: '0 18px',
                  fontSize: 36,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {topic}
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', right: 72, bottom: 52, display: 'flex' }}>
          <Mark size={150} />
        </div>
      </div>
    ),
    { width, height, fonts: loadFonts() },
  );
}

/** Square profile photo on the accent-soft ground the site uses behind the portrait. */
export function renderAvatar({ width, height }: Size): ImageResponse {
  const portrait = publicImage('/images/oliver-pitsch-2025.png');
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: c.accentSoft }}>
        {portrait && (
          <img src={portrait} alt="" width={width} height={height} style={{ objectFit: 'cover' }} />
        )}
      </div>
    ),
    { width, height },
  );
}

export function renderOgCard(card: OgCard): ImageResponse {
  const portrait = publicImage('/images/oliver-pitsch-2025.png');
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
            }}
          >
            {/* Centred in the space above the signature, so the text sits close to it. */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
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

          {portrait && (
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
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: loadFonts() },
  );
}
