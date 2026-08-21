"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitPullRequest,
  Github,
  LoaderCircle,
  X,
} from "lucide-react";

type PullRequestState = "merged" | "open" | "closed";

type PullRequest = {
  id: string;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
  repository: { nameWithOwner: string };
};

type GithubResponse = {
  configured: boolean;
  pullRequests: PullRequest[];
  error?: string;
};

const filters: { key: PullRequestState; label: string }[] = [
  { key: "merged", label: "Merged" },
  { key: "open", label: "Open" },
  { key: "closed", label: "Closed" },
];

const PAGE_SIZE = 5;

function getPaginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (currentPage >= totalPages - 3) return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

export function PortfolioGithub({ isDark }: { isDark: boolean }) {
  const [filter, setFilter] = useState<PullRequestState>("merged");
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/github?state=${filter}`)
      .then(async (response) => {
        const data = (await response.json()) as GithubResponse;
        if (!response.ok) throw new Error(data.error ?? "Could not load GitHub activity.");
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setConfigured(data.configured);
        setPullRequests(data.pullRequests);
        setCurrentPage(1);
        setError(null);
        setLoading(false);
      })
      .catch((reason: Error) => {
        if (cancelled) return;
        setError(reason.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [filter]);

  const chooseFilter = (next: PullRequestState) => {
    if (next === filter) return;
    setLoading(true);
    setCurrentPage(1);
    setFilter(next);
  };

  const totalPages = Math.max(1, Math.ceil(pullRequests.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstPullRequest = (safeCurrentPage - 1) * PAGE_SIZE;
  const visiblePullRequests = pullRequests.slice(firstPullRequest, firstPullRequest + PAGE_SIZE);
  const paginationItems = getPaginationItems(safeCurrentPage, totalPages);

  return (
    <section className="portfolio-section portfolio-section--github" id="github">
      <div className="portfolio-section-heading"><span>GitHub</span><i /></div>
      <div className="portfolio-github-card portfolio-metal-card">
        <div className="portfolio-github-card__head">
          <div className="portfolio-github-card__identity">
            <span className="portfolio-icon-well"><Github size={19} /></span>
            <p><strong>Open source activity</strong><br />Building in public, one contribution at a time.</p>
          </div>
          <a className="portfolio-metal-button portfolio-metal-button--small" href="https://github.com/Piyushrathoree" target="_blank" rel="noreferrer">@Piyushrathoree <ExternalLink size={12} /></a>
        </div>

        <div className="portfolio-calendar-wrap">
          <GitHubCalendar
            username="Piyushrathoree"
            colorScheme={isDark ? "dark" : "light"}
            blockSize={10}
            blockMargin={4}
            blockRadius={2}
            fontSize={11}
            showWeekdayLabels={["mon", "wed", "fri"]}
            theme={{
              dark: ["#282828", "#444444", "#666666", "#939393", "#d4d4d4"],
              light: ["#e8e7e2", "#d2d0c7", "#aaa79b", "#7a786f", "#4e4e48"],
            }}
            labels={{ totalCount: "{{count}} contributions in the last year" }}
          />
        </div>
      </div>

      <div className="portfolio-pr-panel portfolio-metal-card">
        <div className="portfolio-pr-panel__head">
          <div>
            <span className="portfolio-eyebrow">Open source</span>
            <h3>Pull requests</h3>
            <p>Recent work across the projects and communities I contribute to.</p>
          </div>
          <div className="portfolio-filter" aria-label="Filter pull requests">
            {filters.map((item) => <button key={item.key} type="button" onClick={() => chooseFilter(item.key)} className={filter === item.key ? "is-active" : ""}>{item.label}</button>)}
          </div>
        </div>

        {!configured && <div className="portfolio-pr-notice"><Github size={17} /><span>Add <code>GITHUB_TOKEN</code> to the environment to show live pull requests.</span></div>}
        {error && <div className="portfolio-pr-notice portfolio-pr-notice--error"><X size={17} /><span>{error}</span></div>}

        {loading ? <div className="portfolio-pr-loading"><LoaderCircle size={17} /> Loading pull requests…</div> : configured && !error && (
          <div className="portfolio-pr-list">
            {visiblePullRequests.map((pr) => <a className="portfolio-pr-row" href={pr.url} target="_blank" rel="noreferrer" key={pr.id}>
              <span className={`portfolio-pr-state portfolio-pr-state--${filter}`}>{filter === "merged" ? <Check size={13} /> : filter === "open" ? <GitPullRequest size={13} /> : <X size={13} />}</span>
              <span className="portfolio-pr-copy"><strong>{pr.title}</strong><small>{pr.repository.nameWithOwner} · {formatDate(pr.mergedAt ?? pr.closedAt ?? pr.createdAt)}</small></span>
              <ExternalLink size={14} />
            </a>)}
            {pullRequests.length === 0 && <p className="portfolio-pr-empty">No {filter} pull requests found yet.</p>}
          </div>
        )}

        {configured && !error && pullRequests.length > PAGE_SIZE && (
          <div className="portfolio-pr-footer">
            <p>Showing {firstPullRequest + 1}–{Math.min(firstPullRequest + PAGE_SIZE, pullRequests.length)} of {pullRequests.length}</p>
            <nav className="portfolio-pr-pagination" aria-label="Pull request pages">
              <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={safeCurrentPage === 1} aria-label="Previous pull request page"><ChevronLeft size={14} /></button>
              {paginationItems.map((item, index) => item === "ellipsis" ? <span className="portfolio-pr-pagination__ellipsis" key={`ellipsis-${index}`}>…</span> : <button type="button" key={item} onClick={() => setCurrentPage(item)} className={item === safeCurrentPage ? "is-active" : ""} aria-current={item === safeCurrentPage ? "page" : undefined}>{item}</button>)}
              <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={safeCurrentPage === totalPages} aria-label="Next pull request page"><ChevronRight size={14} /></button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
