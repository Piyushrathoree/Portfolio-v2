import { GitMerge } from "lucide-react";
import { formatMerged, getMergedPRs } from "@/lib/github";

/** The five most recently merged contributions to other people's repos. */
export async function PRList() {
  const prs = (await getMergedPRs()).filter((pr) => !pr.own).slice(0, 5);

  if (!prs.length) {
    return <p className="font-mono text-xs text-muted">No merged pull requests to show right now.</p>;
  }

  return (
    <div className="card">
      <ul className="divide-y">
        {prs.map((pr) => (
          <li key={pr.id}>
            <a
              href={pr.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 p-4 transition-colors"
            >
              <GitMerge size={14} className="mt-0.5 shrink-0 text-[#a371f7]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-primary transition-colors group-hover:text-accent">
                  {pr.title}
                </span>
                <span className="mt-0.5 flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="truncate">{pr.repo}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={pr.mergedAt} className="whitespace-nowrap">
                    {formatMerged(pr.mergedAt)}
                  </time>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
