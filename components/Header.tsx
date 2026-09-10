import Link from "next/link";
import { Clock } from "./Clock";
import { Presence } from "./Presence";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="mb-12 flex items-center justify-between text-sm text-muted">
      <div className="flex items-center gap-4">
        <Link href="/" className="quiet-link font-mono text-xs" aria-label="Home">
          ~/piyush
        </Link>
        <span className="hidden sm:inline-flex">
          <Presence />
        </span>
      </div>
      <div className="flex items-center gap-4">
        <nav aria-label="Primary" className="flex items-center gap-3 font-mono text-xs">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="quiet-link">
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
