import type { Metadata } from "next";
import { ContactLayouts } from "@/components/ContactLayouts";
import { PROFILE, TWITTER_HANDLE } from "@/data/profile";

const description =
  "Get in touch with Piyush Rathore for roles, collaborations, or questions.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Piyush Rathore",
    description,
    url: "/contact",
  },
};

const OPTIONS = [
  {
    title: "Email",
    detail: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    external: false,
  },
  {
    title: "Book a call",
    detail: "15 minutes, pick a slot",
    href: PROFILE.calUrl,
    external: true,
  },
  {
    title: "DM on X",
    detail: TWITTER_HANDLE,
    href: "https://x.com/__Piyushrathore",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <ContactLayouts
      options={OPTIONS}
      available={PROFILE.available}
    />
  );
}
