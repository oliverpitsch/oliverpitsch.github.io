import { Geist, Geist_Mono } from 'next/font/google';
import { ogImages } from '@/lib/og-meta';

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
  title: 'Oliver Pitsch – Product & Design Leader',
  description:
    'Oliver Pitsch is a product and design leader from Cologne, Germany. 15 years taking products from strategy to market with CPOs, VPs of Product and international teams. Now also building his own products with AI.',
  openGraph: {
    type: 'website' as const,
    url: '/',
    title: 'Oliver Pitsch – Product & Design Leader',
    description:
      'Product and design leader from Cologne. 15 years taking products from strategy to market with teams at enterprise scale, and building his own products with AI.',
    images: ogImages('home', 'Oliver Pitsch – Product & Design Leader'),
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Oliver Pitsch – Product & Design Leader',
    description:
      'Product and design leader from Cologne. 15 years taking products from strategy to market with teams at enterprise scale, and building his own products with AI.',
    images: ogImages('home', 'Oliver Pitsch – Product & Design Leader'),
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
