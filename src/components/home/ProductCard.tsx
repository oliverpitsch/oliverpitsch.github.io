/* eslint-disable @next/next/no-img-element */
import type { Product } from '@/lib/products';

/**
 * The site's signature card: a tinted frame holding an inset surface card,
 * with the product's own accent threaded through frame, lead and action.
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[28px] p-1.5 ${product.theme.frame}`}
    >
      <div className="flex flex-1 flex-col rounded-[22px] bg-surface p-6 shadow-popover sm:p-7">
        <img
          src={product.logo}
          alt=""
          className={`self-start object-contain ${product.logoClass}`}
        />
        <h3 className="mt-5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
          {product.name}
        </h3>

        <p className={`mt-6 text-[19px] font-semibold leading-7 ${product.theme.text}`}>
          {product.lead}
        </p>
        <p className="mt-4 flex-1 text-[15px] leading-7 text-ink-muted">{product.story}</p>

        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${product.theme.button}`}
        >
          Visit {product.name}
        </a>
      </div>
    </article>
  );
}
