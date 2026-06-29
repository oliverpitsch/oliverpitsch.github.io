/*
  Native <img> over next/image: the site is statically exported
  (next.config.ts sets images.unoptimized) and all assets are local.
*/
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import type { VibeDesignContent } from '@/lib/vibe-design-content';

const EMAIL = 'oliver@pitsch.me';

function jsonLd(c: VibeDesignContent) {
  const baseUrl = 'https://pitsch.me';
  const pageUrl = `${baseUrl}${c.pagePath}`;

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: c.meta.ogTitle,
    description: c.meta.description,
    url: pageUrl,
    provider: {
      '@type': 'Person',
      name: 'Oliver Pitsch',
      url: baseUrl,
      jobTitle: 'UX & Product Design Lead',
      knowsAbout: [
        'UX design',
        'UI design',
        'Design systems',
        'Design tokens',
        'Claude Code',
        'Codex',
        'Vibe coding',
        'AI-native product development',
      ],
    },
    serviceType: [
      'UX Design',
      'UI Design',
      'Design System Consulting',
      'Design Tokens',
      'AI Coding Tooling Setup',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    availableLanguage: ['en', 'de'],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: c.breadcrumbName, item: pageUrl },
    ],
  };

  return [professionalService, faqPage, breadcrumb];
}

/* ---------- Signature visual: before / after UI mockup ---------- */

function MockChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
      <span className="ml-2 text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </span>
    </div>
  );
}

/* The "before": peak AI-generated output. Gradient slop, buzzwords, em dashes.
   The em dashes are intentional here: they parody typical AI copy and are
   confined to this mock, never the real page voice. */
