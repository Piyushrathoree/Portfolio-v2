// Canonical host must match Vercel's redirect: apex → www
export const SITE_URL = "https://www.piyush.social";

export const SITE_NAME = "Piyush Rathore";

export const SITE_DESCRIPTION =
  "Piyush Rathore is a software engineer building full-stack products and backend systems with TypeScript, Node.js, Next.js, and PostgreSQL.";

export const SITE_KEYWORDS = [
  "Piyush Rathore",
  "Software Engineer",
  "Full Stack Developer",
  "Portfolio",
  "piyush.social",
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
