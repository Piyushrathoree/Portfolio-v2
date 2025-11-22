import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconProps {
  path: string;
  name: string;
  className?: string;
  link?: string;
}
const Icons = (props: IconProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a className={`p-1 border-2 border-black/20 dark:border-white/20 border-dashed mt-4 flex items-center gap-2 w-fit cursor-pointer ${props.className} `} href={props.link || '#'} target="_blank" rel="noopener noreferrer">
          <img src={props.path} alt={props.name} className="h-6 " />  
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-mono">{props.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Icons;
