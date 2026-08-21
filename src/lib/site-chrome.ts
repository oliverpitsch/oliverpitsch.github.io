import { Geist, Geist_Mono } from 'next/font/google';

/** One font instance per family, shared by both root layouts. */
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const fontClassNames = `${geistSans.variable} ${geistMono.variable} antialiased`;

/**
 * Site-wide metadata defaults. Both root layouts spread this, so the EN and DE
 * trees stay in sync; page-level metadata still overrides field by field.
 */
export const siteMetadata = {
  metadataBase: new URL('https://pitsch.me'),
  title: 'Oliver Pitsch – Product & Engineering Leader',
  description:
    'Oliver Pitsch is a product and engineering leader from Cologne, Germany with 20 years across design, UX, and product leadership. Solo builder behind Joinride, Famili and neuerName, and open to a new product or leadership role.',
  openGraph: {
    type: 'website' as const,
    url: '/',
    title: 'Oliver Pitsch – Product & Engineering Leader',
    description:
      'Product and engineering leader from Cologne, Germany. 20 years across design, UX, and product. Solo builder behind Joinride, Famili and neuerName.',
    images: [
      {
        url: '/images/og-images/og-facebook.jpg',
        width: 1200,
        height: 630,
        alt: 'Oliver Pitsch – Product & Engineering Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Oliver Pitsch – Product & Engineering Leader',
    description:
      'Product and engineering leader from Cologne, Germany. 20 years across design, UX, and product. Solo builder behind Joinride, Famili and neuerName.',
    images: [
      {
        url: '/images/og-images/og-twitter-card.jpg',
        alt: 'Oliver Pitsch – Product & Engineering Leader',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicons/favicon-96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/images/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  other: {
    'color-scheme': 'light dark',
  },
};

export const siteViewport = {
  themeColor: '#4338CA',
};
