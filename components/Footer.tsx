import Link from "next/link";
import { PROFILE } from "@/data/profile";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/open-source", label: "Open source" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t pt-6 text-sm text-muted">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 font-mono text-xs sm:justify-start"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-dim transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/Piyushrathoree/Portfolio-v2"
            target="_blank"
            rel="noreferrer"
            className="text-dim transition-colors hover:text-accent"
          >
            Source
          </a>
        </nav>
        <span className="font-mono text-xs">{PROFILE.timeZone}</span>
      </div>
    </footer>
  );
}
