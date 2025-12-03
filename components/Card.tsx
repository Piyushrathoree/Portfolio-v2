"use client";
import GithubIcon from "@/icons/GithubIcon";
import Icons from "./Icons";
import { Icon } from "./ui/evervault-card";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import WebIcon from "@/icons/webIcon";

export interface CardProps {
  status: "Ready" | "In Production";
  githubLink?: string;
  siteLink?: string;
  description: string;
  title: string;
  imageSrc: string;
  videoSrc?: string;
  techStack: { name: string; children: React.ReactNode }[];
}
export function Card(props: CardProps) {
  return (
    <div className="border border-black/20 dark:border-white/20 flex flex-col items-start w-full max-w-md mx-auto p-4 relative min-h-[400px] sm:h-120">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <div className="relative">
        <HeroVideoDialog
          className="block "
          animationStyle="from-center"
          videoSrc={`${props.videoSrc || ""}`}
          thumbnailSrc={`${props.imageSrc}`}
          thumbnailAlt={`${props.title} Thumbnail`}
        />
      </div>
      <div className="flex justify-between w-full items-end ">
        <h2 className="text-2xl font-bold mt-4 mb-2  font-serif underline underline-offset-3 italic">
          {props.title}
        </h2>{" "}
        {/* Yellow Dot (Idle) */}
        <div className="border border-dashed text-sm px-2 h-fit mb-3 flex items-center gap-1">
          {" "}
          {props.status === "In Production" ? (
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </div>
          ) : (
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
          )}
          {props.status}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 w-full max-w-[400px] font-mono">
        {props.description}
      </p>
      <div className="absolute bottom-3 flex flex-col ">
        <div className="flex gap-2 -mb-2">
          {props.techStack.map((tech) => (
            <Icons key={tech.name} name={tech.name}>
              {tech.children}
            </Icons>
          ))}
        </div>
        <div className="flex gap-3">
          {props.githubLink && (
            <Icons
              name="GitHub"
              link={props.githubLink}
              className="dark:text-neutral-300 text-neutral-800"
            >
              <GithubIcon />
            </Icons>
          )}
          {props.siteLink && (
            <Icons
              name="visit site"
              link={props.siteLink}
              className="dark:text-neutral-300 text-neutral-800"
            >
              <WebIcon />
            </Icons>
          )}
        </div>
      </div>
    </div>
  );
}
