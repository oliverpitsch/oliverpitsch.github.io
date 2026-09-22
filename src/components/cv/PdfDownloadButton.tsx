'use client';

import { useState, type MouseEvent } from 'react';
import { RiDownload2Fill, RiLoader4Line } from 'react-icons/ri';

type Props = { href: string; label: string; pendingLabel: string };

function filenameFrom(response: Response) {
  const match = /filename="([^"]+)"/.exec(response.headers.get('Content-Disposition') ?? '');
  return match?.[1] ?? 'Oliver Pitsch.pdf';
}

/**
 * Generating a PDF takes a moment, so the click fetches it with a visible
 * pending state. Without JS, or if the fetch fails, the plain link still works.
 */
export default function PdfDownloadButton({ href, label, pendingLabel }: Props) {
  const [pending, setPending] = useState(false);

  async function download(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const response = await fetch(href);
      if (!response.ok) throw new Error(`PDF request failed: ${response.status}`);
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url;
      link.download = filenameFrom(response);
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      window.location.assign(href);
    } finally {
      setPending(false);
    }
  }

  return (
    <a
      href={href}
      download
      onClick={download}
      aria-busy={pending}
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-busy:cursor-progress print:hidden"
    >
      {pending ? (
        <RiLoader4Line className="size-4 motion-safe:animate-spin" aria-hidden />
      ) : (
        <RiDownload2Fill className="size-4" aria-hidden />
      )}
      {pending ? pendingLabel : label}
    </a>
  );
}
