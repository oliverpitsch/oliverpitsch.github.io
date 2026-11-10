import { cv, legacyBulletText, legacyStrengthLabels, type Cv } from '@/lib/cv';
import { cvDe } from '@/lib/cv-de';
import { products } from '@/lib/products';
import type { Application, PersonalizedCv } from './types';

export function mergeCv(application: Application, master?: Cv): PersonalizedCv {
  const localizedMaster = master ?? (application.language === 'de' ? cvDe : cv);
  const overrides = new Map(
    application.experienceOverrides.map((override) => [override.org, override]),
  );

  const roles = localizedMaster.roles
    .map((role, masterIndex) => {
      const override = overrides.get(role.org);
      if (override?.hidden) return null;

      const selected = override?.selectedHighlights;
      const canonicalRole = cv.roles.find((item) => item.org === role.org);
      const picked = selected
        ?.map((bullet) => canonicalRole?.bullets.indexOf(legacyBulletText[bullet] ?? bullet) ?? -1)
        .filter((index) => index >= 0)
        .map((index) => role.bullets[index])
        .filter(Boolean);
      // Saved selections reference bullet text verbatim. If the master CV was
      // reworded since, none may match; fall back to the full role.
      const bullets = picked?.length ? picked : role.bullets;

      return {
        role: {
          ...role,
          bullets: override?.summary?.trim() ? [override.summary.trim(), ...bullets] : bullets,
        },
        priority: override?.priority ?? masterIndex,
        masterIndex,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .sort((a, b) => a.priority - b.priority || a.masterIndex - b.masterIndex)
    .map(({ role }) => role);

  const pickedSkills = application.skills.length
    ? application.skills
        .map((label) => legacyStrengthLabels[label] ?? label)
        .map((label) => cv.strengths.findIndex((strength) => strength.label === label))
        .filter((index) => index >= 0)
        .map((index) => localizedMaster.strengths[index])
        .filter((strength): strength is NonNullable<typeof strength> => Boolean(strength))
    : localizedMaster.strengths;
  const selectedSkills = pickedSkills.length ? pickedSkills : localizedMaster.strengths;

  return {
    headline: application.headline || localizedMaster.headline,
    summary: application.intro || localizedMaster.summary,
    about: application.about
      ? application.about
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : localizedMaster.about,
    roles,
    strengths: selectedSkills,
  };
}

const germanProjectLeads: Record<string, string> = {
  'Joinride.cc':
    'Eine Plattform, über die Menschen gemeinsame Radsport- und Laufaktivitäten entdecken, organisieren und miteinander erleben können.',
  'Famili.one':
    'Ein digitaler Familienorganizer, der Termine, Aufgaben, Dokumente und Verantwortlichkeiten an einem Ort zusammenführt und Care-Arbeit sichtbarer macht.',
  'neuerName.com': 'Ein Werkzeug für den organisatorischen Aufwand einer Namensänderung.',
};

export function getHighlightedProjects(slugs: string[], language: Application['language'] = 'en') {
  if (!slugs.length) return [];
  return slugs
    .map((name) => products.find((product) => product.name === name))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .map((product) =>
      language === 'de'
        ? { ...product, lead: germanProjectLeads[product.name] ?? product.lead }
        : product,
    );
}
