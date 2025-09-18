/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // enables `next export`
  images: { unoptimized: true }, // so <Image> works in static export
  // Temporary: unblock build due to upstream PageProps typing regression (params inferred as Promise<any>)
  // Remove when Next.js releases a patch that aligns internal wrapper arg with declared PageProps
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
