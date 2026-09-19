import { PROFILE } from "@/data/profile";

/**
 * Profile previews shown in the hover cards next to the social icons.
 * GitHub numbers are refreshed live (see lib/github.ts → getSocialProfiles);
 * X and LinkedIn have no public API, so keep those in sync by hand.
 */
export type SocialProfile = {
  id: "github" | "linkedin" | "x";
  label: string;
  href: string;
  name: string;
  /** Shown under the name, e.g. "@handle" or "in/handle". */
  handle: string;
  bio?: string;
  location?: string;
  avatar: string;
  /** Optional banner image (public path or URL). Falls back to a tinted gradient. */
  banner?: string;
  /** Platform tint for the banner + avatar ring. */
  accent: string;
  stats?: { value: string; label: string }[];
};

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/u/163632958?v=4";
const X_AVATAR =
  "https://pbs.twimg.com/profile_images/1996314930195394560/MS5dPOQc_400x400.jpg";

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Piyushrathoree",
    name: PROFILE.name,
    handle: "@Piyushrathoree",
    bio: "Engineer. Full-stack products, open source, AI tooling.",
    location: "Bhopal, India",
    avatar: GITHUB_AVATAR,
    accent: "#26a641",
    stats: [
      { value: "84", label: "followers" },
      { value: "69", label: "repos" },
    ],
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/__Piyushrathore",
    name: "Piyush",
    handle: "@__Piyushrathore",
    bio: "Applied AI Engineer — trying to go beyond sky.",
    location: "Bhopal, Madhya Pradesh",
    avatar: X_AVATAR,
    accent: "#e8a87c",
    stats: [
      { value: "1.2K", label: "followers" },
      { value: "979", label: "following" },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/piyushrathore--",
    name: PROFILE.name,
    handle: "in/piyushrathore--",
    bio: PROFILE.role,
    location: PROFILE.location,
    avatar: X_AVATAR,
    accent: "#0a66c2",
    // Add connections/followers here when you want them shown.
  },
];
