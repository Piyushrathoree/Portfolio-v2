import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Contribution graph — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Component",
    title: "Contribution graph",
    subtitle: "Day heatmap or weekly bars, any colour, light and dark ramps derived automatically. Motion-animated.",
    tag: "React · Motion · Tailwind",
  });
}
