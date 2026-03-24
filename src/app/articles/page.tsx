/* eslint-disable @next/next/no-img-element */
import { getAllArticlesMeta } from '@/lib/articles';
import Link from 'next/link';
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div
        className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
        aria-hidden
      />
      <main className="mx-auto max-w-7xl px-6 xl:px-10 py-14">
        <header className="max-w-3xl mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            Articles by Oliver Pitsch
          </h1>
          <p className="mt-4 text-[17px] leading-7 text-[#182B52]/80 dark:text-[#E6EEFF]/80">
            Writing on product, UX, AI building, and the future of how software gets
            made.
          </p>
        </header>
        <section aria-label="Article list">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
            {articles.map((a) => (
              <li key={a.slug} className="list-none">
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <section className="mt-40 flex justify-center">
        <img src="images/signature.png" alt="With love from Oliver Pitsch" className="w-32" />
      </section>
      <footer className="mt-20 mb-1 text-center relative">
        <div className="bg-[#FFD500] py-2 text-[12px]">
          <Link href="/imprint" className="underline text-[#182B52]">
            Imprint & Data Privacy
          </Link>
        </div>
        <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-b from-[#FFBF00] to-[#FFAA00]" />
      </footer>
    </div>
  );
}
