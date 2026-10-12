"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "motion/react";
import { Github, Linkedin, MapPin } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { SocialProfile } from "@/data/socials";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/icons/animated";

/** Fired when a preview opens so any other open preview closes itself. */
const OPEN_EVENT = "social-preview:open";

const PLATFORM_GLYPH: Record<SocialProfile["id"], ReactNode> = {
  github: <Github size={14} />,
  linkedin: <Linkedin size={14} />,
  x: <SiX size={12} />,
};

const TRIGGER_ICON: Record<SocialProfile["id"], ReactNode> = {
  github: <GithubIcon size={13} />,
  linkedin: <LinkedinIcon size={13} />,
  x: <XIcon size={12} />,
};

/** Oversized watermark version of each platform mark for the banner. */
const WATERMARK: Record<SocialProfile["id"], ReactNode> = {
  github: <Github size={56} strokeWidth={1.2} />,
  linkedin: <Linkedin size={56} strokeWidth={1.2} />,
  x: <SiX size={40} />,
};

/**
 * Fixed-size avatar that can never collapse: the ring reserves space even
 * while the photo loads, and a failed load falls back to an initial.
 */
function Avatar({ profile: p }: { profile: SocialProfile }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full"
      style={{
        border: `2px solid ${p.accent}`,
        boxShadow: `0 0 0 3px var(--tip-bg), 0 8px 20px -10px ${p.accent}`,
        background: `${p.accent}26`,
      }}
    >
      {!failed ? (
        <Image
          src={p.avatar}
          alt={`${p.name} on ${p.label}`}
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center text-[15px] font-semibold"
          style={{ color: p.accent }}
        >
          {p.name.charAt(0)}
        </span>
      )}
    </span>
  );
}

/** Staged entrance: children rise in one after another on open. */
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
};

/**
 * The floating profile card itself: photo banner, avatar with
 * platform-color ring, name/handle, bio, stats, and a gradient CTA.
 * Dual-layered border: an outer accent-gradient hairline plus an inner
 * top highlight, so the card reads as two stacked rings.
 */
