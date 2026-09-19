"use client";

import {
  motion,
  useAnimation,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ComponentProps } from "react";

/**
 * Animated line icons (lucide geometry, Motion for the movement).
 * Adapted from pqoqubbw/icons (MIT).
 *
 * Each icon animates when its nearest `a`, `button` or `[data-hover]`
 * ancestor is hovered or focused — so a plain server-rendered link gets
 * the effect with no wrapper changes. Drop one in like a lucide icon:
 *
 *   <a className="badge"><MailIcon size={13} /> Email</a>
 */
type IconProps = { size?: number; className?: string; strokeWidth?: number };

function useHoverControls() {
  const ref = useRef<SVGSVGElement>(null);
  const controls = useAnimation();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = ref.current;
    const el =
      svg?.closest<HTMLElement>("a, button, [data-hover]") ??
      svg?.parentElement;
    if (!el) return;
    const on = () => void controls.start("hover");
    const off = () => void controls.start("normal");
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    el.addEventListener("focus", on);
    el.addEventListener("blur", off);
    return () => {
      el.removeEventListener("mouseenter", on);
      el.removeEventListener("mouseleave", off);
      el.removeEventListener("focus", on);
      el.removeEventListener("blur", off);
    };
  }, [controls, reduced]);

  return { ref, controls };
}

function Svg({
  size = 14,
  className,
  strokeWidth = 2,
  children,
  ...rest
}: IconProps & Omit<ComponentProps<typeof motion.svg>, "ref">) {
  const { ref, controls } = useHoverControls();
  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 overflow-visible ${className ?? ""}`}
      aria-hidden="true"
      initial="normal"
      animate={controls}
      {...rest}
    >
      {children}
    </motion.svg>
  );
}

/** Draws a stroke from nothing. */
const draw = (duration = 0.5, delay = 0): Variants => ({
  normal: {
    pathLength: 1,
    pathOffset: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  hover: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
    transition: {
      duration,
      delay,
      ease: "easeInOut",
      opacity: { duration: 0.1, delay },
    },
  },
});

/* ---------- brand ---------- */

export function GithubIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        variants={{
          normal: {
            opacity: 1,
            pathLength: 1,
            scale: 1,
            transition: { duration: 0.3 },
          },
          hover: {
            opacity: [0, 1],
            pathLength: [0, 1],
            scale: [0.9, 1],
            transition: { duration: 0.4 },
          },
        }}
      />
      <motion.path
        d="M9 18c-4.51 2-5-2-7-2"
        style={{ originX: 1, originY: 0 }}
        variants={{
          normal: { pathLength: 1, rotate: 0, transition: { duration: 0.3 } },
          hover: {
            pathLength: [0, 1, 1, 1, 1, 1],
            rotate: [0, 0, -12, 12, -8, 0],
            transition: {
              duration: 1.1,
              ease: "easeInOut",
              times: [0, 0.4, 0.55, 0.7, 0.85, 1],
            },
          },
        }}
      />
    </Svg>
  );
}

export function LinkedinIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        variants={draw(0.6)}
      />
      <motion.rect
        width="4"
        height="12"
        x="2"
        y="9"
        variants={draw(0.5, 0.1)}
      />
      <motion.circle cx="4" cy="4" r="2" variants={draw(0.4, 0.2)} />
    </Svg>
  );
}

/** X (formerly Twitter) logomark — filled, so it pops instead of drawing. */
export function XIcon(p: IconProps) {
  return (
    <Svg {...p} fill="currentColor" stroke="none">
      <motion.path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          normal: { scale: 1, rotate: 0 },
          hover: {
            scale: [1, 0.8, 1.08, 1],
            rotate: [0, -8, 4, 0],
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
      />
    </Svg>
  );
}

/* ---------- actions ---------- */

export function MailIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <motion.path
        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        variants={{
          normal: { pathLength: 1, opacity: 1, y: 0 },
          hover: {
            pathLength: [0, 1],
            opacity: [0, 1],
            y: [-1.5, 0],
            transition: { duration: 0.45, ease: "easeOut" },
          },
        }}
      />
    </Svg>
  );
}

export function CalendarIcon(p: IconProps) {
  const dots = [8, 12, 16].flatMap((cx) => [14, 18].map((cy) => ({ cx, cy })));
  return (
    <Svg {...p}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="1"
          fill="currentColor"
          stroke="none"
          custom={i}
          variants={{
            normal: { opacity: 1, transition: { duration: 0.2 } },
            hover: (n: number) => ({
              opacity: [1, 0.2, 1],
              transition: { delay: n * 0.07, duration: 0.4 },
            }),
          }}
        />
      ))}
    </Svg>
  );
}

export function FileTextIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <motion.path d="M10 9H8" variants={draw(0.3, 0)} />
      <motion.path d="M16 13H8" variants={draw(0.35, 0.1)} />
      <motion.path d="M16 17H8" variants={draw(0.35, 0.2)} />
    </Svg>
  );
}

export function GitMergeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.circle cx="18" cy="18" r="3" variants={draw(0.3, 0)} />
      <motion.path d="M6 21V9a9 9 0 0 0 9 9" variants={draw(0.4, 0.15)} />
      <motion.circle cx="6" cy="6" r="3" variants={draw(0.3, 0.45)} />
    </Svg>
  );
}

export function SunIcon(p: IconProps) {
  const rays = [
    "M12 2v2",
    "m19.07 4.93-1.41 1.41",
    "M20 12h2",
    "m17.66 17.66 1.41 1.41",
    "M12 20v2",
    "m6.34 17.66-1.41 1.41",
    "M2 12h2",
    "m4.93 4.93 1.41 1.41",
  ];
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      {rays.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          custom={i}
          variants={{
            normal: { opacity: 1 },
            hover: (n: number) => ({
              opacity: [0, 1],
              transition: { delay: n * 0.06, duration: 0.25 },
            }),
          }}
        />
      ))}
    </Svg>
  );
}

export function MoonIcon(p: IconProps) {
  return (
    <Svg
      {...p}
      style={{ originX: 0.5, originY: 0.5 }}
      variants={{
        normal: { rotate: 0 },
        hover: {
          rotate: [0, -12, 12, -6, 6, 0],
          transition: { duration: 0.7 },
        },
      }}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.path
        d="m6 9 6 6 6-6"
        variants={{
          normal: { y: 0 },
          hover: {
            y: [0, 2.5, 0],
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      />
    </Svg>
  );
}

export function ArrowLeftIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.g
        variants={{
          normal: { x: 0 },
          hover: {
            x: [0, -3, 0],
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </motion.g>
    </Svg>
  );
}

export function ArrowUpRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.g
        variants={{
          normal: { x: 0, y: 0 },
          hover: {
            x: [0, 2.5, 0],
            y: [0, -2.5, 0],
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
      >
        <path d="M7 7h10" />
        <path d="M17 7v10" />
        <path d="M7 17 17 7" />
      </motion.g>
    </Svg>
  );
}

export function MapPinIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <motion.g
        variants={{
          normal: { y: 0 },
          hover: {
            y: [0, -2.5, 0, -1, 0],
            transition: { duration: 0.6, ease: "easeInOut" },
          },
        }}
      >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </motion.g>
    </Svg>
  );
}
