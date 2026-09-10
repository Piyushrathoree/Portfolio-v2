import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { Expandable } from "./Expandable";
import { TechChip } from "./TechIcon";

function Status({ status }: { status: Project["status"] }) {
  const dot =
    status === "Live" ? "bg-green-500" : status === "In development" ? "bg-yellow-500" : "bg-neutral-500";
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[15px] font-medium text-primary">
            <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <Status status={project.status} />
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-secondary">{project.description}</p>

        <Expandable
          trailing={
            <div className="flex items-center gap-3 font-mono text-xs">
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="quiet-link flex items-center gap-1">
                <Github size={12} /> Repo
              </a>
              {project.siteLink && (
                <a href={project.siteLink} target="_blank" rel="noreferrer" className="link flex items-center gap-1">
                  Visit <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          }
        >
          <div className="mt-3 space-y-2 border-t pt-3">
            {project.bullets.map((b) => (
              <p key={b} className="text-[13px] leading-relaxed text-dim">
                {b}
              </p>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </div>
            <div className="pt-2">
              <Link href={`/projects/${project.slug}`} className="link font-mono text-xs">
                Read the write-up →
              </Link>
            </div>
          </div>
        </Expandable>
      </div>
    </div>
  );
}
