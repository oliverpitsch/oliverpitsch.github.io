/**
 * Homepage positioning copy. Kept out of the page component so the story can
 * be edited in one place. Every claim here should trace back to cv.ts.
 */

export const proofPoints = [
  { value: '15 years', label: 'leading product strategy, UX and design' },
  { value: '10+ teams', label: 'across 6 countries at Trusted Shops' },
  { value: '45M+', label: 'consumers served by products we built' },
  { value: '8 weeks', label: 'from zero to market-ready at AI Labs' },
  { value: '1 exit', label: 'Reputami, acquired by eKomi' },
];

export type ChainStep = {
  title: string;
  line: string;
  withTeams: string;
  handsOn: string;
};

/** Strategy to market: each step proven twice, with teams at scale and hands-on. */
export const chain: ChainStep[] = [
  {
    title: 'Strategy',
    line: 'Product strategy, shaped with product leadership.',
    withTeams:
      'Nearly eight years at Trusted Shops reporting to the CPO, shaping one cohesive product strategy with my peers in product management and engineering.',
    handsOn:
      'Co-founded Reputami, set its product direction and led it through to acquisition by eKomi in 2015.',
  },
  {
    title: 'UX',
    line: 'Experiences that make complex products feel simple.',
    withTeams:
      'Joined Studitemps as the first UX designer, established UX across 8 product teams, then hired and built the UX team.',
    handsOn:
      'At AI Labs, turned complex AI capabilities into clear user journeys and production-ready interfaces.',
  },
  {
    title: 'Product design',
    line: 'Tasteful design that holds up at scale.',
    withTeams:
      'Built the Helios design system family at Trusted Shops, shared in design and code across 10+ product teams in 6 countries.',
    handsOn:
      'Designed and built Famili, a family organizer that makes the mental load visible and shareable.',
  },
  {
    title: 'Build',
    line: 'Teams that build together, not in handoffs.',
    withTeams:
      'Built the Trusted Shops product organization with my peers, with design, content and product marketing embedded in cross-functional squads.',
    handsOn:
      'At AI Labs, zero to market-ready in eight weeks, with one engineering lead and a team of AI agents.',
  },
  {
    title: 'Market',
    line: 'Products people love and businesses grow on.',
    withTeams:
      "Took Trusted Shops' new review system from concept to market, with my design and content teams building it side by side with product and engineering.",
    handsOn:
      'Grew Joinride from a hobby project in 2022 into one of the leading platforms for group rides and run clubs in the German-speaking market.',
  },
];

export const designSystemPoints = [
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
  },
];
