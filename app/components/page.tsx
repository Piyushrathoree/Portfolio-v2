import type { Metadata } from "next";
import Link from "next/link";
import { COMPONENTS } from "@/data/components";

const description =
  "Reusable UI components by Piyush Rathore, with live playgrounds.";

export const metadata: Metadata = {
  title: "Components",
  description,
  alternates: { canonical: "/components" },
  openGraph: {
    title: "Components | Piyush Rathore",
    description,
    url: "/components",
  },
};

export default function ComponentsPage() {
  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-primary">Components</h1>
      <p className="mb-8 text-[15px] text-muted">
        UI pieces I&apos;ve built and polished enough to reuse. Each one has a
        live playground.
      </p>
      <div className="space-y-3">
        {COMPONENTS.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className="card group block p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-primary transition-colors group-hover:text-accent">
                  {c.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {c.description}
                </p>
              </div>
              <span className="mt-1 shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                →
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
