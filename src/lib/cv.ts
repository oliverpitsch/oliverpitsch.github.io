/**
 * The CV is a living document: this module is the single source of truth for
 * career facts. /cv renders it, and the homepage timeline reads the same
 * roles, so there is one place to update when something changes.
 */

export type CvRole = {
  org: string;
  /** Parenthetical after the org name, e.g. a rename. */
  orgNote?: string;
  title: string;
  from: string;
  to: string | 'present';
  logo?: string;
  /** Optional sizing override; some wordmarks need a different height. */
  logoClass?: string;
  href?: string;
  bullets: string[];
};

/** A capability worth hiring for: a short label, then the proof in one line. */
export type CvStrength = {
  label: string;
  detail: string;
};

export type Cv = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  about: string[];
  roles: CvRole[];
  /** Ranked, most distinctive first. Four is the ceiling: this is a claim, not an inventory. */
  strengths: CvStrength[];
  languages: string[];
};

export const cv: Cv = {
  name: 'Oliver Pitsch',
  headline: 'Product & Design Leader | Strategy to market, with teams and AI',
  location: 'Cologne, Germany',
  email: 'oliver@pitsch.me',
  phone: '+49 175 2066584',
  linkedin: 'https://www.linkedin.com/in/oliverpitsch/',
  summary:
    'Product and design leader with 15 years of experience taking complex B2B and consumer products from strategy to market. Partner to CPOs and VPs of Product, builder of international UX and design teams, and hands-on with AI.',
  about: [
    'I am a product and design leader from Cologne with 15 years of experience taking complex B2B and consumer products from strategy to market. I work hand in hand with CPOs and VPs of Product on product strategy, and I lead the teams that carry it through UX, product design and build into the market.',
    'For nearly eight years at Trusted Shops, I reported to the CPO and led UX, design systems and product marketing across more than ten product teams in six countries, for products serving 35,000 businesses and 45 million consumers. Together with my peers in product management and engineering, I built the product organization as one, not only my own teams. Before that, I co-founded Reputami and led it through its acquisition by eKomi.',
    'Most recently, as Head of Product & Engineering at AI Labs, I took an enterprise product from zero to market-ready in eight weeks with one engineering lead and a team of AI agents. I still design and build products myself, and use them to learn first-hand how agents change product work. Design systems that agents understand sit at the core of that.',
  ],
  roles: [
    {
      org: 'Pitsch Studios',
      orgNote: 'in parallel',
      title: 'Founder, Product Leader & Builder',
      from: '2022',
      to: 'present',
      bullets: [
        'Build and run a portfolio of digital products, including Joinride.cc, Famili.one, neuerName.com and Onefold.me, from problem discovery and positioning through UX, visual design, development, launch and growth.',
        'Use these products as a real-world lab for how agentic AI changes product management, design and engineering, and bring the workflows that hold up back into the teams I lead.',
      ],
    },
    {
      org: 'AI Labs',
      title: 'Head of Product & Engineering',
      from: '2026',
      to: '2026',
      logo: '/images/companies/logo-ai-labs.svg',
      bullets: [
        'Led product strategy, UX and frontend development for an AI-native enterprise SaaS product, working closely with the CEO and our engineering lead.',
        'Translated complex AI capabilities into clear user journeys, product requirements and production-ready interfaces.',
        'Established AI-native workflows with Claude Code and Codex across design, development and delivery.',
        'Took the product from zero to market-ready in eight weeks, with one engineering lead and a team of AI agents.',
      ],
    },
    {
      org: 'Ordio',
      title: 'Head of Product',
      from: '2025',
      to: '2026',
      logo: '/images/companies/logo-ordio.svg',
      href: 'https://ordio.com',
      bullets: [
        'Reorganized product management and product development for AI-native building, together with the CEO and CTO.',
        'Redefined product workflows for a world in which AI takes over more of the implementation, reducing handoffs and increasing execution speed.',
        'Made the design system agent-ready, so AI-generated output stayed aligned with product quality, patterns and system logic.',
      ],
    },
    {
      org: 'Trusted Shops',
      title: 'Director UX & Product Marketing',
      from: '2017',
      to: '2025',
      logo: '/images/companies/logo-trusted-shops.svg',
      href: 'https://trustedshops.com',
      bullets: [
        'Reported to the CPO for nearly eight years and shaped one cohesive product strategy together with my peers in product management and engineering.',
        'Led UX and Product Marketing across more than 10 product teams in 6 countries, for a portfolio serving 35,000+ businesses and 45 million+ consumers.',
        'Built the product organization together with my peers, with product designers embedded in cross-functional squads and content working across all of them as a central team.',
        'Took the new product and shop review system from concept to market, owning product design and UX end to end while my teams built and shipped it side by side with product management and engineering.',
        'Built and scaled the Helios design system family across products, channels and touchpoints, shared in design and in code.',
      ],
    },
    {
      org: 'Studitemps',
      orgNote: 'now jobvalley',
      title: 'Senior UX Designer & COP Lead UX',
      from: '2015',
      to: '2017',
      logo: '/images/companies/logo-studitemps.svg',
      bullets: [
        'Joined as the first UX designer and established UX processes across 8 product teams.',
        'Hired and built the UX team, and led UX as a community of practice across the product organization.',
      ],
    },
    {
      org: 'Reputami',
      title: 'Founder & Managing Director',
      from: '2012',
      to: '2015',
      logo: '/images/companies/logo-reputami.svg',
      bullets: [
        'Co-founded a reputation management SaaS company for the hospitality industry.',
        'Led product design and development.',
        'Built the company through to acquisition by eKomi in 2015.',
      ],
    },
  ],
  strengths: [
    {
      label: 'Partner to product leadership',
      detail:
        'Shaping product strategy hand in hand with CPOs, VPs of Product and CEOs, and connecting it with UX, product design, technology and business outcomes across complex B2B and consumer platforms.',
    },
    {
      label: 'Building and leading teams at scale',
      detail:
        'Building and leading UX, design, content and product marketing teams across more than ten product teams in six countries, both embedded in cross-functional squads and as central teams working across them.',
    },
    {
      label: 'Design systems for people and agents',
      detail:
        'Building design system families across products, channels and touchpoints, and making them agent-ready so AI-generated output stays on brand and on quality.',
    },
    {
      label: 'AI-native product building',
      detail:
        'Designing and shipping production software with agentic AI, context engineering and rapid prototyping. Combining AI strategy at leadership level with hands-on product development.',
    },
  ],
  languages: ['German (native)', 'English (C2)'],
};

/**
 * Strength labels that saved applications may still reference after a rename.
 * Maps the old label to the current one so personalized CVs keep their skills.
 */
export const legacyStrengthLabels: Record<string, string> = {
  'Product, platform, and organizational leadership': 'Partner to product leadership',
  'From zero to scale': 'Building and leading teams at scale',
};
