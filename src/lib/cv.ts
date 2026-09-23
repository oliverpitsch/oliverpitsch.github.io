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
  headline: 'AI-Native Product Leader | Product Maker & Builder',
  location: 'Cologne, Germany',
  email: 'oliver@pitsch.me',
  phone: '+49 175 2066584',
  linkedin: 'https://www.linkedin.com/in/oliverpitsch/',
  summary:
    'AI-native product and design leader with more than 15 years of experience building complex B2B and consumer products, leading international organizations, and connecting product strategy, UX, technology, growth, and business outcomes.',
  about: [
    'I am an AI-native product and design leader from Cologne with more than 15 years of experience building complex B2B and consumer products, leading international organizations, and connecting product strategy, UX, technology, growth, and business outcomes.',
    'At Trusted Shops, I led UX, design systems, and product marketing across more than ten product teams in six countries, contributing to products serving 35,000 businesses and 45 million consumers. Previously, I co-founded the B2B SaaS platform Reputami and led it through its acquisition by eKomi. Most recently, as Head of Product & Engineering at AI Labs, I combined product and AI strategy with hands-on development in a fast-moving environment.',
    'Alongside executive leadership, I continue to design, prototype, and build digital products myself. My work spans agentic AI, context engineering, AI-assisted discovery and development, product operating models, portfolio strategy, user research, APIs, integrations, and go-to-market. This allows me to set an ambitious product vision while remaining close to users, data, technology, and execution.',
  ],
  roles: [
    {
      org: 'AI Labs',
      title: 'Head of Product & Engineering',
      from: '2026',
      to: '2026',
      logo: '/images/companies/logo-ai-labs.svg',
      bullets: [
        'Led product strategy, UX, and frontend development for an AI-native SaaS product in close collaboration with the CEO and backend engineering.',
        'Translated complex AI capabilities into clear user journeys, product requirements, and production-ready interfaces.',
        'Established AI-native workflows using tools such as Claude Code and Codex to accelerate design, development, and delivery.',
        'Shipped a market-ready and competitive product within a two-person product and engineering team in just 8 weeks.',
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
        'Reorganized product management and product development for AI-native product building in close collaboration with the CEO and CTO.',
        'Helped redefine product workflows for a world in which AI takes over more of the implementation surface, reducing handoffs and increasing execution speed.',
        'Built a stronger design-system understanding for agents so AI-generated output stayed aligned with product quality, patterns, and system logic.',
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
        'Led UX and Product Marketing across more than 10 product teams in 6 countries for a portfolio serving 35,000+ businesses and 45 million+ consumers.',
        'Built and scaled the Helios design system to unify products through shared design and code implementation.',
        'Combined product design, content, localization, and product marketing into a more consistent and scalable product experience model.',
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
        'Hired and helped shape the UX team.',
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
    {
      org: 'Pitsch Studios',
      title: 'Founder, Product Leader & Builder',
      from: '2022',
      to: 'present',
      bullets: [
        'Build and operate a portfolio of digital products including Joinride.cc, Famili.one, neuerName.com, and Onefold.me, taking them from problem discovery and positioning through UX, visual design, development, launch, and continuous improvement.',
        'Use these products as a real-world environment to explore how agentic AI is transforming product management, design, software development, and the creative process, turning the findings into practical, repeatable workflows.',
      ],
    },
  ],
  strengths: [
    {
      label: 'Product, platform, and organizational leadership',
      detail:
        'Defining portfolio strategy, operating models, roadmaps, and metrics across multiple product teams, markets, and disciplines. Connecting customer experience, technology, growth, and business outcomes across complex B2B and consumer platforms.',
    },
    {
      label: 'AI-native product building',
      detail:
        'Designing and shipping production software with agentic AI, orchestration, retrieval, context engineering, rapid prototyping, and evaluation. Combining executive-level AI strategy with hands-on product development.',
    },
    {
      label: 'From zero to scale',
      detail:
        'Taking products from first idea through discovery, launch, growth, and operational scale. Building the teams, systems, and quality standards required to deliver, including founding and leading a B2B SaaS company through acquisition.',
    },
  ],
  languages: ['German (native)', 'English (C2)'],
};
