import type { Metadata } from "next";
import Link from "next/link";
import { getContributions } from "@/lib/github";
import { Playground } from "./Playground";

const description =
  "GitHub contribution graph component: day heatmap or weekly bars, any colour, light/dark ramps derived automatically, animated with Motion.";

export const metadata: Metadata = {
  title: "Contribution graph",
  description,
  alternates: { canonical: "/components/contribution-graph" },
  openGraph: {
    title: "Contribution graph | Piyush Rathore",
    description,
    url: "/components/contribution-graph",
  },
};

export default async function ContributionGraphPage() {
  const data = await getContributions();

  return (
    <>
      <Link href="/components" className="quiet-link font-mono text-xs">
        ← Components
      </Link>
      <h1 className="mt-4 mb-1 text-xl font-semibold text-primary">
        GitHub contribution graph
      </h1>
      <p className="mb-2 text-[15px] text-muted">
        Two components, one data shape.{" "}
        <code className="font-mono text-[13px]">ContributionGraph</code> is the
        day-by-day heatmap in four variants;{" "}
        <code className="font-mono text-[13px]">ContributionBars</code> is one
        bar per week. Pass a preset name or any colour — the light and dark
        ramps are derived from it.
      </p>
      {data ? (
        <Playground days={data.days} total={data.total} />
      ) : (
        <p className="mt-8 font-mono text-xs text-muted">
          Couldn&apos;t load contributions right now.
        </p>
      )}
    </>
  );
}
