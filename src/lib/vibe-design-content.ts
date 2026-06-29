import type { Metadata } from 'next';

const EN_PATH = '/vibe-coded-design';
const DE_PATH = '/design-fuer-vibe-coding';

export type VibeDesignContent = {
  lang: 'en' | 'de';
  pagePath: string;
  altPath: string;
  breadcrumbName: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    cta1Label: string;
    cta2Label: string;
  };
  beforeAfter: {
    badge: string;
    heading: string;
    sub: string;
    beforeLabel: string;
    afterLabel: string;
    before: {
      plan: string;
      price: string;
      blurb: string;
      features: string[];
      cta: string;
      later: string;
    };
    after: {
      popular: string;
      name: string;
      price: string;
      perMonth: string;
      tagline: string;
      features: { title: string; desc: string }[];
      cta: string;
    };
  };
  problems: {
    heading: string;
    items: { title: string; description: string }[];
  };
  tokens: {
    badge: string;
    heading: string;
    description: string;
    labels: {
      color: string;
      typeScale: string;
      spacing: string;
      radius: string;
      elevation: string;
    };
    type: { heading: string; body: string; caption: string };
  };
  offerings: {
    heading: string;
    items: { title: string; description: string; bullets: string[] }[];
  };
  stays: {
    badge: string;
    heading: string;
    body: string;
    bullets: string[];
  };
  process: {
    heading: string;
    steps: { number: string; title: string; description: string }[];
  };
  why: {
    heading: string;
    bio: string;
    credentials: string[];
    linkLabel: string;
  };
  faq: {
    heading: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    badge: string;
    heading: string;
    body: string;
    emailSubject: string;
    emailLabel: string;
    linkedinLabel: string;
    legalNote: string;
    legalLinkLabel: string;
  };
  footer: {
    imprintLabel: string;
    homeLabel: string;
    langSwitchLabel: string;
  };
};

