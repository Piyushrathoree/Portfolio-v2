import { PROFILE } from "@/data/profile";
import { SOCIAL_PROFILES, type SocialProfile } from "@/data/socials";

export type MergedPR = {
  id: number;
  number: number;
  title: string;
  url: string;
  /** "owner/name" */
  repo: string;
  mergedAt: string;
  /** True when the PR targets one of the profile user's own repositories. */
  own: boolean;
};

type SearchItem = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
  pull_request?: { merged_at?: string | null };
};

/**
 * Every merged PR authored by the profile user, newest merge first.
 * Uses the unauthenticated GitHub search API (no token) and is cached for
 * an hour by Next's fetch cache. The search API caps at 100 per page; we
 * follow pages until the results run out.
 */
export async function getMergedPRs(): Promise<MergedPR[]> {
  const q = encodeURIComponent(`author:${PROFILE.github} type:pr is:merged`);
  const items: SearchItem[] = [];

  try {
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=100&page=${page}`,
        {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 3600 },
        },
      );
      if (!res.ok) break;
      const data = (await res.json()) as {
        items?: SearchItem[];
        total_count?: number;
      };
      items.push(...(data.items ?? []));
      if (!data.items?.length || items.length >= (data.total_count ?? 0)) break;
    }
  } catch {
    return [];
  }

  const owner = PROFILE.github.toLowerCase();
  return items
    .filter((p) => p.pull_request?.merged_at)
    .map((p) => {
      const repo = p.repository_url.replace(
        "https://api.github.com/repos/",
        "",
      );
      return {
        id: p.id,
        number: p.number,
        title: p.title,
        url: p.html_url,
        repo,
        mergedAt: p.pull_request!.merged_at!,
        own: repo.toLowerCase().startsWith(`${owner}/`),
      };
    })
    .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
}

export function formatMerged(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

import type { ContributionDay } from "@/components/contribution-graph";
export type { ContributionDay };

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

/**
 * The profile user's contribution calendar for the last year, via the
 * public github-contributions-api (no token). Cached for an hour. Returns
 * null when the API is unreachable so the caller can render a fallback.
 */
export async function getContributions(): Promise<Contributions | null> {
  // Prefer GitHub's own GraphQL API when a token is configured (reliable on
  // Vercel); otherwise fall back to the public proxy, which occasionally 5xxs.
  return (await fromGraphQL()) ?? (await fromProxy());
}

async function fromGraphQL(): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login: String!) { user(login: $login) { contributionsCollection {
          contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`,
        variables: { login: PROFILE.github },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
            };
          };
        };
      };
    };
    const cal = json.data?.user?.contributionsCollection.contributionCalendar;
    if (!cal) return null;
    const LEVELS: Record<string, ContributionDay["level"]> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };
    const days = cal.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    );
    return days.length ? { total: cal.totalContributions, days } : null;
  } catch {
    return null;
  }
}

async function fromProxy(): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${PROFILE.github}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: ContributionDay[];
    };
    if (!data.contributions?.length) return null;
    return { total: data.total?.lastYear ?? 0, days: data.contributions };
  } catch {
    return null;
  }
}

/** Live GitHub profile numbers for the hover card; falls back to the static copy. */
export async function getSocialProfiles(): Promise<SocialProfile[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${PROFILE.github}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return SOCIAL_PROFILES;
    const u = (await res.json()) as {
      avatar_url?: string;
      bio?: string | null;
      location?: string | null;
      followers?: number;
      public_repos?: number;
    };
    return SOCIAL_PROFILES.map((p) =>
      p.id !== "github"
        ? p
        : {
            ...p,
            avatar: u.avatar_url ?? p.avatar,
            location: u.location?.trim() || p.location,
            stats: [
              { value: compact(u.followers ?? 0), label: "followers" },
              { value: compact(u.public_repos ?? 0), label: "repos" },
            ],
          },
    );
  } catch {
    return SOCIAL_PROFILES;
  }
}

const compact = (n: number) =>
  Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
