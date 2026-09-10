// Canonical host must match Vercel's redirect: apex → www
export const SITE_URL = "https://www.piyushh.me";

export const SITE_NAME = "Piyush Rathore";

export const SITE_DESCRIPTION =
  "Software engineer and full-stack developer. Work, projects, open-source contributions, and writing on backend systems and the web.";

export const SITE_KEYWORDS = [
  "Piyush Rathore",
  "Software Engineer",
  "Full Stack Developer",
  "Portfolio",
  "piyushh.me",
  "Next.js",
  "TypeScript",
  "Node.js",
] as const;

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
