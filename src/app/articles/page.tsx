import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';
import { getAllArticlesMeta } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

const siteUrl = 'https://pitsch.me';
const articlesUrl = `${siteUrl}/articles`;

export const metadata = {
  title: 'Articles – Oliver Pitsch',
  description:
    'Writing by Oliver Pitsch on product strategy, UX, AI building, and the future of how modern software gets made.',
  alternates: {
    canonical: '/articles',
  },
  keywords: ['Oliver Pitsch', 'articles', 'product strategy', 'UX', 'AI building'],
  openGraph: {
    type: 'website',
    url: '/articles',
    title: 'Articles – Oliver Pitsch',
    description:
      'Writing by Oliver Pitsch on product strategy, UX, AI building, and the future of how modern software gets made.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles – Oliver Pitsch',
    description:
      'Writing by Oliver Pitsch on product strategy, UX, AI building, and the future of how modern software gets made.',
  },
};

export default async function ArticlesIndex() {
  const articles = await getAllArticlesMeta();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles by Oliver Pitsch',
    description:
      'Writing by Oliver Pitsch on product strategy, UX, AI building, and the future of how modern software gets made.',
    url: articlesUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${articlesUrl}/${article.slug}`,
        name: article.Title,
        description: article.description,
      })),
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container size="wide" className="py-14">
        <header className="mb-12 max-w-3xl">
          <h1 className="text-[38px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[46px]">
            Writing
          </h1>
          <p className="mt-4 text-[17px] leading-7 text-ink-muted">
            Notes on product, UX, AI building, and the future of how software gets made.
          </p>
        </header>
        <section aria-label="Article list">
          <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug} className="list-none">
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
}