function BeforeMock({ c }: { c: VibeDesignContent['beforeAfter']['before'] }) {
  return (
    <div className="flex h-full flex-col rounded-[18px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-[#0f1c36]">
      <MockChrome label="app · upgrade" />
      <div className="mt-5 rounded-2xl border border-purple-200/70 bg-gradient-to-br from-violet-50 via-indigo-50 to-fuchsia-50 p-4 shadow-[0_8px_30px_-8px_rgba(139,92,246,0.45)] dark:border-purple-500/30 dark:from-violet-950/40 dark:via-indigo-950/40 dark:to-fuchsia-950/40">
        <p className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-[16px] font-extrabold text-transparent dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400">
          {c.plan}
        </p>
        <p className="text-[13px] font-semibold text-purple-500 dark:text-purple-300">{c.price}</p>
        <p className="mt-2 text-[12px] text-slate-500 dark:text-slate-400">{c.blurb}</p>
        <ul className="mt-2 text-[12px] text-indigo-600 dark:text-indigo-300">
          {c.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 py-2 text-[13px] font-semibold text-white shadow-lg shadow-purple-500/40">
          {c.cta}
        </button>
        <p className="mt-1 text-center text-[11px] text-purple-500 underline dark:text-purple-300">
          {c.later}
        </p>
      </div>
    </div>
  );
}

/* The "after": a stacked card. A white content card sits on a solid amber
   layer that peeks out the bottom to hold the CTA, over a dotted texture.
   Depth comes from layering and shadows, not hue gradients. */
function AfterMock({ c }: { c: VibeDesignContent['beforeAfter']['after'] }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-[#FBFCFE] p-6 shadow-card dark:border-slate-700 dark:bg-[#0d1a33]">
      {/* Subtle dotted texture behind the stack */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.7] [background-image:radial-gradient(rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:13px_13px] dark:[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]"
        aria-hidden="true"
      />

      <div className="relative">
        <MockChrome label="app · upgrade" />
      </div>

      {/* Yellow card acts as a 4px mat; the white card sits inset on all sides */}
      <div className="relative mt-5 flex flex-col gap-1 rounded-2xl bg-[#FFC400] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_14px_30px_-12px_rgba(255,170,0,0.65)]">
        {/* White content card, inset 4px inside the yellow card on all sides */}
        <div className="rounded-xl border border-slate-200/70 bg-[#F7F9FC] p-5 shadow-surface inset-ring-1 inset-ring-white dark:border-slate-700 dark:bg-[#16284a] dark:inset-ring-white/10">
          <div className="flex items-start justify-between">
            <p className="text-[17px] font-semibold tracking-[-0.01em] text-[#182B52] dark:text-white">
              {c.name}
            </p>
            <span className="inline-flex items-center rounded-full bg-[#182B52] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white dark:bg-white dark:text-[#182B52]">
              {c.popular}
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-[#182B52] dark:text-white">
              {c.price}
            </span>
            <span className="text-[13px] font-medium text-slate-400">{c.perMonth}</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-5 text-slate-500 dark:text-slate-400">
            {c.tagline}
          </p>

          <div
            className="my-4 h-px bg-gradient-to-r from-transparent via-[#FFBF00]/45 to-transparent"
            aria-hidden="true"
          />

          <ul className="space-y-3">
            {c.features.map((f) => (
              <li key={f.title} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3B5EA5] dark:text-[#8DAEF0]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[13px] font-semibold leading-tight text-[#182B52] dark:text-white">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-4 text-slate-500 dark:text-slate-400">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA sits in the yellow card; scrolls down to the real contact section */}
        <a
          href="#contact"
          className="group block w-full rounded-xl px-6 py-3.5 text-center transition-[background-color,transform] duration-150 ease-out hover:bg-black/[0.04] active:translate-y-px"
        >
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em] text-[#182B52]">
            {c.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </span>
        </a>
      </div>
    </div>
  );
}

function BeforeAfter({ c }: { c: VibeDesignContent['beforeAfter'] }) {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-6 lg:px-8" aria-labelledby="ba-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-4 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]">
          {c.badge}
        </p>
        <h2
          id="ba-heading"
          className="mt-5 text-balance text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[34px]"
        >
          {c.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[16px] leading-7 text-slate-600 dark:text-slate-300">
          {c.sub}
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <figure className="relative">
          <figcaption className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              <X className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {c.beforeLabel}
          </figcaption>
          <BeforeMock c={c.before} />
        </figure>

        <div className="hidden items-center justify-center sm:flex" aria-hidden="true">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#FFBF00]/40 bg-[#FFF9E6] text-[#B07A00] shadow-[0_6px_16px_-6px_rgba(255,191,0,0.5)] dark:bg-[#2a230a] dark:text-[#FFDC0F]">
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>

        <figure className="relative">
          <figcaption className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#3B5EA5] dark:text-[#8DAEF0]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFBF00] text-[#182B52]">
              <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
            </span>
            {c.afterLabel}
          </figcaption>
          <AfterMock c={c.after} />
        </figure>
      </div>
    </section>
  );
}

/* ---------- Signature visual: design token system ---------- */

function TokenSystem({ c }: { c: VibeDesignContent['tokens'] }) {
  const colorRamps = [
    {
      name: 'Brand',
      block: '#FFC400',
      onDark: false,
      steps: [
        { n: 20, hex: '#FFF1C2', text: '#7A5B00' },
        { n: 40, hex: '#FFDE85', text: '#7A5B00' },
        { n: 80, hex: '#FFC400', text: '#5B4300' },
        { n: 100, hex: '#E8A100', text: '#4A3500' },
      ],
    },
    {
      name: 'Accent',
      block: '#4D7BD9',
      onDark: true,
      steps: [
        { n: 20, hex: '#DEE7FB', text: '#3B5EA5' },
        { n: 40, hex: '#A9C0F2', text: '#2E4D8C' },
        { n: 80, hex: '#5C7FD0', text: '#FFFFFF' },
        { n: 100, hex: '#3B5EA5', text: '#FFFFFF' },
      ],
    },
    {
      name: 'Highlight',
      block: '#8B5CF6',
      onDark: true,
      steps: [
        { n: 20, hex: '#EDE9FE', text: '#6D28D9' },
        { n: 40, hex: '#C4B5FD', text: '#5B21B6' },
        { n: 80, hex: '#8B5CF6', text: '#FFFFFF' },
        { n: 100, hex: '#6D28D9', text: '#FFFFFF' },
      ],
    },
    {
      name: 'Surface',
      block: '#E9EEF4',
      onDark: false,
      steps: [
        { n: 20, hex: '#F8FAFC', text: '#64748B' },
        { n: 40, hex: '#E2E8F0', text: '#475569' },
        { n: 80, hex: '#94A3B8', text: '#FFFFFF' },
        { n: 100, hex: '#475569', text: '#FFFFFF' },
      ],
    },
  ];
  const space = [4, 8, 12, 16, 24, 32, 48];
  const radii = [
    { label: 'control', px: 12 },
    { label: 'card', px: 20 },
    { label: 'panel', px: 28 },
  ];
  const elevations = [
    { label: 'surface', cls: 'shadow-surface' },
    { label: 'card', cls: 'shadow-card' },
    { label: 'popover', cls: 'shadow-popover' },
  ];

  return (
    <section className="mx-auto mt-28 max-w-5xl px-6 lg:px-8" aria-labelledby="tokens-heading">
      <div className="max-w-2xl">
        <p className="inline-flex items-center rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-4 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]">
          {c.badge}
        </p>
        <h2
          id="tokens-heading"
          className="mt-5 text-balance text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[34px]"
        >
          {c.heading}
        </h2>
      </div>
      <p className="mt-4 text-pretty text-[16px] leading-7 text-slate-600 dark:text-slate-300">
        {c.description}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Color */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-slate-800 dark:bg-[#152544]">
          <p className="text-[12px] font-semibold text-slate-400">{c.labels.color}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {colorRamps.map((ramp) => (
              <div
                key={ramp.name}
                className="overflow-hidden rounded-lg shadow-surface ring-1 ring-slate-200/70 dark:ring-slate-700"
              >
                <div
                  className="flex h-12 items-center justify-center"
                  style={{ backgroundColor: ramp.block }}
                >
                  <span
                    className={`text-[12px] font-semibold ${ramp.onDark ? 'text-white' : 'text-[#182B52]'}`}
                  >
                    {ramp.name}
                  </span>
                </div>
                <div className="grid grid-cols-4">
                  {ramp.steps.map((s) => (
                    <div
                      key={s.n}
                      className="flex h-6 items-center justify-center text-[9px] font-medium tabular-nums"
                      style={{ backgroundColor: s.hex, color: s.text }}
                    >
                      {s.n}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Type scale */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-slate-800 dark:bg-[#152544]">
          <p className="text-[12px] font-semibold text-slate-400">{c.labels.typeScale}</p>
          <div className="mt-3 space-y-1.5">
            <p className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-[#182B52] dark:text-white">
              Aa
            </p>
            <p className="text-[18px] font-semibold leading-tight text-[#182B52] dark:text-white">
              {c.type.heading}
            </p>
            <p className="text-[14px] font-medium text-slate-600 dark:text-slate-300">
              {c.type.body}
            </p>
            <p className="text-[11px] font-medium text-slate-400">{c.type.caption}</p>
          </div>
        </div>

        {/* Spacing */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-slate-800 dark:bg-[#152544]">
          <p className="text-[12px] font-semibold text-slate-400">{c.labels.spacing}</p>
          <div className="mt-4 space-y-2">
            {space.map((s) => (
              <div key={s} className="flex items-center gap-2.5">
                <span
                  className="block h-2.5 rounded-full bg-gradient-to-r from-[#FFBF00] to-[#FFD500]"
                  style={{ width: `${s * 1.6 + 8}px` }}
                />
                <span className="text-[10px] font-medium tabular-nums text-slate-400">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Radius + elevation */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 dark:border-slate-800 dark:bg-[#152544]">
          <p className="text-[12px] font-semibold text-slate-400">{c.labels.radius}</p>
          <div className="mt-4 flex items-end gap-2.5">
            {radii.map((r) => (
              <div key={r.label} className="text-center">
                <span
                  className="block h-12 w-12 border-2 border-[#3B5EA5] bg-[#F5F9FF] dark:border-[#8DAEF0] dark:bg-[#193056]"
                  style={{ borderRadius: `${r.px}px` }}
                />
                <span className="mt-1.5 block text-[10px] font-medium tabular-nums text-slate-400">
                  {r.px}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[12px] font-semibold text-slate-400">{c.labels.elevation}</p>
          <div className="mt-3 flex items-end gap-4">
            {elevations.map((e) => (
              <div key={e.label} className="flex-1 text-center">
                <span
                  className={`block h-10 w-full rounded-lg bg-[#F7F9FC] ring-1 ring-slate-200/70 inset-ring-1 inset-ring-white ${e.cls} dark:bg-[#1c3158] dark:ring-slate-700 dark:inset-ring-white/10`}
                />
                <span className="mt-2 block text-[10px] font-medium text-slate-400">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Signature visual: agent config that keeps it on-system ---------- */

function StaysOnSystem({ c }: { c: VibeDesignContent['stays'] }) {
  return (
    <section className="mx-auto mt-28 max-w-5xl px-6 lg:px-8" aria-labelledby="stays-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <p className="inline-flex items-center rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-4 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]">
            {c.badge}
          </p>
          <h2
            id="stays-heading"
            className="mt-5 text-balance text-[28px] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-[34px]"
          >
            {c.heading}
          </h2>
          <p className="mt-4 text-pretty text-[16px] leading-7 text-slate-600 dark:text-slate-300">
            {c.body}
          </p>
          <ul className="mt-6 space-y-3">
            {c.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 dark:text-slate-200"
              >
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFBF00]" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Editor-styled config snippet (code stays the same in every language) */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1426] shadow-[0_24px_60px_-24px_rgba(8,15,35,0.7)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[12px] text-slate-400">CLAUDE.md</span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-6">
            <code>
              <span className="text-[#7d8aa5]">## Design system</span>
              {'\n'}
              <span className="text-slate-300">Always use tokens from </span>
              <span className="text-[#FFD96B]">design-tokens.ts</span>
              <span className="text-slate-300">.</span>
              {'\n'}
              <span className="text-slate-300">Never hardcode color, spacing, or radius.</span>
              {'\n\n'}
              <span className="text-[#7d8aa5]">{'// design-tokens.ts'}</span>
              {'\n'}
              <span className="text-[#c792ea]">export const</span>
              <span className="text-slate-300"> tokens = {'{'}</span>
              {'\n'}
              <span className="text-[#82aaff]"> color</span>
              <span className="text-slate-300">: {'{'} brand: </span>
              <span className="text-[#c3e88d]">&apos;#FFBF00&apos;</span>
              <span className="text-slate-300">, ink: </span>
              <span className="text-[#c3e88d]">&apos;#182B52&apos;</span>
              <span className="text-slate-300"> {'}'},</span>
              {'\n'}
              <span className="text-[#82aaff]"> radius</span>
              <span className="text-slate-300">: {'{'} control: </span>
              <span className="text-[#f78c6c]">12</span>
              <span className="text-slate-300">, card: </span>
              <span className="text-[#f78c6c]">20</span>
              <span className="text-slate-300"> {'}'},</span>
              {'\n'}
              <span className="text-[#82aaff]"> space</span>
              <span className="text-slate-300">: [</span>
              <span className="text-[#f78c6c]">4</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#f78c6c]">8</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#f78c6c]">12</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#f78c6c]">16</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#f78c6c]">24</span>
              <span className="text-slate-300">, </span>
              <span className="text-[#f78c6c]">32</span>
              <span className="text-slate-300">],</span>
              {'\n'}
              <span className="text-slate-300">{'}'}</span>
              {'\n\n'}
              <span className="text-[#7d8aa5]">$ npm run lint:design</span>
              {'\n'}
              <span className="text-[#28c840]">✓ no hardcoded design values</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default function VibeDesignPage({ content: c }: { content: VibeDesignContent }) {
  const schemas = jsonLd(c);
  const mailto = `mailto:${EMAIL}?subject=${c.cta.emailSubject}`;

  return (
    <div
      lang={c.lang}
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white"
    >
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Topline */}
      <div
        className="h-7 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
        aria-hidden
      />

      <main className="mx-auto max-w-full">
        {/* Hero */}
        <section className="relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-[-10%] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,213,0,0.16),transparent_70%)]" />
            <div className="absolute right-[6%] top-[18%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(77,142,243,0.12),transparent_68%)]" />
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl px-6 text-center lg:px-0">
            <p className="vibe-rise inline-flex items-center rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-4 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]">
              {c.hero.badge}
            </p>

            <h1
              id="hero-heading"
              className="vibe-rise mt-6 text-balance text-[34px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[56px] sm:leading-[1.0] lg:text-[64px]"
              style={{ animationDelay: '60ms' }}
            >
              {c.hero.headline}
            </h1>

            <p
              className="vibe-rise mx-auto mt-6 max-w-3xl text-pretty text-[18px] leading-8 text-slate-600 dark:text-slate-300 sm:text-[20px]"
              style={{ animationDelay: '120ms' }}
            >
              {c.hero.subheadline}
            </p>

            <div
              className="vibe-rise mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ animationDelay: '180ms' }}
            >
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#182B52] px-6 py-3 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#21386A] active:scale-[0.96] dark:bg-white dark:text-[#182B52] dark:hover:bg-[#E6EEFF]"
              >
                {c.hero.cta1Label}
              </a>
              <a
                href="#process"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-[#182B52] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-[#8DAEF0] hover:bg-[#F8FBFF] active:scale-[0.96] dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:border-[#8DAEF0] dark:hover:bg-[#193056]"
              >
                {c.hero.cta2Label}
              </a>
            </div>
          </div>
        </section>

        <BeforeAfter c={c.beforeAfter} />

        {/* Problems */}
        <section
          className="mx-auto mt-28 max-w-5xl px-6 lg:px-8"
          aria-labelledby="problems-heading"
        >
          <h2 id="problems-heading" className="text-xl font-semibold">
            {c.problems.heading}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.problems.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 dark:border-slate-800 dark:bg-[#152544]"
              >
                <h3 className="text-[16px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <TokenSystem c={c.tokens} />

        {/* Offerings */}
        <section
          id="offer"
          className="mx-auto mt-28 max-w-5xl px-6 lg:px-8"
          aria-labelledby="offer-heading"
        >
          <h2 id="offer-heading" className="text-xl font-semibold">
            {c.offerings.heading}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {c.offerings.items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 dark:border-slate-800 dark:bg-[#152544]"
              >
                <h3 className="text-[18px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFBF00]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <StaysOnSystem c={c.stays} />

        {/* Process */}
        <section
          id="process"
          className="mx-auto mt-28 max-w-3xl px-6 lg:px-0"
          aria-labelledby="process-heading"
        >
          <h2 id="process-heading" className="text-xl font-semibold">
            {c.process.heading}
          </h2>
          <ol className="mt-8 space-y-0">
            {c.process.steps.map((step, idx) => (
              <li key={step.number} className="relative flex gap-5 pb-8 last:pb-0">
                {idx < c.process.steps.length - 1 && (
                  <span
                    className="absolute left-[19px] top-11 bottom-0 w-px bg-gradient-to-b from-[#FFBF00] to-[#FFBF00]/20"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#FFBF00] bg-white text-[13px] font-bold text-[#B07A00] dark:bg-[#182B52] dark:text-[#FFDC0F]">
                  {step.number}
                </span>
                <div className="pt-1">
                  <h3 className="text-[18px] font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Why me */}
        <section className="mx-auto mt-28 max-w-3xl px-6 lg:px-0" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-xl font-semibold">
            {c.why.heading}
          </h2>
          <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 dark:border-slate-800 dark:bg-[#152544] sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <picture className="shrink-0">
                <source
                  media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)"
                  srcSet="/images/oliver-pitsch-2025.png"
                />
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet="/images/oliver-pitsch-2025-dark.png"
                />
                <img
                  src="/images/oliver-pitsch-2025-dark.png"
                  alt="Oliver Pitsch"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full mix-blend-multiply dark:mix-blend-normal"
                />
              </picture>
              <div>
                <p className="text-[16px] leading-7 text-slate-600 dark:text-slate-300">
                  {c.why.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.why.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-3 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    href="/"
                    className="text-[14px] font-semibold text-[#3B5EA5] underline underline-offset-4 dark:text-[#8DAEF0]"
                  >
                    {c.why.linkLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-28 max-w-3xl px-6 lg:px-0" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold">
            {c.faq.heading}
          </h2>
          <div className="mt-6 space-y-3">
            {c.faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#E2E8F0] bg-white dark:border-slate-800 dark:bg-[#152544]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[16px] font-semibold">
                  {item.question}
                  <span className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section
          id="contact"
          className="mx-auto mt-28 max-w-5xl scroll-mt-10 px-4 lg:px-0"
          aria-labelledby="cta-heading"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#152544] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="absolute inset-0 opacity-80 dark:opacity-100" aria-hidden="true">
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(77,142,243,0.1),_transparent_68%)]" />
              <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,213,0,0.08),_transparent_72%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,213,0,0.55),transparent)]" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)] lg:items-end">
              <div>
                <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                  {c.cta.badge}
                </p>
                <h2
                  id="cta-heading"
                  className="mt-5 max-w-3xl text-balance text-[32px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#182B52] dark:text-white sm:text-[40px]"
                >
                  {c.cta.heading}
                </h2>
                <p className="mt-4 max-w-3xl text-pretty text-[17px] leading-8 text-slate-600 dark:text-slate-300 sm:text-[18px]">
                  {c.cta.body}
                </p>
              </div>

              <div className="relative rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30 sm:p-6">
                <div className="flex flex-col gap-3">
                  <a
                    href={mailto}
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#182B52] px-5 py-3 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#21386A] active:scale-[0.96] dark:bg-white dark:text-[#182B52] dark:hover:bg-[#E6EEFF]"
                  >
                    {c.cta.emailLabel}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/oliverpitsch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-semibold text-[#182B52] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-[#8DAEF0] hover:bg-[#F8FBFF] active:scale-[0.96] dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:border-[#8DAEF0] dark:hover:bg-[#193056]"
                  >
                    {c.cta.linkedinLabel}
                  </a>
                </div>
                <p className="mt-5 text-center text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                  {c.cta.legalNote}{' '}
                  <Link href="/imprint" className="underline underline-offset-4">
                    {c.cta.legalLinkLabel}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative mt-24 mb-1 text-center">
          <div className="flex items-center justify-center gap-4 bg-[#FFD500] py-2 text-[12px]">
            <Link href="/imprint" className="text-[#182B52] underline">
              {c.footer.imprintLabel}
            </Link>
            <span className="text-[#182B52]/40">|</span>
            <Link href="/" className="text-[#182B52] underline">
              {c.footer.homeLabel}
            </Link>
            <span className="text-[#182B52]/40">|</span>
            <Link href={c.altPath} className="text-[#182B52] underline">
              {c.footer.langSwitchLabel}
            </Link>
          </div>
          <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-b from-[#FFBF00] to-[#FFAA00]" />
        </footer>
      </main>
    </div>
  );
}
