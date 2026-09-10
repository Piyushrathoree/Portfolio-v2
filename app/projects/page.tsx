import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

const description =
  "Projects by Piyush Rathore across web apps, backend systems, and real-time products.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Piyush Rathore", description, url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-primary">Projects</h1>
      <p className="mb-8 text-[15px] text-muted">
        Things I&apos;ve built, from production apps to backend experiments.
      </p>
      <div className="space-y-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
