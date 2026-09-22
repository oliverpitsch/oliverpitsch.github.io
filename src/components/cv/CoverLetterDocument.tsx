import Image from 'next/image';
import Container from '@/components/layout/Container';
import PdfDownloadButton from '@/components/cv/PdfDownloadButton';
import { cv } from '@/lib/cv';
import { cvDe } from '@/lib/cv-de';
import { formatLetterDate, splitLetter } from '@/lib/applications/letter';
import type { ApplicationLanguage } from '@/lib/applications/types';

type Props = {
  company: string;
  coverLetter: string | null;
  language: ApplicationLanguage;
  writtenAt: string;
  pdfHref?: string;
  compact?: boolean;
};

export default function CoverLetterDocument({
  company,
  coverLetter,
  language,
  writtenAt,
  pdfHref,
  compact = false,
}: Props) {
  const title = language === 'de' ? 'Anschreiben' : 'Cover Letter';
  const contact = language === 'de' ? cvDe : cv;
  const location = language === 'de' ? 'Köln' : 'Cologne';
  const date = formatLetterDate(writtenAt, language);
  const { subject, paragraphs } = splitLetter(coverLetter);
  const empty =
    language === 'de'
      ? 'Für diese Bewerbung ist noch kein Anschreiben hinterlegt.'
      : 'No cover letter has been added for this application yet.';
  const downloadLabel =
    language === 'de' ? 'Anschreiben als PDF herunterladen' : 'Download cover letter as PDF';
  const downloadingLabel = language === 'de' ? 'PDF wird erstellt …' : 'Generating PDF …';

  return (
    <Container size="wide" className={compact ? 'py-4' : 'py-10 print:px-0 print:py-0'}>
      <div className="letter-stage px-3 pb-3 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12 print:p-0">
        <article
          aria-labelledby="cover-letter-title"
          className="letter-sheet mx-auto aspect-[210/297] w-full max-w-[210mm] bg-white px-6 py-8 text-[#1e293b] shadow-[0_1px_1px_rgba(15,23,42,0.08),0_4px_12px_-2px_rgba(15,23,42,0.12),0_30px_64px_-24px_rgba(15,23,42,0.34)] ring-1 ring-black/[0.04] sm:px-12 sm:py-12 lg:px-[20mm] lg:py-[18mm] print:max-w-none print:shadow-none print:ring-0"
        >
          <h1 id="cover-letter-title" className="sr-only">
            {title}
          </h1>

          <header className="letter-letterhead flex flex-col gap-6 border-b-2 border-[#4f46e5] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-balance text-[24px] font-semibold tracking-[-0.035em] text-[#172033]">
                {cv.name}
              </p>
              <p className="mt-1 max-w-sm text-pretty text-[13px] leading-5 text-[#5d6d84]">
                {contact.headline}
              </p>
            </div>
            <address className="not-italic text-[12px] leading-[1.65] text-[#5d6d84] sm:text-right">
              <p>{contact.location}</p>
              <p>{contact.phone}</p>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p>
                <a href={contact.linkedin}>linkedin.com/in/oliverpitsch</a>
              </p>
            </address>
          </header>

          <div className="letter-meta mt-10 grid gap-6 text-[13px] leading-6 text-[#5d6d84] sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-semibold text-[#1e293b]">{company}</p>
            </div>
            <p className="tabular-nums sm:text-right">
              {location}, {date}
            </p>
          </div>

          <div className="letter-body mt-10 text-pretty text-[15px] leading-[1.72] text-[#334155]">
            {coverLetter ? (
              <>
                {subject && (
                  <p className="text-balance text-[17px] font-semibold leading-7 text-[#172033]">
                    {subject}
                  </p>
                )}
                <div className={subject ? 'mt-8 space-y-5' : 'space-y-5'}>
                  {paragraphs.map((paragraph, index) => (
                    <p key={`${index}-${paragraph.slice(0, 32)}`} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <p>{empty}</p>
            )}
          </div>

          {coverLetter && (
            <footer className="letter-signature mt-7 break-inside-avoid">
              <Image
                src="/images/signature.png"
                alt=""
                width={184}
                height={156}
                className="h-auto w-28 opacity-80 [filter:brightness(0)_saturate(100%)]"
              />
              <p className="-mt-2 text-[14px] font-semibold text-[#1e293b]">{cv.name}</p>
            </footer>
          )}
        </article>
      </div>

      {pdfHref && coverLetter && (
        <div className="mt-8 flex justify-center print:hidden">
          <PdfDownloadButton href={pdfHref} label={downloadLabel} pendingLabel={downloadingLabel} />
        </div>
      )}
    </Container>
  );
}
