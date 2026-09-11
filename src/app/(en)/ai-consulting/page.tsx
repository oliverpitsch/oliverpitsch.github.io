import ConsultingPage from '@/components/ConsultingPage';
import { en as content } from '@/lib/consulting-content';
import { ogImages } from '@/lib/og-meta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  alternates: {
    canonical: '/ai-consulting',
    languages: {
      en: '/ai-consulting',
      de: '/ai-beratung',
      'x-default': '/ai-consulting',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ai-consulting',
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: ogImages('ai-consulting', content.meta.ogTitle),
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.ogTitle,
    description: content.meta.ogDescription,
    images: ogImages('ai-consulting', content.meta.ogTitle),
  },
};

export default function AIConsultingPage() {
  return <ConsultingPage content={content} />;
}
