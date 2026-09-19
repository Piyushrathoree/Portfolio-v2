"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/* ---------- data ---------- */

export type ContributionDay = {
  /** YYYY-MM-DD */
  date: string;
  count: number;
  /** 0 = none … 4 = most, as bucketed by GitHub. */
  level: 0 | 1 | 2 | 3 | 4;
};

/* ---------- colour ---------- */

/** Named presets. Any CSS colour string works too — the ramp is derived from it. */
export const PRESETS = {
  github: "#26a641",
  emerald: "#10b981",
  ocean: "#06b6d4",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  orange: "#f97316",
  mono: "#8a8a8a",
} as const;

export type Preset = keyof typeof PRESETS;
export type Color = Preset | (string & {});

/**
 * Turns one base colour into a 4-step ramp for light and dark, exposed as
 * `--cg-1…4` (plus a neutral `--cg-0`). Uses `color-mix()` + `light-dark()`,
 * so it follows the page's `color-scheme` with no JS or extra CSS.
 */
export function colorVars(color: Color): CSSProperties {
  const c = (PRESETS as Record<string, string>)[color] ?? color;
  const mix = (pct: number, w: "white" | "black") =>
    `color-mix(in oklab, ${c} ${pct}%, ${w})`;
  const light = [mix(35, "white"), mix(65, "white"), c, mix(75, "black")];
  const dark = [mix(45, "black"), mix(70, "black"), c, mix(70, "white")];
  const vars: Record<string, string> = {
    "--cg-0": "light-dark(rgb(0 0 0 / 0.07), rgb(255 255 255 / 0.08))",
    "--cg-label": "light-dark(#737373, #8a8a8a)",
    "--cg-tip-bg": "light-dark(#ffffff, #1c1c1c)",
    "--cg-tip-border": "light-dark(#e5e5e5, #333333)",
    "--cg-tip-fg": "light-dark(#171717, #fafafa)",
    "--cg-tip-muted": "light-dark(#737373, #a3a3a3)",
  };
  light.forEach(
    (l, i) => (vars[`--cg-${i + 1}`] = `light-dark(${l}, ${dark[i]})`),
  );
  return vars as CSSProperties;
}

/* ---------- geometry ---------- */

