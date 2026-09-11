import { getAllArticlesMeta } from '@/lib/articles';
import { de as consultingDe, en as consultingEn } from '@/lib/consulting-content';
import { de as vibeDe, en as vibeEn } from '@/lib/vibe-design-content';
import { articleOgKey } from '@/lib/og-meta';
import { siteMetadata } from '@/lib/site-chrome';

/** One social share card: what the image shows plus what the platforms print next to it. */
export type OgCard = {
  key: string;
  /** Page the card belongs to. */
  path: string;
  title: string;
  subtitle?: string;
  /** Printed after pitsch.me under the signature, e.g. an article's date. */
  detail?: string;
  /** og:title / og:description, used by the /metaImage preview. */
  share: { title: string; description: string };
};

export async function getOgCards(): Promise<OgCard[]> {
  const pages: OgCard[] = [
    {
      key: 'home',
      path: '/',
      title: 'Oliver Pitsch',
      subtitle:
        'I lead product and I build it. Twenty years across design, UX and product. Now building Joinride.cc, Famili.one and neuerName.com.',
      share: {
        title: siteMetadata.openGraph.title,
        description: siteMetadata.openGraph.description,
      },
    },
    {
      key: 'cv',
      path: '/cv',
      title: 'Oliver Pitsch',
      subtitle:
        'AI-native product leader, maker and builder. Head of Product & Engineering, Head of Product, Director UX.',
      share: {
        title: 'CV – Oliver Pitsch',
        description: 'Twenty years across design, UX and product leadership.',
      },
    },
    {
      key: 'articles',
      path: '/articles',
      title: 'Writing on product, UX and building with AI',
      share: {
        title: 'Articles – Oliver Pitsch',
        description:
          'Writing by Oliver Pitsch on product strategy, UX, AI building, and the future of how modern software gets made.',
      },
    },
    ...[
      { key: 'ai-consulting', path: '/ai-consulting', c: consultingEn },
      { key: 'ai-beratung', path: '/ai-beratung', c: consultingDe },
      { key: 'vibe-coded-design', path: '/vibe-coded-design', c: vibeEn },
      { key: 'design-fuer-vibe-coding', path: '/design-fuer-vibe-coding', c: vibeDe },
    ].map(
      ({ key, path, c }): OgCard => ({
        key,
        path,
        title: c.hero.headline,
        share: { title: c.meta.ogTitle, description: c.meta.ogDescription },
      }),
    ),
  ];

  const articles = await getAllArticlesMeta();
  const articleCards = articles.map(
    (a): OgCard => ({
      key: articleOgKey(a.slug),
      path: `/articles/${a.slug}`,
      title: a.Title,
      detail: [a.displayDate, a.readingTime].filter(Boolean).join(' · '),
      share: { title: a.Title, description: a.description || a.Title },
    }),
  );

  return [...pages, ...articleCards];
}
