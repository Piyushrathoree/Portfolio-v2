import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Let's talk — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Let's talk",
    subtitle: "Roles, collaborations, or a question about something I built.",
    tag: "Available for work",
  });
}
