"use client";

import { motion, MotionConfig } from "motion/react";
import {
  CELL,
  Footer,
  GAP,
  GRID_H,
  MonthLabels,
  PAD,
  SPRING,
  STEP,
  Tooltip,
  colVariants,
  colorVars,
  countLabel,
  rootAnimation,
  shortDay,
  toWeeks,
  useTooltip,
  type BaseProps,
} from "./shared";

/**
 * ContributionBars — one bar per week, height = that week's total.
 *
 *   <ContributionBars days={days} total={total} />
 *   <ContributionBars days={days} color="ocean" rounded />
 */
export type ContributionBarsProps = BaseProps & {
  /** Pill-shaped bars instead of squared ends. */
  rounded?: boolean;
};

const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { ...SPRING, visualDuration: 0.55 },
  },
};

export function ContributionBars({
  days,
  total,
  color = "github",
  rounded = false,
  hideEmpty = false,
  animateOn = "view",
  showMonths = true,
  showLegend = true,
  showTotal = true,
  totalLabel = "{total} contributions in the last year",
  className = "",
}: ContributionBarsProps) {
  const { wrapRef, tip, show, hide } = useTooltip();
  if (!days.length) return null;

  const weeks = toWeeks(days);
  const left = PAD;
  const top = PAD + (showMonths ? 18 : 0);
  const width = left + weeks.length * STEP - GAP + PAD;
  const height = top + GRID_H + PAD;
  const totals = weeks.map((w) => w.reduce((n, d) => n + (d?.count ?? 0), 0));
  const max = Math.max(1, ...totals);
  const radius = rounded ? 3 : 2;

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={colorVars(color)}
    >
      <div className="overflow-x-auto py-1 sm:overflow-visible">
        <MotionConfig reducedMotion="user">
          <motion.svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            className="block min-w-[600px] overflow-visible sm:min-w-0"
            style={{ fontSize: 11.5 }}
            role="img"
            aria-label={
              total != null
                ? `${total} contributions in the last year`
                : "Weekly contributions"
            }
            onMouseLeave={hide}
            {...rootAnimation(animateOn)}
          >
            {showMonths && <MonthLabels weeks={weeks} left={left} />}

            {weeks.map((week, wi) => {
              const n = totals[wi];
              const level = n === 0 ? 0 : Math.max(1, Math.ceil((4 * n) / max));
              const h = Math.max(2.5, (n / max) * GRID_H);
              const first = week.find(Boolean);
              const last = [...week].reverse().find(Boolean);
              return (
                <motion.g key={wi} variants={colVariants(wi)}>
                  <motion.rect
                    x={left + wi * STEP}
                    y={top + GRID_H - h}
                    width={CELL}
                    height={h}
                    rx={rounded ? CELL / 2 : 1.5}
                    fill={`var(--cg-${level})`}
                    fillOpacity={hideEmpty && level === 0 ? 0.35 : undefined}
                    variants={barVariants}
                    whileHover={{ scaleX: 1.15 }}
                    // Motion sets transform-box: fill-box on SVG; originY: 1 = grow from the baseline.
                    style={{ originY: 1 }}
                    aria-label={`${n} contributions in the week of ${first ? shortDay(first.date) : ""}`}
                    onMouseEnter={(e) =>
                      show(e.currentTarget, {
                        level,
                        title: countLabel(n),
                        subtitle:
                          first && last
                            ? `${shortDay(first.date)} – ${shortDay(last.date)}`
                            : "",
                      })
                    }
                  />
                </motion.g>
              );
            })}
          </motion.svg>
        </MotionConfig>
      </div>

      <Footer
        total={total}
        totalLabel={totalLabel}
        showTotal={showTotal}
        showLegend={showLegend}
        radius={radius}
      />
      <Tooltip tip={tip} wrapRef={wrapRef} radius={radius} />
    </div>
  );
}
