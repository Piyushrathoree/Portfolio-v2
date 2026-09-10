"use client";
import { useEffect, useState } from "react";

export type LanyardActivity = {
  name: string;
  application_id?: string;
  details?: string;
  state?: string;
  timestamps?: { start?: number };
};

export type LanyardPresence = {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
};

/** Live Discord presence over the Lanyard WebSocket. */
export function useLanyard(discordId: string) {
  const [data, setData] = useState<LanyardPresence | null>(null);

  useEffect(() => {
    let socket: WebSocket;
    try {
      socket = new WebSocket("wss://api.lanyard.rest/socket");
    } catch {
      return;
    }
    socket.onopen = () =>
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: discordId } }));
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        setData(message.d);
      }
    };
    return () => socket.close();
  }, [discordId]);

  return data;
}
