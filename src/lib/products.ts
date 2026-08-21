/** The three products I build and run myself. The homepage centerpiece. */
export type Product = {
  name: string;
  href: string;
  logo: string;
  logoClass: string;
  /** Per-product accent, kept distinct from the site accent on purpose. */
  theme: { frame: string; text: string; button: string; bar: string };
  lead: string;
  story: string;
};

export const products: Product[] = [
  {
    name: 'Joinride.cc',
    href: 'https://joinride.cc',
    logo: '/images/companies/logo-joinride.svg',
    logoClass: 'h-12 w-auto dark:brightness-0 dark:invert',
    theme: {
      frame: 'bg-[#4338CA]/50 dark:bg-[#A5B4FC]/50',
      text: 'text-[#4338CA] dark:text-[#A5B4FC]',
      button:
        'bg-[#4338CA] text-white hover:bg-[#3730A3] dark:bg-[#A5B4FC] dark:text-[#171D45] dark:hover:bg-[#C7D2FE]',
      bar: 'bg-[#4338CA] dark:bg-[#A5B4FC]',
    },
    lead: 'A leading platform for bike group rides and run clubs.',
    story:
      'I built Joinride with Lars, my friend and partner, to scratch our own itch. Today Joinride is one of the leading platforms for group rides and run clubs, used by thousands of riders, runners and clubs.',
  },
  {
    name: 'Famili.one',
    href: 'https://famili.one',
    logo: '/images/projects/famili-logo.svg',
    logoClass: 'h-12 w-auto dark:brightness-[1.45]',
    theme: {
      frame: 'bg-[#7E22CE]/50 dark:bg-[#D8B4FE]/50',
      text: 'text-[#7E22CE] dark:text-[#D8B4FE]',
      button:
        'bg-[#7E22CE] text-white hover:bg-[#6B21A8] dark:bg-[#D8B4FE] dark:text-[#29103F] dark:hover:bg-[#E9D5FF]',
      bar: 'bg-[#7E22CE] dark:bg-[#D8B4FE]',
    },
    lead: 'A family organizer that makes care work visible.',
    story:
      'Famili is my solo-built answer to the quiet mental load that sits in one head at home. It brings tasks, dates, notes, documents, contacts, and daily context together so family work can actually be shared.',
  },
  {
    name: 'neuerName.com',
    href: 'https://www.neuername.com',
    logo: '/images/projects/neuername-logo.svg',
    logoClass: 'h-12 w-12 rounded-2xl',
    theme: {
      frame: 'bg-[#19A066]/50 dark:bg-[#88EDC1]/50',
      text: 'text-[#177E52] dark:text-[#88EDC1]',
      button:
        'bg-[#19A066] text-white hover:bg-[#177E52] dark:bg-[#88EDC1] dark:text-[#062D1E] dark:hover:bg-[#BCF6DC]',
      bar: 'bg-[#19A066] dark:bg-[#88EDC1]',
    },
    lead: 'A tool for the admin work of changing your name at marriage.',
    story:
      'neuerName.com is a product for one of those life admin moments that feels small until it eats weeks. It turns name changes into a personal checklist with contact data, mailing templates, and less guesswork.',
  },
];
