"use client";
import { useEffect, useRef } from "react";
import { Card } from "@/components/Card";
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
import Bun from "@/icons/Bun";
import { Button } from "./ui/button";
import ExternalLinkIcon from "./ui/external-link-icon";

//project 1
const zenithStack = [
  { name: "Bun js ", children: <Bun /> },
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
  const scrollRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Handle scrolling for specific hashes
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === "#proof-with-work" || hash === "#proof-of-work") {
        let attempts = 0;
        const checkAndScroll = () => {
          if (scrollRef.current) {
            const yOffset = -120; // Negative offset scrolls 'less' (stops earlier), showing content above
            const y =
              scrollRef.current.getBoundingClientRect().top +
              window.scrollY +
              yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          } else if (attempts < 50) {
            attempts++;
            setTimeout(checkAndScroll, 100);
          }
        };
        checkAndScroll();
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);

    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

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
      <Button
        variant="default"
        size="sm"
        className="h-10 text-sm absolute mb-10 left-1/2 -translate-x-1/2 bottom-0 py-4"
      >
        <a
          className="flex py-2 text-black/70 dark:text-white/70 items-center justify-center"
          href="/projects"
        >
          Checkout Projects <ExternalLinkIcon className="ml-2 size-5" />
        </a>
      </Button>

      <span
        ref={scrollRef}
        className="flex items-center mt-30"
        id="proof-of-work"
      >
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-400"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-400"></span>
      </span>
    </div>
  );
};

export default Projects;
