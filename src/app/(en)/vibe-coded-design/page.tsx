import VibeDesignPage from '@/components/VibeDesignPage';
import { en, buildMetadata } from '@/lib/vibe-design-content';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata(en);

export default function VibeCodedDesignPage() {
  return <VibeDesignPage content={en} />;
}
