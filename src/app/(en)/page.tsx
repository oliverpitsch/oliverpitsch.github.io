/*
  We intentionally use native <img> tags instead of next/image because:
  - Site is statically exported (next.config.js sets images.unoptimized = true)
  - All images are local, already appropriately sized, avoiding extra wrapper markup
  - Keeps build simpler for GitHub Pages deployment
*/
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { RiArrowRightFill, RiArrowRightUpLine } from 'react-icons/ri';
import ArticleCard from '@/components/ArticleCard';
import InkSignature from '@/components/InkSignature';
import CareerStrip from '@/components/home/CareerStrip';
import DesignSystemIllustration from '@/components/home/DesignSystemIllustration';
import PixelBackdrop from '@/components/home/PixelBackdrop';
import ProductTabs from '@/components/home/ProductTabs';
import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';
import Button from '@/components/ui/Button';
import { getHomepageArticles, type ArticleMeta } from '@/lib/articles';
import { cv } from '@/lib/cv';
import { chain, designSystemPoints } from '@/lib/home-content';
import { products } from '@/lib/products';
import { testimonials } from '@/lib/testimonials';

export const metadata = {
  alternates: { canonical: '/' },
};

const siteUrl = 'https://pitsch.me';

const h2 =
  'text-balance text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[38px]';
const lead = 'mt-5 max-w-2xl text-pretty text-[17px] leading-8 text-ink-muted';

function Hero() {
  return (
    <Container size="wide" className="pt-14 pb-16 sm:pt-20 lg:pt-24">
      <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="max-w-2xl">
          <h1 className="text-[52px] font-semibold leading-[0.9] tracking-[-0.035em] text-ink sm:text-[68px] lg:text-[76px]">
            Oliver Pitsch
          </h1>
          <p className="mt-6 text-balance text-[24px] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[28px]">
            I lead teams that turn product strategy into products people love and businesses grow
            on.
          </p>
          <p className="mt-5 text-pretty text-[17px] leading-8 text-ink-muted sm:text-[18px]">
            15 years leading product strategy, UX and design at enterprise scale, with design
            quality as a driver of business results. To never stop learning I put agentic product
            development into practice,{' '}
            <a href="#products" className="text-ink underline underline-offset-4">
              in products I build and run myself
            </a>
            .
          </p>
          <p className="mt-5 text-[16px] font-medium leading-7 text-ink">
            Open to a new product or design leadership role.
          </p>
        </div>

        <picture className="shrink-0">
          <source
            media="(prefers-color-scheme: dark)"
            srcSet="/images/oliver-pitsch-2025-dark.png"
          />
          <img
            src="/images/oliver-pitsch-2025.png"
            alt="Oliver Pitsch"
            width={208}
            height={208}
            className="size-40 rounded-full bg-accent-soft object-cover mix-blend-multiply dark:mix-blend-normal lg:size-52"
          />
        </picture>
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <CareerStrip />
      </div>
    </Container>
  );
}

