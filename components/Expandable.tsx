"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Collapsed-by-default region with a "Know more" toggle.
 * Uses the grid-rows trick so the height animates without JS measurement.
 */
export function Expandable({
  children,
  label = "Know more",
  closeLabel = "Show less",
  trailing,
}: {
  children: ReactNode;
  label?: string;
  closeLabel?: string;
  /** Rendered on the right of the toggle row (links, etc). */
  trailing?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="quiet-link flex items-center gap-1 font-mono text-xs"
        >
          {open ? closeLabel : label}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {trailing}
      </div>
    </>
  );
}
