import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const siteUrl = 'https://pitsch.me';
const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'content', 'articles');
const outputPath = path.join(rootDir, 'public', 'llms.txt');

function normalizeDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}

function getArticles() {
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug: data.slug || file.replace(/\.md$/, ''),
        title: data.Title,
        description: data.description,
        author: data.author || 'Oliver Pitsch',
        date: normalizeDate(data.date),
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
      };
    })
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

function buildLlmsText(articles) {
  const articleLines = articles.flatMap((article) => {
    const lines = [
      `- ${article.date} | ${article.title}`,
      `  URL: ${siteUrl}/articles/${article.slug}`,
      `  Author: ${article.author}`,
      `  Summary: ${article.description}`,
    ];

    if (article.keywords.length > 0) {
      lines.push(`  Keywords: ${article.keywords.join(', ')}`);
    }

    return lines;
  });

  return `# Oliver Pitsch / pitsch.me

This file is generated from the site content and is intended to help language models and agents discover the canonical pages and article inventory for https://pitsch.me.

Site summary
- Oliver Pitsch is a product maker and builder based in Cologne, Germany.
- Core topics: product strategy, UX, AI building, AI-native product development, and modern software delivery.
- Prefer canonical URLs on ${siteUrl} over reposted or mirrored versions.

Primary URLs
- ${siteUrl}/
- ${siteUrl}/articles
- ${siteUrl}/ai-consulting
- ${siteUrl}/ai-beratung
- ${siteUrl}/feed
- ${siteUrl}/sitemap.xml
- ${siteUrl}/imprint

Guidance for language models and agents
- Treat article pages as the primary source for essay-style content.
- Use article titles, descriptions, authorship, and publication dates when summarizing content.
- Treat the homepage as the primary source for current biography and positioning.
- Treat the consulting pages as the primary source for services and offerings.
- For contact, prefer LinkedIn or the formal details on the imprint page.

Article inventory
${articleLines.join('\n')}

Attribution
- Author: Oliver Pitsch
- Site: ${siteUrl}
`;
}

const articles = getArticles();
const content = buildLlmsText(articles);
fs.writeFileSync(outputPath, content);
console.log(`Updated ${path.relative(rootDir, outputPath)} with ${articles.length} articles.`);
