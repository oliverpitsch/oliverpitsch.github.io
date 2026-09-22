import { cv, type Cv } from '@/lib/cv';

const roleTranslations: Record<string, Pick<Cv['roles'][number], 'title' | 'bullets'>> = {
  'AI Labs': {
    title: 'Head of Product & Engineering',
    bullets: [
      'Verantwortete Produktstrategie, UX und Frontend-Entwicklung für ein KI-natives SaaS-Produkt in enger Zusammenarbeit mit dem CEO und dem Backend Engineering.',
      'Übersetzte komplexe KI-Funktionen in klare User Journeys, Produktanforderungen und produktionsreife Interfaces.',
      'Etablierte KI-native Workflows mit Tools wie Claude Code und Codex, um Design, Entwicklung und Auslieferung zu beschleunigen.',
      'Brachte mit einem zweiköpfigen Produkt- und Engineering-Team innerhalb von acht Wochen ein marktreifes, wettbewerbsfähiges Produkt auf den Markt.',
    ],
  },
  Ordio: {
    title: 'Head of Product',
    bullets: [
      'Organisierte Produktmanagement und Produktentwicklung in enger Zusammenarbeit mit CEO und CTO für KI-native Produktentwicklung neu.',
      'Half dabei, Produktworkflows für eine Welt neu zu definieren, in der KI größere Teile der Umsetzung übernimmt, Übergaben reduziert und die Ausführung beschleunigt.',
      'Schuf ein stärkeres Designsystem-Verständnis für Agents, damit KI-generierte Ergebnisse mit Produktqualität, Mustern und Systemlogik übereinstimmen.',
    ],
  },
  'Famili.one & neuerName.com': {
    title: 'Founder, Product Maker & Solo Builder',
    bullets: [
      'Launchte zwei produktionsreife digitale Produkte mit KI-nativen Workflows und agentischen Tools und verantwortete eigenständig Produktstrategie, UX, Entwicklung, Lokalisierung, Zahlungen, sichere Datenverarbeitung, Positionierung und launchbereite Infrastruktur.',
    ],
  },
  'Joinride.cc': {
    title: 'Founder',
    bullets: [
      'Startete Joinride im Dezember 2022 als Hobbyprojekt, um die Organisation von Radsport-Gruppenfahrten zu vereinfachen, und entwickelte es zu einer der führenden Plattformen im deutschsprachigen Radsportmarkt.',
      'Entwickelte zunächst die Webplattform und erweiterte sie anschließend um eine iOS-App.',
    ],
  },
  'Trusted Shops': {
    title: 'Director UX & Product Marketing',
    bullets: [
      'Verantwortete UX und Product Marketing über mehr als zehn Produktteams in sechs Ländern für ein Portfolio mit über 35.000 Unternehmen und 45 Millionen Konsumentinnen und Konsumenten.',
      'Baute das Helios Design System auf und skalierte es, um Produkte durch gemeinsame Design- und Code-Bausteine zu vereinheitlichen.',
      'Verband Product Design, Content, Lokalisierung und Product Marketing zu einem konsistenteren und skalierbaren Product-Experience-Modell.',
    ],
  },
  Studitemps: {
    title: 'Senior UX Designer & COP Lead UX',
    bullets: [
      'Kam als erster UX Designer ins Unternehmen und etablierte UX-Prozesse in acht Produktteams.',
      'Baute das UX-Team mit auf und prägte dessen Entwicklung.',
    ],
  },
  Reputami: {
    title: 'Founder & Managing Director',
    bullets: [
      'Gründete eine SaaS-Plattform für Reputationsmanagement in der Hotellerie mit.',
      'Verantwortete Produktdesign und Entwicklung.',
      'Baute das Unternehmen bis zur Übernahme durch eKomi im Jahr 2015 auf.',
    ],
  },
};

export const cvDe: Cv = {
  ...cv,
  headline: 'KI-nativer Product Leader | Product Maker & Builder',
  location: 'Köln, Deutschland',
  summary:
    'Produkt- und Designleader mit mehr als 15 Jahren Erfahrung im Aufbau und in der Skalierung von B2B- und Consumer-Produkten, in der Entwicklung von Designorganisationen sowie an der Schnittstelle von UX, Produktstrategie, Technologie und Unternehmenszielen.',
  about: [
    'Ich bin Produkt- und Designleader aus Köln und verfüge über mehr als 15 Jahre Erfahrung im Aufbau und in der Skalierung von B2B- und Consumer-Produkten, in der Entwicklung von Designorganisationen sowie an der Schnittstelle von UX, Produktstrategie, Technologie und Unternehmenszielen.',
    'Bei Trusted Shops verantwortete ich UX, Designsysteme und Product Marketing über mehr als zehn Produktteams in sechs Ländern. Ich half dabei, UX als strategische Funktion zu etablieren, führte ein unternehmensweites Designsystem ein und unterstützte Produkte für mehr als 35.000 Unternehmen und 45 Millionen Konsumentinnen und Konsumenten in Europa.',
    'Zudem bringe ich direkte Erfahrung mit Software für die Hotellerie mit. Als Mitgründer von Reputami entwickelte ich eine Plattform für Reputationsmanagement mit Fokus auf Hotels und führte das Unternehmen bis zur Übernahme durch eKomi im Jahr 2015.',
    'Im Laufe meiner Karriere arbeitete ich eng mit Product, Engineering und Führungsteams zusammen, um Produktstrategie, Research- und Designprozesse, organisatorische Reife und Entscheidungsfindung zu verbessern. Mein Fokus liegt auf starken Teams, skalierbaren Systemen und einem relevanten Einfluss von Design und Research auf Produktentscheidungen.',
    'Neben meinen Führungsrollen entwickle ich weiterhin Produkte wie Joinride.cc, Famili.one und neuerName.com. So bleibe ich nah an praktischer Produktentwicklung, neuen Technologien und KI-gestützten Arbeitsweisen.',
  ],
  roles: cv.roles.map((role) => ({ ...role, ...roleTranslations[role.org] })),
  strengths: [
    {
      label: 'KI-native Produktentwicklung',
      detail:
        'Entwicklung und Auslieferung produktionsreifer Software mit agentischen Tools – von Strategie und UX bis zur Umsetzung in sehr kleinen Teams.',
    },
    {
      label: 'Product- und Design Leadership',
      detail:
        'Aufbau und Führung von Designorganisationen über mehrere Produktteams, Märkte und Disziplinen hinweg.',
    },
    {
      label: 'Designsysteme im großen Maßstab',
      detail:
        'Aufbau gemeinsamer Systeme, die Design und Code auch bei wachsenden Produktportfolios konsistent halten.',
    },
    {
      label: 'Zero to one',
      detail:
        'Produkte von der ersten Idee bis zum marktreifen Launch und ein Unternehmen von der Gründung bis zur Übernahme entwickeln.',
    },
  ],
  languages: ['Deutsch (Muttersprache)', 'Englisch (C2)'],
};
