"use client";
import { useLanyard } from "../hooks/useLanyard";

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
    online: "bg-green-400",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusColor =
    statusColorMap[data.discord_status as keyof typeof statusColorMap] ||
    "bg-gray-500";

  if (data.discord_status === "online") {
    return (
      <div className="absolute bottom-1 left-17 flex h-4 w-4 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>
    );
  }

  return (
    <span
      className={`absolute bottom-1 left-17  w-4 h-4 rounded-full border-2 border-white ${statusColor}`}
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
