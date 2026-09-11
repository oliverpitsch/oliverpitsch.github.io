import { getOgCards } from '@/lib/og-cards';
import { renderOgCard } from '@/lib/og-render';

// Rendered once at build time into out/og-image/<key>.png.
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ key: string }[]> {
  const cards = await getOgCards();
  return cards.map((card) => ({ key: `${card.key}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = (await getOgCards()).find((c) => `${c.key}.png` === key);
  if (!card) return new Response('Not found', { status: 404 });
  return renderOgCard(card);
}
