// Canonical host must match Vercel's redirect: apex → www
export const SITE_URL = "https://www.piyush.social";

export const SITE_NAME = "Piyush Rathore";

// Real handles people search for. Not misspellings: Google spell-corrects
// queries to the canonical name, and fake aliases read as keyword stuffing.
export const SITE_HANDLE = "Piyushrathoree";
export const ALTERNATE_NAMES = [SITE_HANDLE, "__Piyushrathore"] as const;

export const SITE_ROLE = "Full-Stack Software Engineer";

export const SITE_DESCRIPTION =
  "Piyush Rathore (@Piyushrathoree) is a full-stack software engineer in India building products and backend systems with TypeScript, Next.js, Node.js, and PostgreSQL.";

export const SITE_KEYWORDS = [
  "Piyush Rathore",
  "Piyushrathoree",
  "Piyush",
  "Software Engineer",
  "Full Stack Developer",
  "Full Stack Engineer India",
  "Software Engineer India",
  "Backend Engineer",
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
