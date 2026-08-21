'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/products';

/** How long each product holds before the next one takes over. */
const DURATION_MS = 7000;

export default function ProductTabs({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  /** Auto-rotation ends for good once the visitor picks a product themselves. */
  const [rotating, setRotating] = useState(true);

  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [marker, setMarker] = useState({ top: 0, height: 0 });

  // Keep the marker over the active tab, including when the list reflows
  // (font loading, resize, text rewrapping).
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (tab) setMarker({ top: tab.offsetTop, height: tab.offsetHeight });
    };
    measure();

    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    tabRefs.current.forEach((tab) => tab && ro.observe(tab));
    return () => ro.disconnect();
  }, [active]);

  const choose = useCallback((index: number, byUser: boolean) => {
    setActive(index);
    if (byUser) setRotating(false);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = products.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      next = active === last ? 0 : active + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = active === 0 ? last : active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    choose(next, true);
    tabRefs.current[next]?.focus();
  };

  const product = products[active];

  return (
    <div className="group/tabs mt-12 rounded-[32px] bg-surface-muted p-1.5">
      <div className="grid gap-1.5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        {/* ---------------- Tabs ---------------- */}
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="vertical"
          aria-label="Products"
          onKeyDown={onKeyDown}
          className="relative py-3 pl-1.5 lg:py-5"
        >
          {/* Track for the active tab, and the fill that runs the rotation. */}
          <span
            aria-hidden
            className="absolute left-0 w-[3px] rounded-full bg-line transition-[top,height] duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
            style={{ top: marker.top, height: marker.height }}
          />
          <span
            aria-hidden
            key={`${active}-${rotating}`}
            className={[
              'absolute left-0 w-[3px] origin-top rounded-full',
              'transition-[top,height] duration-500 ease-[cubic-bezier(0.2,0,0,1)]',
              product.theme.bar,
              // Hovering or focusing the section suspends the rotation. Done in
              // CSS so it follows the real pointer rather than a synthetic event.
              rotating
                ? 'tab-progress group-hover/tabs:[animation-play-state:paused] group-focus-within/tabs:[animation-play-state:paused]'
                : '',
            ].join(' ')}
            style={{
              top: marker.top,
              height: marker.height,
              animationDuration: `${DURATION_MS}ms`,
            }}
            onAnimationEnd={() => rotating && setActive((i) => (i + 1) % products.length)}
          />

          {products.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.name}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`product-tab-${index}`}
                aria-selected={selected}
                aria-controls={`product-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(index, true)}
                className={[
                  'block w-full rounded-r-2xl py-5 pl-6 pr-4 text-left transition-colors duration-300',
                  // Inset so the ring follows the tab instead of bleeding past
                  // the marker on the left edge.
                  'outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent',
                  selected ? '' : 'hover:bg-surface/50',
                ].join(' ')}
              >
                <span
                  className={[
                    'block text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-300',
                    selected ? item.theme.text : 'text-ink',
                  ].join(' ')}
                >
                  {item.name}
                </span>
                <span
                  className={[
                    'mt-1 block text-[15px] leading-6 transition-colors duration-300',
                    selected ? 'text-ink-muted' : 'text-ink-muted/70',
                  ].join(' ')}
                >
                  {item.lead}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- Panel ----------------
          No tabIndex: the panel holds a focusable link, so per the ARIA tabs
          pattern it stays out of the tab order rather than taking a full-size
          focus ring of its own. */}
        <div
          role="tabpanel"
          id={`product-panel-${active}`}
          aria-labelledby={`product-tab-${active}`}
          aria-live={rotating ? 'off' : 'polite'}
          className="rounded-[26px] border border-line bg-surface p-7 shadow-card sm:p-10"
        >
          <div key={active} className="flex h-full flex-col">
            <img
              src={product.logo}
              alt=""
              className={`panel-rise self-start object-contain ${product.logoClass}`}
            />
            <h3 className="panel-rise panel-rise-1 mt-7 text-[30px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[34px]">
              {product.name}
            </h3>
            <p
              className={`panel-rise panel-rise-2 mt-5 text-[21px] font-semibold leading-8 ${product.theme.text}`}
            >
              {product.lead}
            </p>
            <p className="panel-rise panel-rise-3 mt-4 flex-1 text-[16px] leading-8 text-ink-muted">
              {product.story}
            </p>
            <div className="panel-rise panel-rise-4 mt-8">
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${product.theme.button}`}
              >
                Visit {product.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
