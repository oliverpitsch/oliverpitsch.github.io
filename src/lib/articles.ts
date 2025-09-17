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
  return {
    slug: (data.slug as string) || slug.replace(/\.md$/, ''),
    Title: data.Title as string,
    author: data.author as string | undefined,
    readingTime: data.readingTime as string | undefined,
    date: data.date as string | undefined,
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
    articles.push({
      slug: (data.slug as string) || file.replace(/\.md$/, ''),
      Title: data.Title as string,
      author: data.author as string | undefined,
      readingTime: data.readingTime as string | undefined,
      date: data.date as string | undefined,
      description: data.description as string | undefined,
    });
  }
  return articles.sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}
