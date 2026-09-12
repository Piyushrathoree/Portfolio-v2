export type Project = {
  slug: string;
  title: string;
  status: "Live" | "In development" | "Ready";
  /** One-line summary shown on the card. */
  description: string;
  /** Long-form paragraphs for the project detail page. */
  overview: string[];
  /** Concrete talking points, shown when a card is expanded. */
  bullets: string[];
  image: string;
  siteLink?: string;
  githubLink: string;
  tech: string[];
  year: string;
  /** Featured projects appear on the homepage. */
  featured?: boolean;
  role: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "orin",
    title: "Orin",
    status: "Live",
    description:
      "An AI coding workspace that generates, runs, and previews a whole app inside the browser tab.",
    overview: [
      "Orin turns a prompt into a running application. You describe what you want, and it writes the files, installs the dependencies, starts the dev server, and shows you a live preview \u2014 all inside the browser, with no server-side sandbox executing your code.",
      "It is a three-service Turborepo: a Next.js editor wiring CodeMirror and xterm to a WebContainer runtime, an Express API that brokers the model calls, and a WebSocket/WebRTC service for working in a room with someone else. Projects are account-owned and persisted through Prisma and PostgreSQL.",
    ],
    bullets: [
      "Validated four-action AI protocol \u2014 write, mkdir, delete, shell \u2014 with path checks that reject traversal before anything touches the filesystem.",
      "One adapter across three model providers: Gemini, OpenRouter, and local OpenAI-compatible servers.",
      "WebRTC peer sessions with chat, audio/video, and 256 KB chunked file transfer behind a windowed ACK.",
    ],
    image: "/projects/Orin-showcase.png",
    siteLink: "https://orin-app-navy.vercel.app/",
    githubLink: "https://github.com/Piyushrathoree/Orin",
    tech: [
      "TypeScript",
      "Next.js",
      "Express",
      "WebContainer",
      "WebRTC",
      "Prisma",
      "PostgreSQL",
      "Bun",
    ],
    year: "2026",
    featured: true,
    role: "Full-stack development",
  },
  {
    slug: "zenith",
    title: "Zenith",
    status: "Live",
    description:
      "A distraction-free productivity tool for people who want to stay in flow.",
    overview: [
      "Zenith is a productivity workspace built around a single idea: protecting attention. Tasks, notes, and focus sessions live in one calm surface, so the next thing to do is always obvious and nothing else competes for it.",
      "It runs as a full TypeScript application with a Next.js front end and a Node.js API backed by MongoDB and Redis for caching and sessions, deployed across DigitalOcean and Vercel.",
    ],
    bullets: [
      "Focus-first interface that keeps the current task front and center.",
      "REST API built with Node.js and TypeScript, with Redis-backed caching.",
      "Deployed in production on DigitalOcean with Bun in the toolchain.",
    ],
    image: "/projects/zenith-showcase.webp",
    siteLink: "https://zenith.piyushh.me/",
    githubLink: "https://github.com/Piyushrathoree/Zenith",
    tech: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Redis",
      "Bun",
      "DigitalOcean",
    ],
    year: "2025",
    featured: true,
    role: "Full-stack development",
  },
  {
    slug: "welth",
    title: "Welth",
    status: "Live",
    description:
      "A personal finance app for tracking expenses, setting budgets, and hitting savings goals.",
    overview: [
      "Welth turns day-to-day spending into a plan instead of a spreadsheet. Expenses, budgets, and savings goals are modeled together, so every transaction moves a number that actually matters.",
      "The app is a Next.js application styled with Tailwind CSS, using Prisma on top of a hosted database and deployed to Vercel.",
    ],
    bullets: [
      "Budget and goal tracking built around real spending behaviour.",
      "Type-safe data layer with Prisma and a React/Next.js interface.",
      "Shipped end to end: schema, API, UI, and deployment.",
    ],
    image: "/projects/welth-showcase.webp",
    siteLink: "https://welth-ai-finance-app-liard.vercel.app/",
    githubLink: "https://github.com/Piyushrathoree/Welth",
    tech: ["JavaScript", "Next.js", "React", "Prisma", "TailwindCSS", "Vercel"],
    year: "2025",
    featured: true,
    role: "Full-stack development",
  },
  {
    slug: "vexio",
    title: "Vexio",
    status: "Live",
    description:
      "A real-time collaborative whiteboard \u2014 draw together, see each other's cursors, and pick up after a dropped connection.",
    overview: [
      "Vexio is a shared whiteboard where several people draw on one canvas at once. Shapes, pen strokes, text, and sticky notes sync live, along with every collaborator's cursor and selection, so a room behaves like a single surface rather than a set of drifting copies.",
      "It runs as three deployable apps: a Next.js client with a custom HTML Canvas renderer, an Express REST API for auth and room management, and a raw WebSocket server that holds live room state in memory and writes debounced snapshots to PostgreSQL through Prisma.",
    ],
    bullets: [
      "Ten drawing element types with live cursors, selections, undo/redo, and admin/editor/viewer roles enforced on the server.",
      "Drag updates throttled to ~30/sec and snapshots debounced to 1.5s, collapsing hundreds of writes per drag into one.",
      "Survives dropped connections with exponential backoff and a 500-operation offline queue that replays on reconnect.",
    ],
    image: "/projects/vexio-showcase.png",
    siteLink: "https://vexio-web-eta.vercel.app",
    githubLink: "https://github.com/Piyushrathoree/Vexio",
    tech: [
      "TypeScript",
      "Next.js",
      "React",
      "WebSocket",
      "Prisma",
      "PostgreSQL",
      "Bun",
    ],
    year: "2026",
    featured: true,
    role: "Design & engineering",
  },
  {
    slug: "paywall",
    title: "Paywall",
    status: "Ready",
    description:
      "A wallet and merchant checkout platform, built to get the money-handling parts right.",
    overview: [
      "Paywall is a two-sided payments build. Customers hold a wallet, top it up through simulated bank pages, and send money to each other by phone number. Merchants create payment links, collect from a wallet at checkout, and review customers, payments, and settlements.",
      "It is a Turborepo of three apps \u2014 the customer wallet, the merchant workspace, and an Express webhook service \u2014 sharing one Prisma schema on PostgreSQL. No real bank, card, or payout is involved; the point of the project is the correctness of the balance handling underneath.",
    ],
    bullets: [
      "Every balance change runs inside a PostgreSQL transaction with SELECT ... FOR UPDATE row locks, so concurrent debits cannot race.",
      "Amounts stored as integer paise rather than floats, so rounding drift never accumulates.",
      "Nine-model schema covering wallets, transfers, payment links, merchant customers, payments, and settlements.",
    ],
    image: "/projects/paywall-showcase.png",
    githubLink: "https://github.com/Piyushrathoree/Paywall",
    tech: [
      "TypeScript",
      "Next.js",
      "NextAuth",
      "Prisma",
      "PostgreSQL",
      "Express",
      "Docker",
    ],
    year: "2026",
    featured: true,
    role: "Full-stack development",
  },
  {
    slug: "meetup",
    title: "Meetup",
    status: "Live",
    description:
      "A real-time video calling app with meeting recording, built for small teams.",
    overview: [
      "Meetup is a video calling application focused on the basics teams actually need: dependable calls, shared rooms, and the ability to record a session for anyone who missed it.",
      "The front end is a React and TypeScript application with a Next.js server layer, deployed on Vercel with MongoDB for rooms and metadata.",
    ],
    bullets: [
      "Real-time video rooms with a low-friction joining flow.",
      "Meeting recording captured server-side and replayable later.",
      "React + TypeScript front end deployed on Vercel.",
    ],
    image: "/projects/meetup-showcase.webp",
    siteLink: "https://meet-up-three-pi.vercel.app/",
    githubLink: "https://github.com/Piyushrathoree/meetup",
    tech: [
      "TypeScript",
      "React",
      "Next.js",
      "MongoDB",
      "TailwindCSS",
      "Vercel",
    ],
    year: "2024",
    role: "Full-stack development",
  },
  {
    slug: "brainly",
    title: "Brainly",
    status: "Ready",
    description:
      "A second-brain app for capturing links, notes, and ideas and finding them again later.",
    overview: [
      "Brainly is a personal knowledge base: save links, notes, and ideas as they show up, then find them again when they matter. The emphasis is on fast capture and simple retrieval rather than elaborate organization.",
      "It is a React and TypeScript client with a Node.js API, both deployed on Vercel, backed by MongoDB.",
    ],
    bullets: [
      "Quick-capture flow designed for zero-friction saving.",
      "Client and API share one TypeScript codebase.",
      "MongoDB-backed storage with Vercel deployments.",
    ],
    image: "/projects/brainly-showcase.webp",
    githubLink: "https://github.com/Piyushrathoree/Brainly-client",
    tech: ["TypeScript", "React", "Node.js", "MongoDB", "TailwindCSS"],
    year: "2024",
    role: "Full-stack development",
  },
  {
    slug: "video-tube",
    title: "Video-tube",
    status: "Ready",
    description:
      "A backend-first video sharing platform with the core YouTube mechanics.",
    overview: [
      "Video-tube is a backend-heavy build of a video sharing platform: uploads, channels, subscriptions, likes, comments, and watch history — the full object model behind a YouTube-style product.",
      "The API is written in JavaScript with Node.js and Express-style routing over MongoDB, covering auth, media metadata, and aggregation pipelines for feeds.",
    ],
    bullets: [
      "Complete domain model: channels, videos, playlists, comments, likes.",
      "MongoDB aggregation pipelines for feeds and watch history.",
      "JWT-based authentication and authorization throughout.",
    ],
    image: "/projects/videotube-showcase.webp",
    githubLink: "https://github.com/Piyushrathoree/videotube",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB", "JWT"],
    year: "2024",
    role: "Backend engineering",
  },
  {
    slug: "subscription-manager",
    title: "Subscription Manager",
    status: "Ready",
    description:
      "A microservices-based subscription and billing system, built service by service.",
    overview: [
      "Subscription Manager is a take on recurring billing split into independently deployable services. It is the project I used to learn microservices end to end, and the subject of my two longest write-ups.",
      "Each service owns its data and communicates over lightweight contracts, with Node.js and MongoDB underneath.",
    ],
    bullets: [
      "Service-oriented architecture with independently deployable units.",
      "Recurring billing, plans, and renewal scheduling modeled explicitly.",
      "Documented in the microservices article series on this site.",
    ],
    image: "/projects/subscription-manager-showcase.webp",
    githubLink:
      "https://github.com/Piyushrathoree/microservices-subscription-system",
    tech: ["JavaScript", "Node.js", "Microservices", "MongoDB"],
    year: "2025",
    role: "Backend engineering",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return PROJECTS[(index + 1) % PROJECTS.length];
}
