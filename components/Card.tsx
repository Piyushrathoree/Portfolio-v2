"use client";
import Icons from "./Icons";
import { Icon } from "./ui/evervault-card";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface CardProps {
  status: "Ready" | "In Production";
  githubLink: string;
  siteLink?: string;
  description: string;
  title: string;
  imageSrc: string;
  videoSrc?: string;
  techStack: { name: string; path: string }[];
}
export function Card(props: CardProps) {
  return (
    <div className="border  border-black/20 dark:border-white/20 flex flex-col items-start max-w-md mx-auto p-4 relative h-120">
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
      <p className="text-sm text-gray-600 dark:text-gray-300 w-[400px] font-mono">
        {props.description}
      </p>
      <div className="absolute bottom-3">
        <div className="flex gap-2">
          {props.techStack.map((tech) => (
            <Icons key={tech.name} name={tech.name} path={tech.path} />
          ))}
        </div>
        <div className="flex gap-3">
          {props.githubLink && (
            <Icons
              name="Code"
              path="/icons/githubdark.svg"
              link={props.githubLink}
              className="border-none dark:hidden"
            />
          )}
          {props.githubLink && (
            <Icons
              name="Code"
              path="/icons/githublight.svg"
              link={props.githubLink}
              className="border-none hidden dark:block"
            />
          )}
          {props.siteLink && (
            <Icons
              name="Visit Site"
              path="/icons/webdark.svg"
              link={props.siteLink}
              className="border-none dark:hidden"
            />
          )}
          {props.siteLink && (
            <Icons
              name="Visit Site"
              path="/icons/weblight.svg"
              link={props.siteLink}
              className="border-none hidden dark:block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
