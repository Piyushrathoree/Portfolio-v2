'use client'
import { useState, useEffect } from "react";

// Use the Lanyard WebSocket for real-time updates (no refreshing required!)
export function useLanyard(discordId: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.lanyard.rest/socket");                                                                                                                                                                                      

    socket.onopen = () => {
      // Subscribe to your ID
      socket.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_id: discordId },
        })                                                                                                              
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Initial data or Update
      if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        setData(message.d);
      }
    };

    return () => socket.close();
  }, [discordId]);

  return data;
}