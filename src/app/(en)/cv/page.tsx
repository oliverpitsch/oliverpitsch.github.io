import PageShell from '@/components/layout/PageShell';
import CvDocument from '@/components/cv/CvDocument';
import { cv } from '@/lib/cv';
import { ogImages } from '@/lib/og-meta';

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
    images: ogImages('cv', 'CV – Oliver Pitsch'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV – Oliver Pitsch',
    description: cv.summary,
    images: ogImages('cv', 'CV – Oliver Pitsch'),
  },
};

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
      <CvDocument
        pdfHref="/cv/pdf"
        profile={{
          headline: cv.headline,
          summary: cv.summary,
          about: cv.about,
          roles: cv.roles,
          strengths: cv.strengths,
        }}
      />
    </PageShell>
  );
}
