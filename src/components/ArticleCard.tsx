import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';

export type ArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

export default function ArticleCard({ article: a, className = '' }: ArticleCardProps) {
  const heroSrc = a.heroImage || a.ogImage || `/og/${a.slug}.jpg`;
  return (
    <Link
      href={`/articles/${a.slug}`}
      className={[
        'group relative flex flex-col rounded-3xl overflow-hidden',
        'border border-[#E2E8F0] dark:border-slate-800 p-2',
        'bg-white dark:bg-[#152544]',
        'shadow-sm ring-0 transition hover:ring-4 ring-amber-400/50 dark:ring-amber-400/60',
        'transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] dark:focus-visible:ring-offset-[#091223]',
        className,
      ].join(' ')}
    >
      {heroSrc ? (
      <div className="relative w-full pt-[62%] dark:from-[#1e335c] dark:to-[#11203b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt={a.heroAlt || ''}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center rounded-2xl"
        />
        
      </div>):null}
      <div className={`flex-1 flex flex-col gap-3 z-2 p-4 bg-white dark:bg-[#152544] rounded-2xl ${heroSrc ? '-mt-6' : ''}`}>
        <div className="flex flex-col gap-2">
        <h2 className="text-lg lg:text-xl font-semibold leading-snug tracking-tight text-slate-700 dark:text-[#E6EEFF] line-clamp-3">
          {a.Title}
        </h2>
        <p className="text-base leading-6 text-slate-600 dark:text-slate-200 line-clamp-3">
          {a.description || '—'}
        </p></div>
        <div className="pt-3 text-xs font-medium text-slate-600/90 dark:text-slate-400/90 flex flex-wrap items-center gap-5">
          {a.readingTime && (
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-500">
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{a.readingTime}</span>
            </span>
          )}
          {a.displayDate && (
            <span className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-500">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{a.displayDate}</span>
            </span>
          )}
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/[0.02] group-hover:ring-black/[0.06] dark:ring-white/5 dark:group-hover:ring-white/10 transition" />
    </Link>
  );
}