function HowIWork() {
  return (
    <section id="how-i-work" className="mt-12 scroll-mt-20" aria-labelledby="how-heading">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h2 id="how-heading" className={h2}>
              From strategy to market
            </h2>
            <p className={lead}>
              I take products from the first strategy conversation to launch, together with product
              leadership and the teams that build them.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {chain.map((item) => (
              <li key={item.title} className="py-5">
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-[16px] leading-7 text-ink-muted">{item.body}</p>
                {item.link && (
                  <a
                    href={item.link.href}
                    className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {item.link.label}
                    <RiArrowRightFill className="size-4" aria-hidden />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function DesignSystems() {
  return (
    <section id="design-systems" className="mt-28 scroll-mt-20" aria-labelledby="systems-heading">
      <Container size="wide">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-line bg-surface p-8 shadow-card sm:p-12">
          <PixelBackdrop className="-z-10 opacity-[0.16] dark:opacity-[0.14]" />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
            <div>
              <h2 id="systems-heading" className={h2}>
                Design systems, now for agents
              </h2>
              <p className={lead}>
                I have spent years building design systems, and they matter more now than ever.
                Agents build a growing share of every product, and they only build it well when they
                understand it. A design system made for agents is how they do.
              </p>
            </div>
            <DesignSystemIllustration />
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {designSystemPoints.map((point) => (
              <li key={point.title} className="border-t border-line pt-5">
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-ink-muted">{point.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/vibe-coded-design"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
            >
              How I set this up for teams
              <RiArrowRightFill className="size-4" aria-hidden />
            </Link>
            <a
              href="https://onefold.me/design-md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
            >
              Make your own DESIGN.md with Onefold, my tool for it
              <RiArrowRightUpLine className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="mt-28 scroll-mt-20" aria-labelledby="products-heading">
      <Container size="wide">
        <div className="max-w-3xl lg:max-w-4xl">
          <h2
            id="products-heading"
            className="text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px]"
          >
            My lab for AI-native product work
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[18px] leading-8 text-ink-muted lg:max-w-3xl">
            Alongside the teams I lead, I build my own products with AI. It is where I find out
            first-hand how agents change product management, design and engineering, and the
            workflows that hold up go back into my teams. And nothing makes me prouder than seeing
            how many people they help.
          </p>
        </div>

        <ProductTabs products={products} />
      </Container>
    </section>
  );
}

function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="mt-28" aria-labelledby="testimonials-heading">
      <Container size="wide">
        <h2 id="testimonials-heading" className={h2}>
          What people I worked with say
        </h2>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-line bg-surface p-7 shadow-card"
            >
              <blockquote className="text-pretty text-[16px] leading-7 text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-[14px] leading-6">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="block text-ink-muted">{t.context}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Writing({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-28" aria-labelledby="writing-heading">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="writing-heading"
            className="text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[38px]"
          >
            Writing
          </h2>
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
          >
            All articles
            <RiArrowRightFill className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  const topics = [
    'Product & design leadership',
    'Product strategy',
    'Design systems for agents',
    'AI-native teams',
  ];

  return (
    <section id="contact" className="mt-28 scroll-mt-20" aria-labelledby="contact-heading">
      <Container size="wide">
        <div className="rounded-[32px] border border-line bg-surface p-8 shadow-card sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.85fr)] lg:items-center">
            <div>
              <h2
                id="contact-heading"
                className="max-w-2xl text-balance text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[38px]"
              >
                Looking for a product leader who builds teams and products?
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-8 text-ink-muted">
                I am open to a new product or design leadership role, working hand in hand with
                product leadership and the teams around it. I also{' '}
                <Link href="/ai-consulting" className="text-ink underline underline-offset-4">
                  advise a small number of teams
                </Link>{' '}
                on strategy, UX and AI-native delivery.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-semibold text-accent"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button href={`mailto:${cv.email}?subject=Let%27s%20talk`}>Email me directly</Button>
              <Button href={cv.linkedin} variant="secondary">
                Message on LinkedIn
              </Button>
              <p className="mt-1 text-center text-[13px] leading-6 text-ink-muted">
                Formal details are on the{' '}
                <Link href="/imprint" className="underline underline-offset-4">
                  imprint page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function Home() {
  const homepageArticles = await getHomepageArticles();

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.name,
    jobTitle: cv.headline,
    description: cv.summary,
    url: siteUrl,
    email: `mailto:${cv.email}`,
    image: `${siteUrl}/images/oliver-pitsch-2025.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Cologne', addressCountry: 'DE' },
    sameAs: [cv.linkedin, 'https://oliverpitsch.medium.com/', ...products.map((p) => p.href)],
    knowsAbout: cv.strengths.map((strength) => strength.label),
    mainEntityOfPage: `${siteUrl}/cv`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <HowIWork />
      <DesignSystems />
      <Products />
      <Testimonials />
      <Writing articles={homepageArticles} />
      <Contact />

      <section className="mt-28 flex justify-center">
        <InkSignature
          label="With love from Oliver Pitsch"
          className="h-auto w-32 text-[#2242b4] dark:text-[#7d96ff]"
        />
      </section>
    </PageShell>
  );
}
