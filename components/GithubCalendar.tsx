import { getContributions } from "@/lib/github";
import { ActivityGraph } from "@/components/ActivityGraph";

/** Server wrapper: fetches the profile user's calendar and renders the graph. */
export async function GithubCalendar() {
  const data = await getContributions();

  if (!data) {
    return (
      <>
        <h2 className="section-title">GitHub activity</h2>
        <p className="font-mono text-xs text-muted">
          Couldn&apos;t load GitHub activity right now.
        </p>
      </>
    );
  }

  return <ActivityGraph days={data.days} total={data.total} />;
}
