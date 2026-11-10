'use client';

import { Avatar } from '@base-ui/react/avatar';
import { Button } from '@base-ui/react/button';
import { Checkbox } from '@base-ui/react/checkbox';
import { Progress } from '@base-ui/react/progress';
import { Slider } from '@base-ui/react/slider';
import { Switch } from '@base-ui/react/switch';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { RiAddLine, RiCheckLine, RiSubtractLine } from 'react-icons/ri';

/**
 * A design system, shown with the real thing: every control here is a working
 * Base UI component styled with this site's tokens. The type specimen, swatch
 * and heading scale have no Base UI equivalent, so they are plain markup.
 *
 * The composition is laid out on a fixed 500 x 400 stage and scaled to fit
 * its column, so the arrangement stays intact from phone to desktop.
 */
const STAGE_W = 500;
const STAGE_H = 400;

const DEFAULTS = {
  weight: 600,
  letterCase: 'Aa',
  progress: 64,
  tokens: true,
  rules: false,
  agents: true,
};

const CASES: Record<string, string> = { Aa: 'none', AA: 'uppercase', aa: 'lowercase' };

/** One-pixel top highlight, where light catches the edge. Composes with shadow-*. */
const highlight =
  'inset-shadow-[0_1px_0_rgb(255_255_255/0.9)] dark:inset-shadow-[0_1px_0_rgb(255_255_255/0.07)]';
/** Stronger highlight for filled accent surfaces. */
const highlightOnAccent = 'inset-shadow-[0_1px_0_rgb(255_255_255/0.28)]';

const tile = 'absolute rounded-[20px] bg-canvas shadow-surface ring-1 ring-line/60 ' + highlight;
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function Place({
  x,
  y,
  w,
  h,
  className = '',
  children,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y, width: w, height: h }}>
      {children}
    </div>
  );
}

function PanelCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onChange}
        className={`flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-canvas text-on-accent ring-1 ring-line ${highlight} data-checked:inset-shadow-[0_1px_0_rgb(255_255_255/0.28)] transition-colors duration-150 data-checked:bg-accent data-checked:ring-accent ${focusRing}`}
      >
        <Checkbox.Indicator className="flex data-unchecked:hidden">
          <RiCheckLine className="size-4" aria-hidden />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {children}
    </label>
  );
}

