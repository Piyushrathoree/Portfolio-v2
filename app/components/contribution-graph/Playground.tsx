"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import {
  ContributionBars,
  ContributionGraph,
  PRESETS,
  type ContributionDay,
  type GraphVariant,
} from "@/components/contribution-graph";

const VARIANTS: GraphVariant[] = ["classic", "rounded", "circle", "dots"];
const HEX = /^#[0-9a-f]{6}$/i;

function Toggle({
  on,
  onChange,
  children,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange(!on)}
      className={`flex h-7 items-center gap-1.5 rounded-full border px-3 text-[12px] transition-colors ${
        on
          ? "border-accent/60 text-primary"
          : "border-border text-muted hover:text-secondary"
      }`}
    >
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
          on ? "border-accent bg-accent text-background" : "border-border"
        }`}
      >
        {on && <Check size={9} strokeWidth={3} />}
      </span>
      {children}
    </button>
  );
}

/** Live playground: pick any colour, compare every variant. */
export function Playground({
  days,
  total,
}: {
  days: ContributionDay[];
  total: number;
}) {
  const [color, setColor] = useState<string>(PRESETS.github);
  const [draft, setDraft] = useState(color);
  const [hideEmpty, setHideEmpty] = useState(false);
  const [rounded, setRounded] = useState(false);

  const set = (hex: string) => {
    setColor(hex);
    setDraft(hex);
  };

  const propsFor = (extra: string) =>
    `color="${color}"${extra}${hideEmpty ? " hideEmpty" : ""}`;

  return (
    <>
      {/* Controls */}
      <div className="card mt-6 p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <label
              className="relative h-8 w-8 shrink-0 cursor-pointer"
              title="Pick any colour"
            >
              <span
                className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
                style={{ background: color }}
              />
              <input
                type="color"
                value={color}
                onChange={(e) => set(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Pick any colour"
              />
            </label>
            <input
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (HEX.test(e.target.value)) setColor(e.target.value);
              }}
              spellCheck={false}
              aria-label="Hex colour"
              className="field h-8 w-24 px-2.5 font-mono text-[12px]"
            />
          </div>

          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Presets"
          >
            {Object.entries(PRESETS).map(([name, hex]) => {
              const active = color.toLowerCase() === hex;
              return (
                <button
                  key={name}
                  type="button"
                  aria-label={name}
                  aria-pressed={active}
                  onClick={() => set(hex)}
                  className="h-5 w-5 rounded-full transition-transform hover:scale-110"
                  style={{
                    background: hex,
                    boxShadow: active
                      ? `0 0 0 2px var(--background), 0 0 0 3.5px ${hex}`
                      : "inset 0 0 0 1px rgba(0,0,0,0.15)",
                  }}
                />
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Toggle on={hideEmpty} onChange={setHideEmpty}>
              Hide empty
            </Toggle>
            <Toggle on={rounded} onChange={setRounded}>
              Rounded bars
            </Toggle>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="section-title">ContributionBars</h2>
        <p className="mb-2 font-mono text-[11.5px] text-muted">{`<ContributionBars ${propsFor(rounded ? " rounded" : "")} />`}</p>
        <div className="card p-3 sm:p-4">
          <ContributionBars
            days={days}
            total={total}
            color={color}
            rounded={rounded}
            hideEmpty={hideEmpty}
            animateOn="mount"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-title">ContributionGraph</h2>
        {VARIANTS.map((variant) => (
          <div key={variant} className="mt-6">
            <p className="mb-2 font-mono text-[11.5px] text-muted">{`<ContributionGraph ${propsFor(` variant="${variant}"`)} />`}</p>
            <div className="card p-3 sm:p-4">
              <ContributionGraph
                days={days}
                total={total}
                variant={variant}
                color={color}
                hideEmpty={hideEmpty}
                animateOn="mount"
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
