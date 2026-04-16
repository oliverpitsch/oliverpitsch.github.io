import Link from 'next/link';
import type { ConsultingContent } from '@/lib/consulting-content';

function jsonLd(c: ConsultingContent) {
  const baseUrl = 'https://pitsch.me';
  const pageUrl = c.lang === 'en' ? `${baseUrl}/ai-consulting` : `${baseUrl}/ai-beratung`;

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: c.meta.ogTitle,
    description: c.meta.description,
    url: pageUrl,
    provider: {
      '@type': 'Person',
      name: 'Oliver Pitsch',
      url: baseUrl,
      jobTitle: 'AI Consultant & Product Leader',
      knowsAbout: [
        'AI-native product development',
        'Claude Code',
        'Codex',
        'UX design systems',
        'Product management',
        'Agentic coding workflows',
      ],
    },
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    serviceType: [
      'AI Consulting',
      'Product Management Consulting',
      'UX Consulting',
      'AI-Native Product Development',
    ],
    availableLanguage: ['en', 'de'],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: c.lang === 'en' ? 'AI Consulting' : 'KI-Beratung',
        item: pageUrl,
      },
    ],
  };

  return [professionalService, faqPage, breadcrumb];
}

export default function ConsultingPage({ content: c }: { content: ConsultingContent }) {
  const schemas = jsonLd(c);

  return (
    <div
      lang={c.lang}
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white"
    >
      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Topline */}
      <div
        className="h-7 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]"
        aria-hidden
      />

      <main className="mx-auto max-w-full">
        {/* Hero */}
        <section
          className="mx-auto mt-16 max-w-4xl px-6 text-center lg:px-0"
          aria-labelledby="hero-heading"
        >
          <picture className="block mx-auto mb-10">
            <source
              media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)"
              srcSet="/images/oliver-pitsch-2025.png"
            />
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="/images/oliver-pitsch-2025-dark.png"
            />
            <img
              src="/images/oliver-pitsch-2025-dark.png"
              alt="Oliver Pitsch"
              height={160}
              className="h-40 w-40 rounded-full mx-auto mix-blend-multiply dark:mix-blend-normal"
            />
          </picture>

          <p className="inline-flex items-center rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-4 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]">
            {c.hero.badge}
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]"
          >
            {c.hero.headline}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[18px] leading-8 text-slate-600 dark:text-slate-300 sm:text-[20px]">
            {c.hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={c.hero.cta1Href}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#182B52] px-6 py-3 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#21386A] dark:bg-white dark:text-[#182B52] dark:hover:bg-[#E6EEFF]"
            >
              {c.hero.cta1Label}
            </a>
            <a
              href="#services"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-[#182B52] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-[#8DAEF0] hover:bg-[#F8FBFF] dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:border-[#8DAEF0] dark:hover:bg-[#193056]"
            >
              {c.hero.cta2Label}
            </a>
          </div>
        </section>

        {/* Pain Points */}
        <section className="mx-auto mt-24 max-w-4xl px-6 lg:px-0" aria-labelledby="pain-heading">
          <h2 id="pain-heading" className="text-xl font-semibold mb-6">
            {c.painPoints.heading}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.painPoints.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-6 bg-white dark:bg-[#152544]"
              >
                <h3 className="font-semibold text-[16px]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="mx-auto mt-24 max-w-4xl px-6 lg:px-0"
          aria-labelledby="services-heading"
        >
          <h2 id="services-heading" className="text-xl font-semibold mb-6">
            {c.services.heading}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {c.services.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-6 bg-white dark:bg-[#152544]"
              >
                <h3 className="font-semibold text-[18px]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFBF00]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Inline CTA */}
        <section className="mx-auto mt-16 max-w-4xl px-6 text-center lg:px-0">
          <p className="text-[17px] text-slate-600 dark:text-slate-300">
            {c.lang === 'en' ? 'Questions? ' : 'Fragen? '}
            <a
              href={`mailto:oliver@pitsch.me?subject=${c.cta.emailSubject}`}
              className="font-semibold text-[#3B5EA5] dark:text-[#8DAEF0] underline underline-offset-4"
            >
              {c.lang === 'en' ? "Let's talk." : 'Lass uns sprechen.'}
            </a>
          </p>
        </section>

        {/* Approach */}
        <section
          className="mx-auto mt-24 max-w-4xl px-6 lg:px-0"
          aria-labelledby="approach-heading"
        >
          <h2 id="approach-heading" className="text-xl font-semibold mb-8">
            {c.approach.heading}
          </h2>
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div
              className="absolute top-12 left-[16%] right-[16%] hidden h-0.5 bg-[#FFBF00] sm:block"
              aria-hidden="true"
            />
            {c.approach.steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FFBF00] bg-white dark:bg-[#182B52] text-[14px] font-bold text-[#FFBF00]">
                  {step.number}
                </div>
                <h3 className="mt-4 font-semibold text-[18px]">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About / Credibility */}
        <section className="mx-auto mt-24 max-w-4xl px-6 lg:px-0" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-xl font-semibold mb-6">
            {c.about.heading}
          </h2>
          <div className="rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-6 bg-white dark:bg-[#152544] sm:p-8">
            <p className="text-[16px] leading-7 text-slate-600 dark:text-slate-300">
              {c.about.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.about.credentials.map((cred) => (
                <span
                  key={cred}
                  className="rounded-full border border-[#D7E5FF] bg-[#F5F9FF] px-3 py-1.5 text-[13px] font-semibold text-[#3B5EA5] dark:border-[#35528C] dark:bg-[#193056] dark:text-[#B6CCF8]"
                >
                  {cred}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/"
                className="text-[14px] font-semibold text-[#3B5EA5] dark:text-[#8DAEF0] underline underline-offset-4"
              >
                {c.about.linkLabel}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mt-24 max-w-4xl px-6 lg:px-0" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold mb-6">
            {c.faq.heading}
          </h2>
          <div className="space-y-3">
            {c.faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#152544]"
              >
                <summary className="cursor-pointer select-none px-6 py-4 text-[16px] font-semibold list-none flex items-center justify-between gap-4">
                  {item.question}
                  <span className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto mt-24 max-w-5xl px-4 lg:px-0" aria-labelledby="cta-heading">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#152544] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="absolute inset-0 opacity-80 dark:opacity-100" aria-hidden="true">
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(77,142,243,0.1),_transparent_68%)]" />
              <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,213,0,0.08),_transparent_72%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,213,0,0.55),transparent)]" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)] lg:items-end">
              <div>
                <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
                  {c.cta.badge}
                </p>
                <h2
                  id="cta-heading"
                  className="mt-5 max-w-3xl text-balance text-[32px] font-semibold leading-[1.02] tracking-[-0.03em] text-[#182B52] dark:text-white sm:text-[40px]"
                >
                  {c.cta.heading}
                </h2>
                <p className="mt-4 max-w-3xl text-pretty text-[17px] leading-8 text-slate-600 dark:text-slate-300 sm:text-[18px]">
                  {c.cta.body}
                </p>
              </div>

              <div className="relative rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30 sm:p-6">
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:oliver@pitsch.me?subject=${c.cta.emailSubject}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#182B52] px-5 py-3 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#21386A] dark:bg-white dark:text-[#182B52] dark:hover:bg-[#E6EEFF]"
                  >
                    {c.cta.emailLabel}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/oliverpitsch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-semibold text-[#182B52] transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-[#8DAEF0] hover:bg-[#F8FBFF] dark:border-slate-600 dark:bg-transparent dark:text-white dark:hover:border-[#8DAEF0] dark:hover:bg-[#193056]"
                  >
                    {c.cta.linkedinLabel}
                  </a>
                </div>

                <p className="mt-5 text-center text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                  {c.cta.legalNote}{' '}
                  <Link href="/imprint" className="underline underline-offset-4">
                    {c.cta.legalLinkLabel}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 mb-1 text-center relative">
          <div className="bg-[#FFD500] py-2 text-[12px] flex items-center justify-center gap-4">
            <Link href="/imprint" className="underline text-[#182B52]">
              {c.footer.imprintLabel}
            </Link>
            <span className="text-[#182B52]/40">|</span>
            <Link href={c.footer.langSwitchHref} className="underline text-[#182B52]">
              {c.footer.langSwitchLabel}
            </Link>
          </div>
          <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-b from-[#FFBF00] to-[#FFAA00]" />
        </footer>
      </main>
    </div>
  );
}
