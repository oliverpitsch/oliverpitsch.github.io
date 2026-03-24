import { Geist, Geist_Mono } from 'next/font/google';
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
  title: 'Oliver Pitsch – Product Maker & Builder',
  description:
    'Oliver Pitsch is a product maker and builder from Cologne, Germany with 20 years of experience across design, UX, and product leadership. Currently Head of Product at Ordio, founder of Joinride, and writer on product, AI, and building.',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Oliver Pitsch – Product Maker & Builder',
    description:
      'Product maker and builder from Cologne, Germany. 20 years across design, UX, and product leadership. Building AI-native, shipping fast.',
    images: [
      {
        url: '/images/og-images/og-facebook.jpg',
        width: 1200,
        height: 630,
        alt: 'Oliver Pitsch – Product Maker & Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oliver Pitsch – Product Maker & Builder',
    description:
      'Product maker and builder from Cologne, Germany. 20 years across design, UX, and product leadership. Building AI-native, shipping fast.',
    images: [
      {
        url: '/images/og-images/og-twitter-card.jpg',
        alt: 'Oliver Pitsch – Product Maker & Builder',
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
  themeColor: '#FFAA00',
  other: {
    'color-scheme': 'light dark',
  },
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
