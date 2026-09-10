"use client";

import { PROFILE } from "@/data/profile";
import { useLanyard } from "@/hooks/useLanyard";

const EDITORS = new Set(["Visual Studio Code", "Cursor", "Code"]);

/**
 * One-line live status for the header: Discord presence + what editor is open.
 * Renders "…" until the socket delivers a state so the layout never shifts.
 */
export function Presence() {
  const data = useLanyard(PROFILE.discordId);

  if (!data) return <span aria-hidden="true">…</span>;

  const editing = data.activities.find((a) => EDITORS.has(a.name));
  const color =
    data.discord_status === "online"
      ? "bg-green-500"
      : data.discord_status === "idle"
        ? "bg-yellow-500"
        : data.discord_status === "dnd"
          ? "bg-red-500"
          : "bg-neutral-500";

  const label =
    editing
      ? `coding in ${editing.name === "Code" ? "VS Code" : editing.name}`
      : data.discord_status === "offline"
        ? "offline"
        : data.discord_status === "dnd"
          ? "do not disturb"
          : data.discord_status;

  return (
    <span className="flex items-center gap-2 font-mono text-xs" title="Live status via Discord">
      <span className="relative flex h-2 w-2">
        {data.discord_status === "online" && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
      </span>
      {label}
    </span>
  );
}
