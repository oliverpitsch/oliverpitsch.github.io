export type ConsultingContent = {
  lang: string;
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
    cta1Href: string;
    cta2Label: string;
  };
  painPoints: {
    heading: string;
    items: { title: string; description: string }[];
  };
  services: {
    heading: string;
    items: { title: string; description: string; bullets: string[] }[];
  };
  approach: {
    heading: string;
    steps: { number: string; title: string; description: string }[];
  };
  about: {
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
    emailLabel: string;
    emailSubject: string;
    linkedinLabel: string;
    legalNote: string;
    legalLinkLabel: string;
  };
  footer: {
    imprintLabel: string;
    langSwitchLabel: string;
    langSwitchHref: string;
  };
};

export const en: ConsultingContent = {
  lang: 'en',
  meta: {
    title: 'AI Consulting for Product Teams – Oliver Pitsch',
    description:
      'AI consulting for product teams adopting Claude Code, Codex, and AI-native workflows. From regular product development to AI-native product management and development, without sacrificing UX quality.',
    keywords: [
      'AI consulting',
      'Claude Code consulting',
      'Codex consulting',
      'AI-native product development',
      'AI product management',
      'AI consulting product teams',
      'UX design systems AI',
      'agentic coding workflows',
    ],
    ogTitle: 'AI Consulting for Product Teams – Oliver Pitsch',
    ogDescription:
      'Help your product team adopt Claude Code, Codex, and AI-native workflows. Consulting by Oliver Pitsch.',
  },
  hero: {
    badge: 'AI Consulting',
    headline: 'Make AI work for your product team',
    subheadline:
      'I help companies adopt Claude Code, Codex, and AI-native workflows. Transitioning product management and development teams without sacrificing UX quality or design system coherence.',
    cta1Label: 'Start a conversation',
    cta1Href: 'mailto:oliver@pitsch.me?subject=AI%20Consulting%20Inquiry',
    cta2Label: 'See how I work',
  },
  painPoints: {
    heading: 'Is this you?',
    items: [
      {
        title: 'AI matters, but where to start?',
        description:
          'Your team knows AI will change how software gets built, but nobody has a clear plan for what to adopt, where to begin, or how to measure progress.',
      },
      {
        title: 'Claude Code or Codex, but how?',
        description:
          'You want to leverage agentic coding tools but need guidance on setup, workflows, prompt engineering, and integrating them into your existing CI/CD pipeline.',
      },
      {
        title: 'PMs and devs need new workflows',
        description:
          'Your product managers and developers need to transition from traditional ways of working to AI-native product development, and nobody has done it before in your org.',
      },
      {
        title: 'UX quality must not suffer',
        description:
          'You are worried that the rush to adopt AI tools will erode your design system, degrade user experience, and create inconsistency across your product.',
      },
    ],
  },
  services: {
    heading: 'What I offer',
    items: [
      {
        title: 'AI-Native Product Development',
        description:
          'Adopt agentic coding tools and reshape how your engineering team builds software.',
        bullets: [
          'Claude Code & Codex adoption strategy and hands-on setup',
          'Agentic coding workflows for individual developers and teams',
          'Prompt engineering and context management for better AI output',
          'Integration with existing CI/CD, code review, and quality gates',
        ],
      },
      {
        title: 'AI-Native Product Management',
        description: 'Redefine the product management role for the age of AI-assisted building.',
        bullets: [
          'AI-assisted specification, prioritization, and planning',
          'Redefining PM workflows: from writing tickets to steering agents',
          'Product strategy when building speed increases 10x',
          'Measuring and communicating AI-driven productivity gains',
        ],
      },
      {
        title: 'UX & Design System Preservation',
        description:
          'Maintain design quality and consistency while your team adopts AI-powered tools.',
        bullets: [
          'Quality gates for AI-generated UI code',
          'Integrating design tokens and component libraries into AI workflows',
          'Ensuring accessibility and brand consistency with agentic output',
          'Review processes that catch drift before it ships',
        ],
      },
    ],
  },
  approach: {
    heading: 'How we work together',
    steps: [
      {
        number: '01',
        title: 'Discovery',
        description:
          'We assess your current workflows, tech stack, and team dynamics. I identify where AI can create the most leverage and where the risks are.',
      },
      {
        number: '02',
        title: 'Implementation',
        description:
          'Hands-on workshops, tool setup, and workflow redesign. I work alongside your team: pair building sessions, not just slide decks.',
      },
      {
        number: '03',
        title: 'Enablement',
        description:
          'Team training, documentation, and ongoing sparring. Your team becomes self-sufficient. I measure impact and help you communicate results.',
      },
    ],
  },
  about: {
    heading: 'Why me',
    bio: 'I have 20 years of experience across design, UX, and product leadership. I founded an AI SaaS company (Reputami), led product and UX at Trusted Shops, and currently serve as Head of Product at Ordio. I built famili.one, a family organization app, entirely as a solo builder with zero external development, using Claude Code and AI agents end to end. I am not just advising. I am shipping real products with these tools every day.',
    credentials: [
      '20 years product & UX',
      'Head of Product at Ordio',
      'Solo-built famili.one with AI',
      'Founded AI SaaS (Reputami)',
      'Director UX at Trusted Shops',
    ],
    linkLabel: 'More about me →',
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'What is AI-native product development?',
        answer:
          'AI-native product development means building software with AI agents as core members of the delivery workflow, not as an afterthought. Developers use tools like Claude Code and Codex to write, review, and ship code. Product managers steer agents with context and intent rather than writing detailed specifications. The entire cycle from idea to shipped feature compresses dramatically.',
      },
      {
        question: 'What tools do you specialize in?',
        answer:
          'I work primarily with Claude Code and OpenAI Codex. Many teams already use GitHub Copilot, which has grown well beyond code completion into planning, sub-agents, and multi-file edits. If your team is on Copilot, that is a great starting point. I help you get the most out of what you already have and expand into deeper agentic workflows with Claude Code and Codex where it makes sense. The consulting is tool-agnostic at the strategic level: it is about workflows, team structure, and building culture, not just which tool you pick.',
      },
      {
        question: 'How long does a typical engagement take?',
        answer:
          'Most engagements start with a 2 to 4 week discovery and initial implementation phase. Ongoing enablement and sparring can continue for 2 to 3 months depending on team size and ambition. I also offer focused one-week intensives for teams that want to move fast.',
      },
      {
        question: 'Do you work with teams that have no AI experience?',
        answer:
          'Yes, and in fact that is often where I create the most value. I help teams go from zero to productive with AI tools, building confidence and competence step by step. The key is starting with real work, not toy projects.',
      },
      {
        question: 'How do you ensure UX quality is not sacrificed?',
        answer:
          'I bring 20 years of UX and design system experience to every engagement. We set up quality gates, integrate your design tokens into AI workflows, and establish review processes that catch inconsistencies before they reach users. AI speed without UX quality is just faster chaos.',
      },
      {
        question: 'What does it cost?',
        answer:
          'Pricing depends on scope, team size, and engagement format. I offer daily rates for workshops and intensives, and project-based pricing for longer engagements. Reach out and we will find a model that fits.',
      },
    ],
  },
  cta: {
    badge: 'Get in touch',
    heading: 'Ready to make AI work for your team?',
    body: 'Whether you are just getting started with AI tools or want to accelerate an existing adoption, let us talk. I offer a free 30-minute discovery call to understand your situation and see if there is a fit.',
    emailLabel: 'Email me directly',
    emailSubject: 'AI%20Consulting%20Inquiry',
    linkedinLabel: 'Message on LinkedIn',
    legalNote: 'Prefer formal contact details? See the',
    legalLinkLabel: 'imprint and contact information',
  },
  footer: {
    imprintLabel: 'Imprint & Data Privacy',
    langSwitchLabel: 'Auf Deutsch lesen →',
    langSwitchHref: '/ai-beratung',
  },
};

