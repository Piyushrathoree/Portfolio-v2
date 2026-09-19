import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Reusable UI, with playgrounds — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Components",
    title: "Reusable UI, with playgrounds",
    subtitle: "Polished React components — contribution graphs, heatmap text, and more.",
  });
}