export function ProfileCard({ profile: p }: { profile: SocialProfile }) {
  return (
    <div
      className="rounded p-px"
      style={{
        background: `linear-gradient(165deg, ${p.accent}d9 0%, ${p.accent}40 32%, var(--tip-border) 60%, ${p.accent}59 100%)`,
      }}
    >
      <div
        className="overflow-hidden rounded-[3px]"
        style={{
          background: "var(--tip-bg)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.09), inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Banner */}
        <div className="relative h-[60px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
          >
            {p.banner ? (
              <Image
                src={p.banner}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(115deg, ${p.accent}59, ${p.accent}26)`,
                }}
              />
            )}
          </motion.div>
          {/* Accent tint + bottom blend into the card body */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, ${p.accent}4d 0%, transparent 55%), linear-gradient(to top, var(--tip-bg) 0%, transparent 72%)`,
            }}
          />
          {/* Watermark mark */}
          <div
            aria-hidden="true"
            className="absolute right-1 -bottom-3 rotate-[-8deg]"
            style={{ color: p.accent, opacity: 0.26 }}
          >
            {WATERMARK[p.id]}
          </div>
          {/* Shine sweep on open */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-12 rotate-[12deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            }}
            initial={{ x: "-100px" }}
            animate={{ x: "330px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          />
        </div>

        <motion.div
          variants={list}
          initial="hidden"
          animate="show"
          className="px-3 pt-0 pb-3"
        >
          <motion.div
            variants={rise}
            className="-mt-[20px] flex items-end justify-between gap-3"
          >
            <Avatar profile={p} />
            <span className="mb-1 text-muted">{PLATFORM_GLYPH[p.id]}</span>
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-1.5 truncate text-[13.5px] leading-tight font-semibold tracking-[-0.01em] text-primary"
          >
            {p.name}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-0.5 truncate text-[11.5px] text-muted"
          >
            {p.handle}
          </motion.p>

          {p.bio && (
            <motion.p
              variants={rise}
              className="mt-2 line-clamp-2 text-[12px] leading-snug text-secondary"
            >
              {p.bio}
            </motion.p>
          )}

          {(p.stats?.length || p.location) && (
            <motion.div
              variants={rise}
              className="mt-2 border-t pt-2"
              style={{ borderColor: "var(--tip-border)" }}
            >
              {p.stats?.length && (
                <div className="flex items-center gap-4 text-[11px] text-muted">
                  {p.stats.map((s) => (
                    <span key={s.label} className="whitespace-nowrap">
                      <span className="font-semibold text-primary">
                        {s.value}
                      </span>{" "}
                      {s.label}
                    </span>
                  ))}
                </div>
              )}
              {p.location && (
                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                  <MapPin size={11} className="shrink-0" />
                  <span className="truncate">{p.location}</span>
                </div>
              )}
            </motion.div>
          )}

          <motion.a
            variants={rise}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded border px-3 py-1.5 font-mono text-[11.5px] text-primary transition-colors"
            style={{
              background: "var(--badge-bg)",
              borderColor: "var(--badge-hover-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = p.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "var(--badge-hover-border)";
            }}
          >
            <span className="shrink-0">{PLATFORM_GLYPH[p.id]}</span>
            {p.cta}
            <ArrowUpRightIcon size={12} />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Wraps any trigger (icon, badge, row) and shows a profile preview card.
 * Desktop: hover/focus. Touch: first tap opens, second tap follows the link.
 */
export function SocialPreview({
  profile,
  children,
  side = "left",
  className = "",
}: {
  profile: SocialProfile;
  children: ReactNode;
  /** Which edge the card aligns to — use "right" near the viewport edge. */
  side?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // Touch devices get tap-to-open (first tap opens, second follows the link).
  const touchMode = useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(hover: none)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(hover: none)").matches,
    () => false,
  );
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Only one preview open at a time.
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOther);
    return () => window.removeEventListener(OPEN_EVENT, onOther);
  }, [id]);

  // Touch: close on outside tap. Both modes: Escape closes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  // Small delays so the card doesn't flicker while the pointer travels
  // between trigger and card.
  const show = (ms: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
      setOpen(true);
    }, ms);
  };
  const hide = (ms: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), ms);
  };

  return (
    <MotionConfig reducedMotion="user">
      <span
        ref={wrapRef}
        className={`relative ${open ? "[&>a]:bg-badge [&>a]:text-primary" : ""} ${className}`}
        onMouseEnter={touchMode ? undefined : () => show(120)}
        onMouseLeave={touchMode ? undefined : () => hide(150)}
        onFocusCapture={touchMode ? undefined : () => show(0)}
        onBlurCapture={touchMode ? undefined : () => hide(0)}
        onClickCapture={(e) => {
          // Touch: first tap opens the card instead of navigating;
          // second tap (card already open) follows the link.
          if (touchMode && !open) {
            e.preventDefault();
            show(0);
          }
        }}
      >
        {children}

        <AnimatePresence>
          {open && (
            <motion.div
              key="card"
              role="dialog"
              aria-label={`${profile.label} profile preview`}
              className={`absolute top-full z-30 mt-2 w-[260px] max-w-[calc(100vw-3rem)] rounded ${
                side === "right" ? "right-0" : "left-0"
              }`}
              style={{
                transformOrigin:
                  side === "right" ? "top right" : "top left",
                boxShadow:
                  "0 24px 60px -16px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.25)",
              }}
              initial={{ opacity: 0, y: 14, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: 8,
                scale: 0.96,
                filter: "blur(4px)",
                transition: { duration: 0.16, ease: "easeIn" },
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <ProfileCard profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </MotionConfig>
  );
}

/** Icon-only social links; each one opens a profile preview card. */
export function SocialLinks({
  profiles,
  className = "",
}: {
  profiles: SocialProfile[];
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {profiles.map((p) => (
        <SocialPreview key={p.id} profile={p}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={p.label}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-badge hover:text-primary"
          >
            {TRIGGER_ICON[p.id]}
          </a>
        </SocialPreview>
      ))}
    </div>
  );
}
