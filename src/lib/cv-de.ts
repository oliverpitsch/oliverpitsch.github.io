import { cv, type Cv } from '@/lib/cv';

/**
 * Localized, not translated: German CVs keep established English job titles,
 * but the prose is written the way a German reader expects it.
 */
const roleTranslations: Record<
  string,
  Pick<Cv['roles'][number], 'title' | 'bullets' | 'orgNote'>
> = {
  'AI Labs': {
    title: 'Head of Product & Engineering',
    bullets: [
      'Verantwortete Produktstrategie, UX und Frontend-Entwicklung für ein KI-natives SaaS-Produkt, in enger Zusammenarbeit mit CEO und Backend Engineering.',
      'Überführte komplexe KI-Funktionen in verständliche User Journeys, klare Produktanforderungen und produktionsreife Oberflächen.',
      'Etablierte KI-native Workflows mit Claude Code und Codex und beschleunigte damit Design, Entwicklung und Umsetzung.',
      'Brachte mit einem zweiköpfigen Produkt- und Entwicklungsteam innerhalb von acht Wochen ein marktreifes und wettbewerbsfähiges Produkt auf den Markt.',
    ],
  },
  Ordio: {
    title: 'Head of Product',
    bullets: [
      'Richtete gemeinsam mit CEO und CTO Produktmanagement und Produktentwicklung neu auf KI-native Produktarbeit aus.',
      'Entwickelte Workflows für eine Arbeitsweise weiter, in der KI größere Teile der Umsetzung übernimmt. Dadurch reduzierten wir Übergaben und erhöhten die Umsetzungsgeschwindigkeit.',
      'Verankerte das Designsystem stärker im Arbeitskontext der KI-Agenten, damit generierte Ergebnisse den Qualitätsstandards, Mustern und der Logik des Produkts entsprechen.',
    ],
  },
  'Trusted Shops': {
    title: 'Director UX & Product Marketing',
    bullets: [
      'Verantwortete UX und Product Marketing für mehr als zehn Produktteams in sechs Ländern und ein Portfolio, das über 35.000 Unternehmen und 45 Millionen Verbraucherinnen und Verbraucher erreicht.',
      'Baute das Designsystem Helios auf und skalierte es zu einer gemeinsamen Grundlage für Design und technische Umsetzung über mehrere Produkte hinweg.',
      'Verband Product Design, Content, Lokalisierung und Product Marketing zu einem konsistenten und skalierbaren Ansatz für die gesamte Produkterfahrung.',
    ],
  },
  Studitemps: {
    orgNote: 'heute jobvalley',
    title: 'Senior UX Designer & COP Lead UX',
    bullets: [
      'Kam als erster UX-Designer ins Unternehmen und etablierte UX-Prozesse in acht Produktteams.',
      'Baute das UX-Team mit auf und prägte dessen fachliche Entwicklung.',
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
  'Pitsch Studios': {
    title: 'Gründer, Product Leader & Builder',
    bullets: [
      'Entwickle und betreibe ein Portfolio digitaler Produkte, darunter Joinride.cc, Famili.one, neuerName.com und Onefold.me. Ich begleite sie von der Problemdefinition und Positionierung über UX, visuelles Design und Entwicklung bis zum Launch und zur kontinuierlichen Weiterentwicklung.',
      'Nutze diese Produkte als praktisches Experimentierfeld, um zu untersuchen, wie agentische KI Produktmanagement, Design, Softwareentwicklung und kreative Arbeit verändert, und überführe die Erkenntnisse in praxistaugliche, wiederholbare Workflows.',
    ],
  },
};

export const cvDe: Cv = {
  ...cv,
  headline: 'Product Leader für KI-native Produkte | Strategisch und hands-on',
  location: 'Köln, Deutschland',
  summary:
    'Product- und Design-Leader aus Köln mit mehr als 15 Jahren Erfahrung in komplexen B2B- und Consumer-Produkten. Verbindet Produktstrategie, UX und Technologie mit Wachstum und konkreten Geschäftszielen.',
  about: [
    'Ich bin Product- und Design-Leader aus Köln und entwickle seit mehr als 15 Jahren komplexe B2B- und Consumer-Produkte. Dabei verbinde ich Produktstrategie, UX und Technologie mit Wachstum und konkreten Geschäftszielen und habe internationale Teams und Organisationen geführt.',
    'Bei Trusted Shops verantwortete ich UX, Designsysteme und Product Marketing für mehr als zehn Produktteams in sechs Ländern. Die von uns entwickelten Produkte werden von über 35.000 Unternehmen und 45 Millionen Verbraucherinnen und Verbrauchern genutzt. Zuvor gründete ich die B2B-SaaS-Plattform Reputami mit und führte sie bis zur Übernahme durch eKomi. Zuletzt verband ich als Head of Product & Engineering bei AI Labs Produkt- und KI-Strategie mit eigener Entwicklungsarbeit in einem schnelllebigen Umfeld.',
    'Auch in Führungsrollen arbeite ich weiterhin hands-on: Ich konzipiere, gestalte, prototypisiere und entwickle digitale Produkte selbst. Meine Arbeit reicht von agentischer KI, Context Engineering und KI-gestützter Discovery über Product Operating Models, Portfoliostrategie und User Research bis hin zu APIs, Integrationen und Go-to-Market. So kann ich eine ambitionierte Produktvision entwickeln und gleichzeitig nah an Nutzenden, Daten, Technologie und Umsetzung bleiben.',
  ],
  roles: cv.roles.map((role) => ({ ...role, ...roleTranslations[role.org] })),
  strengths: [
    {
      label: 'Produkt-, Plattform- und Organisationsführung',
      detail:
        'Ich entwickle Portfoliostrategien, Product Operating Models, Roadmaps und Kennzahlensysteme für mehrere Produktteams, Märkte und Fachbereiche. Dabei verbinde ich Customer Experience, Technologie und Wachstum mit den Geschäftszielen komplexer B2B- und Consumer-Plattformen.',
    },
    {
      label: 'KI-native Produktentwicklung',
      detail:
        'Ich konzipiere und entwickle produktionsreife Software mit agentischer KI, Orchestrierung, Retrieval, Context Engineering, Rapid Prototyping und systematischer Evaluation. Dabei verbinde ich KI-Strategie auf Führungsebene mit eigener, hands-on Produktentwicklung.',
    },
    {
      label: 'Von der Idee zur Skalierung',
      detail:
        'Ich begleite Produkte von der ersten Idee über Discovery, Launch und Wachstum bis zur operativen Skalierung. Dazu gehören der Aufbau von Teams, Systemen und Qualitätsstandards ebenso wie meine Erfahrung als Gründer eines B2B-SaaS-Unternehmens, das erfolgreich übernommen wurde.',
    },
  ],
  languages: ['Deutsch: Muttersprache', 'Englisch: Verhandlungssicher, C2'],
};
