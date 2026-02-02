import React from "react";
import Nextjs from "@/icons/Nextjs";
import Py from "@/icons/Py";
import NodeIcon from "@/icons/NodeIcon";
import Ts from "@/icons/Ts";
import ReactIcon from "@/icons/ReactIcon";
import DockerIcon from "@/icons/DockerIcon";
import GitIcon from "@/icons/GitIcon";
import Prisma from "@/icons/Prisma";
import RedisIcon from "@/icons/RedisIcon";
import TailwindIcon from "@/icons/TailwindIcon";
import Mongo from "@/icons/Mongo";
import Bun from "@/icons/Bun";
import GoIcon from "@/icons/GoIcon";
import VS from "@/icons/VS";

const skills = [
  {
    name: "Typescript",
    icon: <Ts />,
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Node.js",
    icon: <NodeIcon />,
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    icon: <Nextjs />,
    link: "https://nextjs.org/",
  },
  {
    name: "Python",
    icon: <Py />,
    link: "https://www.python.org/",
  },
  {
    name: "React",
    icon: <ReactIcon />,
    link: "https://react.dev/",
  },
  {
    name: "Docker",
    icon: <DockerIcon />,
    link: "https://www.docker.com/",
  },
  {
    name: "Git",
    icon: <GitIcon />,
    link: "https://git-scm.com/",
  },
  {
    name: "Prisma",
    icon: <Prisma />,
    link: "https://www.prisma.io/",
  },
  {
    name: "Redis",
    icon: <RedisIcon />,
    link: "https://redis.io/",
  },
  {
    name: "Tailwind css",
    icon: <TailwindIcon />,
    link: "https://tailwindcss.com/",
  },
  {
    name: "Golang",
    icon: <GoIcon />,
    link: "https://go.dev/",
  },
  {
    name: "MongoDB",
    icon: <Mongo />,
    link: "https://www.mongodb.com/",
  },
  {
    name: "Bun",
    icon: <Bun />,
    link: "https://bun.sh/",
  },
  {
    name: "Visual Studio Code",
    icon: <VS />,
    link: "https://code.visualstudio.com/",
  },
];

const Skills = () => {
  return (
    <div className="w-full ">
      <div className="mb-10">
        <p className="font-mono text-sm">Featured</p>
        <h1 className="font-serif  text-4xl tracking-tight font-black border-b border-black dark:border-white/40 w-fit border-dashed">
          Tools <span className="px-2">&</span> Technologies
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto py-8">
        {skills.map((skill) => (
          <a
            key={skill.name}
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300 hover:scale-110"
          >
            <div className="text-4xl grayscale transition-all duration-300 group-hover:grayscale-0 opacity-80 group-hover:opacity-100">
              {skill.icon}
            </div>
            <span className="text-sm font-medium text-neutral-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute -bottom-2 whitespace-nowrap dark:text-neutral-400">
              {skill.name}
            </span>
          </a>
        ))}
      </div>
      <span className="flex items-center mt-5">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-500"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-500"></span>
      </span>
    </div>
  );
};

export default Skills;
