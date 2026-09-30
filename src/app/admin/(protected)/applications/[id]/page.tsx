import { notFound } from 'next/navigation';
import ApplicationEditor from '@/components/admin/ApplicationEditor';
import { getApplication } from '@/lib/applications/repository';

type Props = { params: Promise<{ id: string }> };

export default async function EditApplicationPage({ params }: Props) {
  const application = await getApplication((await params).id);
  if (!application) notFound();
  return <ApplicationEditor application={application} />;
}
