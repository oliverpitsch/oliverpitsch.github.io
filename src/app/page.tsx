/*
  We intentionally use native <img> tags instead of next/image because:
  - Site is statically exported (next.config.js sets images.unoptimized = true)
  - All images are local, already appropriately sized, avoiding extra wrapper markup
  - Keeps build simpler for GitHub Pages deployment
*/
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Timeline from '@/components/Timeline';
import { getAllArticlesMeta } from '@/lib/articles';

function Topline() {
  return (
    <div
      className="h-7 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
      aria-hidden
    />
  );
}

function ProfileImage() {
  return (
    <picture className="block mx-auto mt-16">
      <source
        media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)"
        srcSet="/images/oliver-pitsch-2025.png"
      />
      <source media="(prefers-color-scheme: dark)" srcSet="/images/oliver-pitsch-2025-dark.png" />
      <img
        src="/images/oliver-pitsch-2025-dark.png"
        alt="Oliver Pitsch"
        height={192}
        className="h-48 w-48 rounded-full mx-auto mix-blend-multiply dark:mix-blend-normal"
      />
    </picture>
  );
}

function Social() {
  const links = [
    {
      href: 'https://www.linkedin.com/in/oliverpitsch/',
      title: 'LinkedIn',
      icon: 'social-icons/social-linkedIn.svg',
    },
    {
      href: 'https://oliverpitsch.medium.com/',
      title: 'Medium',
      icon: 'social-icons/social-medium.svg',
    },
    {
      href: 'https://www.instagram.com/addictedtocoffee/',
      title: 'Instagram',
      icon: 'social-icons/social-instagram.svg',
    },
  ];

  return (
    <div className="mt-40 text-center">
      <h3 className="mb-8 text-[16px] font-semibold text-slate-500 dark:text-[#E6EEFF]">
        Get in touch
      </h3>
      <div className="mx-auto grid max-w-lg grid-cols-3 place-items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} title={`Oliver Pitsch on ${l.title}`} className="group">
            <img
              src={`/images/${l.icon}`}
              alt={l.title}
              className="size-6 scale-125 transition-colors group-hover:brightness-110 dark:invert"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function ContactCTA() {
  const topics = ['Product strategy', 'UX systems', 'AI building', 'Leadership sparring'];

  return (
    <section className="mx-auto mt-20 max-w-5xl px-4 lg:px-0" aria-labelledby="contact-heading">
      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#152544] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute inset-0 opacity-80 dark:opacity-100" aria-hidden="true">
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(77,142,243,0.1),_transparent_68%)]" />
          <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,213,0,0.08),_transparent_72%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,213,0,0.55),transparent)]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)] lg:items-end">
          <div>
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="mt-5 max-w-3xl text-balance text-[32px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#182B52] dark:text-white sm:text-[40px]"
            >
              Contact Oliver Pitsch for product strategy, UX, and AI building
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-[17px] leading-8 text-slate-600 dark:text-slate-300 sm:text-[18px]">
              If you are building a product, evolving a product team, or looking for a sharper way
              to move from customer insight to shipped software, let&apos;s talk. I work with
              leaders, founders, and teams that want clearer direction, stronger UX, and faster
              execution with less process overhead.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-3 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="relative rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30 sm:p-6">
            <h3 className="text-[18px] font-semibold tracking-tight text-[#182B52] dark:text-white">
              Start a conversation
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
              Best fit for advisory, product leadership, UX direction, and AI building.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:office@pitsch.me?subject=Let%27s%20talk"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#182B52] px-5 py-3 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#21386A] dark:bg-white dark:text-[#182B52] dark:hover:bg-[#E6EEFF]"
              >
                Email me directly
              </a>
              <a
                href="https://www.linkedin.com/in/oliverpitsch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-semibold text-[#182B52] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-[#8DAEF0] hover:bg-[#F8FBFF] dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:border-[#8DAEF0] dark:hover:bg-[#193056]"
              >
                Message on LinkedIn
              </a>
            </div>

            <p className="mt-5 text-center text-[13px] leading-6 text-slate-500 dark:text-slate-400">
              Prefer formal contact details? See the{' '}
              <Link href="/imprint" className="underline underline-offset-4">
                imprint and contact information
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const allArticles = await getAllArticlesMeta();
  const latestArticles = allArticles.slice(0, 6);
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <Topline />
      <main className="mx-auto max-w-full">
        <ProfileImage />

        <div className="mx-auto mt-10 max-w-4xl px-4 text-center lg:mt-12 lg:px-0">
          <h1 className="text-balance text-[56px] font-semibold leading-[0.92] tracking-[-0.03em] sm:text-[68px] lg:text-[76px]">
            Oliver Pitsch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[21px] font-semibold tracking-[0.01em] text-[#3B5EA5] dark:text-[#8DAEF0] sm:text-[24px]">
            Product, UX, and AI building
          </p>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[17px] leading-7 text-slate-500 dark:text-slate-400 sm:text-[19px]">
            Turning product context into shipped software
          </p>
        </div>

        <Timeline />

        <section
          className="mx-auto mt-16 max-w-4xl text-[18px] leading-7 text-[#182B52] dark:text-[#E6EEFF] px-10 lg:px-0"
          aria-label="About Oliver Pitsch"
        >
          <p>
            Oliver Pitsch builds product systems for the age of humans and agents. With 20 years
            across design, UX, and product leadership, he combines product thinking, UX craft,
            business context, and AI building to turn product context into shipped software.
          </p>
          <p className="mt-4">
            Currently Head of Product &amp; Engineering at AI Labs, where he helps large enterprises
            unlock the full potential of frontier AI within the boundaries of German and European
            privacy law. AI Labs connects the data already inside large organizations, from email
            and communications to ERP systems and data warehouses, into a unified intelligence layer
            that companies can actually deploy, trust, and build on.
          </p>
          <p className="mt-4">
            Previously Head of Product at{' '}
            <a href="https://ordio.com" className="underline">
              Ordio
            </a>
            , an operations and workforce management platform for shift-based teams, and Director of
            UX &amp; Product Marketing at{' '}
            <a href="https://trustedshops.com" className="underline">
              Trusted Shops
            </a>
            . Before that, founder and CEO of Reputami, an AI-driven reputation SaaS for
            hospitality, acquired in 2015. Also founder of{' '}
            <a href="https://joinride.cc" className="underline">
              Joinride.cc
            </a>
            , the platform for cycling group rides and run clubs in Germany.
          </p>
          <p className="mt-4">
            His focus is reducing handoffs, removing process overhead, and helping teams move from
            feedback and intent to working software with more clarity, speed, and leverage.
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-4xl px-10 lg:px-0" aria-label="Areas of expertise">
          <h2 className="text-xl font-semibold mb-6 text-[#182B52] dark:text-white">
            How I create leverage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(
              [
                {
                  label: 'Context to Execution',
                  desc: 'Turn customer feedback, product intent, and strategy into scoped work and shipped outcomes.',
                },
                {
                  label: 'UX and Product Systems',
                  desc: 'Design flows, structures, and systems that help products scale without losing clarity.',
                },
                {
                  label: 'AI Building',
                  desc: 'Use AI tools and agents to compress planning, building, and iteration into faster delivery loops.',
                },
                {
                  label: 'B2B SaaS and Operations',
                  desc: 'Deep experience in HR tech, shift-based work, trust, and operational software.',
                },
                {
                  label: 'Product Growth and Signals',
                  desc: 'Connect research, customer requests, product marketing, and behavior to find what matters and act on it.',
                },
                {
                  label: 'Human + Agent Workflows',
                  desc: 'Shape ways of working where people focus on intent, judgment, and taste while AI handles more of the mechanics.',
                },
              ] as { label: string; desc: string }[]
            ).map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-5 bg-white dark:bg-[#152544]"
              >
                <h3 className="font-semibold text-[16px] text-[#182B52] dark:text-white">
                  {item.label}
                </h3>
                <p className="mt-2 text-[14px] text-slate-600 dark:text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <ContactCTA />

        {latestArticles.length > 0 && (
          <section className="mx-auto mt-16 max-w-4xl px-4 lg:px-0" aria-label="Latest writing">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                  Writing on product systems, AI, and building
                </h2>
                <p className="mt-1 text-[14px] text-slate-500 dark:text-slate-400">
                  Perspectives on AI building, modern product work, and where software teams are
                  headed.
                </p>
              </div>
              <Link
                href="/articles"
                className="text-[14px] font-semibold text-indigo-700 dark:text-indigo-300 underline shrink-0"
              >
                All articles →
              </Link>
            </div>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
              {latestArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <Social />

        <section className="mt-40 flex justify-center">
          <img src="images/signature.png" alt="With love from Oliver Pitsch" className="w-32" />
        </section>

        <footer className="mt-20 mb-1 text-center relative">
          <div className="bg-[#FFD500] py-2 text-[12px]">
            <Link href="/imprint" className="underline text-[#182B52]">
              Imprint & Data Privacy
            </Link>
          </div>
          <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-b from-[#FFBF00] to-[#FFAA00]" />
        </footer>
      </main>
    </div>
  );
}
