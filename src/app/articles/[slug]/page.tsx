import { getArticleBySlug, getArticleSlugs, getAdjacentArticles } from '@/lib/articles';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Params { slug: string }

export async function generateStaticParams() {
  return getArticleSlugs().map(file => ({ slug: file.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article not found' };
  const description = article.description || (article.author ? `${article.Title} by ${article.author}` : article.Title);
  return {
    title: article.Title,
    description,
    openGraph: { title: article.Title, description },
    twitter: { title: article.Title, description },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
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
