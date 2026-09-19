import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Merged pull requests — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Open source",
    title: "Merged pull requests",
    subtitle: "Contributions across open-source projects, grouped by repository.",
  });
}
