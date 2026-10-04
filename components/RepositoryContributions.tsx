import { GitMergeIcon } from "@/components/icons/animated";
import { formatMerged, type MergedPR } from "@/lib/github";

export function groupContributions(prs: MergedPR[]) {
  const groups = new Map<string, MergedPR[]>();
  for (const pr of prs) {
    const group = groups.get(pr.repo) ?? [];
    group.push(pr);
    groups.set(pr.repo, group);
  }
  return [...groups.entries()].sort(
    ([, a], [, b]) => b.length - a.length || b[0].mergedAt.localeCompare(a[0].mergedAt),
  );
}

function PullRequests({ prs }: { prs: MergedPR[] }) {
  return (
    <ul className="repo-pulls">
      {prs.map((pr) => (
        <li key={pr.id}>
          <a href={pr.url} target="_blank" rel="noreferrer" className="repo-pull">
            <GitMergeIcon size={13} className="mt-1 shrink-0 text-[#a371f7]" />
            <span className="min-w-0 flex-1">
              <span className="repo-pull-title">{pr.title}</span>
              <span className="repo-pull-meta">
                #{pr.number} · <time dateTime={pr.mergedAt}>{formatMerged(pr.mergedAt)}</time>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function RepositoryContributions({ groups }: {
  groups: [string, MergedPR[]][];
}) {
  return (
    <div className="repo-contributions">
      {groups.map(([repo, prs]) => (
        <article className="card repo-contribution" key={repo}>
          <div className="repo-heading">
            <a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer" className="repo-name">
              {repo}
            </a>
            <span className="repo-count">{prs.length} merged</span>
          </div>
          <PullRequests prs={prs.slice(0, 2)} />
          {prs.length > 2 && (
            <details className="repo-more">
              <summary>
                <span className="repo-more-closed">Show {prs.length - 2} more</span>
                <span className="repo-more-open">Show less</span>
              </summary>
              <PullRequests prs={prs.slice(2)} />
            </details>
          )}
        </article>
      ))}
    </div>
  );
}
