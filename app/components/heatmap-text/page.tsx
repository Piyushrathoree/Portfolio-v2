import type { Metadata } from "next";
import Link from "next/link";
import { Playground } from "./Playground";

const description =
  "HeatmapText: spell any text as a GitHub-style contribution heatmap with a 5×7 pixel font, any colour, animated with Motion.";

export const metadata: Metadata = {
  title: "Heatmap text",
  description,
  alternates: { canonical: "/components/heatmap-text" },
  openGraph: { title: "Heatmap text | Piyush Rathore", description, url: "/components/heatmap-text" },
};

export default function HeatmapTextPage() {
  return (
    <>
      <Link href="/components" className="quiet-link font-mono text-xs">
        ← Components
      </Link>
      <h1 className="mt-4 mb-1 text-xl font-semibold text-primary">Heatmap text</h1>
      <p className="mb-2 text-[15px] text-muted">
        Spells text out as a contribution-style heatmap — the same cells and colour ramps as the graph, with a 5×7
        pixel font (A–Z, 0–9, a few symbols). It&apos;s what the{" "}
        <Link href="/this-page-does-not-exist" className="link">
          404 page
        </Link>{" "}
        uses.
      </p>
      <Playground />
    </>
  );
}
