import { groupContributions, RepositoryContributions } from "./RepositoryContributions";
import { getMergedPRs } from "@/lib/github";

export async function PRList() {
  const prs = (await getMergedPRs()).filter((pr) => !pr.own);
  const groups = groupContributions(prs);

  if (!prs.length) {
    return <p className="font-mono text-xs text-muted">No merged pull requests to show right now.</p>;
  }

  return (
    <div>
      <p className="mb-4 text-xs text-muted">
        {prs.length} merged pull requests across {groups.length} {groups.length === 1 ? "repository" : "repositories"}
      </p>
      <RepositoryContributions groups={groups.slice(0, 5)} />
    </div>
  );
}
