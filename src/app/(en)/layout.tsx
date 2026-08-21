import type { Viewport } from 'next';
import '../globals.css';
import GoSquaredScript from '@/components/GoSquaredScript';
import { fontClassNames, siteMetadata, siteViewport } from '@/lib/site-chrome';

export const metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

/**
 * Root layout for the en tree. The site ships two root layouts so the German
 * pages can declare lang="de" instead of contradicting their own hreflang.
 */
export default function EnRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={fontClassNames}>
        {children}
        <GoSquaredScript />
      </body>
    </html>
  );
}
