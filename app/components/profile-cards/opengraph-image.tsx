import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Social profile cards — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Component",
    title: "Social profile cards",
    subtitle: "Photo-banner previews on any link — dual-ring border, staged spring entrance, tap-to-open on touch.",
    tag: "React · Motion · Tailwind",
  });
}
