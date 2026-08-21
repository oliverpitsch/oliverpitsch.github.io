import Link from 'next/link';
import type { ReactNode } from 'react';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold ' +
  'transition-[transform,background-color,border-color,color] duration-150 ease-out ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'border border-line bg-surface text-ink hover:border-accent hover:bg-accent-soft',
} as const;

const sizes = {
  md: '',
  lg: 'px-6',
} as const;

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
  'aria-label'?: string;
};

/**
 * The site's one call-to-action recipe. Renders a next/link for internal
 * routes and a plain anchor for mail and off-site targets.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
