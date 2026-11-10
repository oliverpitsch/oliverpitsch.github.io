import { cv, type Cv } from '@/lib/cv';

/**
 * Localized, not translated: German CVs keep established English job titles,
 * but the prose is written the way a German reader expects it.
 */
const roleTranslations: Record<
  string,
  Pick<Cv['roles'][number], 'title' | 'bullets' | 'orgNote'>
> = {
  'Pitsch Studios': {
    orgNote: 'parallel',
    title: 'Gründer, Product Leader & Builder',
    bullets: [
      'Entwickle und betreibe ein Portfolio digitaler Produkte, darunter Joinride.cc, Famili.one, neuerName.com und Onefold.me, von der Problemdefinition und Positionierung über UX, visuelles Design und Entwicklung bis zu Launch und Wachstum.',
      'Nutze diese Produkte als Labor dafür, wie agentische KI Produktmanagement, Design und Engineering verändert, und bringe die Workflows, die sich bewähren, zurück in die Teams, die ich führe.',
    ],
  },
  'AI Labs': {
    title: 'Head of Product & Engineering',
    bullets: [
      'Verantwortete Produktstrategie, UX und Frontend-Entwicklung für ein KI-natives Enterprise-SaaS-Produkt, in enger Zusammenarbeit mit dem CEO und unserem Engineering Lead.',
      'Überführte komplexe KI-Funktionen in verständliche User Journeys, klare Produktanforderungen und produktionsreife Oberflächen.',
      'Etablierte KI-native Workflows mit Claude Code und Codex über Design, Entwicklung und Delivery hinweg.',
      'Brachte das Produkt in acht Wochen von null zur Marktreife, gemeinsam mit einem Engineering Lead und einem Team aus KI-Agenten.',
    ],
  },
  Ordio: {
    title: 'Head of Product',
    bullets: [
      'Richtete gemeinsam mit CEO und CTO Produktmanagement und Produktentwicklung neu auf KI-native Produktarbeit aus.',
      'Entwickelte Workflows für eine Arbeitsweise weiter, in der KI größere Teile der Umsetzung übernimmt. Dadurch reduzierten wir Übergaben und erhöhten die Umsetzungsgeschwindigkeit.',
      'Machte das Designsystem agent-ready, damit KI-generierte Ergebnisse den Qualitätsstandards, Mustern und der Logik des Produkts entsprechen.',
    ],
  },
  'Trusted Shops': {
    title: 'Director UX & Product Marketing',
    bullets: [
      'Berichtete fast acht Jahre direkt an den CPO und gestaltete gemeinsam mit meinen Peers aus Produktmanagement und Engineering eine durchgängige Produktstrategie.',
      'Verantwortete UX und Product Marketing für mehr als zehn Produktteams in sechs Ländern und ein Portfolio, das über 35.000 Unternehmen und 45 Millionen Verbraucherinnen und Verbraucher erreicht.',
      'Baute die Produktorganisation gemeinsam mit meinen Peers auf. Product Design, Content, Lokalisierung und Product Marketing arbeiteten eingebettet in cross-funktionalen Squads, nicht als Servicefunktion.',
      'Brachte das neue Produkt- und Shopbewertungssystem vom Konzept bis in den Markt. Ich verantwortete Product Design und UX end-to-end, meine Teams bauten und lieferten es Seite an Seite mit Produktmanagement und Engineering.',
      'Baute die Designsystem-Familie Helios auf und skalierte sie über Produkte, Kanäle und Touchpoints hinweg, als gemeinsame Grundlage in Design und Code.',
    ],
  },
  Studitemps: {
    orgNote: 'heute jobvalley',
    title: 'Senior UX Designer & COP Lead UX',
    bullets: [
      'Kam als erster UX-Designer ins Unternehmen und etablierte UX-Prozesse in acht Produktteams.',
      'Stellte das UX-Team ein, baute es auf und führte UX als Community of Practice über die gesamte Produktorganisation.',
    ],
  },
  Reputami: {
    title: 'Gründer & Geschäftsführer',
    bullets: [
      'Gründete gemeinsam mit einem Partner ein SaaS-Unternehmen für Reputationsmanagement in der Hotellerie.',
      'Verantwortete Produktdesign und Produktentwicklung.',
      'Führte das Unternehmen bis zur Übernahme durch eKomi im Jahr 2015.',
    ],
  },
};

export const cvDe: Cv = {
  ...cv,
  headline: 'Product & Design Leader | Von der Strategie bis in den Markt, mit Teams und KI',
  location: 'Köln, Deutschland',
  summary:
    'Product- und Design-Leader mit 15 Jahren Erfahrung darin, komplexe B2B- und Consumer-Produkte von der Strategie bis in den Markt zu bringen. Partner für CPOs und VPs of Product, Aufbau internationaler UX- und Design-Teams und hands-on mit KI.',
  about: [
    'Ich bin Product- und Design-Leader aus Köln und bringe seit 15 Jahren komplexe B2B- und Consumer-Produkte von der Strategie bis in den Markt. Ich arbeite Hand in Hand mit CPOs und VPs of Product an der Produktstrategie und führe die Teams, die sie über UX, Product Design und Umsetzung in den Markt tragen.',
    'Bei Trusted Shops berichtete ich fast acht Jahre an den CPO und verantwortete UX, Designsysteme und Product Marketing für mehr als zehn Produktteams in sechs Ländern. Die Produkte erreichen über 35.000 Unternehmen und 45 Millionen Verbraucherinnen und Verbraucher. Gemeinsam mit meinen Peers aus Produktmanagement und Engineering baute ich die Produktorganisation als Ganzes auf, nicht nur meine eigenen Teams. Zuvor gründete ich Reputami mit und führte das Unternehmen bis zur Übernahme durch eKomi.',
    'Zuletzt brachte ich als Head of Product & Engineering bei AI Labs ein Enterprise-Produkt in acht Wochen von null zur Marktreife, mit einem Engineering Lead und einem Team aus KI-Agenten. Ich gestalte und baue weiterhin selbst Produkte und lerne daran aus erster Hand, wie Agenten die Produktarbeit verändern. Designsysteme, die Agenten verstehen, stehen dabei im Mittelpunkt.',
  ],
  roles: cv.roles.map((role) => ({ ...role, ...roleTranslations[role.org] })),
  strengths: [
    {
      label: 'Partner für die Produktführung',
      detail:
        'Ich gestalte Produktstrategie Hand in Hand mit CPOs, VPs of Product und CEOs und verbinde sie mit UX, Product Design, Technologie und Geschäftszielen komplexer B2B- und Consumer-Plattformen.',
    },
    {
      label: 'Teams aufbauen und führen',
      detail:
        'Ich baue und führe UX-, Design-, Content- und Product-Marketing-Teams über mehr als zehn Produktteams in sechs Ländern, eingebettet in cross-funktionale Squads mit Produktmanagement und Engineering.',
    },
    {
      label: 'Designsysteme für Menschen und Agenten',
      detail:
        'Ich baue Designsystem-Familien über Produkte, Kanäle und Touchpoints hinweg und mache sie agent-ready, damit KI-generierte Ergebnisse markentreu und qualitativ stimmig bleiben.',
    },
    {
      label: 'KI-native Produktentwicklung',
      detail:
        'Ich konzipiere und entwickle produktionsreife Software mit agentischer KI, Context Engineering und Rapid Prototyping und verbinde KI-Strategie auf Führungsebene mit eigener, hands-on Produktentwicklung.',
    },
  ],
  languages: ['Deutsch: Muttersprache', 'Englisch: Verhandlungssicher, C2'],
};
