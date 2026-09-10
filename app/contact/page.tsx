import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PROFILE, TWITTER_HANDLE } from "@/data/profile";

const description =
  "Get in touch with Piyush Rathore for roles, collaborations, or questions.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Piyush Rathore", description, url: "/contact" },
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
    <>
      {PROFILE.available && (
        <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </p>
      )}
      <h1 className="mb-1 text-xl font-semibold text-primary">Let&apos;s talk</h1>
      <p className="mb-8 text-[15px] text-muted">
        Roles, collaborations, or a question about something I built — drop a line.
      </p>

      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          {OPTIONS.map((o) => (
            <a
              key={o.title}
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noreferrer" : undefined}
              className="card group flex items-center justify-between p-4"
            >
              <span>
                <span className="block text-sm font-medium text-primary transition-colors group-hover:text-accent">
                  {o.title}
                </span>
                <span className="mt-0.5 block font-mono text-xs text-muted">{o.detail}</span>
              </span>
              <ArrowUpRight size={14} className="shrink-0 text-muted" />
            </a>
          ))}
        </div>
        <ContactForm />
      </div>
    </>
  );
}
