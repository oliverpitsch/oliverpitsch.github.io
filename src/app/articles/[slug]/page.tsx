import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';
import { renderArticle } from './_page-impl';

const siteUrl = 'https://pitsch.me';

function toAbsoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getArticleSlugs().map(file => ({ slug: file.replace(/\.md$/, '') }));
}

// Minimal local metadata typing to avoid dependency on problematic Next types if they mis-infer
// Support both legacy (object) and current (Promise) forms of params by always awaiting.
type MaybePromise<T> = T | Promise<T>;
interface RouteParams { slug: string }
interface WrappedPageProps { params: MaybePromise<RouteParams> }

export async function generateMetadata({ params }: WrappedPageProps) {
  const resolved = await params;
  const article = await getArticleBySlug(resolved.slug);
  if (!article) {
    return {
      title: 'Article not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const description = article.description || (article.author ? `${article.Title} by ${article.author}` : article.Title);
  const articleUrl = `/articles/${article.slug}`;
  const ogImage = toAbsoluteUrl(article.ogImage || article.heroImage || `/og/${article.slug}.jpg`);
  const authorName = article.author || 'Oliver Pitsch';
  const publishedTime = article.date ? new Date(article.date).toISOString() : undefined;
  const modifiedTime = article.updated
    ? new Date(article.updated).toISOString()
    : publishedTime;
  return {
    title: `${article.Title} – Oliver Pitsch`,
    description,
    alternates: {
      canonical: articleUrl,
    },
    authors: [{ name: authorName, url: siteUrl }],
    keywords: article.keywords,
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: article.Title,
      description,
      siteName: 'Oliver Pitsch',
      publishedTime,
      modifiedTime,
      authors: [authorName],
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.heroAlt || article.Title }],
    },
    twitter: { title: article.Title, description, images: [ogImage], card: 'summary_large_image' },
  };
}

// Thin wrapper to avoid PageProps generic mis-inference; we accept `any` and pass the slug to implementation.
export default async function Page({ params }: WrappedPageProps) {
  const resolved = await params;
  return renderArticle(resolved.slug);
}
