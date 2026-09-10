import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d0d0d",
          color: "#e8e6e3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#787572" }}>
          <span>~/piyush</span>
          <span>{SITE_URL.replace("https://", "")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 600, color: "#f5f5f4", letterSpacing: -1 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 34, color: "#b5b3af" }}>{PROFILE.role}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Bun"].map((t) => (
              <span
                key={t}
                style={{
                  padding: "10px 18px",
                  border: "1px solid #1e1e1c",
                  background: "#151514",
                  borderRadius: 8,
                  fontSize: 22,
                  color: "#d4d2cf",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#787572" }}>
          <span>Work · Projects · Open source · Writing</span>
          <span style={{ color: "#e8a87c" }}>Open to roles</span>
        </div>
      </div>
    ),
    size
  );
}
