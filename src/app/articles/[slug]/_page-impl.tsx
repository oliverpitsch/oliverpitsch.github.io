/* Article page implementation extracted to avoid PageProps generic inference bug in Next 15 */
/* eslint-disable @next/next/no-img-element */
import { getArticleBySlug, getAdjacentArticles } from '@/lib/articles';
import Link from 'next/link';
import Script from 'next/script';

export async function renderArticle(slug: string) {
  const article = await getArticleBySlug(slug);
  if (!article) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-red-600">Article not found.</p>
        <Link href="/" className="underline">Back home</Link>
      </div>
    );
  }
  const adjacent = await getAdjacentArticles(article.slug);
  const heroSrc = article.heroImage || article.ogImage || `/og/${article.slug}.jpg`;
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <div className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]" aria-hidden />
      <article className="mx-auto max-w-3xl px-6 lg:px-0 py-12">
        <header className="mb-10">
          <div className="mb-8 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#283B63] shadow-sm bg-white dark:bg-[#152544]">
            <img src={heroSrc} alt={article.heroAlt || ''} className="w-full h-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">{article.Title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            <picture className="shrink-0">
              <source media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)" srcSet="/images/oliver-pitsch.jpg" />
              <source media="(prefers-color-scheme: dark)" srcSet="/images/oliver-pitsch-dark.jpg" />
              <img src="/images/oliver-pitsch.jpg" alt="Oliver Pitsch" className="h-9 w-9 rounded-full object-cover ring-2 ring-[#FFBF00]/70 dark:ring-[#FFDC0F]/70" />
            </picture>
            {article.author && <span className="leading-none">{article.author}</span>}
            {article.readingTime && <span className="opacity-70 leading-none">{article.readingTime}</span>}
            {article.displayDate && <span className="opacity-70 leading-none">{article.displayDate}</span>}
          </div>
        </header>
        <div className="article-body markdown-content text-[17px] leading-7 [&_p]:mt-6 [&_p:first-child]:mt-0 text-[#182B52] dark:text-[#E6EEFF]" id="article-content">
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
        <div className="mt-16 border-t border-[#E2E8F0] dark:border-[#283B63] pt-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <picture className="shrink-0">
              <source media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)" srcSet="/images/oliver-pitsch.jpg" />
              <source media="(prefers-color-scheme: dark)" srcSet="/images/oliver-pitsch-dark.jpg" />
              <img src="/images/oliver-pitsch.jpg" alt="Oliver Pitsch" className="h-28 w-28 rounded-full object-cover ring-4 ring-[#FFDC0F] ring-offset-4 ring-offset-[#F8FAFC] dark:ring-offset-[#182B52]" />
            </picture>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">About the author</h3>
              <p className="mt-4 text-[16px] leading-7 text-[#182B52] dark:text-[#E6EEFF]">
                Oliver Pitsch is an experienced product design leader from Cologne, Germany, with a strong track record of building cross-functional teams and delivering exceptional user experiences. He specializes in harmonizing discovery and delivery and currently directs User Experience & Product Marketing at <a href="https://trustedshops.com" className="underline">Trusted Shops</a> while building <a href="https://joinride.cc" className="underline">Joinride.cc</a>.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link href="/" className="underline">Home</Link>
                <Link href="/articles" className="underline">All articles</Link>
                <Link href="/imprint" className="underline">Imprint</Link>
              </div>
            </div>
          </div>
        </div>
        <nav className="mt-16 flex flex-col gap-4 text-sm">
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
        </nav>
      </article>
      <button id="backToTop" aria-label="Back to top" className="back-to-top-btn">↑</button>
      <Script id="article-enhancements" strategy="afterInteractive">{`
        (function(){
          const content = document.getElementById('article-content');
          if(content){
            const headings = content.querySelectorAll('h2, h3, h4');
            headings.forEach(h => {
              if(!h.id){
                h.id = h.textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
              }
              if(!h.querySelector('.heading-anchor')){
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.className = 'heading-anchor';
                a.setAttribute('aria-label', 'Link to section');
                a.textContent = '§';
                h.prepend(a);
              }
            });
          }
          const btn = document.getElementById('backToTop');
          const revealAt = 400;
          let lastVisible = false;
          function onScroll(){
            const show = window.scrollY > revealAt;
            if(show !== lastVisible){
              lastVisible = show;
              if(show) btn.classList.add('visible'); else btn.classList.remove('visible');
            }
          }
          if(btn){
            btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
          }
          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        })();
      `}</Script>
    </div>
  );
}
