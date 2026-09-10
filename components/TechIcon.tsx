import type { ReactNode } from "react";
import {
  SiBetterauth,
  SiDrizzle,
  SiExpress,
  SiGooglechrome,
  SiJsonwebtokens,
  SiNeon,
  SiPostgresql,
  SiSupabase,
} from "@icons-pack/react-simple-icons";
import { Boxes, CreditCard, Network, Puzzle } from "lucide-react";
import Bun from "@/icons/Bun";
import DockerIcon from "@/icons/DockerIcon";
import GitIcon from "@/icons/GitIcon";
import GoIcon from "@/icons/GoIcon";
import JsIcon from "@/icons/JsIcon";
import Mongo from "@/icons/Mongo";
import Nextjs from "@/icons/Nextjs";
import NodeIcon from "@/icons/NodeIcon";
import OceanIcon from "@/icons/OceanIcon";
import Prisma from "@/icons/Prisma";
import Py from "@/icons/Py";
import ReactIcon from "@/icons/ReactIcon";
import RedisIcon from "@/icons/RedisIcon";
import TailwindIcon from "@/icons/TailwindIcon";
import Ts from "@/icons/Ts";
import VercelIcon from "@/icons/VercelIcon";
import VS from "@/icons/VS";
import Ws from "@/icons/Ws";

const si = { size: "1em", color: "default" } as const;
// Brands whose colour is black: leave fill=currentColor so they follow the theme.
const mono = { size: "1em" } as const;

/**
 * Tech name → icon. Own SVGs in `icons/` first, simple-icons (brand colour)
 * for the rest, lucide glyphs for concepts that have no logo.
 */
const ICONS: Record<string, () => ReactNode> = {
  typescript: () => <Ts />,
  javascript: () => <JsIcon />,
  "next.js": () => <Nextjs />,
  nextjs: () => <Nextjs />,
  react: () => <ReactIcon />,
  "node.js": () => <NodeIcon />,
  nodejs: () => <NodeIcon />,
  python: () => <Py />,
  go: () => <GoIcon />,
  golang: () => <GoIcon />,
  tailwindcss: () => <TailwindIcon />,
  "tailwind css": () => <TailwindIcon />,
  prisma: () => <Prisma />,
  mongodb: () => <Mongo />,
  redis: () => <RedisIcon />,
  docker: () => <DockerIcon />,
  git: () => <GitIcon />,
  bun: () => <Bun />,
  "vs code": () => <VS />,
  vercel: () => <VercelIcon />,
  digitalocean: () => <OceanIcon />,
  websocket: () => <Ws />,
  websockets: () => <Ws />,
  postgresql: () => <SiPostgresql {...si} />,
  express: () => <SiExpress {...mono} />,
  "drizzle orm": () => <SiDrizzle {...si} />,
  neon: () => <SiNeon {...si} />,
  "better auth": () => <SiBetterauth {...mono} />,
  supabase: () => <SiSupabase {...si} />,
  jwt: () => <SiJsonwebtokens {...mono} />,
  "browser extensions": () => <SiGooglechrome {...si} />,
  "dodo payments": () => <CreditCard size="1em" className="text-dim" />,
  microservices: () => <Boxes size="1em" className="text-dim" />,
  "rest apis": () => <Network size="1em" className="text-dim" />,
  extension: () => <Puzzle size="1em" className="text-dim" />,
};

export function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const render = ICONS[name.toLowerCase()];
  if (!render) return null;
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center leading-none [&>div]:contents ${className}`}
    >
      {render()}
    </span>
  );
}

/** Pill with icon — skills section, connect row. */
export function TechBadge({ name }: { name: string }) {
  return (
    <span className="badge">
      <TechIcon name={name} className="text-[15px]" />
      {name}
    </span>
  );
}

/** Compact chip with icon — inside expanded cards. */
export function TechChip({ name }: { name: string }) {
  return (
    <span className="chip">
      <TechIcon name={name} className="text-[12px]" />
      {name}
    </span>
  );
}
