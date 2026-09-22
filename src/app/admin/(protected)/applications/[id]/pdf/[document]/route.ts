import { isAdmin } from '@/lib/admin-auth';
import { getApplication } from '@/lib/applications/repository';
import {
  isPdfDocumentKind,
  pdfFilename,
  pdfResponse,
  renderApplicationPdf,
} from '@/lib/pdf/render';

export const dynamic = 'force-dynamic';

/* Route handlers skip the protected layout, so the session check lives here. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; document: string }> },
) {
  if (!(await isAdmin())) return new Response('Unauthorized', { status: 401 });
  const { id, document } = await params;
  if (!isPdfDocumentKind(document)) return new Response('Not found', { status: 404 });
  const application = await getApplication(id);
  if (!application) return new Response('Not found', { status: 404 });
  const pdf = await renderApplicationPdf(application, document);
  return pdfResponse(pdf, pdfFilename(document, application.language));
}
