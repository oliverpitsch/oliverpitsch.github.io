import { getAllArticlesMeta } from '@/lib/articles';
import Link from 'next/link';

export const metadata = {
  title: 'Articles – Oliver Pitsch',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticlesMeta();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <div className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]" aria-hidden />
      <main className="mx-auto max-w-7xl px-6 xl:px-10 py-14">
        <header className="max-w-3xl mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">Articles</h1>
          <p className="mt-4 text-[17px] leading-7 text-[#182B52]/80 dark:text-[#E6EEFF]/80">
            Writing on product design leadership, discovery & delivery, and building user-centred products.
          </p>
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {articles.map(a => {
            const heroSrc = a.heroImage || a.ogImage || `/og/${a.slug}.jpg`;
            return (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#283B63] bg-white dark:bg-[#152544] shadow-sm hover:shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] dark:focus-visible:ring-offset-[#182B52]"
              >
                <div className="relative w-full pt-[56%] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-[#1e335c] dark:to-[#11203b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroSrc}
                    alt={a.heroAlt || ''}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="flex-1 flex flex-col p-5">
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {a.Title}
                  </h2>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-4">
                    {a.description || '—'}
                  </p>
                  <div className="mt-5 pt-3 text-xs font-medium text-neutral-600/80 dark:text-neutral-400/80 flex flex-wrap gap-x-2 gap-y-1">
                    {a.author && <span>{a.author}</span>}
                    {a.readingTime && <span>· {a.readingTime}</span>}
                    {a.displayDate && <span>· {a.displayDate}</span>}
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-neutral-900/10 dark:group-hover:ring-white/10 transition" />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
