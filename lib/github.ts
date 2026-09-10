import { PROFILE } from "@/data/profile";

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
        }
      );
      if (!res.ok) break;
      const data = (await res.json()) as { items?: SearchItem[]; total_count?: number };
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
      const repo = p.repository_url.replace("https://api.github.com/repos/", "");
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