export const de: ConsultingContent = {
  lang: 'de',
  meta: {
    title: 'KI-Beratung für Produktteams – Oliver Pitsch',
    description:
      'KI-Beratung für Produktteams, die Claude Code, Codex und AI-native Workflows einführen wollen. Von klassischer Produktentwicklung zu AI-nativer Produktentwicklung und AI-nativem Produktmanagement, ohne Abstriche bei UX-Qualität.',
    keywords: [
      'KI Beratung',
      'KI Beratung Unternehmen',
      'Claude Code Beratung',
      'AI-native Produktentwicklung',
      'KI Produktmanagement',
      'KI Beratung Produktteams',
      'KI Transformation Unternehmen',
      'Codex Beratung',
    ],
    ogTitle: 'KI-Beratung für Produktteams – Oliver Pitsch',
    ogDescription:
      'Dein Produktteam mit Claude Code, Codex und AI-nativen Workflows stärken. Beratung von Oliver Pitsch.',
  },
  hero: {
    badge: 'KI-Beratung',
    headline: 'KI für dein Produktteam nutzbar machen',
    subheadline:
      'Ich helfe Unternehmen, Claude Code, Codex und AI-native Workflows einzuführen. Damit Produktmanagement und Entwicklung den Sprung schaffen, ohne UX-Qualität oder Design-System-Konsistenz zu verlieren.',
    cta1Label: 'Gespräch starten',
    cta1Href: 'mailto:oliver@pitsch.me?subject=KI-Beratung%20Anfrage',
    cta2Label: 'So arbeite ich',
  },
  painPoints: {
    heading: 'Kommt dir das bekannt vor?',
    items: [
      {
        title: 'KI ist wichtig, aber wo anfangen?',
        description:
          'Dein Team weiß, dass KI die Softwareentwicklung verändern wird, aber es fehlt ein klarer Plan, was eingeführt werden soll, wo man beginnt und wie man Fortschritt misst.',
      },
      {
        title: 'Claude Code oder Codex, aber wie?',
        description:
          'Du willst Agentic-Coding-Tools nutzen, brauchst aber Unterstützung bei Setup, Workflows, Prompt Engineering und der Integration in deine bestehende CI/CD-Pipeline.',
      },
      {
        title: 'PMs und Devs brauchen neue Workflows',
        description:
          'Deine Produktmanager und Entwickler müssen den Übergang von klassischen Arbeitsweisen zu AI-nativer Produktentwicklung schaffen, und niemand in der Organisation hat das bisher gemacht.',
      },
      {
        title: 'UX-Qualität darf nicht leiden',
        description:
          'Du befürchtest, dass der Druck zur schnellen KI-Einführung dein Design System aushöhlt, die User Experience verschlechtert und Inkonsistenzen im Produkt erzeugt.',
      },
    ],
  },
  services: {
    heading: 'Mein Angebot',
    items: [
      {
        title: 'AI-Native Produktentwicklung',
        description:
          'Agentic-Coding-Tools einführen und die Art verändern, wie dein Engineering-Team Software baut.',
        bullets: [
          'Claude Code & Codex Adoptionsstrategie und praktisches Setup',
          'Agentic-Coding-Workflows für einzelne Entwickler und Teams',
          'Prompt Engineering und Kontextmanagement für besseren AI-Output',
          'Integration in bestehende CI/CD-, Code-Review- und Quality-Gate-Prozesse',
        ],
      },
      {
        title: 'AI-Natives Produktmanagement',
        description:
          'Die Rolle des Produktmanagements für das Zeitalter des AI-gestützten Bauens neu definieren.',
        bullets: [
          'KI-gestützte Spezifikation, Priorisierung und Planung',
          'PM-Workflows neu denken: von Tickets schreiben zu Agenten steuern',
          'Produktstrategie, wenn die Build-Geschwindigkeit sich verzehnfacht',
          'KI-getriebene Produktivitätsgewinne messen und kommunizieren',
        ],
      },
      {
        title: 'UX & Design-System-Bewahrung',
        description:
          'Designqualität und Konsistenz bewahren, während dein Team AI-gestützte Tools einführt.',
        bullets: [
          'Quality Gates für KI-generierten UI-Code',
          'Design Tokens und Component Libraries in AI-Workflows integrieren',
          'Barrierefreiheit und Markenkonsistenz bei agentic Output sicherstellen',
          'Review-Prozesse, die Drift erkennen, bevor er live geht',
        ],
      },
    ],
  },
  approach: {
    heading: 'So arbeiten wir zusammen',
    steps: [
      {
        number: '01',
        title: 'Discovery',
        description:
          'Wir analysieren deine aktuellen Workflows, deinen Tech Stack und deine Teamdynamik. Ich identifiziere, wo KI den größten Hebel bietet und wo die Risiken liegen.',
      },
      {
        number: '02',
        title: 'Implementierung',
        description:
          'Praxisnahe Workshops, Tool-Setup und Workflow-Redesign. Ich arbeite mit deinem Team: Pair-Building-Sessions, keine Folienschlachten.',
      },
      {
        number: '03',
        title: 'Enablement',
        description:
          'Teamtraining, Dokumentation und laufendes Sparring. Dein Team wird eigenständig. Ich messe den Impact und helfe dir, die Ergebnisse zu kommunizieren.',
      },
    ],
  },
  about: {
    heading: 'Warum ich',
    bio: 'Ich bringe 20 Jahre Erfahrung in Design, UX und Product Leadership mit. Ich habe ein AI-SaaS-Unternehmen gegründet (Reputami), Produkt und UX bei Trusted Shops geleitet und bin aktuell Head of Product bei Ordio. Ich habe famili.one, eine Familienorganisations-App, komplett als Solo-Builder ohne externe Entwicklung gebaut, durchgehend mit Claude Code und AI-Agenten. Ich berate nicht nur. Ich liefere jeden Tag echte Produkte mit diesen Tools aus.',
    credentials: [
      '20 Jahre Produkt & UX',
      'Head of Product bei Ordio',
      'famili.one solo mit AI gebaut',
      'AI-SaaS gegründet (Reputami)',
      'Director UX bei Trusted Shops',
    ],
    linkLabel: 'Mehr über mich →',
  },
  faq: {
    heading: 'Häufig gestellte Fragen',
    items: [
      {
        question: 'Was ist AI-native Produktentwicklung?',
        answer:
          'AI-native Produktentwicklung bedeutet, Software mit KI-Agenten als festen Bestandteilen des Delivery-Workflows zu bauen, nicht als nachträgliche Ergänzung. Entwickler nutzen Tools wie Claude Code und Codex zum Schreiben, Reviewen und Ausliefern von Code. Produktmanager steuern Agenten mit Kontext und Intention statt detaillierter Spezifikationen. Der gesamte Zyklus von der Idee zum ausgelieferten Feature komprimiert sich dramatisch.',
      },
      {
        question: 'Mit welchen Tools arbeitest du?',
        answer:
          'Ich arbeite hauptsächlich mit Claude Code und OpenAI Codex. Viele Teams nutzen bereits GitHub Copilot, das sich längst über Code-Completion hinaus entwickelt hat: Planning, Sub-Agents und Multi-File-Edits sind mittlerweile Teil des Angebots. Wenn dein Team schon auf Copilot setzt, ist das ein guter Startpunkt. Ich helfe, das Beste aus dem herauszuholen, was bereits da ist, und die Workflows mit Claude Code und Codex zu vertiefen, wo es Sinn ergibt. Die Beratung ist auf strategischer Ebene tool-agnostisch: Es geht um Workflows, Teamstruktur und Baukultur, nicht nur darum, welches Tool man wählt.',
      },
      {
        question: 'Wie lange dauert ein typisches Engagement?',
        answer:
          'Die meisten Engagements starten mit einer 2- bis 4-wöchigen Discovery- und Implementierungsphase. Laufendes Enablement und Sparring können je nach Teamgröße und Ambition 2 bis 3 Monate weitergehen. Ich biete auch fokussierte Einwochen-Intensivprogramme für Teams, die schnell vorankommen wollen.',
      },
      {
        question: 'Arbeitest du auch mit Teams ohne KI-Erfahrung?',
        answer:
          'Ja, und tatsächlich ist das oft der Bereich, in dem ich den größten Mehrwert schaffe. Ich helfe Teams, von null auf produktiv mit KI-Tools zu kommen, und baue Schritt für Schritt Vertrauen und Kompetenz auf. Der Schlüssel: mit echter Arbeit starten, nicht mit Spielprojekten.',
      },
      {
        question: 'Wie stellst du sicher, dass die UX-Qualität nicht leidet?',
        answer:
          'Ich bringe 20 Jahre UX- und Design-System-Erfahrung in jedes Engagement ein. Wir richten Quality Gates ein, integrieren deine Design Tokens in AI-Workflows und etablieren Review-Prozesse, die Inkonsistenzen abfangen, bevor sie bei den Nutzern ankommen. KI-Geschwindigkeit ohne UX-Qualität ist nur schnelleres Chaos.',
      },
      {
        question: 'Was kostet das?',
        answer:
          'Die Preise hängen von Umfang, Teamgröße und Engagement-Format ab. Ich biete Tagessätze für Workshops und Intensivprogramme sowie projektbasierte Preise für längere Engagements. Schreib mir und wir finden ein Modell, das passt.',
      },
    ],
  },
  cta: {
    badge: 'Kontakt',
    heading: 'Bereit, KI für dein Team einzusetzen?',
    body: 'Ob du gerade erst mit KI-Tools startest oder eine bestehende Einführung beschleunigen willst: Lass uns sprechen. Ich biete ein kostenloses 30-minütiges Discovery-Gespräch, um deine Situation zu verstehen und zu sehen, ob es passt.',
    emailLabel: 'Direkt per E-Mail',
    emailSubject: 'KI-Beratung%20Anfrage',
    linkedinLabel: 'Nachricht auf LinkedIn',
    legalNote: 'Formale Kontaktdaten gewünscht? Siehe',
    legalLinkLabel: 'Impressum und Kontaktinformationen',
  },
  footer: {
    imprintLabel: 'Impressum & Datenschutz',
    langSwitchLabel: 'Read in English →',
    langSwitchHref: '/ai-consulting',
  },
};
