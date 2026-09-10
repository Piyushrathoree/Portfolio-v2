export type SkillGroup = { label: string; items: string[] };

export const SKILLS: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go"] },
  {
    label: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "TailwindCSS"],
  },
  {
    label: "Data & Backend",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Drizzle ORM",
      "Neon",
      "WebSocket",
      "Better Auth",
    ],
  },
  {
    label: "Tools & DevOps",
    items: ["Bun", "Docker", "Git", "DigitalOcean", "Vercel", "VS Code"],
  },
  { label: "Architecture", items: ["Microservices", "Browser Extensions", "REST APIs", "WebSockets"] },
];
