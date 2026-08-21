import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';

export type ArticleCardProps = {
  article: ArticleMeta;
  className?: string;
};

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ArticleCard({ article: a, className = '' }: ArticleCardProps) {
  const heroSrc = a.heroImage || a.ogImage || `/og/${a.slug}.jpg`;

  return (
    <Link
      href={`/articles/${a.slug}`}
      className={[
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface',
        'shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out',
        'hover:-translate-y-1 hover:border-accent/40 hover:shadow-card',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      ].join(' ')}
    >
      {heroSrc && (
        <div className="relative w-full overflow-hidden pt-[56%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={a.heroAlt || ''}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          {a.Title}
        </h2>
        {a.description && (
          <p className="line-clamp-3 text-[15px] leading-7 text-ink-muted">{a.description}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-3 text-[13px] font-medium text-ink-muted">
          {a.readingTime && (
            <span className="inline-flex items-center gap-2">
              <ClockIcon />
              {a.readingTime}
            </span>
          )}
          {a.displayDate && (
            <span className="inline-flex items-center gap-2">
              <CalendarIcon />
              {a.displayDate}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