export const en: VibeDesignContent = {
  lang: 'en',
  pagePath: EN_PATH,
  altPath: DE_PATH,
  breadcrumbName: 'UX Design for Vibe-Coded Products',
  meta: {
    title: 'Highest-Class UX Design for Vibe-Coded Products – Oliver Pitsch',
    description:
      'You vibe-coded your app and the functionality works. I bring highest-class UX and UI design on top, build your design system and tokens, and set up Claude Code and Codex to keep every screen on-system.',
    keywords: [
      'UX design for vibe-coded apps',
      'design for vibe coding',
      'vibe coding UX',
      'design system for AI-built apps',
      'Claude Code design system',
      'Codex design tokens',
      'UI design for AI products',
      'design audit vibe coded',
      'design tokens AI agents',
      'highest class UX design',
    ],
    ogTitle: 'Highest-Class UX Design for Vibe-Coded Products – Oliver Pitsch',
    ogDescription:
      'Your product works. I make it feel world-class, build the design system and tokens, and wire Claude Code and Codex to keep it that way.',
  },
  hero: {
    badge: 'UX & UI for vibe-coded products',
    headline: 'Your product works. Now make it feel world-class.',
    subheadline:
      'You built your app or tool with Claude Code. It works, but you can tell from every button that an AI designed it. I take that foundation, turn it into best-in-class UX and UI, and teach Claude Code and Codex to understand and use your design system and tokens.',
    cta1Label: 'Book a design audit',
    cta2Label: 'See how I work',
  },
  beforeAfter: {
    badge: 'The difference',
    heading: 'Same function. A completely different product.',
    sub: 'The logic does not change. Information architecture, spacing, color, states, motion, and a real design system make the difference your users actually feel.',
    beforeLabel: 'What the agent shipped',
    afterLabel: 'After the redesign',
    before: {
      plan: '✨ Pro Plan ✨',
      price: '$29/month — billed monthly',
      blurb:
        'Unlock the full potential of your workflow — reports, exports, and team seats — all in one seamless, powerful plan.',
      features: [
        '✅ Unlimited projects — no limits',
        '✅ Team members — collaborate seamlessly',
        '✅ Priority support — 24/7',
      ],
      cta: '🚀 Upgrade Now',
      later: '👎 maybe later',
    },
    after: {
      popular: 'Popular',
      name: 'Pro',
      price: '$29',
      perMonth: '/ month',
      tagline: 'Everything your team needs to ship, polished.',
      features: [
        { title: 'Unlimited projects', desc: 'Spin up as many as your team needs.' },
        { title: 'Advanced analytics', desc: 'See product usage clearly and act on it.' },
        { title: 'Priority support', desc: 'Real humans, fast response times.' },
      ],
      cta: 'Upgrade to Pro',
    },
  },
  problems: {
    heading: 'Sound familiar?',
    items: [
      {
        title: 'It works, but it looks AI-generated',
        description:
          'Generic components, countless emojis and gradients… The functionality is solid, but you can tell: Claude was here.',
      },
      {
        title: 'No design system to anchor on',
        description:
          'Every screen reinvents spacing, color, and hierarchy. Consistency drifts a little further with every prompt.',
      },
      {
        title: 'Quality drops the moment the agent gets involved',
        description:
          'Without tokens and guardrails, Claude Code and Codex keep producing slightly different UI for the same patterns.',
      },
      {
        title: 'Function first. The craft never came.',
        description:
          'The features are there, but typography, spacing, states, and flows never got the attention they deserve.',
      },
    ],
  },
  tokens: {
    badge: 'The foundation',
    heading: 'A token system your product and your agents build on.',
    description:
      'I extract or build the design tokens that hold everything together: color, type, spacing, corner radius, shadows, and so on. Defining them as tokens is only half the work. The real craft is teaching Claude Code and Codex how to work with them. So every new screen stays on style automatically.',
    labels: {
      color: 'Color',
      typeScale: 'Typography',
      spacing: 'Spacing',
      radius: 'Radius',
      elevation: 'Shadows',
    },
    type: { heading: 'Heading', body: 'Body text', caption: 'Caption' },
  },
  offerings: {
    heading: 'What you get',
    items: [
      {
        title: 'Best-in-class UX and UI design',
        description:
          'For the product you already built. Hierarchy, typography, spacing, color, and states at the level of a senior design team.',
        bullets: [
          'Screen-by-screen redesign of your key surfaces',
          'Real hover, focus, loading, empty, and error states, designed with care',
          'Accessible, consistent, and on-brand at every step',
          'Animation and motion that support the function, not just flash',
        ],
      },
      {
        title: 'A real design system and tokens',
        description: 'Not a one-off paint job. A token system and components that grow with you.',
        bullets: [
          'Tokens for color, type, spacing, radius, shadows, and motion',
          'Reusable components with sensible defaults',
          'Accessibility as a baseline requirement',
          // Intentional em dash: that is the joke (promise no em dashes, then use one).
          'Content that matches your voice and tone. Without — em dashes.',
          'Documented so both humans and agents can follow it',
        ],
      },
      {
        title: 'Claude Code and Codex that respect it',
        description:
          'I set up your AI coding tools to understand and use your design system. On one machine or across your whole development landscape. So all future work stays on-system too.',
        bullets: [
          'CLAUDE.md and project rules wired to your tokens',
          'Guardrails against hardcoded colors, spacing, and radii',
          'Design SKILLS that genuinely produce better interfaces',
          'Agents that produce on-brand UI without you lifting a finger',
        ],
      },
    ],
  },
  stays: {
    badge: 'The part that lasts',
    heading: 'And it stays on-system after we are done.',
    body: 'A redesign that falls apart with the next prompt is wasted money. So I teach your tools and your engineers the system: I store your tokens in Claude Code and Codex and add SKILLS and guardrails. So the next feature your team ships is on-brand because it is built that way, not by luck.',
    bullets: [
      'Tokens and rules your agents read on every task',
      'Lint and review gates that block hardcoded values',
      'SKILLS and docs that drop straight into any new product',
    ],
  },
  process: {
    heading: 'How I work',
    steps: [
      {
        number: '01',
        title: 'Audit',
        description:
          'I go through your product surface by surface, map the UX and craft gaps, and find whatever design foundation already exists.',
      },
      {
        number: '02',
        title: 'Design system and tokens',
        description:
          'I define or extract your tokens for color, type, spacing, radius, and elevation, plus the core components everything else builds on.',
      },
      {
        number: '03',
        title: 'Redesign the surfaces',
        description:
          'I bring your key screens and flows to a highest-class standard, with real states, not just polished happy-path mockups. And if you like, your entire product.',
      },
      {
        number: '04',
        title: 'Wire up Claude Code and Codex',
        description:
          'I configure your agents and repo so the design system and tokens are the default, with guardrails that catch drift before it ships.',
      },
      {
        number: '05',
        title: 'Handover',
        description:
          'You keep the system, the components, the agent setup, and the rules to keep shipping on-system long after the engagement ends.',
      },
    ],
  },
  why: {
    heading: 'Why me',
    bio: 'I bring 20 years of design, UX, and product experience. I have built and owned large design systems, led design teams at Trusted Shops, and today I ship real products end to end with Claude Code and AI agents. I know both sides: the craft behind the best UX and exactly how to make AI coding tools deliver it reliably.',
    credentials: [
      '20 years design & UX',
      'Design systems at scale',
      'Director UX at Trusted Shops',
      'Ships daily with Claude Code',
      'Founder, AI SaaS (Reputami)',
      'Solo builder (Joinride.cc, Famili.one)',
    ],
    linkLabel: 'More about me →',
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'What exactly is a vibe-coded product?',
        answer:
          'Software where the functionality was built quickly with AI assistance, using tools like Claude Code, Codex, Copilot, Cursor, Lovable, or v0, often without a designer in the loop. The logic works. The design and UX usually need a senior pass.',
      },
      {
        question: 'Do you redesign everything or just the surface?',
        answer:
          'We start where it matters most: your highest-traffic and highest-stakes surfaces. I design the system and tokens so the rest of the product can follow without redoing every screen from scratch.',
      },
      {
        question: 'Will the quality hold after you leave?',
        answer:
          'Yes. That is the entire point of wiring your design system into Claude Code and Codex. Your agents produce on-system UI by default, and the guardrails catch drift before it reaches users.',
      },
      {
        question: 'Which AI coding tools do you support?',
        answer:
          'Primarily Claude Code and OpenAI Codex. The design-system and token approach works with any agentic setup, including Copilot, Cursor, and similar tools.',
      },
      {
        question: 'Do you use our existing design system or build a new one?',
        answer:
          'Both. If you already have tokens and components, I extend and tighten them. If you do not, I create a lean system tailored to your product and the way your team builds.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A focused audit and first redesigned surfaces typically take 2 to 4 weeks. A full system plus agent setup runs longer depending on product size. I also offer a one-week intensive to get the foundation in place fast.',
      },
      {
        question: 'What does it cost?',
        answer:
          'Pricing depends on scope and product size. I offer daily rates for audits and intensives, and project pricing for full engagements. Reach out and we will find a model that fits.',
      },
    ],
  },
  cta: {
    badge: 'Get in touch',
    heading: 'Ready to make your product feel as good as it works?',
    body: 'Send me a link to your product or a few screenshots. I will tell you where the biggest UX wins are and how I would approach the design system and agent setup. The first 30-minute call is free.',
    emailSubject: 'Highest-Class%20UX%20for%20Vibe-Coded%20Products',
    emailLabel: 'Email me directly',
    linkedinLabel: 'Message on LinkedIn',
    legalNote: 'Prefer formal contact details? See the',
    legalLinkLabel: 'imprint and contact information',
  },
  footer: {
    imprintLabel: 'Imprint & Data Privacy',
    homeLabel: 'Back to home',
    langSwitchLabel: 'Auf Deutsch lesen →',
  },
};

