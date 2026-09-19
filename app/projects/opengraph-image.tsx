import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Things I've built — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Projects",
    title: "Things I've built",
    subtitle: "Production apps, backend systems, and real-time products — with source.",
  });
}
