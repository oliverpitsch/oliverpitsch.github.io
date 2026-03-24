import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkCallouts from './remark-callouts';

export interface ArticleMeta {
  slug: string;
  Title: string;
  author?: string;
  readingTime?: string; // e.g. "5 min read" auto computed if not provided
  date?: string; // ISO date or YYYY-MM-DD
  updated?: string; // optional updated date in ISO or YYYY-MM-DD
  description?: string;
  displayDate?: string; // nicely formatted date for UI
  heroImage?: string; // path under /public
  heroAlt?: string;
  imageDescription?: string; // optional small caption/credit shown below hero image
  ogImage?: string; // override for social sharing
  keywords?: string[];
  wordCount?: number;
}

export interface Article extends ArticleMeta {
  html: string;
}

const articlesDir = path.join(process.cwd(), 'content', 'articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));
}

function computeReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200)); // 200 wpm baseline
  return `${minutes} min read`;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function parseDateValue(rawDate: unknown): { date?: string; displayDate?: string } {
  if (rawDate instanceof Date) {
    return {
      date: rawDate.toISOString().slice(0, 10),
      displayDate: new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(rawDate),
    };
  }

  if (typeof rawDate === 'string') {
    const d = new Date(rawDate);
    return {
      date: rawDate,
      displayDate: !isNaN(d.getTime())
        ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(d)
        : undefined,
    };
  }

  return {};
}

function normalizeKeywords(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const keywords = value
      .filter((entry): entry is string => typeof entry === 'string')
      .map((entry) => entry.trim())
      .filter(Boolean);
    return keywords.length > 0 ? keywords : undefined;
  }

  if (typeof value === 'string') {
    const keywords = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
    return keywords.length > 0 ? keywords : undefined;
  }

  return undefined;
}

function stripLeadingMarkdownH1(content: string): string {
  return content.replace(/^\s*#\s+.+(?:\r?\n)+/, '');
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filename = slug.endsWith('.md') ? slug : `${slug}.md`;
  const fullPath = path.join(articlesDir, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const cleanedContent = stripLeadingMarkdownH1(content);
  const processed = await remark()
    .use(gfm)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(cleanedContent);
  const { date, displayDate } = parseDateValue(data.date);
  const { date: updated } = parseDateValue(data.updated);
  const readingTime =
    (data.readingTime as string | undefined) || computeReadingTime(cleanedContent);
  const keywords = normalizeKeywords(data.keywords);
  const wordCount = countWords(cleanedContent);
  return {
    slug: (data.slug as string) || slug.replace(/\.md$/, ''),
    Title: data.Title as string,
    author: data.author as string | undefined,
    readingTime,
    date,
    updated,
    displayDate,
    description: data.description as string | undefined,
    heroImage: data.heroImage as string | undefined,
    heroAlt: data.heroAlt as string | undefined,
    imageDescription: data.imageDescription as string | undefined,
    ogImage: data.ogImage as string | undefined,
    keywords,
    wordCount,
    html: processed.toString(),
  };
}

export async function getAllArticlesMeta(): Promise<ArticleMeta[]> {
  const slugs = getArticleSlugs();
  const articles: ArticleMeta[] = [];
  for (const file of slugs) {
    const fullPath = path.join(articlesDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const cleanedContent = stripLeadingMarkdownH1(content);
    const { date, displayDate } = parseDateValue(data.date);
    const { date: updated } = parseDateValue(data.updated);
    const readingTime =
      (data.readingTime as string | undefined) || computeReadingTime(cleanedContent);
    const keywords = normalizeKeywords(data.keywords);
    articles.push({
      slug: (data.slug as string) || file.replace(/\.md$/, ''),
      Title: data.Title as string,
      author: data.author as string | undefined,
      readingTime,
      date,
      updated,
      displayDate,
      description: data.description as string | undefined,
      heroImage: data.heroImage as string | undefined,
      heroAlt: data.heroAlt as string | undefined,
      imageDescription: data.imageDescription as string | undefined,
      ogImage: data.ogImage as string | undefined,
      keywords,
      wordCount: countWords(cleanedContent),
    });
  }
  return articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export interface AdjacentArticles {
  previous: ArticleMeta | null; // older
  next: ArticleMeta | null; // newer
}

export async function getAdjacentArticles(slug: string): Promise<AdjacentArticles> {
  const all = await getAllArticlesMeta();
  const index = all.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    next: index > 0 ? all[index - 1] : null,
    previous: index < all.length - 1 ? all[index + 1] : null,
  };
}
