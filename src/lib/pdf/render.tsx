import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { ReactElement } from 'react';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import { cv } from '@/lib/cv';
import { cvDe } from '@/lib/cv-de';
import { getHighlightedProjects, mergeCv } from '@/lib/applications/merge';
import type { Application, ApplicationLanguage } from '@/lib/applications/types';
import { CoverLetterPdf, CvPdf, type PdfAssets } from './documents';

const root = process.cwd();
const fontFile = (file: string) => path.join(root, 'src', 'assets', 'og', file);

Font.register({
  family: 'Geist',
  fonts: [
    { src: fontFile('Geist-Regular.ttf'), fontWeight: 400 },
    { src: fontFile('Geist-Medium.ttf'), fontWeight: 500 },
    { src: fontFile('Geist-SemiBold.ttf'), fontWeight: 600 },
  ],
});
/* Default hyphenation is English-only and mangles German compounds. */
Font.registerHyphenationCallback((word) => [word]);

let assets: PdfAssets | undefined;
function loadAssets() {
  assets ??= {
    portrait: fs.readFileSync(path.join(root, 'src', 'assets', 'pdf', 'portrait.png')),
    signature: fs.readFileSync(path.join(root, 'public', 'images', 'signature.png')),
  };
  return assets;
}

function pageCount(pdf: Buffer) {
  const match = /\/Type \/Pages[^>]*?\/Count (\d+)/.exec(pdf.toString('latin1'));
  return match ? Number(match[1]) : 1;
}

/** Renders at full scale, then steps type and spacing down until everything fits on one A4 page. */
async function renderOnePage(build: (scale: number) => ReactElement) {
  let pdf: Buffer | undefined;
  for (let scale = 1; scale >= 0.7; scale -= 0.04) {
    pdf = await renderToBuffer(build(scale) as Parameters<typeof renderToBuffer>[0]);
    if (pageCount(pdf) === 1) break;
  }
  return pdf!;
}

export type PdfDocumentKind = 'cv' | 'cover-letter';

export function pdfFilename(kind: PdfDocumentKind, language: ApplicationLanguage) {
  const label =
    kind === 'cv'
      ? language === 'de'
        ? 'Lebenslauf'
        : 'CV'
      : language === 'de'
        ? 'Anschreiben'
        : 'Cover Letter';
  return `${label} ${cv.name}.pdf`;
}

export function pdfResponse(pdf: Buffer, filename: string, cacheControl = 'private, no-store') {
  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': cacheControl,
    },
  });
}

export function renderMasterCvPdf() {
  return renderOnePage((scale) => (
    <CvPdf
      profile={{
        headline: cv.headline,
        summary: cv.summary,
        about: cv.about,
        roles: cv.roles,
        strengths: cv.strengths,
      }}
      assets={loadAssets()}
      scale={scale}
    />
  ));
}

export function renderApplicationPdf(application: Application, kind: PdfDocumentKind) {
  const profile = mergeCv(application);
  if (kind === 'cv') {
    const projects = getHighlightedProjects(application.highlightedProjects, application.language);
    return renderOnePage((scale) => (
      <CvPdf
        profile={profile}
        projects={projects}
        language={application.language}
        assets={loadAssets()}
        scale={scale}
      />
    ));
  }
  return renderOnePage((scale) => (
    <CoverLetterPdf
      company={application.company}
      coverLetter={application.coverLetter}
      writtenAt={application.updatedAt.toISOString()}
      language={application.language}
      headline={(application.language === 'de' ? cvDe : cv).headline}
      assets={loadAssets()}
      scale={scale}
    />
  ));
}

export function isPdfDocumentKind(value: string): value is PdfDocumentKind {
  return value === 'cv' || value === 'cover-letter';
}
