/** Components I've built that are polished enough to reuse. Each has a live page under /components. */
export type ComponentEntry = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
};

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "contribution-graph",
    name: "GitHub contribution graph",
    description:
      "Day-by-day heatmap and weekly bars, any colour, light and dark ramps derived automatically. Pure SVG, animated with Motion.",
    tags: ["React", "Motion", "Tailwind"],
  },
  {
    slug: "heatmap-text",
    name: "Heatmap text",
    description:
      "Any text spelled out as a contribution-style heatmap with a 5×7 pixel font. Same colour ramps as the graph; powers the 404 page.",
    tags: ["React", "Motion", "Tailwind"],
  },
];
