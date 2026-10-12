"use client";

import { Check, Github, Linkedin } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import { useState, type ReactNode } from "react";
import type { SocialProfile } from "@/data/socials";
import {
  ProfileCard,
  SocialLinks,
  SocialPreview,
} from "@/components/SocialLinks";

const HEX = /^#[0-9a-f]{6}$/i;

const SEG_GLYPH: Record<SocialProfile["id"], ReactNode> = {
  github: <Github size={12} />,
  linkedin: <Linkedin size={12} />,
  x: <SiX size={11} />,
};

/** Dark readable text on light accents, white on dark ones. */
function inkFor(hex: string): string {
  const m = HEX.exec(hex.trim());
  if (!m) return "#ffffff";
  const h = m[0];
  const r = parseInt(h.slice(1, 3), 16) / 255;
  const g = parseInt(h.slice(3, 5), 16) / 255;
  const b = parseInt(h.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5 ? "#201510" : "#ffffff";
}

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

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block font-mono text-[10px] tracking-wider text-muted uppercase">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="field h-8 px-2.5 text-[13px]"
      />
    </label>
  );
}

/** Live playground: hover the triggers, then restyle the card below. */
export function Playground({ profiles }: { profiles: SocialProfile[] }) {
  const [base, setBase] = useState<SocialProfile>(profiles[0]);
  const [accent, setAccent] = useState(base.accent);
  const [draftHex, setDraftHex] = useState(base.accent);
  const [showBanner, setShowBanner] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [name, setName] = useState(base.name);
  const [handle, setHandle] = useState(base.handle);
  const [bio, setBio] = useState(base.bio ?? "");

  const setA = (hex: string) => {
    setAccent(hex);
    setDraftHex(hex);
  };

  const pick = (p: SocialProfile) => {
    setBase(p);
    setA(p.accent);
    setName(p.name);
    setHandle(p.handle);
    setBio(p.bio ?? "");
  };

  const preview: SocialProfile = {
    ...base,
    name,
    handle,
    bio,
    accent,
    accentInk: inkFor(accent),
    banner: showBanner ? base.banner : undefined,
    stats: showStats ? base.stats : undefined,
    location: showLocation ? base.location : undefined,
  };

  const x = profiles.find((p) => p.id === "x") ?? profiles[0];

  return (
    <>
      <section className="mt-6">
        <h2 className="section-title">SocialPreview</h2>
        <p className="mb-2 font-mono text-[11.5px] text-muted">{`<SocialPreview profile={...}>…</SocialPreview>`}</p>
        <div className="card p-4 sm:p-5">
          <SocialLinks profiles={profiles} />
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <SocialPreview profile={x}>
              <a
                href={x.href}
                target="_blank"
                rel="noreferrer"
                className="link underline decoration-dashed underline-offset-4"
              >
                DM me on {x.label}
              </a>
            </SocialPreview>
            <span className="text-[12px] text-muted">
              Hover, keyboard-focus, or tap a trigger.
            </span>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="section-title">ProfileCard</h2>
        <p className="mb-2 font-mono text-[11.5px] text-muted">{`<ProfileCard profile={...} />`}</p>

        {/* Controls */}
        <div className="card p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div
              className="inline-flex items-stretch overflow-hidden rounded border"
              role="group"
              aria-label="Base profile"
            >
              {profiles.map((p, i) => {
                const active = p.id === base.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pick(p)}
                    aria-pressed={active}
                    className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11.5px] transition-colors ${
                      i > 0 ? "border-l" : ""
                    } ${
                      active
                        ? "bg-badge text-primary"
                        : "text-muted hover:bg-badge hover:text-secondary"
                    }`}
                  >
                    <span
                      className="flex"
                      style={active ? { color: p.accent } : undefined}
                    >
                      {SEG_GLYPH[p.id]}
                    </span>
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <label
                className="relative h-8 w-8 shrink-0 cursor-pointer"
                title="Pick any accent"
              >
                <span
                  className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
                  style={{ background: accent }}
                />
                <input
                  type="color"
                  value={HEX.test(accent) ? accent : "#0e4429"}
                  onChange={(e) => setA(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Pick any accent"
                />
              </label>
              <input
                value={draftHex}
                onChange={(e) => {
                  setDraftHex(e.target.value);
                  if (HEX.test(e.target.value)) setAccent(e.target.value);
                }}
                spellCheck={false}
                aria-label="Hex accent"
                className="field h-8 w-24 px-2.5 font-mono text-[12px]"
              />
            </div>

            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Toggle on={showBanner} onChange={setShowBanner}>
                Banner
              </Toggle>
              <Toggle on={showStats} onChange={setShowStats}>
                Stats
              </Toggle>
              <Toggle on={showLocation} onChange={setShowLocation}>
                Location
              </Toggle>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Field label="Name" value={name} onChange={setName} />
            <Field label="Handle" value={handle} onChange={setHandle} />
            <Field label="Bio" value={bio} onChange={setBio} />
          </div>
        </div>

        <div className="card mt-6 flex justify-center p-6 sm:p-10">
          <div key={base.id} className="w-[260px]">
            <ProfileCard profile={preview} />
          </div>
        </div>
      </section>
    </>
  );
}
