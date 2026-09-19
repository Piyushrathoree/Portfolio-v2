import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Notes on backend systems — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Writing",
    title: "Notes on backend systems",
    subtitle: "Microservices, distributed systems, and shipping on the web.",
    tag: "RSS available",
  });
}
