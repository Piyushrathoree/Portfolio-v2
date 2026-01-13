"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  imageSrc: string;
  blogLink: string;
}

export function BlogCard(props: BlogCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={props.blogLink}
      target="_blank"
      className="group flex flex-col gap-4 w-full max-w-[450px] mx-auto cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <Image
          src={props.imageSrc}
          alt={props.title}
          width={800}
          height={450}
          sizes="(max-width: 768px) 100vw, 450px"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        />

        {/* Loading Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )}

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/20">
          <div className="rounded-full bg-white/90 p-3 shadow-sm backdrop-blur-sm dark:bg-black/80 dark:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl italic text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-neutral-400/50 underline-offset-4 decoration-1 transition-all">
          {props.title}
        </h2>

        {/* Optional: Add a subtle 'Read' text if needed, but title + arrow is sufficient for minimal design */}
      </div>
    </Link>
  );
}
