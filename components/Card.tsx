"use client";
import WebIcon from "@/icons/webIcon";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import React from "react";
import Link from "next/link";
import GithubIcon from "./ui/github-icon";
import ExternalLinkIcon from "./ui/external-link-icon";
import { Button } from "./ui/button";

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

const TechCircle = ({
  tech,
  index,
  total,
}: {
  tech: { name: string; children: React.ReactNode };
  index: number;
  total: number;
}) => {
  // Determine tooltip position alignment
  let tooltipPosClass = "left-1/2 -translate-x-1/2";
  let arrowPosClass = "left-1/2 -translate-x-1/2";

  if (index === 0) {
    // First item: Align Left
    tooltipPosClass = "left-0 translate-x-0";
    arrowPosClass = "left-4 -translate-x-1/2";
  } else if (index === total - 1) {
    // Last item: Align Right
    tooltipPosClass = "right-0 translate-x-0 left-auto";
    arrowPosClass = "right-4 translate-x-1/2"; // approximate arrow position
  }

  return (
    <div className="group/tech relative flex items-center justify-center w-9 h-9 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:z-20 transition-all duration-300 hover:scale-110 cursor-help shadow-xs">
      {/* Icon (Children) */}
      <div className="w-5 h-5 flex items-center justify-center opacity-80 group-hover/tech:opacity-100">
        {tech.children}
      </div>

      {/* Tooltip popping up */}
      <div
        className={`absolute bottom-full mb-2 px-2 py-1 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-[10px] font-bold rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 ${tooltipPosClass}`}
      >
        {tech.name}
        {/* Arrow */}
        <div
          className={`absolute top-full border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100 ${arrowPosClass}`}
        />
      </div>
    </div>
  );
};

export function Card(props: CardProps) {
  return (
    <div className="group flex flex-col gap-4 w-full max-w-[450px] mx-auto">
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
        <HeroVideoDialog
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          animationStyle="from-center"
          videoSrc={props.videoSrc || ""}
          thumbnailSrc={props.imageSrc}
          thumbnailAlt={`${props.title} Thumbnail`}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3">
        {/* Title Row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-3xl italic text-neutral-900 dark:text-neutral-100">
              {props.title}
            </h2>
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {props.status === "In Production"
                ? "In Production"
                : "Ready to Ship"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {props.siteLink && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 border-none shadow-none"
                asChild
              >
                <Link
                  href={props.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {props.githubLink && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 border-none shadow-none"
                asChild
              >
                <Link
                  href={props.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {props.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-2 flex flex-wrap items-center -space-x-3 group-hover:space-x-1 transition-all duration-300">
          {props.techStack.map((tech, index) => (
            <TechCircle
              key={tech.name}
              tech={tech}
              index={index}
              total={props.techStack.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
