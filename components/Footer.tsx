import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { SITE_HANDLE, SITE_NAME } from "@/lib/site";

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
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs"
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
      <p className="mt-4 font-mono text-xs text-dim">
        {`© ${new Date().getFullYear()} ${SITE_NAME} · `}
        <a
          href={`https://github.com/${PROFILE.github}`}
          target="_blank"
          rel="noreferrer me"
          className="transition-colors hover:text-accent"
        >
          {`@${SITE_HANDLE}`}
        </a>
      </p>
    </footer>
  );
}
