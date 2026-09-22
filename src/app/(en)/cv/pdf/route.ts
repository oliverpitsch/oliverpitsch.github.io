import { pdfFilename, pdfResponse, renderMasterCvPdf } from '@/lib/pdf/render';

export const dynamic = 'force-static';

export async function GET() {
  return pdfResponse(await renderMasterCvPdf(), pdfFilename('cv', 'en'), 'public, max-age=3600');
}
