/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Temporary: unblock build due to upstream PageProps typing regression (params inferred as Promise<any>)
  // Remove when Next.js releases a patch that aligns internal wrapper arg with declared PageProps
  typescript: { ignoreBuildErrors: true },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
