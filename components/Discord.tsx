"use client";
import { useLanyard } from "../hooks/useLanyard";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cursor01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useEffect } from "react";

export const DiscordStatus = () => {
  const DISCORD_ID = "1187126125722353768";
  const data = useLanyard(DISCORD_ID);
  const [elapsed, setElapsed] = useState<string>("");

  // 1. Find Activity
  const activity = data?.activities?.find(
    (act: any) =>
      act.name === "Visual Studio Code" ||
      act.name === "Cursor" ||
      act.application_id === "1136262945037221958"
  );

  // 2. Timer Logic
  useEffect(() => {
    if (!activity?.timestamps?.start) return;

    const interval = setInterval(() => {
      const start = activity.timestamps.start;
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
  }, [activity]);

  if (!data) return null;

  // 3. Status Colors (For the Trigger Dot only)
  const statusColorMap = {
    online: "bg-green-400",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };
  const statusColor =
    statusColorMap[data.discord_status as keyof typeof statusColorMap] ||
    "bg-gray-500";

  // 4. Cursor Info Block (Fixed: Added 'Forging in' text back)
  const CursorInfo = () => (
    <div className="flex flex-col min-w-[150px]">
      <div className="flex items-center gap-2 mb-1">
        {/* Header Line */}
        <span className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
          Forging in
          {/* Icons */}
          <img
            src="/icons/cursor.png"
            alt="Cursor"
            className="w-3.5 h-3.5 opacity-90 "
          />
          
          {/* 'Cursor' Text */}
          <span className="text-black dark:text-white font-bold">Cursor</span>
        </span>

        {/* Timer */}
        <span className="text-[10px] text-neutral-400 font-mono ml-auto pt-1">
          {elapsed}
        </span>
      </div>

      {/* File Name */}
      <p className="text-xs font-medium truncate max-w-[180px] text-neutral-700 dark:text-neutral-200 pt-1">
        {activity?.details || "Coding..."}
      </p>

      {/* Workspace */}
      <p className="text-[10px] text-neutral-500 truncate max-w-[180px] pt-1">
        {activity?.state || "Workspace"}
      </p>
    </div>
  );

  // 5. Render Logic

  // SCENARIO A: Online (Pulsing Trigger)
  if (data.discord_status === "online") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute bottom-1 left-28 flex h-4 w-4 items-center justify-center cursor-pointer">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="bg-[#fafafa] dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-800 p-4 shadow-xl rounded-xl"
        >
          {activity ? (
            <CursorInfo />
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
                <img
                  src="/icons/discord.svg"
                  className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
                  alt="Discord"
                />
              </a>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  // SCENARIO B: Other Status (Static Trigger)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bottom-4 left-16 flex items-center justify-center relative w-7 h-7 border border-neutral-500/40 dark:border-neutral-500 rounded-full ">
          <span
            className={`absolute w-4 h-4 rounded-full border-2 border-white ${statusColor} cursor-pointer`}
          ></span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        
      >
        {activity ? (
          <CursorInfo />
        ) : (
          <p className="capitalize text-xs font-medium">
            {data.discord_status}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
