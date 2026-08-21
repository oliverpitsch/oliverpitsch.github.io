'use client';

import { PreviewCard } from '@base-ui-components/react/preview-card';
import type { ComponentProps } from 'react';

export const HoverCard = PreviewCard.Root;

export function HoverCardTrigger({
  className = '',
  ...props
}: ComponentProps<typeof PreviewCard.Trigger>) {
  return (
    <PreviewCard.Trigger
      delay={180}
      closeDelay={120}
      className={`cursor-default rounded-sm outline-none transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      {...props}
    />
  );
}

export function HoverCardContent({
  className = '',
  side = 'top',
  sideOffset = 10,
  align = 'center',
  ...props
}: ComponentProps<typeof PreviewCard.Popup> & {
  side?: ComponentProps<typeof PreviewCard.Positioner>['side'];
  sideOffset?: ComponentProps<typeof PreviewCard.Positioner>['sideOffset'];
  align?: ComponentProps<typeof PreviewCard.Positioner>['align'];
}) {
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner side={side} sideOffset={sideOffset} align={align} className="z-50">
        <PreviewCard.Popup
          className={`hover-card-popup w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-line bg-surface p-5 shadow-popover ${className}`}
          {...props}
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  );
}
