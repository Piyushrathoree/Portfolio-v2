"use client";
import React from "react";
import Image from "next/image";

interface TechProps {
  logo: string;
  name: string;
  className?: string;
}
const Tech = (props: TechProps) => {
  return (
    <div
      className={`flex gap-1 px-3 py-1 border dark:border-white/60 border-dashed dark:bg-neutral-900 bg-neutral-200 items-center cursor-pointer justify-center text-black dark:text-white shadow-inner shadow-neutral-400/50 dark:shadow-neutral-600 ${props.className}`}
    >
      <Image
        src={props.logo}
        alt={props.name}
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <p className="text-center text-sm font-semibold">{props.name}</p>
    </div>
  );
};

export default Tech;
