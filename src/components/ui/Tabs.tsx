'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';

export const Tabs = BaseTabs.Root;

export function TabsList({
  className = '',
  children,
  ...props
}: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={`relative inline-flex items-center rounded-[14px] bg-surface-muted p-1 shadow-surface ${className}`}
      {...props}
    >
      {children}
      <BaseTabs.Indicator className="absolute inset-y-1 left-0 z-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-[10px] bg-surface shadow-surface transition-[translate,width] duration-200 ease-out" />
    </BaseTabs.List>
  );
}

export function TabsTrigger({ className = '', ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={`relative z-10 inline-flex min-h-10 min-w-28 items-center justify-center rounded-[10px] px-4 text-sm font-semibold text-ink-muted outline-none transition-[color,scale] duration-150 hover:text-ink active:scale-[0.96] data-[active]:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
      {...props}
    />
  );
}

export function TabsContent({ className = '', ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={`outline-none ${className}`} {...props} />;
}
