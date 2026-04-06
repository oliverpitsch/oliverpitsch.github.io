import ConsultingPage from '@/components/ConsultingPage';
import { de as content } from '@/lib/consulting-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  alternates: {
    canonical: '/ai-beratung',
    languages: {
      en: '/ai-consulting',
      de: '/ai-beratung',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ai-beratung',
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: [
      {
        url: '/images/og-images/og-facebook.jpg',
        width: 1200,
        height: 630,
        alt: content.meta.ogTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: [{ url: '/images/og-images/og-twitter-card.jpg', alt: content.meta.ogTitle }],
  },
};

export default function AIBeratungPage() {
  return <ConsultingPage content={content} />;
}
