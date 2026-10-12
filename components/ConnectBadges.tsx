"use client";

import type { ReactNode } from "react";
import { PROFILE } from "@/data/profile";
import type { SocialProfile } from "@/data/socials";
import { SocialPreview } from "./SocialLinks";
import {
  CalendarIcon,
  FileTextIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "@/components/icons/animated";

type ConnectItem = {
  label: string;
  href: string;
  icon: ReactNode;
  profileId?: SocialProfile["id"];
};

const ITEMS: ConnectItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/Piyushrathoree",
    icon: <GithubIcon size={13} />,
    profileId: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/piyushrathore--",
    icon: <LinkedinIcon size={13} />,
    profileId: "linkedin",
  },
  {
    label: "Twitter",
    href: "https://x.com/__Piyushrathore",
    icon: <XIcon size={12} />,
    profileId: "x",
  },
  {
    label: "Email",
    href: `mailto:${PROFILE.email}`,
    icon: <MailIcon size={13} />,
  },
  {
    label: "Book a call",
    href: PROFILE.calUrl,
    icon: <CalendarIcon size={13} />,
  },
  {
    label: "Résumé",
    href: PROFILE.resumeUrl,
    icon: <FileTextIcon size={13} />,
  },
];

/**
 * Pill badges for the Connect section. The three social badges open a
 * profile preview card on hover (tap on touch); the rest are plain links.
 */
export function ConnectBadges({ profiles }: { profiles: SocialProfile[] }) {
  const byId = new Map(profiles.map((p) => [p.id, p]));

  return (
    <div className="flex flex-wrap gap-1.5">
      {ITEMS.map((s) => {
        const external = s.href.startsWith("http");
        const badge = (
          <a
            href={s.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="badge"
          >
            <span className="text-secondary">{s.icon}</span>
            {s.label}
          </a>
        );
        const profile = s.profileId ? byId.get(s.profileId) : undefined;
        return profile ? (
          <SocialPreview key={s.label} profile={profile}>
            {badge}
          </SocialPreview>
        ) : (
          <span key={s.label} className="contents">
            {badge}
          </span>
        );
      })}
    </div>
  );
}
