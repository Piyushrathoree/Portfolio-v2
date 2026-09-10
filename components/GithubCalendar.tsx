"use client";

import { useSyncExternalStore } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { PROFILE } from "@/data/profile";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

export function GithubCalendar() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div className="card p-4 sm:p-5">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[600px] sm:min-w-0">
          {mounted ? (
            <GitHubCalendar
              username={PROFILE.github}
              colorScheme={resolvedTheme === "light" ? "light" : "dark"}
              blockSize={10}
              blockMargin={3}
              fontSize={11}
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
              }}
              style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
            />
          ) : (
            <div className="h-[128px] w-full animate-pulse rounded bg-badge" />
          )}
        </div>
      </div>
    </div>
  );
}
