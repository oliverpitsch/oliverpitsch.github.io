/*
  We intentionally use native <img> tags instead of next/image because:
  - Site is statically exported (next.config.js sets images.unoptimized = true)
  - All images are local, already appropriately sized, avoiding extra wrapper markup
  - Keeps build simpler for GitHub Pages deployment
*/
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
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

type TimelineItem = { label: string; span: string } & ({ svg: string } | { inline: true });

function Timeline() {
  const items: TimelineItem[] = [
    { label: 'United Prototype', span: '2010 – 2011', svg: 'companies/logo-united-prototype.svg' },
    { label: 'Reputami', span: '2011 – 2015', svg: 'companies/logo-reputami.svg' },
    { label: 'Studitemps', span: '2015 – 2017', svg: 'companies/logo-studitemps.svg' },
    { label: 'Trusted Shops', span: '2017 – 2025', svg: 'companies/logo-trusted-shops.svg' },
    { label: 'Joinride.cc', span: 'since 2022', svg: 'companies/logo-joinride.svg' },
    { label: 'Ordio', span: 'since 2025', svg: 'companies/logo-ordio.svg' },
  ] as const;

  return (
    <div className="mt-32 grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-20 gap-0 gap-y-16">
      {/* Spacer cell with only the yellow timeline line (lg and up) */}
      <div className="hidden col-span-1 lg:block relative pb-8" aria-hidden="true">
        <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-[#FFBF00]" />
      </div>
      {/* TimelineItems */}
      {items.map((it, i) => (
        <div key={i} className="relative pb-8 text-center col-span-1 sm:col-span-3">
          <div
            className={`absolute left-0 right-0 bottom-1 h-0.5 bg-[#FFBF00] ${i === items.length - 1 ? 'rounded-r-full' : ''}`}
          />
          <div className="mx-auto flex h-16 w-16 items-center justify-center ">
            {'inline' in it ? (
              <svg
                width="109"
                height="64"
                viewBox="0 0 109 64"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-aut"
              >
                <path
                  d="M54.207 0C55.6423 0 56.9524 0.789202 57.6172 2.0498C58.2818 3.32004 58.1958 4.84071 57.3965 6.02441L33.8418 40.498C33.0904 41.5854 31.8863 42.1826 30.6533 42.1826C29.9021 42.1826 29.1509 41.9609 28.4863 41.5088C26.7234 40.3058 26.2801 37.9088 27.4746 36.1572L36.0391 23.6172C33.0335 21.4903 29.4591 20.3545 25.7021 20.3545C20.8952 20.3545 16.3771 22.222 12.9766 25.6191C9.57596 29.0164 7.70703 33.5208 7.70703 38.3232C7.70709 43.1256 9.57602 47.6389 12.9766 51.0361C16.3772 54.4334 20.8951 56.3008 25.7021 56.3008C28.1296 56.3008 30.4895 55.8288 32.7051 54.8857C35.4891 53.7116 37.9556 51.5941 39.8438 48.7646L64.6787 11.4238C69.1583 4.68699 76.4705 0.423048 84.2158 0.0380859C84.6588 0.00923425 85.0922 1.72802e-06 85.5352 0C92.2689 0 98.5982 2.56978 103.405 7.24707C103.444 7.27586 103.482 7.31417 103.521 7.35254C103.578 7.40066 103.637 7.44909 103.694 7.50684C103.701 7.51962 103.704 7.52637 103.704 7.52637C103.8 7.62246 103.887 7.71836 103.974 7.81445C109.455 13.5888 109.349 22.7317 103.694 28.3906C100.814 31.2682 97.0281 32.7021 93.2422 32.7021C89.4563 32.7021 85.6802 31.2682 82.7998 28.3906C81.2874 26.8796 81.2874 24.4447 82.7998 22.9434C84.3026 21.4425 86.7395 21.4424 88.2422 22.9434C90.9973 25.6958 95.487 25.6958 98.2422 22.9434C100.997 20.1909 100.997 15.7065 98.2422 12.9541C98.2229 12.9349 98.2029 12.9157 98.1836 12.8965C94.7926 9.54736 90.3037 7.69922 85.5352 7.69922C85.2269 7.69922 84.9186 7.70927 84.6104 7.72852C79.2831 7.99803 74.2352 10.9718 71.0947 15.6875L46.2598 53.0283C43.5431 57.1185 39.8917 60.2077 35.7012 61.9785C32.5319 63.3162 29.1701 64 25.7021 64C18.8335 64 12.3788 61.3339 7.5332 56.4834C2.67812 51.6329 6.22045e-05 45.1754 0 38.3232C0 31.4709 2.67795 25.0224 7.5332 20.1719C12.3788 15.3214 18.8335 12.6553 25.7021 12.6553C31.0294 12.6553 36.1066 14.2628 40.3838 17.2559L46.915 7.69922H25.7021C23.5732 7.69922 21.8486 5.97653 21.8486 3.84961C21.8486 1.7227 23.5732 0 25.7021 0H54.207ZM104.129 34.4736C106.258 34.4737 107.982 36.206 107.982 38.3232C107.982 45.1849 105.314 51.633 100.459 56.4834C95.6038 61.3339 89.1586 64 82.29 64C75.4214 64 68.9666 61.3339 64.1113 56.4834C62.1269 54.4912 60.48 52.2099 59.2373 49.6885C58.2934 47.783 59.0733 45.4832 60.9902 44.54C62.8977 43.5969 65.2101 44.3767 66.1445 46.2822C67.0211 48.0433 68.1677 49.6408 69.5645 51.0361C72.965 54.4333 77.483 56.3008 82.29 56.3008C87.097 56.3007 91.6149 54.4333 95.0059 51.0361C98.4064 47.639 100.275 43.1255 100.275 38.3232C100.275 36.2059 102.01 34.4736 104.129 34.4736Z"
                  fillRule="evenodd"
                />
              </svg>
            ) : (
              // Reuse SVG files from images directory
              <img
                src={`/images/${it.svg}`}
                alt=""
                className="size-16 dark:invert-60 text-red-300"
              />
            )}
          </div>
          <h4 className="mt-6 text-xl font-semibold">{it.label}</h4>
          <span className="text-lg text-[#3B5EA5] dark:text-[#8DAEF0]">{it.span}</span>
          <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-slate-50 dark:border-[#182B52] bg-[#FFBF00]" />
        </div>
      ))}
    </div>
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
      <h3 className="mb-8 text-[16px] font-normal text-slate-500 dark:text-[#E6EEFF]">
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

export default async function Home() {
  const allArticles = await getAllArticlesMeta();
  const latestArticles = allArticles.slice(0, 6);
  const hasMoreArticles = allArticles.length > 6;
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <Topline />
      <main className="mx-auto max-w-full">
        <ProfileImage />

        <div className="text-center mt-8 px-4 lg:px-0">
          <h1 className="text-[48px] font-medium">Oliver Pitsch</h1>
          <h2 className="mt-6 text-[24px] font-semibold">
            Head of Product
            <span className="font-normal"> at </span>
            <a
              href="https://ordio.com"
              className="inline-flex -rotate-[1deg] -skew-x-[4deg] rounded-sm bg-[#4d8ef3] hover:bg-gradient-to-r from-blue-400 to-[#4d8ef3] px-4 py-2 ml-2"
            >
              <span className="relative rotate-[1deg] skew-x-[4deg] text-2xl font-bold text-white">
                Ordio.com
              </span>
            </a>
          </h2>
          <h2 className="mt-6 text-[24px] font-semibold">
            Founder <span className="font-normal">at</span>
            <a
              href="https://joinride.cc"
              className="inline-flex -rotate-[1deg] -skew-x-[4deg] rounded-sm bg-indigo-700 hover:bg-indigo-600 dark:bg-indigo-200 dark:hover:bg-indigo-300 px-4 py-2 ml-2"
            >
              <span className="relative rotate-[1deg] skew-x-[4deg] text-2xl font-bold text-white dark:text-indigo-700">
                Joinride.cc
              </span>
            </a>
          </h2>
        </div>

        <Timeline />

        <section className="mx-auto mt-16 max-w-4xl text-[18px] leading-7 text-[#182B52] dark:text-[#E6EEFF] px-10 lg:px-0">
          <p>
            Oliver Pitsch is an experienced product and design leader from Cologne, Germany, with a
            strong track record of building cross-functional teams and delivering exceptional user
            experiences. With over a decade of experience, he specializes in seamlessly integrating
            the discovery and delivery phases of digital products.
          </p>
          <p className="mt-4">
            In 2012 he co-founded Reputami, a reputation management{' '}
            <abbr title="Software as a Service">SaaS</abbr> for the hospitality industry, which was
            acquired in 2015.
          </p>
          <p className="mt-4">
            Currently, Oliver is leading the product department at
            <a href="https://ordio.com" className="underline ml-1">
              Ordio.com
            </a>{' '}
            and builds
            <a href="https://joinride.cc" className="underline ml-1">
              Joinride.cc
            </a>
            , the leading german platform for planning and finding cycling group rides and run
            clubs.
          </p>
        </section>

        {latestArticles.length > 0 && (
          <section className="mx-auto mt-16 max-w-4xl px-4 lg:px-0">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                Latest articles by Oliver Pitsch
              </h3>
              {hasMoreArticles && (
                <Link
                  href="/articles"
                  className="text-[14px] font-medium text-indigo-700 dark:text-indigo-300 underline"
                >
                  View all
                </Link>
              )}
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
