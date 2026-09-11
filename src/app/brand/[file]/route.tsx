import type { ImageResponse } from 'next/og';
import { brandAssets, type BrandAssetFile } from '@/lib/og-meta';
import { renderAvatar, renderLinkedInBanner } from '@/lib/og-render';

// Rendered once at build time into out/brand/<file>, linked from /metaImage.
export const dynamic = 'force-static';
export const dynamicParams = false;

const renderers: Record<
  BrandAssetFile,
  (size: { width: number; height: number }) => ImageResponse
> = {
  'linkedin-banner.png': renderLinkedInBanner,
  'avatar.png': renderAvatar,
};

export function generateStaticParams(): { file: string }[] {
  return brandAssets.map(({ file }) => ({ file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const asset = brandAssets.find((a) => a.file === file);
  if (!asset) return new Response('Not found', { status: 404 });
  return renderers[asset.file](asset);
}
