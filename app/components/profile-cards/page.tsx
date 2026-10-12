import type { Metadata } from "next";
import Link from "next/link";
import { getSocialProfiles } from "@/lib/github";
import { Playground } from "./Playground";

const description =
  "Social profile cards: hover any link for a photo-banner preview with a dual-ring border and staged spring entrance. Wrap any trigger; GitHub stats refresh live.";

export const metadata: Metadata = {
  title: "Social profile cards",
  description,
  alternates: { canonical: "/components/profile-cards" },
  openGraph: {
    title: "Social profile cards | Piyush Rathore",
    description,
    url: "/components/profile-cards",
  },
};

export default async function ProfileCardsPage() {
  const profiles = await getSocialProfiles();

  return (
    <>
      <Link href="/components" className="quiet-link font-mono text-xs">
        ← Components
      </Link>
      <h1 className="mt-4 mb-1 text-xl font-semibold text-primary">
        Social profile cards
      </h1>
      <p className="mb-2 text-[15px] text-muted">
        Two components.{" "}
        <code className="font-mono text-[13px]">SocialPreview</code> wraps any
        link — icon, badge, text — and shows a preview card on hover, focus,
        or tap. <code className="font-mono text-[13px]">ProfileCard</code> is
        the card itself: photo banner, accent ring and CTA, stats, location.
      </p>
      <Playground profiles={profiles} />
    </>
  );
}
