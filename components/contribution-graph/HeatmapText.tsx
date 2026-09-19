"use client";

import { motion, MotionConfig } from "motion/react";
import { colorVars, type Color } from "./shared";

/**
 * HeatmapText — spells text out as a contribution-style heatmap.
 * 5×7 pixel font (A–Z, 0–9, space, a few symbols). Lit cells stagger in
 * column by column; every cell reacts to hover.
 *
 *   <HeatmapText text="404" />
 *   <HeatmapText text="HELLO" color="#e8a87c" twinkle={false} />
 */
export type HeatmapTextProps = {
  text: string;
  /** Preset name or any CSS colour. */
  color?: Color;
  /** Faintly light a few background cells. */
  twinkle?: boolean;
  /** Play the entrance on mount (default) or render settled. */
  animate?: boolean;
  /** Max rendered width in px; the grid scales down to fit its container. */
  maxWidth?: number;
  className?: string;
};

// prettier-ignore
const GLYPHS: Record<string, string[]> = {
  A: ["01110","10001","10001","11111","10001","10001","10001"],
  B: ["11110","10001","10001","11110","10001","10001","11110"],
  C: ["01110","10001","10000","10000","10000","10001","01110"],
  D: ["11100","10010","10001","10001","10001","10010","11100"],
  E: ["11111","10000","10000","11110","10000","10000","11111"],
  F: ["11111","10000","10000","11110","10000","10000","10000"],
  G: ["01110","10001","10000","10111","10001","10001","01111"],
  H: ["10001","10001","10001","11111","10001","10001","10001"],
  I: ["01110","00100","00100","00100","00100","00100","01110"],
  J: ["00111","00010","00010","00010","00010","10010","01100"],
  K: ["10001","10010","10100","11000","10100","10010","10001"],
  L: ["10000","10000","10000","10000","10000","10000","11111"],
  M: ["10001","11011","10101","10101","10001","10001","10001"],
  N: ["10001","10001","11001","10101","10011","10001","10001"],
  O: ["01110","10001","10001","10001","10001","10001","01110"],
  P: ["11110","10001","10001","11110","10000","10000","10000"],
  Q: ["01110","10001","10001","10001","10101","10010","01101"],
  R: ["11110","10001","10001","11110","10100","10010","10001"],
  S: ["01111","10000","10000","01110","00001","00001","11110"],
  T: ["11111","00100","00100","00100","00100","00100","00100"],
  U: ["10001","10001","10001","10001","10001","10001","01110"],
  V: ["10001","10001","10001","10001","10001","01010","00100"],
  W: ["10001","10001","10001","10101","10101","10101","01010"],
  X: ["10001","10001","01010","00100","01010","10001","10001"],
  Y: ["10001","10001","01010","00100","00100","00100","00100"],
  Z: ["11111","00001","00010","00100","01000","10000","11111"],
  "0": ["01110","10001","10011","10101","11001","10001","01110"],
  "1": ["00100","01100","00100","00100","00100","00100","01110"],
  "2": ["01110","10001","00001","00010","00100","01000","11111"],
  "3": ["11111","00010","00100","00010","00001","10001","01110"],
  "4": ["00010","00110","01010","10010","11111","00010","00010"],
  "5": ["11111","10000","11110","00001","00001","10001","01110"],
  "6": ["00110","01000","10000","11110","10001","10001","01110"],
  "7": ["11111","00001","00010","00100","01000","01000","01000"],
  "8": ["01110","10001","10001","01110","10001","10001","01110"],
  "9": ["01110","10001","10001","01111","00001","00010","01100"],
  " ": ["00000","00000","00000","00000","00000","00000","00000"],
  "!": ["00100","00100","00100","00100","00100","00000","00100"],
  "?": ["01110","10001","00001","00010","00100","00000","00100"],
  ".": ["00000","00000","00000","00000","00000","00000","00100"],
  "-": ["00000","00000","00000","11111","00000","00000","00000"],
  "/": ["00001","00010","00010","00100","01000","01000","10000"],
  "<": ["00010","00100","01000","10000","01000","00100","00010"],
  ">": ["01000","00100","00010","00001","00010","00100","01000"],
  "_": ["00000","00000","00000","00000","00000","00000","11111"],
};

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const PADX = 1;
const ROWS = 7;

/** Deterministic pseudo-random so server and client agree. */
const noise = (i: number) => ((i * 2654435761) >>> 0) % 100;

export function HeatmapText({
  text,
  color = "github",
  twinkle = true,
  animate = true,
  maxWidth = 420,
  className = "",
}: HeatmapTextProps) {
  const chars = text
    .toUpperCase()
    .split("")
    .map((c) => GLYPHS[c] ?? GLYPHS["?"]);
  if (!chars.length) return null;

  const cols = PADX * 2 + chars.length * 5 + (chars.length - 1);
  const width = cols * STEP - GAP;
  const height = ROWS * STEP - GAP;

  const cells: { x: number; y: number; level: number; i: number; col: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const gc = c - PADX;
      const ci = Math.floor(gc / 6);
      const within = gc - ci * 6;
      const lit = gc >= 0 && ci < chars.length && within < 5 && chars[ci][r][within] === "1";
      const n = noise(i);
      // Lit glyphs sit at levels 3–4; the background twinkles faintly at 0–1.
      const level = lit ? (n < 35 ? 4 : 3) : twinkle && n < 12 ? 1 : 0;
      cells.push({ x: c * STEP, y: r * STEP, level, i, col: c });
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div style={colorVars(color)} className={className}>
        <motion.svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          className="block overflow-visible"
          style={{ maxWidth: Math.min(maxWidth, width) }}
          role="img"
          aria-label={text}
          initial={animate ? "hidden" : false}
          animate="show"
        >
          {cells.map((cell) => (
            <motion.rect
              key={cell.i}
              x={cell.x}
              y={cell.y}
              width={CELL}
              height={CELL}
              rx={2.5}
              fill={`var(--cg-${cell.level})`}
              variants={{
                hidden: { opacity: 0, scale: 0.4 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    visualDuration: 0.45,
                    bounce: 0.2,
                    delay: cell.col * 0.035 + (cell.level >= 3 ? 0.25 : 0),
                  },
                },
              }}
              whileHover={{ scale: 1.35 }}
            />
          ))}
        </motion.svg>
      </div>
    </MotionConfig>
  );
}
