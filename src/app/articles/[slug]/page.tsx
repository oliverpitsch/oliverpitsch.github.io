/* eslint-disable @next/next/no-img-element */
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { renderArticle } from './_page-impl';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getArticleSlugs().map(file => ({ slug: file.replace(/\.md$/, '') }));
}

// Minimal local metadata typing to avoid dependency on problematic Next types if they mis-infer
// Support both legacy (object) and current (Promise) forms of params by always awaiting.
export async function generateMetadata({ params }: { params: any }) {
  const resolved = await params;
  const article = await getArticleBySlug(resolved?.slug as string);
  if (!article) return { title: 'Article not found' };
  const description = article.description || (article.author ? `${article.Title} by ${article.author}` : article.Title);
  // Allow frontmatter 'ogImage' override (relative to /public) else try conventional slug .jpg then fallback to site default
  const ogImage = article.ogImage || article.heroImage || `/og/${article.slug}.jpg`;
  return {
    title: article.Title,
    description,
    openGraph: { title: article.Title, description, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { title: article.Title, description, images: [ogImage], card: 'summary_large_image' },
  };
}

// Thin wrapper to avoid PageProps generic mis-inference; we accept `any` and pass the slug to implementation.
export default async function Page(props: any) {
  const resolved = await props?.params; // Next 15 may supply params as a Promise
  const slug = resolved?.slug as string;
  return renderArticle(slug);
}
