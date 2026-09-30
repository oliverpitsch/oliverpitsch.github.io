import { cv } from '@/lib/cv';
import type { ApplicationLanguage } from './types';

export function formatLetterDate(value: string, language: ApplicationLanguage) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Berlin',
  }).format(date);
}

/** Splits a stored letter into an optional subject line and body paragraphs, minus the trailing name. */
export function splitLetter(value: string | null) {
  const paragraphs = value
    ? value
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];
  const greetingPattern = /^(dear|hello|hi|hallo|liebe|lieber|sehr geehrte)/i;
  const subject =
    paragraphs[0] && !greetingPattern.test(paragraphs[0]) ? paragraphs.shift()! : null;

  const lastParagraph = paragraphs.at(-1);
  if (lastParagraph) {
    const withoutName = lastParagraph
      .replace(new RegExp(`(?:\\n|^)${cv.name.replace(' ', '\\s+')}$`, 'i'), '')
      .trim();
    if (withoutName) paragraphs[paragraphs.length - 1] = withoutName;
    else paragraphs.pop();
  }

  return { subject, paragraphs };
}
