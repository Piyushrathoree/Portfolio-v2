"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Icon visibility is driven by CSS (`light:` variant) rather than state, so
 * the server render and first client render always match.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Toggle color theme"
      className="quiet-link flex h-6 w-6 items-center justify-center"
    >
      <Sun size={14} className="light:hidden" />
      <Moon size={14} className="hidden light:block" />
    </button>
  );
}
