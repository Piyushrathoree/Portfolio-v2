"use client";

import { useEffect, useState, cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";

interface PR {
  id: number;
  title: string;
  url: string;
  repository: {
    nameWithOwner: string;
  };
  state: string;
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
}

const GithubGraph = () => {
  const { theme } = useTheme();
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState<"merged" | "open" | "closed">(
    "merged"
  );
  const [showPRSection, setShowPRSection] = useState(true);
  const [closedPRIds, setClosedPRIds] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const initialCount = 2;

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const searchQuery =
          filterType === "merged"
            ? "author:Piyushrathoree type:pr is:merged"
            : filterType === "open"
            ? "author:Piyushrathoree type:pr is:open"
            : "author:Piyushrathoree type:pr is:closed is:unmerged";

        const query = `query {
          search(query: "${searchQuery}", type: ISSUE, first: 12) {
            edges {
              node {
                ... on PullRequest {
                  id
                  title
                  url
                  repository {
                    nameWithOwner
                  }
                  state
                  createdAt
                  mergedAt
                  closedAt
                }
              }
            }
          }
        }`;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""
            }`,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.data?.search?.edges) {
          const fetchedPRs = data.data.search.edges.map(
            (edge: any) => edge.node
          );
          // Sort by date (newest first)
          fetchedPRs.sort((a: PR, b: PR) => {
            const dateA = new Date(
              b.mergedAt || b.closedAt || b.createdAt
            ).getTime();
            const dateB = new Date(
              a.mergedAt || a.closedAt || a.createdAt
            ).getTime();
            return dateA - dateB;
          });
          setPrs(fetchedPRs);
          setShowAll(false);
        }
      } catch (error) {
        console.error("Failed to fetch PRs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [filterType]);

  return (
    <div className="sm:w-240 sm:px-10 px-5 -mt-10 max-sm:w-screen">
      <p className="font-mono text-sm">Featured</p>
      <h2 className="text-4xl font-black font-serif  border-b border-black dark:border-white/40 w-fit border-dashed tracking-wide  ">
        Proof Of Work
      </h2>
      <div className="hidden md:block absolute right-6 sm:w-240 sm:px-10 px-20 h-px bg-(--pattern-fg) my-[0.4] opacity-90 dark:opacity-15"></div>
      <p
        className=" font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-4 py-[7px]
           text-sm inline-block
          bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6"
      >
        {" "}
        I live spending time in open source,building real stuff and solving real
        problems
      </p>

      {/* Graph Component */}
      <div className="w-full flex justify-center">
        <div className="flex w-full justify-center">
          {mounted && (
            <>
              <GitHubCalendar
                username="Piyushrathoree"
                colorScheme={theme === "dark" ? "light" : "light"}
                blockSize={isMobile ? 7 : 11}
                blockMargin={isMobile ? 2 : 4}
                fontSize={isMobile ? 10 : 12}
                renderBlock={(block: any, activity: any) =>
                  cloneElement(block, {
                    "data-tooltip-id": "github-tooltip",
                    "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                  })
                }
              />
              <Tooltip
                id="github-tooltip"
                style={{
                  backgroundColor: theme === "dark" ? "#171717" : "#ffffff",
                  color: theme === "dark" ? "#e5e5e5" : "#171717",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border:
                    theme === "dark"
                      ? "1px solid #404040"
                      : "1px solid #e5e5e5",
                  opacity: 1,
                }}
              />
            </>
          )}
        </div>
      </div>
      {showPRSection && (
        <div className="mt-4">
          <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-neutral-900 dark:text-neutral-50 font-custom font-bold text-2xl tracking-tight">
              <span className="font-serif border-b border-neutral-700 dark:border-neutral-500 border-dashed ">
                Pull Requests
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-black/5 dark:bg-white/5 rounded p-1 border border-dashed border-neutral-900/10 dark:border-neutral-50/10 ">
                <button
                  onClick={() => setFilterType("merged")}
                  className={`px-3 py-1.5  text-xs font-medium transition-all duration-200 ${
                    filterType === "merged"
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-inner shadow-neutral-300 dark:shadow-neutral-500 rounded-[3px]"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 "
                  }`}
                >
                  Merged
                </button>
                <button
                  onClick={() => setFilterType("open")}
                  className={`px-3 py-1.5  text-xs font-medium transition-all duration-200 ${
                    filterType === "open"
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-inner shadow-neutral-300 dark:shadow-neutral-500 rounded-[3px]"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  Open
                </button>
                <button
                  onClick={() => setFilterType("closed")}
                  className={`px-3 py-1.5  text-xs font-medium transition-all duration-200 ${
                    filterType === "closed"
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-inner shadow-neutral-300 dark:shadow-neutral-500 rounded-[3px]"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  Closed
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-custom2 mb-4">
            {filterType === "merged"
              ? "Merged contributions to open source"
              : filterType === "open"
              ? "Active pull requests"
              : "Closed pull requests"}
          </p>
          <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-(--pattern-fg) opacity-90 dark:opacity-15"></div>

          {loading ? (
            <div className="text-neutral-600 dark:text-neutral-400  text-sm mt-4">
              Loading pull requests...
            </div>
          ) : prs.length > 0 ? (
            <div>
              <div className="space-y-2 mt-5">
                {prs
                  .slice(0, showAll ? prs.length : initialCount)
                  .filter((pr) => !closedPRIds.has(pr.id))
                  .map((pr, index) => (
                    <div
                      key={pr.id}
                      className="group flex items-start gap-3 p-3 rounded-sm transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 border border-neutral-300/50 dark:border-neutral-900/80 hover:border-neutral-300/50 dark:hover:border-neutral-700/50 "
                    >
                      <div className="shrink-0 mt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full group-hover:scale-130 transition-transform duration-200 `}
                        >
                          {filterType === "merged" ? (
                            <img src="/icons/gitmerge.svg" alt="" />
                          ) : filterType === "open" ? (
                            <img src="/icons/gitopen.svg" alt="" />
                          ) : (
                            <img src="/icons/gitclose.svg" alt="" />
                          )}
                        </div>
                      </div>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 hover:no-underline"
                      >
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors truncate">
                          {pr.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5 font-custom2">
                          {pr.repository.nameWithOwner}
                        </p>
                      </a>
                    </div>
                  ))}
              </div>
              {prs.length > initialCount && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="rounded-sm dark:bg-neutral-800 bg-neutral-100/70 hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 py-1.5 px-2 text-black/70 dark:text-white/70 shadow-inner shadow-neutral-400 dark:shadow-neutral-500"
                  >
                    {showAll
                      ? "↑ Collapse"
                      : `↓ Expand • ${
                          prs.length - closedPRIds.size - initialCount
                        } more`}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-secondary font-custom2 text-sm mt-4">
              No pull requests found
            </div>
          )}
        </div>
      )}
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-400"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-400"></span>
      </span>
    </div>
  );
};

export default GithubGraph;
