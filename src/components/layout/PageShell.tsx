import type { ReactNode } from 'react';
import SiteFooter, { type SiteFooterProps } from './SiteFooter';
import SiteHeader from './SiteHeader';
import Topline from './Topline';

export type PageShellProps = {
  children: ReactNode;
  /** Extra classes for the <main> element. */
  mainClassName?: string;
  langSwitch?: SiteFooterProps['langSwitch'];
  /** Attributes forwarded to the outer element, e.g. lang on the EN/DE pages. */
  lang?: string;
};

/** Page chrome: brand edge, header, main, footer. */
export default function PageShell({
  children,
  mainClassName = '',
  langSwitch,
  lang,
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink" lang={lang}>
      <Topline />
      <SiteHeader />
      <main className={`flex-1 ${mainClassName}`}>{children}</main>
      <SiteFooter langSwitch={langSwitch} />
    </div>
  );
}
