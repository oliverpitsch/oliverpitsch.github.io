import { cv } from './cv';
import { products } from './products';

/**
 * The card shown when someone hovers or taps a company or product name.
 * Facts come from the CV and the product list; the blurb is written for the
 * card, since a CV bullet is too long to read in a popover.
 */
export type CompanyCardData = {
  name: string;
  logo?: string;
  logoClass?: string;
  role: string;
  period: string;
  href?: string;
  blurb: string;
};

const blurbs: Record<string, string> = {
  'AI Labs':
    'Led product strategy, UX and frontend for an AI-native SaaS product, and shipped it market-ready in eight weeks with a team of two.',
  Ordio:
    'Reorganised product management around AI-native building with the CEO and CTO, cutting handoffs and speeding up execution.',
  'Trusted Shops':
    'Led UX and Product Marketing across ten product teams in six countries, and built the Helios design system that unified the portfolio.',
  Studitemps:
    'Joined as the first UX designer, established UX processes across eight product teams, and hired the team that carried them.',
  Reputami:
    'Co-founded a reputation management SaaS for hospitality, led product and development, and took the company through to acquisition by eKomi.',
  'Joinride.cc':
    'Started as a hobby project in 2022 and grown into one of the leading platforms for group rides and run clubs in the German-speaking market.',
  'Famili.one':
    'A solo-built family organiser that makes the mental load visible, bringing tasks, dates, documents and daily context into one shared place.',
  'neuerName.com':
    'Turns the admin of changing your name at marriage into a personal checklist, with contact data, mailing templates and less guesswork.',
};

function fromRole(org: string): CompanyCardData | null {
  const role = cv.roles.find((r) => r.org === org);
  if (!role) return null;
  return {
    name: role.org,
    logo: role.logo,
    logoClass: role.logoClass,
    role: role.title,
    period: `${role.from} – ${role.to}`,
    href: role.href,
    blurb: blurbs[role.org] ?? role.bullets[0],
  };
}

function fromProduct(name: string): CompanyCardData | null {
  const product = products.find((p) => p.name === name);
  if (!product) return null;
  const role = cv.roles.find((r) => r.org === name);
  return {
    name: product.name,
    logo: product.logo,
    logoClass: product.logoClass,
    role: role?.title ?? 'Founder, Product Maker & Solo Builder',
    period: role ? `${role.from} – ${role.to}` : '2026 – present',
    href: product.href,
    blurb: blurbs[product.name] ?? product.lead,
  };
}

/** Keyed by the slug used at each mention in the page. */
export const companies: Record<string, CompanyCardData> = {};

const entries: [string, CompanyCardData | null][] = [
  ['ai-labs', fromRole('AI Labs')],
  ['ordio', fromRole('Ordio')],
  ['trusted-shops', fromRole('Trusted Shops')],
  ['studitemps', fromRole('Studitemps')],
  ['reputami', fromRole('Reputami')],
  ['joinride', fromProduct('Joinride.cc')],
  ['famili', fromProduct('Famili.one')],
  ['neuername', fromProduct('neuerName.com')],
];

for (const [key, data] of entries) {
  if (data) companies[key] = data;
}

/** Maps a CV org name to its card key, for the career strip. */
export const companyKeyByOrg: Record<string, string> = {
  'AI Labs': 'ai-labs',
  Ordio: 'ordio',
  'Trusted Shops': 'trusted-shops',
  Studitemps: 'studitemps',
  Reputami: 'reputami',
  'Joinride.cc': 'joinride',
};
