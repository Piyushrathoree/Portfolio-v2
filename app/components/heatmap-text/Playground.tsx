"use client";

import { useState } from "react";
import { HeatmapText, PRESETS } from "@/components/contribution-graph";

const HEX = /^#[0-9a-f]{6}$/i;

export function Playground() {
  const [text, setText] = useState("404");
  const [color, setColor] = useState<string>(PRESETS.github);
  const [draft, setDraft] = useState(color);
  const [twinkle, setTwinkle] = useState(true);
  const [key, setKey] = useState(0);

  const set = (hex: string) => {
    setColor(hex);
    setDraft(hex);
  };

  return (
    <>
      <div className="card mt-6 p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 12))}
            spellCheck={false}
            aria-label="Text"
            placeholder="Type something"
            className="field h-8 w-44 px-2.5 text-[13px] uppercase"
          />

          <div className="flex items-center gap-3">
            <label className="relative h-8 w-8 shrink-0 cursor-pointer">
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

          <div className="flex items-center gap-2" role="group" aria-label="Presets">
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
            <button
              type="button"
              aria-pressed={twinkle}
              onClick={() => setTwinkle((v) => !v)}
              className={`h-7 rounded-full border px-3 text-[12px] transition-colors ${
                twinkle ? "border-accent/60 text-primary" : "border-border text-muted hover:text-secondary"
              }`}
            >
              Twinkle
            </button>
            <button type="button" onClick={() => setKey((k) => k + 1)} className="badge badge-sm">
              Replay ↻
            </button>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <p className="mb-2 font-mono text-[11.5px] text-muted">
          {`<HeatmapText text="${text.toUpperCase()}" color="${color}"${twinkle ? "" : " twinkle={false}"} />`}
        </p>
        <div className="card p-6 sm:p-8">
          <HeatmapText key={key} text={text || " "} color={color} twinkle={twinkle} maxWidth={640} />
        </div>
      </section>
    </>
  );
}
