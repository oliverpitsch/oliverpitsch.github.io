import type { ReactNode } from 'react';
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
      className={`rounded-3xl border border-line bg-surface-muted p-6 print:break-inside-avoid ${className}`}
    >
      {title && (
        <h2 className="text-center text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h2>
      )}
      {children}
    </section>
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

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden>
    <path
      d="M3 7l9 6 9-6M3 6h18v12H3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const phoneIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3" aria-hidden>
    <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.57 3.6a1 1 0 01-.25 1z" />
  </svg>
);
const linkIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="size-3" aria-hidden>
    <path
      d="M5 12h14m-6-6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      knowsAbout: cv.strengths,
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
            <header className="cv-letterhead rounded-3xl border border-line bg-surface p-7 shadow-card print:border-0 print:p-0 print:shadow-none sm:p-9">
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
                    <ContactLine
                      icon={phoneIcon}
                      href={`tel:${cv.phone.replace(/\s/g, '')}`}
                      label={cv.phone}
                    />
                    <ContactLine icon={mailIcon} href={`mailto:${cv.email}`} label={cv.email} />
                  </div>
                  <p className="mt-4 hidden text-[12px] text-ink-muted print:block">
                    {cv.location} · pitsch.me/cv
                  </p>
                </div>
              </div>
              <div className="mt-6 print:hidden">
                <PrintButton />
              </div>
            </header>

            <section
              className="cv-experience rounded-3xl border border-line bg-surface p-7 shadow-card print:border-0 print:p-0 print:shadow-none sm:p-9"
              aria-labelledby="experience-heading"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid size-9 place-items-center rounded-xl bg-accent text-on-accent"
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-5">
                    <path
                      d="M3 8h18v11H3zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2
                  id="experience-heading"
                  className="text-[24px] font-semibold tracking-[-0.02em] text-ink"
                >
                  Work Experience
                </h2>
              </div>

              <ol className="mt-8 space-y-9">
                {cv.roles.map((role) => (
                  <li
                    key={`${role.org}-${role.from}`}
                    className="grid gap-x-5 gap-y-2 sm:grid-cols-[74px_1fr] print:break-inside-avoid"
                  >
                    <p className="pt-1 text-[13px] font-medium leading-5 tabular-nums text-ink-muted sm:text-right">
                      <span className="sm:block">{role.from}</span>
                      <span className="sm:block">{` – ${role.to}`}</span>
                    </p>

                    <div className="relative border-l border-line pb-1 pl-6">
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
          </div>

          {/* ---------- Rail ---------- */}
          <aside className="cv-rail space-y-6 lg:sticky lg:top-20">
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

            <RailCard title="Core Strengths" className="cv-strengths">
              <ul className="mt-4 space-y-2">
                {cv.strengths.map((strength) => (
                  <li
                    key={strength}
                    className="rounded-xl border border-line bg-surface px-4 py-2.5 text-center text-[13px] font-medium text-ink"
                  >
                    {strength}
                  </li>
                ))}
              </ul>
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
      </Container>
    </PageShell>
  );
}
