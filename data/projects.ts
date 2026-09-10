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
    tech: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Redis", "Bun", "DigitalOcean"],
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
    status: "In development",
    description:
      "An AI-powered collaborative editor for writing and restructuring documents together in real time.",
    overview: [
      "Vexio is a collaborative editor where multiple people can write and restructure documents in real time, with AI assistance woven into the editing flow instead of bolted on as a chat box.",
      "Real-time sync runs over WebSockets with a Prisma-managed data model. The project is deployed across DigitalOcean and Vercel with Bun as the runtime for parts of the toolchain.",
    ],
    bullets: [
      "Real-time multi-user editing over WebSockets.",
      "AI-assisted drafting and editing built into the document flow.",
      "Full TypeScript stack: Next.js, Prisma, and Bun.",
    ],
    image: "/projects/vexio-showcase.webp",
    githubLink: "https://github.com/Piyushrathoree/vexio",
    tech: ["TypeScript", "Next.js", "Prisma", "WebSocket", "Bun", "DigitalOcean"],
    year: "2025",
    featured: true,
    role: "Design & engineering",
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
    tech: ["TypeScript", "React", "Next.js", "MongoDB", "TailwindCSS", "Vercel"],
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
