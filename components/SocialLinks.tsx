"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Github, Linkedin, MapPin } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import { useRef, useState, type ReactNode } from "react";
import type { SocialProfile } from "@/data/socials";

const ICONS: Record<SocialProfile["id"], ReactNode> = {
  github: <Github size={15} />,
  linkedin: <Linkedin size={15} />,
  x: <SiX size={13} />,
};

/**
 * Icon-only social links. Hovering one opens a profile preview card
 * (banner, avatar, bio, stats) — the link itself still opens the profile.
 */
export function SocialLinks({
  profiles,
  className = "",
}: {
  profiles: SocialProfile[];
  className?: string;
}) {
  const [open, setOpen] = useState<SocialProfile["id"] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Small delays so the card doesn't flicker while the pointer travels between icon and card.
  const schedule = (id: SocialProfile["id"] | null, ms: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(id), ms);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`flex items-center gap-1 ${className}`}>
        {profiles.map((p) => (
          <div
            key={p.id}
            className="relative"
            onMouseEnter={() => schedule(p.id, 120)}
            onMouseLeave={() => schedule(null, 150)}
          >
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={p.label}
              onFocus={() => schedule(p.id, 0)}
              onBlur={() => schedule(null, 0)}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                open === p.id
                  ? "bg-badge text-primary"
                  : "text-muted hover:bg-badge hover:text-primary"
              }`}
            >
              {ICONS[p.id]}
            </a>

            <AnimatePresence>
              {open === p.id && (
                <motion.div
                  key="card"
                  role="dialog"
                  aria-label={`${p.label} profile preview`}
                  className="absolute top-full left-0 z-30 mt-2 w-[280px] rounded-xl border p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.15)]"
                  style={{
                    background: "var(--tip-bg)",
                    borderColor: "var(--tip-border)",
                    transformOrigin: "top left",
                  }}
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: 4,
                    scale: 0.98,
                    transition: { duration: 0.12 },
                  }}
                  transition={{
                    type: "spring",
                    visualDuration: 0.26,
                    bounce: 0.15,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={p.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] leading-tight font-semibold text-primary">
                        {p.name}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-muted">
                        {p.handle}
                      </p>
                    </div>
                    <span className="shrink-0 text-muted">{ICONS[p.id]}</span>
                  </div>

                  {p.bio && (
                    <p className="mt-3 text-[13px] leading-snug text-secondary">
                      {p.bio}
                    </p>
                  )}

                  {(p.stats?.length || p.location) && (
                    <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-muted">
                      {p.stats?.length ? (
                        <span className="flex items-center gap-1.5">
                          {p.stats.map((s, i) => (
                            <span
                              key={s.label}
                              className="flex items-center gap-1.5"
                            >
                              {i > 0 && <span aria-hidden="true">·</span>}
                              <span>
                                <span className="font-medium text-primary">
                                  {s.value}
                                </span>{" "}
                                {s.label}
                              </span>
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span />
                      )}
                      {p.location && (
                        <span className="flex min-w-0 items-center gap-1">
                          <MapPin size={11} className="shrink-0" />
                          <span className="truncate">{p.location}</span>
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </MotionConfig>
  );
}
