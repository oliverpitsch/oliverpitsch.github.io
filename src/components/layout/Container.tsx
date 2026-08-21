import type { ReactNode } from 'react';

const sizes = {
  prose: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
} as const;

export type ContainerProps = {
  children: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav';
};

/** Single source of truth for page gutters and measure. */
export default function Container({
  children,
  size = 'default',
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full ${sizes[size]} px-6 sm:px-8 ${className}`}>{children}</Tag>
  );
}
