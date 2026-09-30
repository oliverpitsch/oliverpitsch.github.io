import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { fontClassNames, siteViewport } from '@/lib/site-chrome';

export const metadata: Metadata = {
  title: 'Applications · Pitsch',
  robots: { index: false, follow: false },
};
export const viewport: Viewport = siteViewport;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fontClassNames}>{children}</body>
    </html>
  );
}
