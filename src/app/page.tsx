/*
  We intentionally use native <img> tags instead of next/image because:
  - Site is statically exported (next.config.js sets images.unoptimized = true)
  - All images are local, already appropriately sized, avoiding extra wrapper markup
  - Keeps build simpler for GitHub Pages deployment
*/
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import CareerStrip from '@/components/home/CareerStrip';
import ProductCard from '@/components/home/ProductCard';
import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';
import Button from '@/components/ui/Button';
import { getAllArticlesMeta } from '@/lib/articles';
import { cv } from '@/lib/cv';
import { products } from '@/lib/products';

const siteUrl = 'https://pitsch.me';

const practice = [
  {
    title: 'Product direction',
    body: 'Turning customer feedback, strategy and constraints into scoped work that actually ships, and cutting the handoffs in between.',
  },
  {
    title: 'UX and design systems',
    body: 'Flows, structures and a shared system that hold quality steady while a product and its team grow. Helios at Trusted Shops was built this way.',
  },
  {
    title: 'AI-native delivery',
    body: 'Working with agents so planning, designing and building collapse into one loop. At AI Labs that meant a market-ready product from a team of two in eight weeks.',
  },
];

function Hero() {
  return (
    <Container size="wide" className="pt-14 pb-16 sm:pt-20 lg:pt-24">
      <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="max-w-2xl">
          <h1 className="text-[52px] font-semibold leading-[0.9] tracking-[-0.035em] text-ink sm:text-[68px] lg:text-[76px]">
            Oliver Pitsch
          </h1>
          <p className="mt-6 text-[21px] leading-8 text-ink-muted sm:text-[23px]">
            I lead product and I build it. Head of Product &amp; Engineering at{' '}
            <span className="text-ink">AI Labs</span>, and the solo builder behind{' '}
            <span className="text-ink">Joinride</span>, <span className="text-ink">Famili</span> and{' '}
            <span className="text-ink">neuerName</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#products">See what I build</Button>
            <Button href={`mailto:${cv.email}`} variant="secondary">
              {cv.email}
            </Button>
          </div>
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

function Products() {
  return (
    <section id="products" className="scroll-mt-20" aria-labelledby="products-heading">
      <Container size="wide">
        <div className="max-w-3xl">
          <h2
            id="products-heading"
            className="text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[44px]"
          >
            Products I build when the problem feels personal enough
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-[18px] leading-8 text-ink-muted">
            Small by team size, serious by ambition, and built close to the people they are meant to
            help.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Practice() {
  return (
    <section className="mt-28" aria-labelledby="practice-heading">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h2
              id="practice-heading"
              className="text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[38px]"
            >
              How I work
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-8 text-ink-muted">
              <p>
                Oliver Pitsch builds product systems for the age of humans and agents. Twenty years
                across design, UX and product leadership, spent connecting product thinking, UX
                craft, business context and hands-on building.
              </p>
              <p>
                Currently Head of Product &amp; Engineering at AI Labs, helping large enterprises
                use frontier AI inside the boundaries of German and European privacy law. Previously
                Head of Product at{' '}
                <a href="https://ordio.com" className="text-accent underline underline-offset-4">
                  Ordio
                </a>{' '}
                and Director of UX &amp; Product Marketing at{' '}
                <a
                  href="https://trustedshops.com"
                  className="text-accent underline underline-offset-4"
                >
                  Trusted Shops
                </a>
                , and before that founder of Reputami, acquired by eKomi in 2015.
              </p>
            </div>
          </div>

          <dl className="divide-y divide-line border-t border-line">
            {practice.map((item) => (
              <div key={item.title} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
                <dt className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </dt>
                <dd className="text-[16px] leading-7 text-ink-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Writing({ articles }: { articles: Awaited<ReturnType<typeof getAllArticlesMeta>> }) {
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
            className="text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
          >
            All articles →
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
  const topics = ['Product strategy', 'UX systems', 'AI building', 'Leadership sparring'];

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
                Building something, or rebuilding how your team builds?
              </h2>
              <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-8 text-ink-muted">
                I work with founders, leaders and teams that want clearer direction, stronger UX and
                faster execution with less process overhead.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-accent/25 bg-accent-soft px-3.5 py-1.5 text-[13px] font-semibold text-accent"
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
  const latestArticles = (await getAllArticlesMeta()).slice(0, 3);

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
    knowsAbout: cv.strengths,
    mainEntityOfPage: `${siteUrl}/cv`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Products />
      <Practice />
      <Writing articles={latestArticles} />
      <Contact />

      <section className="mt-28 flex justify-center">
        <img
          src="/images/signature.png"
          alt="With love from Oliver Pitsch"
          className="w-32 dark:invert-60"
        />
      </section>
    </PageShell>
  );
}
