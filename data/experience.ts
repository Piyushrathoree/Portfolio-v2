export type Product = {
  name: string;
  url?: string;
  /** Path under /public, e.g. "/logos/assetsnip.svg". */
  logo?: string;
  tagline: string;
  bullets: string[];
  tech: string[];
};

export type Experience = {
  company: string;
  url?: string;
  logo?: string;
  tagline?: string;
  role: string;
  period: string;
  /** Rendered as the always-visible summary line under the role. */
  summary: string;
  /** Products / workstreams inside the role, shown when expanded. */
  products: Product[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Studio1HQ",
    url: "https://studio1hq.com",
    logo: "/logos/studio1hq.png",
    role: "Software Engineer Intern → Software Engineer",
    period: "Feb 2026 – Jul 2026",
    summary:
      "Shipped two products end to end: a website asset-extraction SaaS and a web analytics platform.",
    products: [
      {
        name: "AssetSnip",
        url: "https://assetsnip.com",
        logo: "/logos/assetsnip.svg",
        tagline: "Website asset extraction SaaS",
        bullets: [
          "Solely built and shipped a JavaScript browser extension for Chrome and Firefox, a Next.js web app, a Node.js/Express API, a PostgreSQL cloud library, and subscription billing infrastructure.",
          "Built extraction workflows for images, SVGs, videos, Lottie files, colors, gradients, typography, and UI components, with export to CSS, HTML, Tailwind, React, and AI-agent-ready DESIGN.md files.",
          "Added DOM Inspect mode, AI-assisted icon generation, and authenticated server-side quotas across three Dodo Payments subscription tiers.",
        ],
        tech: [
          "JavaScript",
          "Next.js",
          "Node.js",
          "Express",
          "PostgreSQL",
          "Browser Extensions",
          "Dodo Payments",
        ],
      },
      {
        name: "Raah",
        url: "https://raah.dev",
        logo: "/logos/raah.svg",
        tagline: "Web analytics & network observability platform",
        bullets: [
          "Migrated the product from Supabase to a typed backend using TypeScript, Bun, Express, Drizzle ORM, Neon PostgreSQL, and Better Auth.",
          "Built the Next.js/React dashboard from scratch for user analytics, journeys, referrers, Core Web Vitals, endpoint latency percentiles, error rates, and JavaScript-error investigation.",
        ],
        tech: [
          "TypeScript",
          "Bun",
          "Express",
          "Drizzle ORM",
          "Neon",
          "Better Auth",
          "Next.js",
          "React",
        ],
      },
    ],
  },
];
