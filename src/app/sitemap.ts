import { getAllArticlesMeta } from '@/lib/articles';

// Ensure fully static generation for `next export`
export const dynamic = 'force-static';
export const revalidate = false;

const site = 'https://pitsch.me';

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  const articles = await getAllArticlesMeta();
  const now = new Date();

  const entries: SitemapEntry[] = [
    { url: `${site}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${site}/articles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site}/imprint`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  for (const a of articles) {
    entries.push({
      url: `${site}/articles/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : undefined,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}
