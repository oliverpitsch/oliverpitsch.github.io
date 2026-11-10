/**
 * Homepage positioning copy. Kept out of the page component so the story can
 * be edited in one place. Every claim here should trace back to cv.ts.
 */

/** Strategy to market in four short claims. One or two sentences of proof each. */
export type ChainItem = { title: string; body: string; link?: { href: string; label: string } };

export const chain: ChainItem[] = [
  {
    title: 'Strategy with product leadership',
    body: 'At Trusted Shops I reported to the CEO and CPO and shaped strategy for a product portfolio used by thousands of businesses and millions of consumers across Europe.',
  },
  {
    title: 'Building teams that ship at scale',
    body: 'I led design, UX and content teams across 6 countries, some embedded in 10+ product squads, others working across all of them as a central team. On-site, hybrid and fully remote.',
  },
  {
    title: 'Design systems people and agents can build on',
    body: "I've led design system families that make many products, channels and teams feel like one product, and made them readable for AI agents so their output stays on brand.",
    link: { href: '#design-systems', label: 'More on design systems for agents' },
  },
  {
    title: 'At scale and at speed',
    body: "I took Trusted Shops' new review platform from strategy to launch and operations in 11 countries. At AI Labs, I took a product platform to market-ready in eight weeks with one engineering lead and AI agents.",
  },
];

export const designSystemPoints: {
  title: string;
  body: string;
  link?: { href: string; label: string };
}[] = [
  {
    title: 'Families, not single libraries',
    body: 'Design system families that span channels, products and touchpoints, like Helios at Trusted Shops, shared in design and in code across more than ten teams.',
  },
  {
    title: 'Agent-ready at Ordio',
    body: 'Made the design system readable for agents, so AI-generated output stays aligned with product quality, patterns and system logic.',
  },
  {
    title: 'On brand in my own products',
    body: 'Claude and Codex build new screens for my products from a design system they can read, and keep every one of them on brand.',
    link: { href: 'https://onefold.me/design-md', label: 'Make your own DESIGN.md with Onefold' },
  },
];
