import { GitMerge } from "lucide-react";
import { PROFILE } from "@/data/profile";

type PR = {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  pull_request?: { merged_at?: string | null };
};

/**
 * Merged PRs authored by the profile user, fetched server-side via the
 * unauthenticated GitHub search API and cached for an hour. No token needed.
 */
async function getMergedPRs(): Promise<PR[]> {
  const q = encodeURIComponent(`author:${PROFILE.github} type:pr is:merged`);
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=30`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []) as PR[];
  } catch {
    return [];
  }
}

export async function PRList() {
  const prs = await getMergedPRs();
  // Skip PRs to the user's own repos — the point is contributions elsewhere.
  const external = prs.filter(
    (pr) => !pr.repository_url.toLowerCase().includes(`/repos/${PROFILE.github.toLowerCase()}/`)
  );
  // Prefer one PR per repo so the list shows breadth, then fill with the rest.
  const pool = external.length ? external : prs;
  const seen = new Set<string>();
  const unique = pool.filter((pr) => !seen.has(pr.repository_url) && seen.add(pr.repository_url));
  const list = [...unique, ...pool.filter((pr) => !unique.includes(pr))].slice(0, 5);

  if (!list.length) {
    return <p className="font-mono text-xs text-muted">No merged pull requests to show right now.</p>;
  }

  return (
    <div className="card">
      <ul className="divide-y">
        {list.map((pr) => {
          const repo = pr.repository_url.replace("https://api.github.com/repos/", "");
          return (
            <li key={pr.id}>
              <a
                href={pr.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 p-4 transition-colors"
              >
                <GitMerge size={14} className="mt-0.5 shrink-0 text-[#a371f7]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-primary transition-colors group-hover:text-accent">
                    {pr.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-muted">{repo}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
