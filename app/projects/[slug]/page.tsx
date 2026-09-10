import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getNextProject, getProject, PROJECTS } from "@/data/projects";
import { TechChip } from "@/components/TechIcon";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Piyush Rathore`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [{ url: project.image, width: 1600, height: 900, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <article>
      <Link href="/projects" className="quiet-link inline-flex items-center gap-1 font-mono text-xs">
        <ArrowLeft size={12} /> All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
        <span>{project.year}</span>
        <span aria-hidden="true">·</span>
        <span>{project.role}</span>
        <span aria-hidden="true">·</span>
        <span>{project.status}</span>
      </div>
      <h1 className="mt-2 text-xl font-semibold text-primary">{project.title}</h1>
      <p className="mt-1 text-[15px] text-secondary">{project.description}</p>

      <div className="card mt-6 overflow-hidden p-1">
        <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-badge">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_200px]">
        <div>
          <h2 className="section-title">Overview</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-secondary">
            {project.overview.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <h2 className="section-title mt-8">Highlights</h2>
          <ul className="space-y-2">
            {project.bullets.map((b) => (
              <li key={b} className="card p-3 text-[13px] leading-relaxed text-dim">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div>
            <h2 className="section-title">Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title">Links</h2>
            <div className="flex flex-col gap-2 font-mono text-xs">
              {project.siteLink && (
                <a href={project.siteLink} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                  Visit site <ArrowUpRight size={12} />
                </a>
              )}
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="quiet-link inline-flex items-center gap-1">
                <Github size={12} /> Source
              </a>
            </div>
          </div>
        </aside>
      </div>

      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="card group mt-12 flex items-center justify-between gap-4 p-4"
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
              Next project
            </span>
            <span className="mt-1 block text-sm font-medium text-primary transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <span className="mt-0.5 block text-xs text-muted">{next.description}</span>
          </span>
          <ArrowUpRight size={16} className="shrink-0 text-muted" />
        </Link>
      )}
    </article>
  );
}
