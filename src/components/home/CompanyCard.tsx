'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type ReactNode } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { companies } from '@/lib/companies';

type Mode = 'plain' | 'hover' | 'drawer';

/**
 * Decided after mount so the server and the first client render agree. Until
 * then the trigger renders as plain text, which is also the no-JS state.
 */
function useMode(): Mode {
  const [mode, setMode] = useState<Mode>('plain');
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setMode(query.matches ? 'hover' : 'drawer');
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);
  return mode;
}

function Body({ id }: { id: string }) {
  const company = companies[id];
  return (
    <>
      <div className="flex items-center gap-3">
        {company.logo && (
          <img
            src={company.logo}
            alt=""
            className={`h-8 w-8 shrink-0 object-contain ${company.logoClass?.includes('invert') ? 'dark:invert-60' : ''}`}
          />
        )}
        <div className="min-w-0">
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{company.name}</p>
          <p className="text-[13px] tabular-nums text-ink-muted">{company.period}</p>
        </div>
      </div>
      <p className="mt-3 text-[14px] font-medium text-accent">{company.role}</p>
      <p className="mt-2 text-[14px] leading-6 text-ink-muted">{company.blurb}</p>
      {company.href && (
        <a
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-[13px] font-semibold text-accent underline-offset-4 hover:underline"
        >
          Visit {company.name}
        </a>
      )}
    </>
  );
}

export default function CompanyCard({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const mode = useMode();
  const company = companies[id];
  if (!company) return <>{children}</>;

  if (mode === 'hover') {
    return (
      <HoverCard>
        {/* tabIndex makes the span focusable, so the card opens on keyboard
            focus as well as hover. Base UI treats focus as an open reason. */}
        <HoverCardTrigger render={<span tabIndex={0} />} className={className}>
          {children}
        </HoverCardTrigger>
        <HoverCardContent>
          <Body id={id} />
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (mode === 'drawer') {
    return (
      <Drawer>
        <DrawerTrigger
          render={<button type="button" />}
          className={`cursor-pointer rounded-sm text-left outline-none transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
        >
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="sr-only">{company.name}</DrawerTitle>
          <DrawerDescription className="sr-only">{company.blurb}</DrawerDescription>
          <Body id={id} />
        </DrawerContent>
      </Drawer>
    );
  }

  return <span className={className}>{children}</span>;
}
