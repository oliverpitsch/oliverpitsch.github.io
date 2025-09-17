import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

export interface ArticleMeta {
  slug: string;
  Title: string;
  author?: string;
  readingTime?: string; // e.g. "5 min read" auto computed if not provided
  date?: string; // ISO date or YYYY-MM-DD
  description?: string;
  displayDate?: string; // nicely formatted date for UI
  heroImage?: string; // path under /public
  heroAlt?: string;
  ogImage?: string; // override for social sharing
}

export interface Article extends ArticleMeta {
  html: string;
}

const articlesDir = path.join(process.cwd(), 'content', 'articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
}

function computeReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200)); // 200 wpm baseline
  return `${minutes} min read`;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filename = slug.endsWith('.md') ? slug : `${slug}.md`;
  const fullPath = path.join(articlesDir, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(gfm).use(html).process(content);
  const rawDate: unknown = data.date;
  let date: string | undefined;
  let displayDate: string | undefined;
  if (rawDate instanceof Date) {
    date = rawDate.toISOString().slice(0, 10); // YYYY-MM-DD
    displayDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(rawDate);
  } else if (typeof rawDate === 'string') {
    date = rawDate;
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      displayDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
    }
  }

  const readingTime = (data.readingTime as string | undefined) || computeReadingTime(content);
  return {
    slug: (data.slug as string) || slug.replace(/\.md$/, ''),
    Title: data.Title as string,
    author: data.author as string | undefined,
    readingTime,
    date,
    displayDate,
    description: data.description as string | undefined,
    heroImage: data.heroImage as string | undefined,
    heroAlt: data.heroAlt as string | undefined,
    ogImage: data.ogImage as string | undefined,
    html: processed.toString(),
  };
}

export async function getAllArticlesMeta(): Promise<ArticleMeta[]> {
  const slugs = getArticleSlugs();
  const articles: ArticleMeta[] = [];
  for (const file of slugs) {
    const fullPath = path.join(articlesDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    const rawDate: unknown = data.date;
    let date: string | undefined;
    let displayDate: string | undefined;
    if (rawDate instanceof Date) {
      date = rawDate.toISOString().slice(0, 10);
      displayDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(rawDate);
    } else if (typeof rawDate === 'string') {
      date = rawDate;
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        displayDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
      }
    }
    const content = raw.split('---').slice(2).join('---'); // naive extraction after frontmatter
    const readingTime = (data.readingTime as string | undefined) || computeReadingTime(content);
    articles.push({
      slug: (data.slug as string) || file.replace(/\.md$/, ''),
      Title: data.Title as string,
      author: data.author as string | undefined,
      readingTime,
      date,
      displayDate,
      description: data.description as string | undefined,
      heroImage: data.heroImage as string | undefined,
      heroAlt: data.heroAlt as string | undefined,
      ogImage: data.ogImage as string | undefined,
    });
  }
  return articles.sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}

export interface AdjacentArticles {
  previous: ArticleMeta | null; // older
  next: ArticleMeta | null; // newer
}

export async function getAdjacentArticles(slug: string): Promise<AdjacentArticles> {
  const all = await getAllArticlesMeta();
  const index = all.findIndex(a => a.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    next: index > 0 ? all[index - 1] : null,
    previous: index < all.length - 1 ? all[index + 1] : null,
  };
}
