"use client";
import React from "react";

interface TechProps {
  logo: string;
  name: string;
  className?: string;
}
const Tech = (props: TechProps) => {
  return (
    <div className={`flex gap-1 px-3 py-1.5 border dark:border-white border-dashed bg-neutral-700 items-center justify-center text-white dark:text-white ${props.className}`}>
      <img src={props.logo} alt={props.name} className="h-5 w-5 " />
      <p className="text-center text-sm font-semibold">{props.name}</p>
    </div>
  );
};

export default Tech;
