/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';
import { getOgCards, type OgCard } from '@/lib/og-cards';
import { OG_SIZE, ogImagePath } from '@/lib/og-meta';

/*
  Internal preview of every share card. Not linked, not in the sitemap, and
  marked noindex so it never shows up in search. The platform mocks use each
  platform's own colours on purpose, so they do not follow the site tokens.
*/
export const metadata: Metadata = {
  title: 'Share image previews – Oliver Pitsch',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const domain = 'pitsch.me';

function Platform({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="text-[14px] font-semibold text-ink">{name}</span>
        <span className="text-[12px] text-ink-muted">{note}</span>
      </figcaption>
      {children}
    </figure>
  );
}

function Facebook({ card, src }: { card: OgCard; src: string }) {
  return (
    <div className="overflow-hidden border border-[#dadde1] bg-white font-[Helvetica,Arial,sans-serif]">
      <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" />
      <div className="border-t border-[#dadde1] bg-[#f0f2f5] px-3 py-2.5">
        <p className="text-[12px] uppercase text-[#65676b]">{domain}</p>
        <p className="mt-0.5 line-clamp-2 text-[16px] font-semibold leading-5 text-[#050505]">
          {card.share.title}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[14px] text-[#65676b]">{card.share.description}</p>
      </div>
    </div>
  );
}

function X({ card, src }: { card: OgCard; src: string }) {
  return (
    <div className="font-[system-ui,sans-serif]">
      <div className="relative overflow-hidden rounded-2xl border border-[#cfd9de]">
        <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" />
        <span className="absolute bottom-3 left-3 max-w-[85%] truncate rounded bg-black/75 px-1.5 py-0.5 text-[13px] text-white">
          {card.share.title}
        </span>
      </div>
      <p className="mt-1 text-[13px] text-[#536471]">From {domain}</p>
    </div>
  );
}

function LinkedIn({ card, src }: { card: OgCard; src: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e0dfdc] bg-white font-[system-ui,sans-serif]">
      <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" />
      <div className="bg-[#eef3f8] px-3 py-2">
        <p className="line-clamp-2 text-[14px] font-semibold leading-5 text-black/90">
          {card.share.title}
        </p>
        <p className="mt-0.5 text-[12px] text-black/60">{domain}</p>
      </div>
    </div>
  );
}

function Slack({ card, src }: { card: OgCard; src: string }) {
  return (
    <div className="rounded-lg bg-white p-3 font-[system-ui,sans-serif]">
      <div className="border-l-4 border-[#dddddd] pl-3">
        <p className="text-[13px] font-bold text-[#1d1c1d]">Oliver Pitsch</p>
        <p className="text-[15px] font-bold text-[#1264a3]">{card.share.title}</p>
        <p className="line-clamp-2 text-[15px] leading-[22px] text-[#1d1c1d]">
          {card.share.description}
        </p>
        <img src={src} alt="" className="mt-2 w-full max-w-[360px] rounded-lg" />
      </div>
    </div>
  );
}

function Messages({ card, src }: { card: OgCard; src: string }) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg bg-white p-3 font-[system-ui,sans-serif]">
      <div className="w-full max-w-[260px] overflow-hidden rounded-[18px] bg-[#e9e9eb]">
        <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" />
        <div className="px-3 py-2">
          <p className="line-clamp-2 text-[13px] font-semibold leading-4 text-black">
            {card.share.title}
          </p>
          <p className="mt-0.5 text-[12px] text-[#8e8e93]">{domain}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <img src={src} alt="" className="size-20 rounded-lg object-cover" />
        <span className="text-[11px] text-[#8e8e93]">square crop</span>
      </div>
    </div>
  );
}

function CardPreview({ card }: { card: OgCard }) {
  const src = ogImagePath(card.key);
  return (
    <section id={card.key} className="scroll-mt-8 border-t border-line pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{card.path}</h2>
        <div className="flex gap-5 text-[14px] font-medium">
          <a href={card.path} className="text-accent underline underline-offset-4">
            Open page
          </a>
          <a href={src} className="text-accent underline underline-offset-4">
            Open PNG
          </a>
        </div>
      </div>
      <p className="mt-1 font-mono text-[13px] text-ink-muted">{src}</p>

      <img
        src={src}
        alt={card.share.title}
        width={OG_SIZE.width}
        height={OG_SIZE.height}
        loading="lazy"
        className="mt-6 h-auto w-full rounded-xl border border-line shadow-surface"
      />

      <div className="mt-8 grid gap-10 rounded-2xl bg-surface-muted p-5 sm:p-8 md:grid-cols-2">
        <Platform name="Facebook" note="og:image, 1.91 : 1">
          <Facebook card={card} src={src} />
        </Platform>
        <Platform name="X" note="summary_large_image">
          <X card={card} src={src} />
        </Platform>
        <Platform name="LinkedIn" note="og:image, 1.91 : 1">
          <LinkedIn card={card} src={src} />
        </Platform>
        <Platform name="Slack" note="unfurl">
          <Slack card={card} src={src} />
        </Platform>
        <Platform name="iMessage / WhatsApp" note="bubble and thumbnail">
          <Messages card={card} src={src} />
        </Platform>
      </div>
    </section>
  );
}

export default async function MetaImagePage() {
  const cards = await getOgCards();
  return (
    <PageShell>
      <Container size="default" className="pt-14 pb-24 sm:pt-20">
        <p className="text-[14px] font-medium text-accent">Internal · not indexed</p>
        <h1 className="mt-3 text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          Share images
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-8 text-ink-muted">
          Every page ships a {OG_SIZE.width} × {OG_SIZE.height} card rendered at build time from
          src/lib/og-render.tsx. This is how each one lands on the platforms that unfurl links.
        </p>

        <nav aria-label="Cards" className="mt-8 flex flex-wrap gap-2">
          {cards.map((card) => (
            <a
              key={card.key}
              href={`#${card.key}`}
              className="max-w-full truncate rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink hover:border-accent/40"
            >
              {card.path}
            </a>
          ))}
        </nav>

        <div className="mt-14 flex flex-col gap-16">
          {cards.map((card) => (
            <CardPreview key={card.key} card={card} />
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
