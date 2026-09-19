"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import {
  ContributionBars,
  ContributionGraph,
  type ContributionDay,
} from "@/components/contribution-graph";

type Mode = "weekly" | "daily";

const MODES: { id: Mode; label: string }[] = [
  { id: "weekly", label: "Weekly" },
  { id: "daily", label: "Daily" },
];

/**
 * Homepage GitHub activity: section header with a small Weekly / Daily
 * toggle, and one graph card below it.
 */
export function ActivityGraph({
  days,
  total,
}: {
  days: ContributionDay[];
  total: number;
}) {
  const [mode, setMode] = useState<Mode>("weekly");
  // First graph plays when scrolled into view; after a toggle it should play immediately.
  const [switched, setSwitched] = useState(false);
  const animateOn = switched ? "mount" : "view";
  const pick = (m: Mode) => {
    if (m === mode) return;
    setSwitched(true);
    setMode(m);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="section-title mb-0">GitHub activity</h2>

        {/* Segmented toggle: quiet track, the active pill slides between options. */}
        <div
          role="radiogroup"
          aria-label="Graph view"
          className="relative flex rounded-full bg-badge p-0.5"
        >
          {MODES.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => pick(m.id)}
                className={`relative h-6 rounded-full px-3 text-[11.5px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted hover:text-secondary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activity-toggle"
                    className="absolute inset-0 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--badge-hover-border)",
                    }}
                    transition={{
                      type: "spring",
                      visualDuration: 0.25,
                      bounce: 0.15,
                    }}
                  />
                )}
                <span className="relative">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card p-3 sm:p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
          >
            {mode === "weekly" ? (
              <ContributionBars
                days={days}
                total={total}
                animateOn={animateOn}
              />
            ) : (
              <ContributionGraph
                days={days}
                total={total}
                variant="dots"
                animateOn={animateOn}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
