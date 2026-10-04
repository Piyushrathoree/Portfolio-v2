import type { Metadata } from "next";
import { groupContributions, RepositoryContributions } from "@/components/RepositoryContributions";
import { PROFILE } from "@/data/profile";
import { getMergedPRs } from "@/lib/github";

const description =
  "Every merged pull request by Piyush Rathore across open-source projects, grouped by repository.";

export const metadata: Metadata = {
  title: "Open source",
  description,
  alternates: { canonical: "/open-source" },
  openGraph: {
    title: "Open source | Piyush Rathore",
    description,
    url: "/open-source",
  },
};

export const revalidate = 3600;

export default async function OpenSourcePage() {
  const all = await getMergedPRs();
  const external = all.filter((pr) => !pr.own);
  const own = all.filter((pr) => pr.own);
  const repos = groupContributions(external);

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
        <RepositoryContributions groups={repos} />
      )}

      {own.length > 0 && (
        <details className="mt-10 group">
          <summary className="cursor-pointer font-mono text-xs text-muted transition-colors hover:text-secondary">
            + {own.length} merged into my own repositories
          </summary>
          <div className="mt-4">
            <RepositoryContributions groups={groupContributions(own)} />
          </div>
        </details>
      )}
    </>
  );
}
