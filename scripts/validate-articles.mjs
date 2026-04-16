import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'content', 'articles');
const requiredFields = ['slug', 'Title', 'author', 'date', 'description', 'keywords'];
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function normalizeDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}

const failures = [];

for (const file of fs
  .readdirSync(articlesDir)
  .filter((entry) => entry.endsWith('.md'))
  .sort()) {
  const fullPath = path.join(articlesDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);

  for (const field of requiredFields) {
    if (!data[field]) {
      failures.push(`${file}: missing required frontmatter field "${field}"`);
    }
  }

  const expectedSlug = file.replace(/\.md$/, '');
  if (data.slug && data.slug !== expectedSlug) {
    failures.push(`${file}: slug must match filename (${expectedSlug})`);
  }

  const normalizedDate = normalizeDate(data.date);
  if (data.date && (!normalizedDate || !isoDatePattern.test(normalizedDate))) {
    failures.push(`${file}: date must use YYYY-MM-DD`);
  }

  const normalizedUpdated = normalizeDate(data.updated);
  if (data.updated && (!normalizedUpdated || !isoDatePattern.test(normalizedUpdated))) {
    failures.push(`${file}: updated must use YYYY-MM-DD when present`);
  }

  if (data.description && typeof data.description !== 'string') {
    failures.push(`${file}: description must be a string`);
  }

  if (data.keywords) {
    if (!Array.isArray(data.keywords) || data.keywords.length < 3) {
      failures.push(`${file}: keywords must be an array with at least 3 entries`);
    } else if (data.keywords.some((keyword) => typeof keyword !== 'string' || !keyword.trim())) {
      failures.push(`${file}: keywords must only contain non-empty strings`);
    }
  }
}

if (failures.length > 0) {
  console.error('Article metadata validation failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Validated ${fs.readdirSync(articlesDir).filter((entry) => entry.endsWith('.md')).length} article files.`,
);
