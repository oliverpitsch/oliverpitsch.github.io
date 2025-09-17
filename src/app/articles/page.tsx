import { getAllArticlesMeta } from '@/lib/articles';
import Link from 'next/link';

export const metadata = {
  title: 'Articles – Oliver Pitsch',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticlesMeta();
  return (
    <div className="mx-auto max-w-7xl px-6 xl:px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-12">Articles</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {articles.map(a => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="group relative flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
          >
            <div className="flex-1 flex flex-col">
              <h2 className="text-lg font-semibold leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {a.Title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-4 mb-4">
                {a.description || '—'}
              </p>
              <div className="mt-auto pt-2 text-xs text-neutral-500 dark:text-neutral-500 flex flex-wrap gap-2">
                {a.author && <span>{a.author}</span>}
                {a.readingTime && <span>· {a.readingTime}</span>}
                {a.date && <span>· {a.date}</span>}
              </div>
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-900/0 group-hover:ring-neutral-900/10 dark:group-hover:ring-white/10 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
