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
  readingTime?: string;
  date?: string; // ISO date or YYYY-MM-DD
  description?: string;
  displayDate?: string; // nicely formatted date for UI
}

export interface Article extends ArticleMeta {
  html: string;
}

const articlesDir = path.join(process.cwd(), 'content', 'articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
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

  return {
    slug: (data.slug as string) || slug.replace(/\.md$/, ''),
    Title: data.Title as string,
    author: data.author as string | undefined,
    readingTime: data.readingTime as string | undefined,
    date,
    displayDate,
    description: data.description as string | undefined,
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
    articles.push({
      slug: (data.slug as string) || file.replace(/\.md$/, ''),
      Title: data.Title as string,
      author: data.author as string | undefined,
      readingTime: data.readingTime as string | undefined,
      date,
      displayDate,
      description: data.description as string | undefined,
    });
  }
  return articles.sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}
