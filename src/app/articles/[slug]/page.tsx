import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Params { slug: string }

export async function generateStaticParams() {
  return getArticleSlugs().map(file => ({ slug: file.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.Title,
    description: article.author ? `${article.Title} by ${article.author}` : article.Title,
    openGraph: { title: article.Title, description: article.Title },
    twitter: { title: article.Title, description: article.Title },
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
  return (
    <article className="mx-auto max-w-3xl px-4 md:px-0 py-10 prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-img:rounded-lg">
      <header className="mb-6">
        <h1 className="!mb-2 text-3xl md:text-4xl font-bold leading-tight">{article.Title}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
          {article.author && <span>{article.author}</span>} {article.readingTime && <span> · {article.readingTime}</span>} {article.date && <span> · {article.date}</span>}
        </p>
      </header>
      <div dangerouslySetInnerHTML={{ __html: article.html }} />
      <hr className="my-12" />
      <p className="text-sm">
        <Link href="/" className="underline">← Back</Link>
      </p>
    </article>
  );
}
