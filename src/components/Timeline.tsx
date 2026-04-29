'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const items: {
  label: string;
  span: string;
  jobTitle: string;
  svg: string;
  size?: string;
}[] = [
  {
    label: 'Reputami',
    span: '2011 – 2015',
    jobTitle: 'Founder & CEO',
    svg: 'companies/logo-reputami.svg',
  },
  {
    label: 'Studitemps',
    span: '2015 – 2017',
    jobTitle: 'Senior UX Designer',
    svg: 'companies/logo-studitemps.svg',
  },
  {
    label: 'Trusted Shops',
    span: '2017 – 2025',
    jobTitle: 'Director UX & Product Marketing',
    svg: 'companies/logo-trusted-shops.svg',
  },
  {
    label: 'Ordio',
    span: '2025 – 2026',
    jobTitle: 'Head of Product',
    svg: 'companies/logo-ordio.svg',
  },
  {
    label: 'Joinride.cc',
    span: 'since 2022',
    jobTitle: 'Founder',
    svg: 'companies/logo-joinride.svg',
    size: 'h-12 w-auto',
  },
  {
    label: 'AI Labs',
    span: 'since 2026',
    jobTitle: 'Head of Product & Engineering',
    svg: 'companies/logo-ai-labs.svg',
  },
];

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
        className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-[#F8FAFC] dark:from-[#182B52] to-transparent ${leftFade ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        aria-hidden
        className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-l from-[#F8FAFC] dark:from-[#182B52] to-transparent ${rightFade ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        ref={scrollRef}
        className="timeline-scroll overflow-x-auto snap-x snap-mandatory sm:snap-none pb-8"
      >
        <div className="flex w-fit mx-auto">
          {/* left gradient cap — fades the line in from the left */}
          <div aria-hidden className={`relative flex-none ${FADE_CAP} pb-8`}>
            <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-gradient-to-r from-transparent to-[#FFBF00]" />
          </div>

          {items.map((it, i) => (
            <div
              key={it.label}
              className="relative flex-none w-[50vw] sm:w-44 pb-8 text-center snap-start flex flex-col"
            >
              <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-[#FFBF00]" />

              <div className="mx-auto flex h-16 w-auto items-center justify-center">
                <img
                  src={`/images/${it.svg}`}
                  alt=""
                  className={`${it.size ?? 'h-16 w-auto'} dark:invert-60`}
                />
              </div>

              <h4 className="mt-4 sm:mt-6 text-base font-semibold leading-tight px-1">
                {it.label}
              </h4>
              <div className="text-sm text-[#182B52] dark:text-[#E6EEFF] leading-tight px-1 mt-0.5">
                {it.jobTitle}
              </div>
              <span className="text-sm text-[#3B5EA5] dark:text-[#8DAEF0] mt-auto pt-2">
                {it.span}
              </span>

              <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-slate-50 dark:border-[#182B52] bg-[#FFBF00]" />
            </div>
          ))}

          {/* right gradient cap — fades the line out to the right */}
          <div aria-hidden className={`relative flex-none ${FADE_CAP} pb-8`}>
            <div className="absolute left-0 right-0 bottom-1 h-0.5 bg-gradient-to-r from-[#FFBF00] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
