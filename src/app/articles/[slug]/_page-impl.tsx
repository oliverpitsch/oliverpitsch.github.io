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
        <Link href="/" className="underline">
          Back home
        </Link>
      </div>
    );
  }
  const adjacent = await getAdjacentArticles(article.slug);
  const heroSrc = article.heroImage || article.ogImage || `/og/${article.slug}.jpg`;
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <div
        className="h-5 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
        aria-hidden
      />
      <article className="mx-auto max-w-3xl px-6 lg:px-0 py-12">
        <header className="mb-10">
          <div className="mb-8 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#283B63] shadow-sm bg-white dark:bg-[#152544]">
            <img src={heroSrc} alt={article.heroAlt || ''} className="w-full h-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {article.Title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 text-sm font-medium text-slate-700 dark:text-slate-200">
            <picture className="shrink-0">
              <source
                media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)"
                srcSet="/images/oliver-pitsch.jpg"
              />
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/images/oliver-pitsch-dark.jpg"
              />
              <img
                src="/images/oliver-pitsch.jpg"
                alt="Oliver Pitsch"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#FFBF00]/70 dark:ring-[#FFDC0F]/70"
              />
            </picture>
            {article.author && <span className="leading-none">{article.author}</span>}
            {article.readingTime && (
              <span className="opacity-70 leading-none flex gap-1 items-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {article.readingTime}
              </span>
            )}
            {article.displayDate && (
              <span className="opacity-70 leading-none flex gap-1 items-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                {article.displayDate}
              </span>
            )}
          </div>
        </header>
        <div
          className="article-body markdown-content text-lg leading-7 [&_p]:mt-6 [&_p:first-child]:mt-0 text-[#182B52] dark:text-[#E6EEFF]"
          id="article-content"
        >
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
        {/* Conversation CTA */}
        <section className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#283B63] bg-white dark:bg-[#152544] p-6 sm:p-8 shadow-sm">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FFDC0F]/60 blur-2xl"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-700 dark:text-white">
                  Have thoughts about this topic?
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  I’d love to hear your perspective. Let’s continue the conversation on LinkedIn.
                </p>
              </div>
              <div className="mt-2 sm:mt-0 shrink-0">
                <a
                  href="https://www.linkedin.com/in/oliverpitsch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-white font-medium shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#152544] whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.944v5.662H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.553V9h3.566v11.452z" />
                  </svg>
                  <span>Discuss on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-16 border-t border-[#E2E8F0] dark:border-[#283B63] pt-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <picture className="shrink-0">
              <source
                media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)"
                srcSet="/images/oliver-pitsch.jpg"
              />
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/images/oliver-pitsch-dark.jpg"
              />
              <img
                src="/images/oliver-pitsch.jpg"
                alt="Oliver Pitsch"
                className="h-28 w-28 rounded-full object-cover ring-4 ring-[#FFDC0F] ring-offset-4 ring-offset-[#F8FAFC] dark:ring-offset-[#182B52]"
              />
            </picture>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">About the author</h3>
              <p className="mt-4 text-[16px] leading-7 text-[#182B52] dark:text-[#E6EEFF]">
                Oliver Pitsch is an experienced product design leader from Cologne, Germany, with a
                strong track record of building cross-functional teams and delivering exceptional
                user experiences. He specializes in harmonizing discovery and delivery and currently
                directs User Experience & Product Marketing at{' '}
                <a href="https://trustedshops.com" className="underline">
                  Trusted Shops
                </a>{' '}
                while building{' '}
                <a href="https://joinride.cc" className="underline">
                  Joinride.cc
                </a>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link href="/" className="underline">
                  Home
                </Link>
                <Link href="/articles" className="underline">
                  All articles
                </Link>
                <Link href="/imprint" className="underline">
                  Imprint
                </Link>
              </div>
            </div>
          </div>
        </div>
        <nav className="mt-16 flex flex-col gap-4 text-sm">
          <div className="flex flex-wrap gap-4">
            {adjacent.previous && (
              <Link
                href={`/articles/${adjacent.previous.slug}`}
                className="group inline-flex flex-col rounded-md border border-slate-200 dark:border-slate-800 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">Previous</span>
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {adjacent.previous.Title}
                </span>
              </Link>
            )}
            {adjacent.next && (
              <Link
                href={`/articles/${adjacent.next.slug}`}
                className="group inline-flex flex-col rounded-md border border-slate-200 dark:border-slate-800 p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition ml-auto"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500 text-right">
                  Next
                </span>
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-right">
                  {adjacent.next.Title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
      <button id="backToTop" aria-label="Back to top" className="back-to-top-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="stroke-amber-800 size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <Script id="article-enhancements" strategy="afterInteractive">{`
        (function(){
          const content = document.getElementById('article-content');
          if(content){
            const headings = content.querySelectorAll('h2, h3, h4');
            headings.forEach(h => {
              if(!h.id){
                h.id = h.textContent.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
              }
              let a = h.querySelector('.heading-anchor');
              if(!a){
                a = document.createElement('a');
                a.href = '#' + h.id;
                a.className = 'heading-anchor';
                a.setAttribute('aria-label', 'Link to section');
                a.textContent = '🔗';
                a.setAttribute('role', 'button');
                a.setAttribute('tabindex', '0');
                h.prepend(a);
              }
              // Tooltip + copy-to-clipboard behavior
              a.setAttribute('data-tooltip', 'Copy link');
              if(!a.__copyHandlerAttached){
                function copyTextToClipboard(text, then){
                  if(navigator.clipboard && navigator.clipboard.writeText){
                    navigator.clipboard.writeText(text).then(then).catch(() => fallback());
                  } else {
                    fallback();
                  }
                  function fallback(){
                    // iOS/Safari-safe fallback using a temporary selectable element
                    const span = document.createElement('span');
                    span.textContent = text;
                    span.style.whiteSpace = 'pre';
                    span.style.position = 'fixed';
                    span.style.top = '0';
                    span.style.left = '0';
                    span.style.opacity = '0';
                    document.body.appendChild(span);
                    const range = document.createRange();
                    range.selectNodeContents(span);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    try { document.execCommand('copy'); } catch(_){}
                    sel.removeAllRanges();
                    document.body.removeChild(span);
                    then();
                  }
                }
                a.addEventListener('click', function(e){
                  e.preventDefault();
                  const url = window.location.origin + window.location.pathname + '#' + h.id;
                  const done = () => {
                    try { history.replaceState(null, '', '#' + h.id); } catch(_){}
                    a.setAttribute('data-tooltip', 'Link copied');
                    a.classList.add('copied');
                    setTimeout(() => { a.setAttribute('data-tooltip', 'Copy link'); a.classList.remove('copied'); }, 1200);
                  };
                  copyTextToClipboard(url, done);
                });
                a.addEventListener('keydown', function(e){
                  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); a.click(); }
                });
                a.__copyHandlerAttached = true;
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