export const de: VibeDesignContent = {
  lang: 'de',
  pagePath: DE_PATH,
  altPath: EN_PATH,
  breadcrumbName: 'UX-Design für Vibe-Coded-Produkte',
  meta: {
    title: 'Highest-Class UX-Design für Vibe-Coded-Produkte – Oliver Pitsch',
    description:
      'Deine App ist vibe-coded und funktioniert. Ich bringe Highest-Class UX und UI obendrauf, baue dein Design System samt Tokens und richte Claude Code und Codex so ein, dass jeder Screen on-system bleibt.',
    keywords: [
      'UX-Design für Vibe-Coded-Apps',
      'Design für Vibe Coding',
      'Vibe Coding UX',
      'Design System für KI-Apps',
      'Claude Code Design System',
      'Codex Design Tokens',
      'UI-Design für KI-Produkte',
      'Design Audit Vibe Coding',
      'Design Tokens KI-Agenten',
      'Highest-Class UX-Design',
    ],
    ogTitle: 'Highest-Class UX-Design für Vibe-Coded-Produkte – Oliver Pitsch',
    ogDescription:
      'Dein Produkt funktioniert. Ich mache es Weltklasse, baue Design System und Tokens und richte Claude Code und Codex so ein, dass es so bleibt.',
  },
  hero: {
    badge: 'UX & UI für Vibe-Coded-Produkte',
    headline: 'Dein Produkt funktioniert. Jetzt wird es Weltklasse.',
    subheadline:
      'Du hast deine App oder dein Tool mit Claude Code erstellt. Es funktioniert, aber man sieht an jedem Button, dass es von der AI designed wurde. Ich nutze die Basis, erarbeite daraus eine best-in-class UX & UI und bringe Claude Code und Codex bei, dein Design System und deine Tokens zu verstehen und zu nutzen.',
    cta1Label: 'Design-Audit buchen',
    cta2Label: 'So gehe ich vor',
  },
  beforeAfter: {
    badge: 'Der Unterschied',
    heading: 'Gleiche Funktion. Ein völlig anderes Produkt.',
    sub: 'An der Logik ändert sich nichts. Informations-Architektur, Spacing, Farbe, States, Motion und ein echtes Design System machen den Unterschied, den deine Nutzer:innen wirklich spüren.',
    beforeLabel: 'Was der Agent ausgeliefert hat',
    afterLabel: 'Nach der Überarbeitung',
    before: {
      plan: '✨ Pro Plan ✨',
      price: '29 €/Monat — monatlich abgerechnet',
      blurb:
        'Schöpfe das volle Potenzial deines Workflows aus — Reports, Exporte und Team-Seats — alles in einem nahtlosen, leistungsstarken Plan.',
      features: [
        '✅ Unbegrenzte Projekte — keine Limits',
        '✅ Teammitglieder — nahtlose Zusammenarbeit',
        '✅ Priority-Support — 24/7',
      ],
      cta: '🚀 Jetzt upgraden',
      later: '👎 vielleicht später',
    },
    after: {
      popular: 'Beliebt',
      name: 'Pro',
      price: '29 €',
      perMonth: '/ Monat',
      tagline: 'Alles, was dein Team braucht. Sauber gestaltet.',
      features: [
        { title: 'Unbegrenzte Projekte', desc: 'Leg so viele an, wie dein Team braucht.' },
        { title: 'Erweiterte Analytics', desc: 'Sieh genau, wie dein Produkt genutzt wird.' },
        { title: 'Priority-Support', desc: 'Echte Menschen, schnelle Reaktionszeiten.' },
      ],
      cta: 'Auf Pro upgraden',
    },
  },
  problems: {
    heading: 'Kommt dir das bekannt vor?',
    items: [
      {
        title: 'Es funktioniert, sieht aber KI-generiert aus',
        description:
          'Generische Komponenten, unzählige Emojis und Verläufe… Die Funktionalität sitzt, aber man sieht ihm an: Hier war Claude am Werk.',
      },
      {
        title: 'Kein Design System als Anker',
        description:
          'Jeder Screen erfindet Spacing, Farbe und Hierarchie neu. Mit jedem Prompt driftet die Konsistenz ein Stück weiter.',
      },
      {
        title: 'Die Qualität leidet, sobald der Agent dran ist',
        description:
          'Ohne Tokens und Guardrails produzieren Claude Code und Codex für dieselben Muster immer wieder leicht unterschiedliches UI.',
      },
      {
        title: 'Erst die Funktion. Das Handwerk kam nie.',
        description:
          'Die Features sind da, aber Typografie, Spacing, States und Flows haben nie die Aufmerksamkeit bekommen, die sie verdienen.',
      },
    ],
  },
  tokens: {
    badge: 'Das Fundament',
    heading: 'Ein Token-System, auf das dein Produkt und deine Agenten aufbauen.',
    description:
      'Ich extrahiere oder baue die Design Tokens, die alles zusammenhalten: Farbe, Typo, Spacing, Rundungen, Schatten, etc. Sie als Tokens zu definieren ist aber nur die halbe Arbeit. Die Kür ist, Claude Code und Codex beizubringen, wie man sie damit umgehen sollen. So bleibt jeder neue Screen automatisch im Style.',
    labels: {
      color: 'Farbe',
      typeScale: 'Typografie',
      spacing: 'Abstände',
      radius: 'Rundungen',
      elevation: 'Schatten',
    },
    type: { heading: 'Überschrift', body: 'Fließtext', caption: 'Legende' },
  },
  offerings: {
    heading: 'Was du bekommst',
    items: [
      {
        title: 'Best-in-class UX- und UI-Design',
        description:
          'Für das Produkt, das du schon gebaut hast. Hierarchie, Typografie, Spacing, Farbe und States auf dem Niveau eines Senior-Design-Teams.',
        bullets: [
          'Screen-für-Screen-Redesign deiner wichtigsten Surfaces',
          'Echte Hover-, Focus-, Loading-, Empty- und Error-States mit Liebe zum Design',
          'Barrierefrei, konsistent und on-brand bei jedem Schritt',
          'Animation und Motion, die die Funktionalität unterstützen und nicht nur blinken lassen',
        ],
      },
      {
        title: 'Ein echtes Design System und Tokens',
        description: 'Kein einmaliger Anstrich. Ein Token-System und Komponenten, die mitwachsen.',
        bullets: [
          'Tokens für Farbe, Typo, Spacing, Rundungen, Schatten und Motion',
          'Wiederverwendbare Komponenten mit sinnvollen Defaults',
          'Barrierefreiheit als Grundvoraussetzung',
          'Content, der sich an deine Voice & Tone hält. Ohne – Gedankenstriche',
          'So dokumentiert, dass Mensch und Agent ihm folgen können',
        ],
      },
      {
        title: 'Claude Code und Codex, die sich daran halten',
        description:
          'Ich richte deine KI-Coding-Tools so ein, dass sie dein Design System verstehen und nutzen. Auf einem Rechner oder für deine ganze Development-Landschaft. So bleibt auch jede weitere Arbeit on-system.',
        bullets: [
          'CLAUDE.md und Projektregeln, an deine Tokens gekoppelt',
          'Guardrails gegen hartkodierte Farben, Spacing und Radien',
          'Design SKILLS, die wirklich bessere Interfaces erzeugen',
          'Agenten, die on-brand UI produzieren, ohne Hand anlegen',
        ],
      },
    ],
  },
  stays: {
    badge: 'Der Teil, der bleibt',
    heading: 'Und es bleibt on-system, auch wenn wir fertig sind.',
    body: 'Ein Redesign, das mit dem nächsten Prompt zerfällt, ist verbranntes Geld. Also bringe ich deinen Tools & Engineers das System bei: Ich hinterlege deine Tokens in Claude Code und Codex und ergänze SKILLS & Guardrails. So ist das nächste Feature deines Teams on-brand, weil es so gebaut ist, nicht durch Zufall.',
    bullets: [
      'Tokens und Regeln, die deine Agenten bei jeder Aufgabe lesen',
      'Lint- und Review-Gates, die hartkodierte Werte blockieren',
      'SKILLS und Docs, die ganz einfach in jedes neue Produkt übernommen werden können',
    ],
  },
  process: {
    heading: 'So gehe ich vor',
    steps: [
      {
        number: '01',
        title: 'Audit',
        description:
          'Ich gehe dein Produkt Screen für Screen durch, finde die Lücken in UX und Gestaltung und schaue, welches Design-Fundament schon da ist.',
      },
      {
        number: '02',
        title: 'Design System und Tokens',
        description:
          'Ich definiere oder extrahiere deine Tokens für Farbe, Typo, Spacing, Radius und Elevation. Dazu die Kern-Komponenten, auf denen alles andere aufbaut.',
      },
      {
        number: '03',
        title: 'Screens neu gestalten',
        description:
          'Ich bringe deine wichtigsten Screens und Flows auf Highest-Class-Niveau, mit echten States, nicht nur polierten Happy-Path-Mockups. Auf Wunsch natürlich sogar dein gesamtes Produkt.',
      },
      {
        number: '04',
        title: 'Claude Code und Codex einrichten',
        description:
          'Ich konfiguriere deine Agenten und dein Repo so, dass Design System und Tokens der Standard sind, mit Guardrails, die Drift abfangen, bevor sie live geht.',
      },
      {
        number: '05',
        title: 'Übergabe',
        description:
          'Du behältst das System, die Komponenten, das Agenten-Setup und die Regeln, um auch lange nach unserer Zusammenarbeit on-system auszuliefern.',
      },
    ],
  },
  why: {
    heading: 'Warum ich',
    bio: 'Ich bringe 20 Jahre Design, UX und Product Erfahrung mit. Ich habe große Design-Systeme gebaut und verantwortet, Design-Teams bei Trusted Shops geleitet und liefere heute echte Produkte end-to-end mit Claude Code und KI-Agenten. Ich kenne beide Seiten: das Handwerk hinter der besten UX und genau, wie man KI-Coding-Tools dazu bringt, es verlässlich zu liefern.',
    credentials: [
      '20 Jahre Design & UX',
      'Design Systeme at scale',
      'Director UX bei Trusted Shops',
      'Liefert täglich mit Claude Code',
      'Gründer, AI-SaaS (Reputami)',
      'Solo-Builder (Joinride.cc, Famili.one)',
    ],
    linkLabel: 'Mehr über mich →',
  },
  faq: {
    heading: 'Häufig gestellte Fragen',
    items: [
      {
        question: 'Was genau ist ein Vibe-Coded-Produkt?',
        answer:
          'Software, deren Funktion schnell mit KI-Unterstützung gebaut wurde, mit Tools wie Claude Code, Codex, Copilot, Cursor, Lovable oder v0, oft ohne dass ein Designer beteiligt war. Die Logik läuft. Design und UX brauchen meist noch eine erfahrene Hand.',
      },
      {
        question: 'Gestaltest du alles neu oder nur die Oberfläche?',
        answer:
          'Wir starten dort, wo es am meisten zählt: deine wichtigsten, meistgenutzten Screens. Das System und die Tokens lege ich so an, dass der Rest des Produkts folgen kann, ohne jeden Screen einzeln neu zu bauen.',
      },
      {
        question: 'Hält die Qualität, wenn du weg bist?',
        answer:
          'Ja. Genau dafür hinterlegen wir dein Design System in Claude Code und Codex. Deine Agenten liefern standardmäßig on-system UI, und die Guardrails fangen Drift ab, bevor sie bei den Nutzern ankommt.',
      },
      {
        question: 'Welche KI-Coding-Tools unterstützt du?',
        answer:
          'Vor allem Claude Code und OpenAI Codex. Der Design-System- und Token-Ansatz funktioniert mit jedem agentischen Setup, inklusive Copilot, Cursor und ähnlichen Tools.',
      },
      {
        question: 'Nutzt du unser bestehendes Design System oder baust du ein neues?',
        answer:
          'Beides. Wenn du schon Tokens und Komponenten hast, erweitere und schärfe ich sie. Wenn nicht, baue ich ein schlankes System, zugeschnitten auf dein Produkt und die Art, wie dein Team baut.',
      },
      {
        question: 'Wie lange dauert das?',
        answer:
          'Ein fokussiertes Audit und erste neu gestaltete Screens dauern meist 2 bis 4 Wochen. Ein komplettes System samt Agenten-Setup läuft je nach Produktgröße länger. Für einen schnellen Start gibt es auch ein einwöchiges Intensiv-Format.',
      },
      {
        question: 'Was kostet das?',
        answer:
          'Der Preis hängt von Umfang und Produktgröße ab. Für Audits und Intensiv-Formate gibt es Tagessätze, für vollständige Projekte projektbasierte Preise. Melde dich, dann finden wir ein Modell, das passt.',
      },
    ],
  },
  cta: {
    badge: 'Kontakt',
    heading: 'Bereit, dass dein Produkt so gut aussieht, wie es funktioniert?',
    body: 'Schick mir einen Link zu deinem Produkt oder ein paar Screenshots. Ich sage dir, wo die größten UX-Gewinne liegen und wie ich Design System und Agenten-Setup angehen würde. Das erste 30-Minuten-Gespräch ist kostenlos.',
    emailSubject: 'Highest-Class%20UX%20f%C3%BCr%20Vibe-Coded-Produkte',
    emailLabel: 'Direkt per E-Mail',
    linkedinLabel: 'Auf LinkedIn schreiben',
    legalNote: 'Formale Kontaktdaten gewünscht? Siehe',
    legalLinkLabel: 'Impressum und Kontaktinformationen',
  },
  footer: {
    imprintLabel: 'Impressum & Datenschutz',
    homeLabel: 'Zurück zur Startseite',
    langSwitchLabel: 'Read in English →',
  },
};

export function buildMetadata(c: VibeDesignContent): Metadata {
  return {
    title: c.meta.title,
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: {
      canonical: c.pagePath,
      languages: { en: EN_PATH, de: DE_PATH },
    },
    openGraph: {
      type: 'website',
      url: c.pagePath,
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      images: [
        {
          url: '/images/og-images/og-facebook.jpg',
          width: 1200,
          height: 630,
          alt: c.meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.ogTitle,
      description: c.meta.ogDescription,
      images: [{ url: '/images/og-images/og-twitter-card.jpg', alt: c.meta.ogTitle }],
    },
  };
}
