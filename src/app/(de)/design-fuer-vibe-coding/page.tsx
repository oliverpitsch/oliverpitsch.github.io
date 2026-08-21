import VibeDesignPage from '@/components/VibeDesignPage';
import { de, buildMetadata } from '@/lib/vibe-design-content';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata(de);

export default function DesignFuerVibeCodingPage() {
  return <VibeDesignPage content={de} />;
}
