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
  fullDay,
  rootAnimation,
  toWeeks,
  useTooltip,
  type BaseProps,
} from "./shared";

/**
 * ContributionGraph — GitHub-style day-by-day heatmap.
 *
 *   <ContributionGraph days={days} total={total} />
 *   <ContributionGraph days={days} variant="dots" color="#e8a87c" hideEmpty />
 *
 * variant  classic | rounded | circle | dots   (dots: size grows with activity)
 * color    preset name or any CSS colour — light/dark ramps are derived automatically
 */
export type GraphVariant = "classic" | "rounded" | "circle" | "dots";

export type ContributionGraphProps = BaseProps & {
  variant?: GraphVariant;
  showWeekdays?: boolean;
};

const WEEKDAYS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };
const DOT_SCALE = [0.3, 0.5, 0.68, 0.84, 1];

const cellVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: SPRING },
};

export function ContributionGraph({
  days,
  total,
  variant = "classic",
  color = "github",
  hideEmpty = false,
  animateOn = "view",
  showMonths = true,
  showWeekdays = false,
  showLegend = true,
  showTotal = true,
  totalLabel = "{total} contributions in the last year",
  className = "",
}: ContributionGraphProps) {
  const { wrapRef, tip, show, hide } = useTooltip();
  if (!days.length) return null;

  const weeks = toWeeks(days);
  const left = PAD + (showWeekdays ? 30 : 0);
  const top = PAD + (showMonths ? 18 : 0);
  const width = left + weeks.length * STEP - GAP + PAD;
  const height = top + GRID_H + PAD;
  const round = variant === "circle" || variant === "dots";
  const rx = round ? CELL / 2 : variant === "rounded" ? 3.5 : 2.5;
  const radius = round ? "50%" : variant === "rounded" ? 3 : 2;

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
                : "Contribution calendar"
            }
            onMouseLeave={hide}
            {...rootAnimation(animateOn)}
          >
            {showMonths && <MonthLabels weeks={weeks} left={left} />}
            {showWeekdays &&
              Object.entries(WEEKDAYS).map(([d, text]) => (
                <text
                  key={d}
                  x={PAD}
                  y={top + Number(d) * STEP + CELL - 2}
                  fill="var(--cg-label)"
                >
                  {text}
                </text>
              ))}

            {weeks.map((week, wi) => (
              <motion.g key={wi} variants={colVariants(wi)}>
                {week.map((day, di) => {
                  if (!day) return null;
                  const s = variant === "dots" ? DOT_SCALE[day.level] : 1;
                  const size = CELL * s;
                  const off = (CELL - size) / 2;
                  return (
                    <motion.rect
                      key={day.date}
                      x={left + wi * STEP + off}
                      y={top + di * STEP + off}
                      width={size}
                      height={size}
                      rx={rx * s}
                      fill={`var(--cg-${day.level})`}
                      // Attribute, not style: Motion animates `opacity`, so the dim goes on fillOpacity.
                      fillOpacity={
                        hideEmpty && day.level === 0 ? 0.35 : undefined
                      }
                      variants={cellVariants}
                      whileHover={{ scale: 1.35 }}
                      aria-label={`${day.count} contributions on ${fullDay(day.date)}`}
                      onMouseEnter={(e) =>
                        show(e.currentTarget, {
                          level: day.level,
                          title: countLabel(day.count),
                          subtitle: fullDay(day.date),
                        })
                      }
                    />
                  );
                })}
              </motion.g>
            ))}
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
