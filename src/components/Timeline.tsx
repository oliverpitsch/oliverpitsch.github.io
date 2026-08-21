'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { roleSpan, timelineRoles } from '@/lib/cv';

/** Career facts come from the CV, so /cv and the homepage never drift apart. */
const items = timelineRoles;

const FADE_CAP = 'w-16 sm:w-24';

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftFade, setLeftFade] = useState(false);
  const [rightFade, setRightFade] = useState(false);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setLeftFade(scrollLeft > 4);
    setRightFade(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    requestAnimationFrame(updateFades);
    el.addEventListener('scroll', updateFades, { passive: true });
    return () => el.removeEventListener('scroll', updateFades);
  }, [updateFades]);

  return (
    <div className="mt-32 relative">
      {/* content overlay fades — indicate scroll affordance */}
      <div
        aria-hidden
        className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-canvas to-transparent ${leftFade ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        aria-hidden
        className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-l from-canvas to-transparent ${rightFade ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        ref={scrollRef}
        className="timeline-scroll overflow-x-auto snap-x snap-mandatory sm:snap-none pb-8"
      >
        <div className="flex w-fit mx-auto">
          {/* left gradient cap — fades the line in from the left */}
          <div aria-hidden className={`relative flex-none ${FADE_CAP} pb-8`}>
            <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-gradient-to-r from-transparent to-accent" />
          </div>

          {items.map((it) => (
            <div
              key={it.org}
              className="relative flex-none w-[50vw] sm:w-44 pb-8 text-center snap-start flex flex-col"
            >
              <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-accent" />

              <div className="mx-auto flex h-16 w-auto items-center justify-center">
                <img
                  src={it.logo}
                  alt=""
                  className={`${it.logoClass ?? 'h-16 w-auto'} dark:invert-60`}
                />
              </div>

              <h4 className="mt-4 sm:mt-6 text-base font-semibold leading-tight px-1">{it.org}</h4>
              <div className="text-sm text-ink leading-tight px-1 mt-0.5">{it.title}</div>
              <span className="text-sm text-accent mt-auto pt-2">{roleSpan(it)}</span>

              <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-canvas bg-accent" />
            </div>
          ))}

          {/* right gradient cap — fades the line out to the right */}
          <div aria-hidden className={`relative flex-none ${FADE_CAP} pb-8`}>
            <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-gradient-to-r from-accent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
