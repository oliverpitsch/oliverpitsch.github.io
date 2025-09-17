import { NextResponse } from 'next/server';
import { getAllArticlesMeta } from '@/lib/articles';

function escape(str: string) {
  return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c] as string));
}

export async function GET() {
  const site = 'https://pitsch.me';
  const articles = await getAllArticlesMeta();
  const items = articles.map(a => `\n    <item>\n      <title>${escape(a.Title)}</title>\n      <link>${site}/articles/${a.slug}</link>\n      <guid>${site}/articles/${a.slug}</guid>\n      ${a.description ? `<description>${escape(a.description)}</description>` : ''}\n      ${a.date ? `<pubDate>${new Date(a.date).toUTCString()}</pubDate>` : ''}\n    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Oliver Pitsch – Articles</title>\n    <link>${site}</link>\n    <description>Articles by Oliver Pitsch</description>\n    <language>en</language>${items}\n  </channel>\n</rss>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }});
}
