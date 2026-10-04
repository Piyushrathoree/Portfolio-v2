import Link from "next/link";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/components", label: "Components" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Reach out" },
];

export function Header() {
  return (
    <header className="mb-12 flex flex-wrap items-center justify-between gap-x-5 gap-y-4 text-sm text-muted">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="quiet-link text-sm"
          aria-label="Home"
        >
          Piyush
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 font-mono text-xs"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href === "/contact" ? "link hover:underline underline-offset-4" : "quiet-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="hidden text-xs sm:inline">
          <Clock />
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
