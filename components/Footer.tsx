import Link from "next/link";
import { PROFILE } from "@/data/profile";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t pt-6 text-sm text-muted">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex items-center gap-3 font-mono text-xs">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="quiet-link">
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/Piyushrathoree/Portfolio-v2"
            target="_blank"
            rel="noreferrer"
            className="quiet-link"
          >
            Source
          </a>
        </nav>
        <span className="font-mono text-xs">{PROFILE.timeZone}</span>
      </div>
    </footer>
  );
}
