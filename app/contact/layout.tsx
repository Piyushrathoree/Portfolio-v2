import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Piyush Rathore for collaborations, opportunities, or questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Piyush Rathore",
    description:
      "Get in touch with Piyush Rathore for collaborations, opportunities, or questions.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
