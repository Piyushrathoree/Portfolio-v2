import { Card, CardProps } from "./Card";
import { SquareArrowOutUpRightIcon } from "lucide-react";

import Nextjs from "@/icons/Nextjs";
import NodeIcon from "@/icons/NodeIcon";
import Ts from "@/icons/Ts";
import TailwindIcon from "@/icons/TailwindIcon";
import OceanIcon from "@/icons/OceanIcon";
import VercelIcon from "@/icons/VercelIcon";
import Mongo from "@/icons/Mongo";
import JsIcon from "@/icons/JsIcon";
import ReactIcon from "@/icons/ReactIcon";
import Prisma from "@/icons/Prisma";

//project 1
const zenithStack = [
  { name: "Node.js", children: <NodeIcon /> },
  { name: "Typescript", children: <Ts /> },
  {
    name: "Next.js",
    children: <Nextjs />,
  },
  {
    name: "tailwindcss",
    children: <TailwindIcon />,
  },
  { name: "Digital Ocean", children: <OceanIcon /> },
  { name: "Vercel", children: <VercelIcon /> },
  { name: "Mongo DB", children: <Mongo /> },
];
const ProjectsData: {
  title: string;
  description: string;
  status: "Ready" | "In Production";
  githubLink?: string;
  siteLink?: string;
  imageSrc: string;
  techStack: { name: string; children: React.ReactNode }[];
}[] = [
  {
    title: "Zenith",
    description:
      "A distraction-free productivity tool designed for people who want to stay in flow.",
    status: "In Production",
    githubLink: "https://github.com/Piyushrathoree/Zenith",
    imageSrc: "/projects/zenith-showcase.png",
    techStack: zenithStack,
  },
  {
    title: "Welth",
    description:
      "A personal application to track expenses, set budgets, and achieve manage financial goals.",
    status: "Ready",
    githubLink: "https://github.com/Piyushrathoree/Welth",
    imageSrc: "/projects/welth-showcase.png",
    siteLink: "https://welth-ai-finance-app-liard.vercel.app/",
    techStack: [
      { name: "Javascript", children: <JsIcon /> },
      {
        name: "Next.js",
        children: <Nextjs />,
      },
      {
        name: "tailwindcss",
        children: <TailwindIcon />,
      },
      { name: "React", children: <ReactIcon /> },
      { name: "Vercel", children: <VercelIcon /> },
      { name: "Prisma", children: <Prisma /> },
    ],
  },
];

const Projects = () => {
  return (
    <div className=" mb-20 relative ">
      <div className="flex flex-col gap-1 text-neutral-900 dark:text-neutral-50/90">
        <p className="text-sm font-mono text-neutral-600 dark:text-neutral-300">
          Featured
        </p>
        <h2 className="text-4xl font-black font-serif  border-b border-black dark:border-white/40 w-fit border-dashed">
          Projects
        </h2>
      </div>
      <div className="grid sm:grid-cols-2  mt-10  gap-10">
        {ProjectsData.map((project) => {
          return (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              status={project.status}
              githubLink={project.githubLink}
              siteLink={project.siteLink}
              imageSrc={project.imageSrc}
              techStack={project.techStack}
            />
          );
        })}
      </div>
      <a
        className="flex gap-2 mt-10 items-center mx-auto text-md w-fit border rounded-sm  dark:bg-neutral-800 bg-neutral-100/70 hover:bg-neutral-200 dark:hover:bg-neutral-900 duration-300 py-1.5 px-2 text-black/70 dark:text-white/70 shadow-inner shadow-neutral-400 dark:shadow-neutral-500"
        href="/projects"
      >
        {" "}
        Checkout Projects <SquareArrowOutUpRightIcon size={20} />
      </a>
      
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-400"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-400"></span>
      </span>
    </div>
  );
};

export default Projects;