export const CELL = 12;
export const GAP = 2.5;
export const STEP = CELL + GAP;
/** Room inside the viewBox so hover scale on edge cells isn't clipped. */
export const PAD = 2;
export const GRID_H = 7 * STEP - GAP;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function toWeeks(days: ContributionDay[]) {
  // Pad the first week so every column starts on Sunday.
  const pad = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells: (ContributionDay | null)[] = [
    ...Array<null>(pad).fill(null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function monthLabels(weeks: (ContributionDay | null)[][]) {
  const out: { week: number; text: string }[] = [];
  let prev = -1;
  weeks.forEach((week, i) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = new Date(`${first.date}T00:00:00`).getMonth();
    if (m !== prev) {
      out.push({ week: i, text: MONTHS[m] });
      prev = m;
    }
  });
  if (out.length > 1 && out[1].week - out[0].week < 3) out.shift();
  return out;
}

/* ---------- formatting ---------- */

const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", opts);
export const fullDay = (d: string) =>
  fmt(d, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
export const shortDay = (d: string) =>
  fmt(d, { month: "short", day: "numeric" });
export const countLabel = (n: number) =>
  n === 0 ? "No contributions" : `${n} contribution${n === 1 ? "" : "s"}`;

/* ---------- motion ---------- */

export const SPRING = {
  type: "spring",
  visualDuration: 0.45,
  bounce: 0.15,
} as const;
/** Columns fire left to right; each week's children start together. */
export const colVariants = (i: number) => ({
  hidden: {},
  show: { transition: { delayChildren: i * 0.012 } },
});

export type AnimateOn = "view" | "mount" | "none";
export function rootAnimation(animateOn: AnimateOn) {
  if (animateOn === "view")
    return {
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, amount: 0.25 },
    } as const;
  if (animateOn === "mount")
    return { initial: "hidden", animate: "show" } as const;
  return { initial: false } as const;
}

/* ---------- shared props ---------- */

export type BaseProps = {
  days: ContributionDay[];
  /** Shown in the footer as "N contributions in the last year". */
  total?: number;
  /** Preset name or any CSS colour, e.g. "emerald" or "#e8a87c". */
  color?: Color;
  /** Fade level-0 cells so only activity stands out. */
  hideEmpty?: boolean;
  /** Play the entrance when scrolled into view (default), immediately, or never. */
  animateOn?: AnimateOn;
  showMonths?: boolean;
  showLegend?: boolean;
  showTotal?: boolean;
  /** Footer label. `{total}` is replaced with the formatted number. */
  totalLabel?: string;
  className?: string;
};

/* ---------- tooltip ---------- */

export type Tip = {
  x: number;
  y: number;
  level: number;
  title: string;
  subtitle: string;
};

/** Position state + a `show(el, content)` helper that maps an SVG element to wrapper coords. */
export function useTooltip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const show = (el: SVGElement, next: Omit<Tip, "x" | "y">) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // CSS `zoom` on an ancestor scales client rects; undo it so the tooltip lands on the cell.
    const zoom =
      (wrap as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;
    setTip({
      x: (r.left + r.width / 2 - w.left) / zoom,
      y: (r.top - w.top) / zoom,
      ...next,
    });
  };

  return { wrapRef, tip, show, hide: () => setTip(null) };
}

export function Tooltip({
  tip,
  wrapRef,
  radius,
}: {
  tip: Tip | null;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  radius: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  // Keep the bubble inside the wrapper when hovering near either edge.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const el = ref.current;
    if (!tip || !wrap || !el) return;
    const half = el.offsetWidth / 2;
    setShift(
      Math.min(0, wrap.clientWidth - (tip.x + half)) +
        Math.max(0, half - tip.x),
    );
  }, [tip, wrapRef]);

  return (
    <AnimatePresence>
      {tip && (
        <motion.div
          key="tip"
          className="pointer-events-none absolute top-0 left-0 z-10"
          initial={{ x: tip.x + shift, y: tip.y }}
          animate={{ x: tip.x + shift, y: tip.y }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 45,
            mass: 0.6,
          }}
        >
          <motion.div
            ref={ref}
            role="tooltip"
            className="relative rounded-md border px-2.5 py-1.5 whitespace-nowrap shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.25)]"
            style={{
              translate: "-50% calc(-100% - 10px)",
              background: "var(--cg-tip-bg)",
              borderColor: "var(--cg-tip-border)",
              color: "var(--cg-tip-fg)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 2,
              transition: { duration: 0.12 },
            }}
            transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-[9px] w-[9px] shrink-0"
                style={{
                  background: `var(--cg-${tip.level})`,
                  borderRadius: radius,
                }}
              />
              <span className="text-[12.5px] font-medium">{tip.title}</span>
            </div>
            {tip.subtitle && (
              <div
                className="mt-0.5 pl-[17px] text-[11px]"
                style={{ color: "var(--cg-tip-muted)" }}
              >
                {tip.subtitle}
              </div>
            )}
            {/* caret — stays over the cell even when the bubble is clamped at an edge */}
            <span
              aria-hidden="true"
              className="absolute -bottom-[5px] h-2 w-2 rotate-45 border-r border-b"
              style={{
                left: `calc(50% - ${shift}px)`,
                translate: "-50% 0",
                background: "var(--cg-tip-bg)",
                borderColor: "var(--cg-tip-border)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- footer ---------- */

export function Footer({
  total,
  totalLabel,
  showTotal,
  showLegend,
  radius,
}: {
  total?: number;
  totalLabel: string;
  showTotal: boolean;
  showLegend: boolean;
  radius: string | number;
}) {
  if (!showTotal && !showLegend) return null;
  return (
    <div
      className="mt-3 flex items-center justify-between text-[11.5px]"
      style={{ color: "var(--cg-label)" }}
    >
      <span>
        {showTotal && total != null
          ? totalLabel.replace("{total}", total.toLocaleString())
          : ""}
      </span>
      {showLegend && (
        <span className="flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              className="mx-px inline-block h-[9px] w-[9px]"
              style={{ background: `var(--cg-${l})`, borderRadius: radius }}
            />
          ))}
          More
        </span>
      )}
    </div>
  );
}

export function MonthLabels({
  weeks,
  left,
}: {
  weeks: (ContributionDay | null)[][];
  left: number;
}) {
  return (
    <>
      {monthLabels(weeks).map((m) => (
        <text
          key={m.text + m.week}
          x={left + m.week * STEP}
          y={PAD + 10}
          fill="var(--cg-label)"
        >
          {m.text}
        </text>
      ))}
    </>
  );
}
