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
      children: <TailwindIcon />
    },
    { name: "Digital Ocean", children: <OceanIcon /> },
    { name: "Vercel", children: <VercelIcon /> },
    { name: "Mongo DB", children: <Mongo /> }
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
    description: "A distraction-free productivity tool designed for people who want to stay in flow.",
    status: "In Production",
    githubLink: "https://github.com/Piyushrathoree/Zenith",
    imageSrc: "/image.png",
    techStack: zenithStack,
  },
  {
    title: "Welth",
    description: "A personal application to track expenses, set budgets, and achieve manage financial goals.",
    status: "Ready",
    githubLink: "https://github.com/Piyushrathoree/Welth",
    imageSrc: "/image.png",
    siteLink: "https://welth-ai-finance-app-liard.vercel.app/",
    techStack: [
      { name: "Javascript", children: <JsIcon /> },
      {
        name: "Next.js",
        children: <Nextjs />,
      },
      {
        name: "tailwindcss",
        children: <TailwindIcon />
      },
      { name: "React", children: <ReactIcon /> },
      { name: "Vercel", children: <VercelIcon /> },
      { name: "Prisma", children: <Prisma /> }
    ],
  }
];

const Projects = () => {

  return (
    <div className="mt-5 mb-30 relative">
      <div className="flex flex-col gap-1 text-neutral-900 dark:text-neutral-50/70">
        <p className="text-sm font-mono ">Featured</p>
        <h2 className="text-4xl font-black font-serif  border-b border-black dark:border-white/40 w-fit border-dashed">
          Projects
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-10 mt-10">
        {ProjectsData.map((project) => {
          return <Card
            key={project.title}
            title={project.title}
            description={project.description}
            status={project.status}
            githubLink={project.githubLink}
            imageSrc={project.imageSrc}
            techStack={project.techStack}
          />
        })}
      </div>
      <a
        className="flex gap-2 items-center mx-auto text-lg border w-fit dark:border-white/60  px-4 py-1 border-dashed mt-10  border-black/40  duration-300 dark:bg-neutral-900 bg-neutral-100 hover:dark:bg-neutral-950 hover:bg-neutral-200 "
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
