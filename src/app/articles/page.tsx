import { getAllArticlesMeta } from '@/lib/articles';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';

export const metadata = {
  title: 'Articles – Oliver Pitsch',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticlesMeta();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <div className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]" aria-hidden />
      <main className="mx-auto max-w-7xl px-6 xl:px-10 py-14">
        <header className="max-w-3xl mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">Articles</h1>
          <p className="mt-4 text-[17px] leading-7 text-[#182B52]/80 dark:text-[#E6EEFF]/80">
            Writing on product design leadership, discovery & delivery, and building user-centred products.
          </p>
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
          {articles.map(a => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </main>
    </div>
  );
}
