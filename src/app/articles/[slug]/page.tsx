import { getArticleBySlug, getArticleSlugs, getAdjacentArticles } from '@/lib/articles';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getArticleSlugs().map(file => ({ slug: file.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article not found' };
  const description = article.description || (article.author ? `${article.Title} by ${article.author}` : article.Title);
  // Allow frontmatter 'ogImage' override (relative to /public) else try conventional slug .jpg then fallback to site default
  const ogImage = (article as any).ogImage || `/og/${article.slug}.jpg`;
  return {
    title: article.Title,
    description,
    openGraph: { title: article.Title, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { title: article.Title, description, images: [ogImage], card: 'summary_large_image' },
  };
}

// NOTE: Loosened typing due to Next 15 PageProps inference bug causing params to be constrained to Promise<any> during build.
// Once Next types regenerate cleanly you can restore: type ArticlePageProps = { params: { slug: string } }
type ArticlePageProps = { params: { slug: string } }
export default async function ArticlePage({ params }: ArticlePageProps): Promise<ReactElement> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-red-600">Article not found.</p>
        <Link href="/" className="underline">Back home</Link>
      </div>
    );
  }
  const adjacent = await getAdjacentArticles(article.slug);
  return (
    <article className="mx-auto max-w-3xl px-4 md:px-0 py-10 prose prose-neutral dark:prose-invert">
      <header className="mb-6">
        <div className="mb-6 not-prose rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-50 dark:bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/og/${article.slug}.jpg`} alt="" className="w-full h-auto" loading="lazy" />
        </div>
        <h1 className="!mb-2 text-3xl md:text-4xl font-bold leading-tight">{article.Title}</h1>
        <p className="!mt-0 text-sm text-neutral-600 dark:text-neutral-400">
          {article.author && <span>{article.author}</span>}
          {article.readingTime && <span> · {article.readingTime}</span>}
          {article.displayDate && <span> · {article.displayDate}</span>}
        </p>
      </header>
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
      <hr className="my-12" />
      <nav className="flex flex-col gap-4 not-prose text-sm">
        <div className="flex flex-wrap gap-4">
          {adjacent.previous && (
            <Link href={`/articles/${adjacent.previous.slug}`} className="group inline-flex flex-col rounded-md border border-neutral-200 dark:border-neutral-800 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition">
              <span className="text-xs uppercase tracking-wide text-neutral-500">Previous</span>
              <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{adjacent.previous.Title}</span>
            </Link>
          )}
          {adjacent.next && (
            <Link href={`/articles/${adjacent.next.slug}`} className="group inline-flex flex-col rounded-md border border-neutral-200 dark:border-neutral-800 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition ml-auto">
              <span className="text-xs uppercase tracking-wide text-neutral-500 text-right">Next</span>
              <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-right">{adjacent.next.Title}</span>
            </Link>
          )}
        </div>
        <div>
          <Link href="/articles" className="underline">← All articles</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="underline">Home</Link>
        </div>
      </nav>
    </article>
  );
}
