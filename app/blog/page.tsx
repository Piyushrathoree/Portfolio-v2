import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs } from "@/util/mdx_clean";

const description =
  "Writing on backend systems, microservices, and web development by Piyush Rathore.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Piyush Rathore", description, url: "/blog" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogIndex() {
  const posts = await getAllBlogs();

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-primary">Writing</h1>
      <p className="mb-8 text-[15px] text-muted">
        Notes on distributed systems, backend architecture, and things I learn while building.
      </p>

      <div className="card divide-y">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="min-w-0">
                <h2 className="text-[15px] font-medium text-primary transition-colors group-hover:text-accent">
                  {p.title ?? p.slug}
                </h2>
                {(p.description ?? p.summary) && (
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-dim">
                    {p.description ?? p.summary}
                  </p>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {p.date && (
                <time className="whitespace-nowrap font-mono text-xs text-muted">
                  {formatDate(p.date)}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
