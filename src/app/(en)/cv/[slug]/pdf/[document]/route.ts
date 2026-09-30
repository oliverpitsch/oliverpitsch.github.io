import { getPublishedApplication } from '@/lib/applications/repository';
import {
  isPdfDocumentKind,
  pdfFilename,
  pdfResponse,
  renderApplicationPdf,
} from '@/lib/pdf/render';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; document: string }> },
) {
  const { slug, document } = await params;
  if (!isPdfDocumentKind(document)) return new Response('Not found', { status: 404 });
  const application = await getPublishedApplication(slug);
  if (!application) return new Response('Not found', { status: 404 });
  const pdf = await renderApplicationPdf(application, document);
  return pdfResponse(pdf, pdfFilename(document, application.language));
}
