'use client';

import { Dialog } from '@base-ui-components/react/dialog';
import type { ComponentProps } from 'react';

export const Drawer = Dialog.Root;
export const DrawerTrigger = Dialog.Trigger;
export const DrawerTitle = Dialog.Title;
export const DrawerDescription = Dialog.Description;
export const DrawerClose = Dialog.Close;

/** Composes the portal, backdrop and popup as a sheet anchored to the bottom. */
export function DrawerContent({
  className = '',
  children,
  ...props
}: ComponentProps<typeof Dialog.Popup>) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="drawer-backdrop fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]" />
      <Dialog.Popup
        className={`drawer-popup fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-line bg-surface p-6 pb-8 shadow-popover outline-none ${className}`}
        {...props}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" aria-hidden />
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
