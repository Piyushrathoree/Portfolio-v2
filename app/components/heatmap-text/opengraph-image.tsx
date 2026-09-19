import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Heatmap text — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Component",
    title: "Heatmap text",
    subtitle: "Spell anything as a contribution-style heatmap with a 5×7 pixel font.",
    tag: "React · Motion · Tailwind",
  });
}
