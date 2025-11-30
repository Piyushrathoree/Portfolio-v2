import { Card } from '@/components/Card';
import JsIcon from '@/icons/JsIcon';
import Mongo from '@/icons/Mongo';
import Nextjs from '@/icons/Nextjs';
import NodeIcon from '@/icons/NodeIcon';
import OceanIcon from '@/icons/OceanIcon';
import Prisma from '@/icons/Prisma';
import ReactIcon from '@/icons/ReactIcon';
import TailwindIcon from '@/icons/TailwindIcon';
import Ts from '@/icons/Ts';
import VercelIcon from '@/icons/VercelIcon';
import React from 'react'


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
  },

];
const page = () => {
  return (
    <div className="flex flex-col justify-start items-start  min-h-screen pt-35 bg-accent/50 w-240 mx-auto">
      <div className="flex flex-col ml-5 ">
        <h1 className="font-serif  text-4xl tracking-tight font-black border-b border-black dark:border-white/40 w-fit border-dashed">
          Projects
        </h1>
        <p className="font-sans">
          My projects and work across different technologies and domains.
        </p>
      </div>
      <div className="mx-auto">
        <div className="grid sm:grid-cols-2 gap-10 mt-10 ">
          {ProjectsData.map((project) => {
            return (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                status={project.status}
                githubLink={project.githubLink}
                imageSrc={project.imageSrc}
                techStack={project.techStack}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page