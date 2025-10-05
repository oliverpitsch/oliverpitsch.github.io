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
      <div
        className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
        aria-hidden
      />
      <main className="mx-auto max-w-7xl px-6 xl:px-10 py-14">
        <header className="max-w-3xl mb-14">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            Articles
          </h1>
          <p className="mt-4 text-[17px] leading-7 text-[#182B52]/80 dark:text-[#E6EEFF]/80">
            Writing on product design leadership, discovery & delivery, and building user-centred
            products.
          </p>
        </header>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
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
