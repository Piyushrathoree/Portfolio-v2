import React from "react";
import { Icon } from "./ui/evervault-card";
import Icons from "./Icons";
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

const Skills = () => {
  return (
    <div className="w-240 mb-30">
      <div className="mb-10">
        <p className="font-mono text-sm">Featured</p>
        <h1 className="font-serif  text-4xl tracking-tight font-black border-b border-black dark:border-white/40 w-fit border-dashed">My Skillset</h1></div>
      <div className="border  border-black/20 dark:border-white/10 w-220 mx-auto p-4 relative h-40 flex flex-wrap gap-4 justify-center items-center">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        {[
          { name: "Typescript", icon: <Ts />, className: "w-27" },
          { name: "Node.js", icon: <NodeIcon />, className: "w-22" },
          { name: "Next.js", icon: <Nextjs />, className: "w-22" },
          { name: "Python", icon: <Py />, className: "w-22" },
          { name: "React", icon: <ReactIcon />, className: "w-27" },
          { name: "Docker", icon: <DockerIcon />, className: "w-22" },
          { name: "Git", icon: <GitIcon />, className: "w-22" },
          { name: "Prisma", icon: <Prisma />, className: "w-22" },
          { name: "Redis", icon: <RedisIcon />, className: "w-27" },
          { name: "Tailwind css", icon: <TailwindIcon />, className: "w-22" },
          { name: "Golang", icon: <GoIcon />, className: "w-22" },
          { name: "MongoDB", icon: <Mongo />, className: "w-22" },
          { name: "Bun", icon: <Bun />, className: "w-22" },
        ].map(({ name, icon, className }) => (
          <Icons key={name} name={name} className={className}>
            {icon}
          </Icons>
        ))}
      </div>
      
    </div>
  );
};

export default Skills;
