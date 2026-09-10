import type { Metadata } from "next";
import { ArrowUpRight, GitMerge } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { formatMerged, getMergedPRs, type MergedPR } from "@/lib/github";

const description =
  "Every merged pull request by Piyush Rathore across open-source projects, grouped by repository.";

export const metadata: Metadata = {
  title: "Open source",
  description,
  alternates: { canonical: "/open-source" },
  openGraph: { title: "Open source | Piyush Rathore", description, url: "/open-source" },
};

export const revalidate = 3600;

function groupByRepo(prs: MergedPR[]) {
  const map = new Map<string, MergedPR[]>();
  for (const pr of prs) {
    const list = map.get(pr.repo) ?? [];
    list.push(pr);
    map.set(pr.repo, list);
  }
  // Most PRs first; ties broken by most recent merge.
  return [...map.entries()].sort(
    ([, a], [, b]) => b.length - a.length || b[0].mergedAt.localeCompare(a[0].mergedAt)
  );
}

function RepoCard({ repo, prs }: { repo: string; prs: MergedPR[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b p-4">
        <a
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-w-0 items-center gap-1 text-[15px] font-medium text-primary transition-colors hover:text-accent"
        >
          <span className="truncate">{repo}</span>
          <ArrowUpRight size={13} className="shrink-0" />
        </a>
        <span className="whitespace-nowrap font-mono text-xs text-muted">
          {prs.length} merged
        </span>
      </div>
      <ul className="divide-y">
        {prs.map((pr) => (
          <li key={pr.id}>
            <a
              href={pr.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 px-4 py-3"
            >
              <GitMerge size={14} className="mt-0.5 shrink-0 text-[#a371f7]" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-primary transition-colors group-hover:text-accent">
                  {pr.title}
                </span>
                <span className="mt-0.5 flex items-center gap-2 font-mono text-xs text-muted">
                  <span>#{pr.number}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={pr.mergedAt}>{formatMerged(pr.mergedAt)}</time>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function OpenSourcePage() {
  const all = await getMergedPRs();
  const external = all.filter((pr) => !pr.own);
  const own = all.filter((pr) => pr.own);
  const repos = groupByRepo(external);

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-primary">Open source</h1>
      <p className="mb-8 text-[15px] text-muted">
        {external.length} merged pull requests across {repos.length}{" "}
        {repos.length === 1 ? "repository" : "repositories"}.{" "}
        <a
          href={`https://github.com/pulls?q=is%3Apr+author%3A${PROFILE.github}+is%3Amerged`}
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          View on GitHub
        </a>
      </p>

      {repos.length === 0 ? (
        <p className="font-mono text-xs text-muted">
          Couldn&apos;t load pull requests right now — try again in a bit.
        </p>
      ) : (
        <div className="space-y-3">
          {repos.map(([repo, prs]) => (
            <RepoCard key={repo} repo={repo} prs={prs} />
          ))}
        </div>
      )}

      {own.length > 0 && (
        <details className="mt-10 group">
          <summary className="cursor-pointer font-mono text-xs text-muted transition-colors hover:text-secondary">
            + {own.length} merged into my own repositories
          </summary>
          <div className="mt-4 space-y-3">
            {groupByRepo(own).map(([repo, prs]) => (
              <RepoCard key={repo} repo={repo} prs={prs} />
            ))}
          </div>
        </details>
      )}
    </>
  );
}
