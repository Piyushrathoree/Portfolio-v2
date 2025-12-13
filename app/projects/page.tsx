import { Card } from "@/components/Card";
import Bun from "@/icons/Bun";
import Fastapi from "@/icons/Fastapi";
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
import React from "react";

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
    techStack: [
      { name: "Node.js", children: <NodeIcon /> },
      { name: "Typescript", children: <Ts /> },
      {
        name: "Next.js",
        children: <Nextjs />,
      },

      { name: "Digital Ocean", children: <OceanIcon /> },
      { name: "Mongo DB", children: <Mongo /> },
      { name: "Bun", children: <Bun /> },
      { name: "Redis", children: <RedisIcon /> },
    ],
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
  {
    title: "Meetup",
    description:
      "A real-time video calling application enabling seamless communication between users and record meetings for future reference.",
    status: "Ready",
    githubLink: "https://github.com/Piyushrathoree/meetup",
    siteLink: "https://meet-up-three-pi.vercel.app/",
    imageSrc: "/projects/meetup-showcase.png",
    techStack: [
      { name: "Typescript", children: <Ts /> },
      { name: "React", children: <ReactIcon /> },
      { name: "Next.js", children: <Nextjs /> },
      { name: "tailwindcss", children: <TailwindIcon /> },
      { name: "Vercel", children: <VercelIcon /> },
      { name: "Mongo DB", children: <Mongo /> },
    ],
  },
  {
    title: "Brainly",
    description:
      "The second Brain application to help people to remember things that they want in future",
    status: "Ready",
    githubLink: "https://github.com/Piyushrathoree/Brainly-client",
    imageSrc: "/projects/brainly-showcase.png",
    siteLink: "https://app-brainly-peach.vercel.app",
    techStack: [
      { name: "Typescript", children: <Ts /> },
      {
        name: "tailwindcss",
        children: <TailwindIcon />,
      },
      { name: "React", children: <ReactIcon /> },
      { name: "Vercel", children: <VercelIcon /> },
      { name: "Mongo DB", children: <Mongo /> },
      { name: "Node.js", children: <NodeIcon /> },
    ],
  },
  {
    title: "Video-tube",
    description: "A video sharing Platform similar to youtube. (Backend)",
    status: "Ready",
    githubLink: "https://github.com/Piyushrathoree/videotube",
    imageSrc: "/projects/videotube-showcase.png",
    techStack: [
      { name: "Javascript", children: <JsIcon /> },
      { name: "Node.js", children: <NodeIcon /> },
      { name: "Vercel", children: <VercelIcon /> },
      { name: "MongoDB", children: <Mongo /> },
    ],
  },
  {
    title: "Vexio",
    description: "An AI powered Collaborative web editor (In production)",
    status: "In Production",
    githubLink: "https://github.com/Piyushrathoree/vexio",
    imageSrc: "/projects/ai-showcase.png",
    techStack: [
      { name: "Python", children: <Py /> },
      {
        name: "Next.js",
        children: <Nextjs />,
      },
      {
        name: "tailwindcss",
        children: <TailwindIcon />,
      },
      { name: "FastAPI", children: <Fastapi /> },
      { name: "Vercel", children: <VercelIcon /> },
    ],
  },
];
const page = () => {
  return (
    <div className="flex flex-col justify-start items-start  min-h-screen pt-25 sm:pt-35 sm:w-230 mx-auto">
      <div className="flex flex-col ml-5 ">
        <h1 className="font-serif  text-4xl tracking-tight font-black border-b border-black dark:border-white/40 w-fit border-dashed">
          Projects
        </h1>
        <p className="font-sans">
          My projects and work across different technologies and domains.
        </p>
      </div>
      <div className="mx-auto">
        <div className="grid sm:grid-cols-2 gap-6 mt-10 max-sm:w-95">
          {ProjectsData.map((project) => {
            return (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                status={project.status}
                siteLink={project.siteLink}
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
};

export default page;
