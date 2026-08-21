'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';

const links = [
  { href: '/#products', label: 'Products', match: null },
  { href: '/articles', label: 'Writing', match: '/articles' },
  { href: '/cv', label: 'CV', match: '/cv' },
  { href: '/#contact', label: 'Contact', match: null, mobileHidden: true },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container size="wide" className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-accent text-[12px] font-bold tracking-tight text-on-accent"
            aria-hidden
          >
            OP
          </span>
          <span className="hidden text-[15px] font-semibold tracking-[-0.01em] text-ink sm:inline">
            Oliver Pitsch
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-6">
          {links.map((link) => {
            const active = link.match ? pathname.startsWith(link.match) : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'relative text-[14px] font-medium transition-colors',
                  'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  'mobileHidden' in link && link.mobileHidden ? 'hidden sm:inline' : '',
                ].join(' ')}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-full bg-accent"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
