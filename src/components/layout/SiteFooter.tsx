import Link from 'next/link';
import Container from './Container';

export type SiteFooterProps = {
  /** Optional language switch used by the EN/DE landing pages. */
  langSwitch?: { href: string; label: string };
};

const siteLinks = [
  { href: '/#products', label: 'Products' },
  { href: '/articles', label: 'Writing' },
  { href: '/cv', label: 'CV' },
];

const contactLinks = [
  { href: 'mailto:office@pitsch.me', label: 'office@pitsch.me', external: false },
  { href: 'https://www.linkedin.com/in/oliverpitsch/', label: 'LinkedIn', external: true },
  { href: '/imprint', label: 'Imprint & Data Privacy', external: false },
];

export default function SiteFooter({ langSwitch }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-line print:hidden">
      <Container size="wide" className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Oliver Pitsch</p>
            <p className="mt-2 max-w-xs text-[14px] leading-6 text-ink-muted">
              Product, UX, and AI building. Cologne, Germany.
            </p>
          </div>

          <nav aria-label="Site">
            <h2 className="text-[13px] font-semibold text-ink">Explore</h2>
            <ul className="mt-3 space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold text-ink">Get in touch</h2>
            <ul className="mt-3 space-y-2">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-[14px] text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {langSwitch && (
                <li>
                  <Link
                    href={langSwitch.href}
                    className="text-[14px] text-ink-muted transition-colors hover:text-accent"
                  >
                    {langSwitch.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-[13px] text-ink-muted">
          © {new Date().getFullYear()} Oliver Pitsch
        </p>
      </Container>
      <div
        className="h-1 w-full bg-[linear-gradient(90deg,#4338ca,#4f46e5_45%,#6366f1)]"
        aria-hidden
      />
    </footer>
  );
}
