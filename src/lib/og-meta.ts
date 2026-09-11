/**
 * Social share image wiring. Every card is rendered at build time by
 * /og-image/[key]/route.tsx; pages only need the URL and dimensions, so this
 * file stays free of content imports and can be used from any metadata export.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const articleOgKey = (slug: string) => `article-${slug}`;

export function ogImagePath(key: string): string {
  return `/og-image/${key}.png`;
}

/** Downloadable profile images, rendered at build time next to the share cards. */
export const brandAssets = [
  { file: 'linkedin-banner.png', label: 'LinkedIn banner', width: 1584, height: 396 },
  { file: 'avatar.png', label: 'Square avatar', width: 1024, height: 1024 },
] as const;

export type BrandAssetFile = (typeof brandAssets)[number]['file'];

export function brandAssetPath(file: string): string {
  return `/brand/${file}`;
}

/** Image descriptors for both openGraph.images and twitter.images. */
export function ogImages(key: string, alt: string) {
  return [{ url: ogImagePath(key), ...OG_SIZE, alt, type: 'image/png' }];
}
