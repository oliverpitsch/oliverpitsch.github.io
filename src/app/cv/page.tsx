import type { ReactNode } from 'react';
import { RiArrowRightFill, RiBriefcaseFill, RiMailFill } from 'react-icons/ri';
import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';
import PrintButton from '@/components/cv/PrintButton';
import { cv } from '@/lib/cv';

const siteUrl = 'https://pitsch.me';

export const metadata = {
  title: 'CV – Oliver Pitsch',
  description: cv.summary,
  alternates: { canonical: '/cv' },
  keywords: [
    'Oliver Pitsch',
    'CV',
    'resume',
    'product leader',
    'UX leadership',
    'design systems',
    'AI-native product',
  ],
  openGraph: {
    type: 'profile',
    url: '/cv',
    title: 'CV – Oliver Pitsch',
    description: cv.summary,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV – Oliver Pitsch',
    description: cv.summary,
  },
};

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

/** Auto-width tags, not full-width pills: nothing here is clickable. */
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
const linkIcon = <RiArrowRightFill className="size-3" aria-hidden />;

export default function CvPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteUrl}/cv`,
    mainEntity: {
      '@type': 'Person',
      name: cv.name,
      jobTitle: cv.headline,
      description: cv.summary,
      email: `mailto:${cv.email}`,
      telephone: cv.phone,
      url: siteUrl,
      image: `${siteUrl}/images/oliver-pitsch-2025.png`,
      address: { '@type': 'PostalAddress', addressLocality: 'Cologne', addressCountry: 'DE' },
      sameAs: [cv.linkedin, 'https://oliverpitsch.medium.com/'],
      knowsAbout: cv.strengths.map((strength) => strength.label),
      worksFor: {
        '@type': 'Organization',
        name: cv.roles[0].org,
      },
      hasOccupation: cv.roles.map((role) => ({
        '@type': 'Occupation',
        name: role.title,
        occupationLocation: { '@type': 'Organization', name: role.org },
      })),
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="wide" className="py-10 print:px-0 print:py-0">
        <div className="cv-sheet grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(272px,0.85fr)] lg:items-start">
          {/* ---------- Main column ---------- */}
          <div className="cv-main space-y-6">
            <section className="cv-card relative z-10 rounded-3xl border border-line bg-surface p-7 shadow-card print:border-0 print:p-0 print:shadow-none sm:p-9">
              <header className="cv-letterhead">
                <div className="flex flex-wrap items-center gap-5">
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
                  <div className="min-w-0">
                    <h1 className="text-[38px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[44px]">
                      {cv.name}
                    </h1>
                    <p className="mt-2 text-[18px] font-medium text-accent sm:text-[20px]">
                      {cv.headline}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <ContactLine icon={mailIcon} href={`mailto:${cv.email}`} label={cv.email} />
                    </div>
                    <p className="mt-4 hidden text-[12px] text-ink-muted print:block">
                      {cv.location} · pitsch.me/cv
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
                    Work Experience
                  </h2>
                </div>

                <ol className="mt-8 space-y-9 pb-14 print:pb-0">
                  {cv.roles.map((role) => (
                    <li
                      key={`${role.org}-${role.from}`}
                      className="group grid gap-x-5 gap-y-2 sm:grid-cols-[74px_1fr] print:break-inside-avoid"
                    >
                      <p className="pt-1 text-[13px] font-medium leading-5 tabular-nums text-ink-muted sm:text-right">
                        <span className="sm:block">{role.from}</span>
                        {role.to !== role.from && (
                          <span className="sm:block">{` – ${role.to}`}</span>
                        )}
                      </p>

                      <div className="relative pb-1 pl-6">
                        {/* Runs past the card into the gap so one rail threads
                          every role; the last entry stops at its own bullets. */}
                        <span
                          className="absolute bottom-0 left-0 top-0 w-px bg-line group-last:bottom-0 sm:-bottom-9"
                          aria-hidden
                        />
                        {/* Past the earliest role the rail keeps going and fades:
                          the career starts before what this page lists. */}
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
                              className="decoration-accent/40 underline-offset-4 hover:underline"
                            >
                              {role.org}
                            </a>
                          ) : (
                            role.org
                          )}
                          {role.orgNote && (
                            <span className="font-normal text-ink-muted"> ({role.orgNote})</span>
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
                  ))}
                </ol>
              </section>
            </section>
          </div>

          {/* ---------- Rail ---------- */}
          <aside className="cv-rail space-y-6 lg:-ml-14">
            <RailCard title="About me" className="cv-about">
              <div className="mt-4 space-y-3">
                {cv.about.map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={`text-[14px] leading-6 ${i === 0 ? 'font-semibold text-ink' : 'text-ink-muted'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </RailCard>

            <RailCard title="What I do" className="cv-strengths">
              <ul className="mt-3 space-y-3">
                {cv.strengths.map((strength) => (
                  <li key={strength.label} className="text-[13px] leading-6">
                    <span className="font-semibold text-ink">{strength.label}.</span>{' '}
                    <span className="text-ink-muted">{strength.detail}</span>
                  </li>
                ))}
              </ul>
            </RailCard>

            <RailCard title="Languages" className="cv-languages">
              <Chips items={cv.languages} />
            </RailCard>

            <RailCard className="cv-contact text-center">
              <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                Get in touch
              </h2>
              <div className="mt-4 flex flex-col items-center gap-3">
                <ContactLine icon={linkIcon} href={`mailto:${cv.email}`} label={cv.email} />
                <ContactLine
                  icon={linkIcon}
                  href={cv.linkedin}
                  label="linkedin.com/in/oliverpitsch"
                />
              </div>
            </RailCard>
          </aside>
        </div>

        <div className="mt-8 flex justify-center print:hidden">
          <PrintButton />
        </div>
      </Container>
    </PageShell>
  );
}
