import { NextRequest, NextResponse } from "next/server";

type PullRequestState = "merged" | "open" | "closed";

const queries: Record<PullRequestState, string> = {
  merged: "author:Piyushrathoree type:pr is:merged is:public sort:updated-desc",
  open: "author:Piyushrathoree type:pr is:open is:public sort:updated-desc",
  closed: "author:Piyushrathoree type:pr is:closed is:unmerged is:public sort:updated-desc",
};

export async function GET(request: NextRequest) {
  const requestedState = request.nextUrl.searchParams.get("state");
  const state: PullRequestState = requestedState === "open" || requestedState === "closed"
    ? requestedState
    : "merged";
  // GITHUB_TOKEN is the secure server-only name. Keep the previous public
  // variable as a migration fallback so existing local deployments continue
  // to render activity while the environment is renamed.
  const token = process.env.GITHUB_TOKEN ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { configured: false, pullRequests: [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const query = `query {
    search(query: "${queries[state]}", type: ISSUE, first: 50) {
      edges {
        node {
          ... on PullRequest {
            id
            title
            url
            state
            createdAt
            mergedAt
            closedAt
            repository { nameWithOwner }
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 300 },
    });

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const payload = await response.json();
    if (payload.errors?.length) throw new Error(payload.errors[0].message ?? "GitHub query failed");
    const pullRequests = (payload.data?.search?.edges ?? [])
      .map((edge: { node: unknown }) => edge.node)
      .filter(Boolean)
      .sort((a: { mergedAt?: string; closedAt?: string; createdAt: string }, b: { mergedAt?: string; closedAt?: string; createdAt: string }) => {
        const aDate = new Date(a.mergedAt ?? a.closedAt ?? a.createdAt).getTime();
        const bDate = new Date(b.mergedAt ?? b.closedAt ?? b.createdAt).getTime();
        return bDate - aDate;
      });

    return NextResponse.json(
      { configured: true, pullRequests },
      { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=900" } }
    );
  } catch {
    return NextResponse.json(
      { configured: true, pullRequests: [], error: "GitHub activity is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
