"use client";
import { useLanyard } from "../hooks/useLanyard";
import React from "react";

const DiscordStatus = () => {
  const DISCORD_ID = "1187126125722353768";
  const data = useLanyard(DISCORD_ID);

  if (!data) return <div>Loading...</div>;

  // Check if User is in VS Code
  const vsCodeActivity = data.activities?.find(
    (activity: any) => activity.name === "Visual Studio Code"
  );

  // Determine Status Color
  const statusColorMap = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusColor =
    statusColorMap[data.discord_status as keyof typeof statusColorMap] ||
    "bg-gray-500";

  return (
    <span
      className={`absolute bottom-0 left-18  w-5 h-5 rounded-full border-2 border-white ${statusColor}`}
    ></span>
  );
};

const Avatar = () => {
  const bgColorDark = "bg-orange-300";
  const bgColorLight = "bg-slate-300";
  return (
    <div className="relative">
      <div
        className={`flex justify-center items-center ${bgColorDark} dark:${bgColorLight} rounded-full  h-22 w-22 relative overflow-hidden `}
      >
        <img
          src="/assets/logo.png"
          alt="Avatar"
          className="-mb-5 absolute h-22 w-22 scale-110 "
        />
      </div>
      <DiscordStatus />
    </div>
  );
};

export default Avatar;
