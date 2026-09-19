import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons/animated";
import { NotFoundGrid } from "@/components/NotFoundGrid";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/components", label: "Components" },
  { href: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <div className="card p-6 sm:p-8">
        <NotFoundGrid />

        <p className="mt-8 font-mono text-xs text-muted">
          <span className="text-accent">$</span> cd this-page
          <br />
          <span className="text-dim">cd: no such file or directory</span>
        </p>

        <h1 className="mt-4 text-xl font-semibold text-primary">Page not found</h1>
        <p className="mt-1 max-w-md text-[15px] leading-relaxed text-secondary">
          The link is broken, the page moved, or it never existed. Nothing to see here — try one of these instead.
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {LINKS.map((l, i) => (
            <Link key={l.href} href={l.href} className={`badge ${i === 0 ? "text-primary" : ""}`}>
              {i === 0 && <ArrowLeftIcon size={12} />}
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
