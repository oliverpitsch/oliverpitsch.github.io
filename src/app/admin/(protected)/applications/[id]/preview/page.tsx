import { notFound } from 'next/navigation';
import ApplicationDocuments from '@/components/cv/ApplicationDocuments';
import { getHighlightedProjects, mergeCv } from '@/lib/applications/merge';
import { getApplication } from '@/lib/applications/repository';

type Props = { params: Promise<{ id: string }> };

export default async function ApplicationPreviewPage({ params }: Props) {
  const application = await getApplication((await params).id);
  if (!application) notFound();
  return (
    <main>
      <div className="mx-auto mt-5 max-w-7xl rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-900 print:hidden">
        Private preview · {application.status}
      </div>
      <ApplicationDocuments
        profile={mergeCv(application)}
        company={application.company}
        coverLetter={application.coverLetter}
        writtenAt={application.updatedAt.toISOString()}
        projects={getHighlightedProjects(application.highlightedProjects, application.language)}
        language={application.language}
        canonicalPath={`/cv/${application.slug}`}
        pdfBasePath={`/admin/applications/${application.id}/pdf`}
      />
    </main>
  );
}
