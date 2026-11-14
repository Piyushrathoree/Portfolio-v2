"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades + lifts its children in the first time they scroll into view.
 * Wrap sections/cards with it for a calm, consistent page rhythm.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Seconds. Use to stagger sibling blocks. */
  delay?: number;
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        // Trigger as soon as the top edge enters (not a % of height), so tall
        // sections like Projects don't sit blank while their first card is on screen.
        viewport={{ once: true, amount: "some", margin: "0px 0px -24px 0px" }}
        transition={{ type: "spring", visualDuration: 0.5, bounce: 0, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
