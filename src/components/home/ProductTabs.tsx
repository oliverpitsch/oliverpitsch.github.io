'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/lib/products';

/** How long each product holds before the next one takes over. */
const DURATION_MS = 7000;
/** Fraction of the tab's height the indicator covers. Deliberately short so it
    stays on the straight part of the left edge and never reaches the corners. */
const BAR_RATIO = 0.5;
const BAR_MIN = 28;

export default function ProductTabs({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  /** Auto-rotation ends for good once the visitor picks a product themselves. */
  const [rotating, setRotating] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<Animation | null>(null);
  const timerRef = useRef<number | null>(null);
  const remainingRef = useRef(DURATION_MS);
  const deadlineRef = useRef(0);

  const [box, setBox] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Follow the active tab's whole box, and re-measure when the list reflows
  // (font loading, resize, text rewrapping).
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      if (!tab) return;
      setBox({
        top: tab.offsetTop,
        left: tab.offsetLeft,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      });
    };
    measure();

    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    tabRefs.current.forEach((tab) => tab && ro.observe(tab));
    return () => ro.disconnect();
  }, [active]);

  // A short bar, centred on the tab, sitting in the gutter to its left.
  const bar = useMemo(() => {
    const height = Math.max(BAR_MIN, Math.round(box.height * BAR_RATIO));
    return { top: box.top + Math.round((box.height - height) / 2), height };
  }, [box.top, box.height]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** Arm the advance and remember when it is due, so a pause can bank the rest. */
  const arm = useCallback(
    (ms: number) => {
      clearTimer();
      deadlineRef.current = performance.now() + ms;
      timerRef.current = window.setTimeout(() => setActive((i) => (i + 1) % products.length), ms);
    },
    [clearTimer, products.length],
  );

  // The bar filling is the visible half of the rotation timer. The
  // advance runs off an explicit timeout rather than the animation's finish
  // event, and the two are always armed, paused and resumed with the same
  // remaining duration, so the bar cannot drift out of sync with the content.
  useEffect(() => {
    if (!rotating || box.width === 0) return;
    const el = barRef.current;
    if (!el || typeof el.animate !== 'function') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const anim = el.animate([{ height: '0px' }, { height: `${bar.height}px` }], {
      duration: DURATION_MS,
      easing: 'linear',
      fill: 'forwards',
    });
    animRef.current = anim;
    remainingRef.current = DURATION_MS;
    arm(DURATION_MS);

    return () => {
      clearTimer();
      anim.cancel();
      if (animRef.current === anim) animRef.current = null;
    };
  }, [active, rotating, box.width, bar.height, arm, clearTimer]);

  // Hover and focus suspend the rotation. Native listeners, because React's
  // synthetic mouseenter did not fire reliably for real pointer movement.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const pause = () => {
      if (timerRef.current === null) return;
      remainingRef.current = Math.max(0, deadlineRef.current - performance.now());
      clearTimer();
      animRef.current?.pause();
    };
    const resume = () => {
      if (timerRef.current !== null || !animRef.current) return;
      animRef.current.play();
      arm(remainingRef.current);
    };

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', resume);
    return () => {
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('focusout', resume);
    };
  }, [arm, clearTimer]);

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
    <div ref={rootRef} className="mt-12 rounded-[32px] bg-surface-muted p-1.5">
      <div className="grid gap-1.5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        {/* ---------------- Tabs ---------------- */}
        <div
          ref={listRef}
          role="tablist"
          aria-orientation="vertical"
          aria-label="Products"
          onKeyDown={onKeyDown}
          className="relative flex flex-col gap-1 p-2"
        >
          {/* A short bar, not a full outline: it stays clear of the tab's
              rounded corners instead of having to wrap around them. The track
              shows the time left, the fill grows to run the rotation. */}
          {box.height > 0 && (
            <>
              <span
                aria-hidden
                className="absolute left-0 w-[3px] rounded-full bg-[color-mix(in_srgb,var(--ink)_18%,transparent)] transition-[top,height] duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
                style={{ top: bar.top, height: bar.height }}
              />
              <span
                ref={barRef}
                aria-hidden
                className={`absolute left-0 w-[3px] rounded-full transition-[top] duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${product.theme.bar}`}
                style={{ top: bar.top, height: rotating ? 0 : bar.height }}
              />
            </>
          )}

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
                  'group/tab relative block w-full px-5 py-5 text-left',
                  'rounded-l-[18px] outline-none',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                ].join(' ')}
              >
                {/* The fill runs past the column and slides under the panel,
                    so the tab reads as tucked behind the card rather than
                    floating beside it. */}
                <span
                  aria-hidden
                  className={[
                    'absolute inset-y-0 left-0 -right-6 rounded-l-[18px] transition-colors duration-300',
                    selected ? 'bg-surface' : 'bg-transparent group-hover/tab:bg-surface/45',
                  ].join(' ')}
                />
                <span
                  className={[
                    'relative block text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-300',
                    selected ? item.theme.text : 'text-ink',
                  ].join(' ')}
                >
                  {item.name}
                </span>
                <span
                  className={[
                    'relative mt-1 block text-[15px] leading-6 transition-colors duration-300',
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
            pattern it stays out of the tab order rather than taking a
            full-size focus ring of its own. */}
        <div
          role="tabpanel"
          id={`product-panel-${active}`}
          aria-labelledby={`product-tab-${active}`}
          aria-live={rotating ? 'off' : 'polite'}
          className="relative z-10 rounded-[26px] border border-line bg-surface p-7 shadow-card sm:p-10"
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
