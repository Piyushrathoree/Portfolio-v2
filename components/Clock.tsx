"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";

export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: PROFILE.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    // First value lands after mount so the server placeholder never mismatches.
    const raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="font-mono tabular-nums" title={`Local time, ${PROFILE.timeZone}`}>
      {time ?? "--:--:--"} IST
    </span>
  );
}
