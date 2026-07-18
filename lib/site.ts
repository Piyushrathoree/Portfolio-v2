// Canonical host must match Vercel's redirect: apex → www
export const SITE_URL = "https://www.piyushh.me";

export const SITE_NAME = "Piyush Rathore";

export const SITE_DESCRIPTION =
  "Software Engineer and Full Stack Developer. Portfolio, projects, and writing on web development, systems, and building products.";

export const SITE_KEYWORDS = [
  "Piyush Rathore",
  "Software Engineer",
  "Portfolio",
  "Web Development",
  "Full Stack Developer",
  "Piyush Rathore Portfolio",
  "piyushh.me",
  "developer portfolio",
  "Next.js",
  "TypeScript",
] as const;

export const SOCIAL = {
  twitter: "https://x.com/__Piyushrathore",
  github: "https://github.com/Piyushrathoree",
  linkedin: "https://linkedin.com/in/piyushrathore--",
  email: "mailto:01piyush008@gmail.com",
} as const;

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
