'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

/**
 * three and postprocessing are large for a decorative layer, so PixelBlast
 * loads after hydration and never on the server. The card reads fine without
 * it for the moment before the canvas appears.
 */
const PixelBlast = dynamic(() => import('@/components/ui/PixelBlast'), { ssr: false });

/** Tracks a media query; false on the server so the first render is stable. */
function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * A quiet, moving pixel field behind a whole card. It sits under the content,
 * ignores the pointer and stays faint enough to keep text easy to read.
 * Colours match --accent in light and dark.
 */
export default function PixelBackdrop({ className = '' }: { className?: string }) {
  const still = useMedia('(prefers-reduced-motion: reduce)');
  const dark = useMedia('(prefers-color-scheme: dark)');

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <PixelBlast
        key={dark ? 'dark' : 'light'}
        color={dark ? '#a5b4fc' : '#4f46e5'}
        variant="square"
        pixelSize={4}
        pixelSizeJitter={1}
        patternScale={3}
        patternDensity={0.9}
        edgeFade={0.25}
        enableRipples={false}
        speed={still ? 0 : 0.35}
        transparent
      />
    </div>
  );
}
