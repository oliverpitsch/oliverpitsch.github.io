/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // enables `next export`
  images: { unoptimized: true }, // so <Image> works in static export
};
export default nextConfig;
