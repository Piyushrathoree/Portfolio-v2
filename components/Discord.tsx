"use client";
import { useLanyard } from "../hooks/useLanyard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DiscordIcon from "@/icons/DiscordIcon";
import { useState, useEffect } from "react";

export const DiscordStatus = () => {
  const DISCORD_ID = "1187126125722353768";
  const data = useLanyard(DISCORD_ID);
  const [elapsed, setElapsed] = useState<string>("");

  // Check if User is in VS Code
  const vsCodeActivity = data?.activities?.find(
    (activity: any) => activity.name === "Visual Studio Code"
  );


  useEffect(() => {
    if (!vsCodeActivity?.timestamps?.start) return;

    const interval = setInterval(() => {
      const start = vsCodeActivity.timestamps.start;
      const now = Date.now();
      const diff = now - start;

      const seconds = Math.floor((diff / 1000) % 60)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(diff / (1000 * 60 * 60));

      setElapsed(
        hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [vsCodeActivity]);


  if (!data) return <div>Loading...</div>;

  // Determine Status Color
  const statusColorMap = {
    online: "bg-green-400",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusColor =
    statusColorMap[data.discord_status as keyof typeof statusColorMap] ||
    "bg-gray-500";

    const VsCodeInfo = () => (
    <div className="flex flex-col min-w-[140px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-blue-400 font-bold text-md">VS Code</span>
        <span className="text-[10px] text-neutral-500 font-mono ml-auto">
          {elapsed}
        </span>
      </div>
      <p className="text-xs font-medium truncate max-w-[180px]">
        {vsCodeActivity?.details || "Coding..."}
      </p>
      <p className="text-[10px] text-neutral-500 truncate max-w-[180px]">
        {vsCodeActivity?.state || "Workspace"}
      </p>
    </div>
  );

  if (data.discord_status === "online") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute bottom-1 sm:left-28 left-16 flex h-4 w-4 items-center justify-center cursor-pointer">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="bg-[#fafafa] dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-800 p-4"
        >
          {vsCodeActivity ? (
            <VsCodeInfo />
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-xs">
                Online on Discord,
                <br /> wanna talk?
              </p>
              <a
                href={`https://discord.com/users/${DISCORD_ID}`}
                target="_blank"
                rel="noreferrer"
              >
               <DiscordIcon/>
              </a>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bottom-5 sm:left-16 ml-14 max-sm:mt-1 flex items-center justify-center relative w-5 h-5 border border-neutral-500/90 dark:border-neutral-500 rounded-full ">
          <span
            className={`absolute w-2 h-2 rounded-full border border-neutral-700 dark:border-neutral-200   ${statusColor} cursor-pointer`}
          ></span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        className="bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-800 p-3"
      >
        
        {vsCodeActivity ? (
          <VsCodeInfo />
        ) : (
          <p className="capitalize text-xs font-medium">
            {data.discord_status}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
