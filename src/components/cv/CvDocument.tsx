import type { ReactNode } from 'react';
import { RiArrowRightUpLine, RiBriefcaseFill, RiLinkedinFill, RiMailFill } from 'react-icons/ri';
import Container from '@/components/layout/Container';
import PdfDownloadButton from '@/components/cv/PdfDownloadButton';
import { cv } from '@/lib/cv';
import { cvDe } from '@/lib/cv-de';
import type { Product } from '@/lib/products';
import type { ApplicationLanguage, PersonalizedCv } from '@/lib/applications/types';

const labels = {
  de: {
    experience: 'Berufserfahrung',
    about: 'Über mich',
    projects: 'Ausgewählte Projekte',
    strengths: 'Schwerpunkte',
    languages: 'Sprachen',
    contact: 'Kontakt',
    download: 'Lebenslauf als PDF herunterladen',
    downloading: 'PDF wird erstellt …',
    present: 'heute',
  },
  en: {
    experience: 'Work Experience',
    about: 'About me',
    projects: 'Selected work',
    strengths: 'What I do',
    languages: 'Languages',
    contact: 'Get in touch',
    download: 'Download CV as PDF',
    downloading: 'Generating PDF …',
    present: 'present',
  },
} as const;

function RailCard({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-line bg-surface-muted p-6 print:break-inside-avoid lg:pl-20 ${className}`}
    >
      {title && <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>}
      {children}
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] leading-6 text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContactLine({ icon, href, label }: { icon: ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-[15px] text-ink-muted transition-colors hover:text-accent"
    >
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
        {icon}
      </span>
      {label}
    </a>
  );
}

const mailIcon = <RiMailFill className="size-3" aria-hidden />;
const linkedinIcon = <RiLinkedinFill className="size-3" aria-hidden />;

const externalLinkClass =
  'group/external relative inline-flex items-center transition-colors hover:text-accent focus-visible:text-accent';

/** Fades in unblurred beside an external link on hover or keyboard focus. */
function ExternalLinkIcon() {
  return (
    <RiArrowRightUpLine
      className="absolute left-full ml-1 size-4 -translate-x-1 opacity-0 blur-[3px] transition-[opacity,filter,translate] duration-200 ease-out group-hover/external:translate-x-0 group-hover/external:opacity-100 group-hover/external:blur-none group-focus-visible/external:translate-x-0 group-focus-visible/external:opacity-100 group-focus-visible/external:blur-none motion-reduce:transition-none print:hidden"
      aria-hidden
    />
  );
}

export type CvDocumentProps = {
  profile: PersonalizedCv;
  company?: string;
  projects?: Product[];
  canonicalPath?: string;
  /** One-page PDF endpoint; the download button only renders when set. */
  pdfHref?: string;
  compact?: boolean;
  language?: ApplicationLanguage;
};

export default function CvDocument({
  profile,
  company,
  projects = [],
  canonicalPath = '/cv',
  pdfHref,
  compact = false,
  language = 'en',
}: CvDocumentProps) {
  const copy = labels[language];
  const contact = language === 'de' ? cvDe : cv;
  return (
    <Container size="wide" className={`max-sm:px-3 ${compact ? 'py-4' : 'py-10 print:px-0 print:py-0'}`}>
      <div className="cv-sheet grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(272px,0.85fr)] lg:items-start">
        <div className="cv-main space-y-6">
          <section className="cv-card relative z-10 rounded-3xl border border-line bg-surface p-5 shadow-card print:border-0 print:p-0 print:shadow-none sm:p-9">
            <header className="cv-letterhead">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center print:flex-row print:items-center">
                <picture className="shrink-0">
                  <source
                    media="(prefers-color-scheme: dark)"
                    srcSet="/images/oliver-pitsch-2025-dark.png"
                  />
                  <img
                    src="/images/oliver-pitsch-2025.png"
                    alt={cv.name}
                    className="size-24 rounded-full bg-accent-soft object-cover mix-blend-multiply dark:mix-blend-normal print:mix-blend-normal"
                  />
                </picture>
                <div className="min-w-0 flex-1">
                  <h1 className="text-[38px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[44px]">
                    {cv.name}
                  </h1>
                  <p className="mt-2 text-[18px] font-medium text-accent sm:text-[20px]">
                    {profile.headline}
                  </p>
                  {company && (
                    <p className="mt-3 max-w-2xl text-[14px] leading-6 text-ink-muted">
                      {profile.summary}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <ContactLine icon={mailIcon} href={`mailto:${cv.email}`} label={cv.email} />
                    <ContactLine
                      icon={linkedinIcon}
                      href={cv.linkedin}
                      label="linkedin.com/in/oliverpitsch"
                    />
                  </div>
                  <p className="mt-4 hidden text-[12px] text-ink-muted print:block">
                    {contact.location} · pitsch.me{canonicalPath}
                  </p>
                </div>
              </div>
            </header>

            <section
              className="cv-experience mt-8 border-t border-line pt-8"
              aria-labelledby="experience-heading"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid size-9 place-items-center rounded-xl bg-accent text-on-accent"
                  aria-hidden
                >
                  <RiBriefcaseFill className="size-5" aria-hidden />
                </span>
                <h2
                  id="experience-heading"
                  className="text-[24px] font-semibold tracking-[-0.02em] text-ink"
                >
                  {copy.experience}
                </h2>
              </div>

              <ol className="mt-8 space-y-9 pb-14 print:pb-0">
                {profile.roles.map((role) => {
                  const orgNote = role.orgNote && (
                    <span className="font-normal text-ink-muted"> ({role.orgNote})</span>
                  );
                  return (
                    <li
                      key={`${role.org}-${role.from}`}
                      className="group grid gap-x-5 gap-y-2 sm:grid-cols-[74px_1fr] print:break-inside-avoid"
                    >
                      <p className="pt-1 text-center text-[13px] font-medium leading-5 tabular-nums text-ink-muted sm:text-right print:text-right">
                        <span className="sm:block">{role.from}</span>
                        {role.to !== role.from && (
                          <span className="sm:block">{` – ${role.to === 'present' ? copy.present : role.to}`}</span>
                        )}
                      </p>
                      <div className="relative pb-1 pl-6">
                        <span
                          className="absolute bottom-0 left-0 top-0 w-px bg-line group-last:bottom-0 sm:-bottom-9"
                          aria-hidden
                        />
                        <span
                          className="absolute left-0 top-full hidden h-14 w-px bg-gradient-to-b from-line to-transparent group-last:block print:hidden"
                          aria-hidden
                        />
                        <span
                          className="absolute -left-[5px] top-[7px] size-[9px] rounded-full bg-accent ring-4 ring-surface print:ring-white"
                          aria-hidden
                        />
                        <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                          {role.href ? (
                            <a
                              href={role.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={externalLinkClass}
                            >
                              <span>
                                {role.org}
                                {orgNote}
                              </span>
                              <ExternalLinkIcon />
                            </a>
                          ) : (
                            <>
                              {role.org}
                              {orgNote}
                            </>
                          )}
                        </h3>
                        <p className="mt-1 text-[14px] font-medium text-accent">{role.title}</p>
                        <ul className="mt-3 space-y-2">
                          {role.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="relative pl-5 text-[15px] leading-7 text-ink-muted"
                            >
                              <span
                                className="absolute left-0 top-[13px] size-1.5 -translate-y-1/2 rounded-full bg-accent/60"
                                aria-hidden
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </section>
        </div>

        <aside className="cv-rail space-y-6 lg:-ml-14">
          <RailCard title={copy.about} className="cv-about">
            <div className="mt-4 space-y-3">
              {profile.about.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={`text-[14px] leading-6 ${index === 0 ? 'font-semibold text-ink' : 'text-ink-muted'}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </RailCard>

          {projects.length > 0 && (
            <RailCard title={copy.projects} className="cv-projects">
              <ul className="mt-4 space-y-4">
                {projects.map((project) => (
                  <li key={project.name}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${externalLinkClass} font-semibold text-ink`}
                    >
                      {project.name}
                      <ExternalLinkIcon />
                    </a>
                    <p className="mt-1 text-[13px] leading-5 text-ink-muted">{project.lead}</p>
                  </li>
                ))}
              </ul>
            </RailCard>
          )}

          <RailCard title={copy.strengths} className="cv-strengths">
            <ul className="mt-3 space-y-3">
              {profile.strengths.map((strength) => (
                <li key={strength.label} className="text-[13px] leading-6">
                  <span className="font-semibold text-ink">{strength.label}.</span>{' '}
                  <span className="text-ink-muted">{strength.detail}</span>
                </li>
              ))}
            </ul>
          </RailCard>

          <RailCard title={copy.languages} className="cv-languages">
            <Chips items={contact.languages} />
          </RailCard>
        </aside>
      </div>

      {pdfHref && (
        <div className="mt-8 flex justify-center print:hidden">
          <PdfDownloadButton href={pdfHref} label={copy.download} pendingLabel={copy.downloading} />
        </div>
      )}
    </Container>
  );
}
