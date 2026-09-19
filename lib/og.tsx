import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const C = {
  bg: "#0d0d0d",
  card: "#141412",
  border: "#2a2a28",
  text: "#f5f5f4",
  secondary: "#b5b3af",
  muted: "#787572",
  accent: "#e8a87c",
  green: ["#1d1d1b", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

/** Deterministic dot levels so the same page always renders the same image. */
const level = (i: number) => {
  const n = ((i * 2654435761) >>> 0) % 100;
  return n < 45 ? 0 : n < 65 ? 1 : n < 82 ? 2 : n < 93 ? 3 : 4;
};

function Heatmap({ cols, rows, cell = 14, gap = 4 }: { cols: number; rows: number; cell?: number; gap?: number }) {
  return (
    <div style={{ display: "flex", gap }}>
      {Array.from({ length: cols }, (_, c) => (
        <div key={c} style={{ display: "flex", flexDirection: "column", gap }}>
          {Array.from({ length: rows }, (_, r) => (
            <div
              key={r}
              style={{ width: cell, height: cell, borderRadius: 3, background: C.green[level(c * rows + r + 7)] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Satori mis-measures wrapped text inside nested flex columns (lines overlap),
 * so wrap by hand: one div per line, sized from an average glyph width.
 */
function wrap(text: string, fontSize: number, width: number, maxLines: number) {
  const perLine = Math.floor(width / (fontSize * 0.5));
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > perLine && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const cut = lines.slice(0, maxLines);
    cut[maxLines - 1] = cut[maxLines - 1].replace(/[\s.,;:]*$/, "") + "…";
    return cut;
  }
  return lines;
}

export type OgProps = {
  /** Small label above the title, e.g. "Projects" or "Blog". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Right-aligned footer tag in accent colour. */
  tag?: string;
  /** Chips under the subtitle. */
  chips?: string[];
  /** Show the heatmap flourish (default true). */
  heatmap?: boolean;
};

/**
 * Shared Open Graph card: dashed card with corner brackets, contribution
 * dots in the corner, site chrome top and bottom. Same look as the site.
 */
export function ogImage({ eyebrow, title, subtitle, tag, chips, heatmap = true }: OgProps) {
  // Scale type to the title so long post titles still fit; clamp both blocks.
  const colWidth = heatmap ? 720 : 976;
  // Largest size that keeps the title to one line at 84, two at 62, else 48 (max three lines).
  const titleSize = wrap(title, 84, colWidth, 9).length <= 1 ? 84 : wrap(title, 62, colWidth, 9).length <= 2 ? 62 : 48;
  const subtitleSize = titleSize >= 62 ? 30 : 26;
  const titleLines = wrap(title, titleSize, colWidth, 3);
  const subtitleLines = subtitle ? wrap(subtitle, subtitleSize, colWidth, titleLines.length > 2 ? 2 : 3) : [];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 56,
          background: C.bg,
          color: C.text,
          fontFamily: "sans-serif",
        }}
      >
        {/* chrome */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: C.muted }}>
          <span>~/piyush</span>
          <span>{SITE_URL.replace("https://", "")}</span>
        </div>

        {/* card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            marginTop: 32,
            padding: 56,
            background: C.card,
            border: `2px dashed ${C.border}`,
            borderRadius: 8,
          }}
        >
          {/* corner brackets */}
          <div style={{ position: "absolute", top: -2, left: -2, width: 28, height: 28, borderTop: `3px solid ${C.muted}`, borderLeft: `3px solid ${C.muted}` }} />
          <div style={{ position: "absolute", bottom: -2, right: -2, width: 28, height: 28, borderBottom: `3px solid ${C.muted}`, borderRight: `3px solid ${C.muted}` }} />

          {/* Explicit width: Yoga measures wrapped text correctly only with a fixed width. */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: colWidth, gap: 18 }}>
            {eyebrow && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 36, // letter-spaced text measures short in Satori; pin the row height
                  marginBottom: 6,
                  fontSize: 26,
                  color: C.accent,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {eyebrow}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {titleLines.map((l, i) => (
                <div
                  key={i}
                  style={{ display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, color: C.text }}
                >
                  {l}
                </div>
              ))}
            </div>
            {subtitleLines.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {subtitleLines.map((l, i) => (
                  <div key={i} style={{ display: "flex", fontSize: subtitleSize, lineHeight: 1.35, color: C.secondary }}>
                    {l}
                  </div>
                ))}
              </div>
            )}
            {chips && chips.length > 0 && (
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                {chips.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "8px 16px",
                      border: `1px solid ${C.border}`,
                      background: C.bg,
                      borderRadius: 8,
                      fontSize: 22,
                      color: C.secondary,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {heatmap && (
            <div style={{ position: "absolute", right: 56, bottom: 56, display: "flex", opacity: 0.95 }}>
              <Heatmap cols={12} rows={7} />
            </div>
          )}
        </div>

        {/* footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 24, color: C.muted }}>
          <span>{PROFILE.name} · {PROFILE.role}</span>
          <span style={{ color: C.accent }}>{tag ?? (PROFILE.available ? "Open to roles" : "")}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
