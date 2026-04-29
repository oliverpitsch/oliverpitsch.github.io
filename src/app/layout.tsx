import { Geist, Geist_Mono } from 'next/font/google';
import type { Viewport } from 'next';
import './globals.css';
import GoSquaredScript from '@/components/GoSquaredScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://pitsch.me'),
  title: 'Oliver Pitsch – Product & Engineering Leader',
  description:
    'Oliver Pitsch is a product and engineering leader from Cologne, Germany with 20 years across design, UX, and product leadership. Currently Head of Product & Engineering at AI Labs, helping large enterprises deploy frontier AI under European privacy law.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Oliver Pitsch – Product & Engineering Leader',
    description:
      'Product and engineering leader from Cologne, Germany. 20 years across design, UX, and product. Currently building enterprise AI at AI Labs.',
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
    card: 'summary_large_image',
    title: 'Oliver Pitsch – Product & Engineering Leader',
    description:
      'Product and engineering leader from Cologne, Germany. 20 years across design, UX, and product. Currently building enterprise AI at AI Labs.',
    images: [
      {
        url: '/images/og-images/og-twitter-card.jpg',
        alt: 'Oliver Pitsch – Product & Engineering Leader',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/images/favicons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicons/favicon-96.png', sizes: '96x96', type: 'image/png' },
    ],
  },
  other: {
    'color-scheme': 'light dark',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFAA00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <GoSquaredScript />
      </body>
    </html>
  );
}