export default function DesignSystemIllustration({ className = '' }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [letterCase, setLetterCase] = useState(DEFAULTS.letterCase);
  const [progress, setProgress] = useState(DEFAULTS.progress);
  const [tokens, setTokens] = useState(DEFAULTS.tokens);
  const [rules, setRules] = useState(DEFAULTS.rules);
  const [agents, setAgents] = useState(DEFAULTS.agents);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setScale(Math.min(1.15, frame.clientWidth / STAGE_W));
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  const reset = () => {
    setWeight(DEFAULTS.weight);
    setLetterCase(DEFAULTS.letterCase);
    setProgress(DEFAULTS.progress);
    setTokens(DEFAULTS.tokens);
    setRules(DEFAULTS.rules);
    setAgents(DEFAULTS.agents);
  };

  const shipped = progress >= 100;

  const step = (delta: number) => setProgress((p) => Math.max(0, Math.min(100, p + delta)));

  return (
    <div
      ref={frameRef}
      role="group"
      aria-label="Working sample of this site's design system components"
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: STAGE_H * scale }}
    >
      {/* Dot grid, like a canvas in a design tool. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          color: 'var(--line)',
        }}
      />

      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})` }}
      >
        {/* Type specimen: the slider sets the weight, the toggle group sets the case. */}
        <div className={`${tile} p-5`} style={{ left: 24, top: 28, width: 168, height: 184 }}>
          <p className="text-[12px] font-medium text-ink-muted">Typeface</p>
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Geist Sans</p>
          <p
            aria-hidden
            className="mt-3 text-[84px] leading-none tracking-[-0.04em] text-ink transition-[font-weight] duration-150"
            style={{ fontWeight: weight, textTransform: CASES[letterCase] as 'none' }}
          >
            Aa
          </p>
        </div>

        <div className={`${tile} px-4 py-3`} style={{ left: 24, top: 224, width: 168, height: 68 }}>
          <Slider.Root
            value={weight}
            onValueChange={(value) => setWeight(Array.isArray(value) ? value[0] : value)}
            min={300}
            max={800}
            step={100}
          >
            <div className="flex items-baseline justify-between text-[12px] font-medium">
              <span className="text-ink-muted">Weight</span>
              <span className="tabular-nums text-ink">{weight}</span>
            </div>
            <Slider.Control className="flex w-full touch-none items-center py-2 select-none">
              <Slider.Track className="h-1.5 w-full rounded-full bg-surface-muted select-none">
                <Slider.Indicator className="rounded-full bg-accent select-none" />
                <Slider.Thumb
                  aria-label="Font weight"
                  className={`size-4 rounded-full bg-surface shadow-popover ring-2 ring-accent ${highlight} select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent`}
                />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
        </div>

        <Place x={28} y={312} w={164} className="flex flex-col gap-3">
          <PanelCheckbox checked={tokens} onChange={setTokens}>
            Tokens
          </PanelCheckbox>
          <PanelCheckbox checked={rules} onChange={setRules}>
            Agent rules
          </PanelCheckbox>
        </Place>

        {/* Buttons. Ship fills the progress, Reset puts every control back. */}
        <Place x={208} y={28} w={148} h={44}>
          <Button
            onClick={() => setProgress(100)}
            className={`flex size-full items-center justify-center rounded-2xl bg-accent text-[15px] font-semibold text-on-accent shadow-surface ${highlightOnAccent} transition-[background-color,transform] duration-150 hover:bg-accent-strong active:scale-[0.97] ${focusRing}`}
          >
            Ship it
          </Button>
        </Place>
        <Place x={208} y={84} w={148} h={44}>
          <Button
            onClick={reset}
            className={`flex size-full items-center justify-center rounded-2xl bg-canvas shadow-surface ring-1 ring-line/60 ${highlight} text-[15px] font-semibold text-ink transition-[background-color,transform] duration-150 hover:bg-surface-muted active:scale-[0.97] ${focusRing}`}
          >
            Reset
          </Button>
        </Place>

        {/* Colour token, in the shape of a swatch card. */}
        <div
          className={`${tile} flex flex-col overflow-hidden`}
          style={{ left: 208, top: 140, width: 148, height: 172 }}
        >
          <div className="flex-1 bg-accent" />
          <div className="px-4 py-3">
            <p className="text-[14px] font-semibold text-ink">Accent</p>
            <p className="font-mono text-[11px] text-ink-muted">--accent</p>
          </div>
        </div>

        <Place x={208} y={324} w={148} h={48}>
          <ToggleGroup
            aria-label="Letter case"
            value={[letterCase]}
            onValueChange={(value) => value[0] && setLetterCase(value[0])}
            className={`flex size-full items-center gap-1 rounded-2xl bg-canvas shadow-surface ring-1 ring-line/60 p-1 ${highlight}`}
          >
            {Object.keys(CASES).map((value) => (
              <Toggle
                key={value}
                value={value}
                aria-label={`Case ${value}`}
                className="flex h-full flex-1 items-center justify-center rounded-xl text-[14px] font-semibold text-ink-muted transition-colors duration-150 hover:text-ink data-pressed:bg-accent-soft data-pressed:text-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
              >
                {value}
              </Toggle>
            ))}
          </ToggleGroup>
        </Place>

        {/* Icon buttons step the progress. */}
        <Place x={372} y={28} w={108} className="flex gap-3">
          <Button
            aria-label="Decrease progress"
            onClick={() => step(-12)}
            className={`grid size-12 place-items-center rounded-full bg-canvas shadow-surface ring-1 ring-line/60 ${highlight} text-accent transition-transform duration-150 active:scale-[0.94] ${focusRing}`}
          >
            <RiSubtractLine className="size-5" aria-hidden />
          </Button>
          <Button
            aria-label="Increase progress"
            onClick={() => step(12)}
            className={`grid size-12 place-items-center rounded-full bg-accent-soft text-accent shadow-surface ring-1 ring-line/60 ${highlight} transition-transform duration-150 active:scale-[0.94] ${focusRing}`}
          >
            <RiAddLine className="size-5" aria-hidden />
          </Button>
        </Place>

        <div
          className={`${tile} flex items-center justify-between rounded-full pl-3 pr-2`}
          style={{ left: 372, top: 88, width: 108, height: 44 }}
        >
          <label className="flex w-full items-center justify-between text-[13px] font-semibold text-ink">
            Agents
            <Switch.Root
              checked={agents}
              onCheckedChange={setAgents}
              className="flex h-6 w-10 shrink-0 rounded-full bg-surface-muted p-0.5 transition-colors duration-150 data-checked:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Switch.Thumb
                className={`size-5 rounded-full bg-surface shadow-surface ${highlight} transition-transform duration-150 data-checked:translate-x-4`}
              />
            </Switch.Root>
          </label>
        </div>

        {/* Heading scale, set straight on the canvas. */}
        <Place x={372} y={144} w={120} className="space-y-1.5 text-ink">
          <p className="text-[21px] font-semibold leading-tight tracking-[-0.02em]">Heading 1</p>
          <p className="text-[17px] font-semibold leading-tight tracking-[-0.015em]">Heading 2</p>
          <p className="text-[14px] font-semibold leading-tight">Heading 3</p>
          <p className="text-[11px] leading-snug text-ink-muted">Body text</p>
          <p className="text-[11px] leading-snug underline underline-offset-2 text-accent">Link</p>
        </Place>

        <div
          className={`${tile} px-3.5 py-3`}
          style={{ left: 372, top: 276, width: 108, height: 96 }}
        >
          <Progress.Root
            value={progress}
            className="grid grid-cols-[1fr_auto] items-baseline gap-y-2"
          >
            <Progress.Label className="text-[12px] font-medium text-ink-muted">
              Shipped
            </Progress.Label>
            <Progress.Value
              className={`text-[12px] font-semibold tabular-nums transition-colors duration-300 ${shipped ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink'}`}
            >
              {(_formatted, value) => `${value ?? 0}%`}
            </Progress.Value>
            <Progress.Track className="col-span-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <Progress.Indicator
                className={`rounded-full transition-[width,background-color] duration-300 ease-out ${shipped ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-accent'}`}
              />
            </Progress.Track>
          </Progress.Root>
          <div className="mt-3 flex -space-x-1">
            {['OP', 'LK', 'AI'].map((initials) => (
              <Avatar.Root
                key={initials}
                className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent ring-2 ring-canvas select-none"
              >
                {initials}
              </Avatar.Root>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
