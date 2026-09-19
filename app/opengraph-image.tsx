import { PROFILE } from "@/data/profile";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    title: PROFILE.name,
    subtitle: "Full-stack products, mostly on the backend. Typed end to end, shipped fast, boring in production.",
    chips: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Bun"],
  });
}
