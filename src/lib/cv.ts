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
  strengths: string[];
};

export const cv: Cv = {
  name: 'Oliver Pitsch',
  headline: 'AI-Native Product Leader | Product Maker & Builder',
  location: 'Cologne, Germany',
  email: 'oliver@pitsch.me',
  phone: '+49 175 2066584',
  linkedin: 'https://www.linkedin.com/in/oliverpitsch/',
  summary:
    'Product and design leader with more than 15 years building and scaling B2B and consumer products, developing design organizations, and connecting UX, product strategy, technology, and business objectives.',
  about: [
    'I am a product and design leader from Cologne with more than 15 years of experience building and scaling B2B and consumer products, developing design organizations, and connecting UX, product strategy, technology, and business objectives.',
    'At Trusted Shops, I led UX, design systems, and product marketing across more than ten product teams in six countries. I helped establish UX as a strategic function, introduced a company-wide design system, and supported products serving more than 35,000 businesses and 45 million consumers across Europe.',
    'I also bring direct experience in hospitality software. As co-founder of Reputami, I built a reputation management platform focused on hotels and hospitality businesses and led the company through its acquisition by eKomi in 2015.',
    'Throughout my career, I have worked closely with Product, Engineering, and executive teams to improve product strategy, research and design processes, organizational maturity, and decision-making. My focus is on building strong teams, creating scalable systems, and ensuring Design and Research have a meaningful influence on what gets built and why.',
    'Alongside my leadership roles, I continue to build products such as Joinride.cc, Famili.one, and neuerName.com, which keeps me close to hands-on product development, emerging technology, and AI-enabled ways of working.',
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
      org: 'Famili.one & neuerName.com',
      title: 'Founder, Product Maker & Solo Builder',
      from: '2026',
      to: 'present',
      href: 'https://famili.one',
      bullets: [
        'Launched two production-ready digital products using AI-native workflows and agentic tooling, independently covering product strategy, UX, development, localization, payments, secure data handling, positioning, and launch-ready infrastructure.',
      ],
    },
    {
      org: 'Joinride.cc',
      title: 'Founder',
      from: '2022',
      to: 'present',
      logo: '/images/companies/logo-joinride.svg',
      logoClass: 'h-12 w-auto',
      href: 'https://joinride.cc',
      bullets: [
        'Started Joinride in December 2022 as a hobby project to simplify cycling group ride organization and grew it into one of the leading platforms in the German-speaking cycling market.',
        'Built the platform across web, then expanded it into iOS.',
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
      from: '2011',
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
    'UX leadership and team development',
    'Design strategy and product influence',
    'User research and customer insight',
    'Design systems and quality at scale',
    'DesignOps and scalable UX processes',
    'Cross-functional product leadership',
    'B2B SaaS and hospitality software',
    'Executive stakeholder management',
  ],
};
