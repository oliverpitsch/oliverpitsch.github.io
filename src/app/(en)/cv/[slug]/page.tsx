import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ApplicationDocuments from '@/components/cv/ApplicationDocuments';
import PageShell from '@/components/layout/PageShell';
import { getHighlightedProjects, mergeCv } from '@/lib/applications/merge';
import { getPublishedApplication } from '@/lib/applications/repository';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const application = await getPublishedApplication(slug);
  if (!application) return {};
  const profile = mergeCv(application);
  return {
    title: `${profile.headline} – Oliver Pitsch`,
    description: profile.summary,
    alternates: { canonical: `/cv/${application.slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function PersonalizedCvPage({ params }: Props) {
  const { slug } = await params;
  const application = await getPublishedApplication(slug);
  if (!application) notFound();

  return (
    <PageShell>
      <ApplicationDocuments
        profile={mergeCv(application)}
        company={application.company}
        coverLetter={application.coverLetter}
        writtenAt={application.updatedAt.toISOString()}
        projects={getHighlightedProjects(application.highlightedProjects, application.language)}
        language={application.language}
        canonicalPath={`/cv/${application.slug}`}
        pdfBasePath={`/cv/${application.slug}/pdf`}
      />
    </PageShell>
  );
}
