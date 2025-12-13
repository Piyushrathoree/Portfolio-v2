"use client";
import Icons from "./Icons";
import { Icon } from "./ui/evervault-card";


interface BlogCardProps {
  title: string;
  imageSrc: string;
  blogLink: string;
}
export function BlogCard(props: BlogCardProps) {
  return (
    <a href={props.blogLink} className="border cursor-pointer border-black/20 dark:border-white/20 flex flex-col items-start max-w-md mx-auto p-4 relative ">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-neutral-300 text-black/60" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-neutral-300 text-black/60" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-neutral-300 text-black/60" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-neutral-300 text-black/60" />
      <div className="relative bg-blend-overlay ">
        <img src={props.imageSrc} alt="" className="rounded-md" />
      </div>
      <h2 className="text-xl cursor-pointer font-medium mt-4 mb-2  font-serif underline underline-offset-3 ">
        {props.title}
      </h2>{" "}
    </a>
  );
}
