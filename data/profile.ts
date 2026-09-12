export const PROFILE = {
  name: "Piyush Rathore",
  role: "Software Engineer · Full-stack",
  location: "India",
  timeZone: "Asia/Kolkata",
  email: "piyushrathore.works@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1s64i0UvX64aXXNlsWtGPWNTb4iGh9PlS/view?usp=sharing",
  calUrl: "https://cal.com/piyush-nkthix/15min",
  github: "Piyushrathoree",
  discordId: "1187126125722353768",
  available: true,
} as const;

export type SocialLink = { label: string; href: string };

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Piyushrathoree" },
  { label: "LinkedIn", href: "https://linkedin.com/in/piyushrathore--" },
  { label: "Twitter", href: "https://x.com/__Piyushrathore" },
  { label: "Email", href: `mailto:${PROFILE.email}` },
];

export const TWITTER_HANDLE = "@__Piyushrathore";
