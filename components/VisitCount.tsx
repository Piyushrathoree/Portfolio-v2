"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

let visitRequest: Promise<number> | undefined;

export function VisitCount() {
  const [views, setViews] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // The header persists across client-side navigation; count once per tab session.
    const saved = sessionStorage.getItem("portfolio-visit-count-7234");
    if (saved) {
      const count = Number(saved);
      if (Number.isSafeInteger(count) && count >= 7234) setViews(count);
      return;
    }
    visitRequest ??= fetch("/api/visits", { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error("Counter unavailable");
        return response.json();
      })
      .then((data) => {
        if (!Number.isSafeInteger(data.views)) throw new Error("Invalid count");
        return data.views as number;
      });
    visitRequest.then((count) => {
      sessionStorage.setItem("portfolio-visit-count-7234", String(count));
      setViews(count);
    }).catch(() => { visitRequest = undefined; });
  }, []);

  if (views === null) return null;
  return (
    <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}
      className="group relative inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-muted transition-colors hover:text-accent">
      <Eye size={14} aria-hidden="true" className="transition-transform group-hover:scale-110 motion-reduce:transform-none" />
      <span>{views.toLocaleString("en-US")} views</span>
      {expanded && <span className="absolute right-0 top-full z-10 mt-2 rounded border bg-background px-2 py-1 text-dim">thanks for stopping by!</span>}
    </button>
  );
}
