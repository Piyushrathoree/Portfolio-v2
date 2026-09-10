import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { GithubCalendar } from "@/components/GithubCalendar";
import { PRList } from "@/components/PRList";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechIcon";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE, SOCIALS } from "@/data/profile";
import { FEATURED_PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { getAllBlogs } from "@/util/mdx_clean";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InlineRef({ href, logo, children }: { href: string; logo?: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-badge">
      {logo && <Image src={logo} alt="" width={16} height={16} />}
      {children}
    </a>
  );
}

export default async function Home() {
  const posts = (await getAllBlogs()).slice(0, 3);
  const studio = EXPERIENCE[0];
  const [assetsnip, raah] = studio.products;

  return (
    <>
      {/* Intro */}
      <div>
        <h1 className="mb-1 text-xl font-semibold text-primary">{PROFILE.name}</h1>
        <p className="mb-6 text-[15px] text-muted">{PROFILE.role}</p>

        <div className="space-y-4 text-[15px] leading-relaxed text-secondary">
          <p>
            I build full-stack products, mostly on the{" "}
            <span className="text-accent">backend</span> side. I care about
            systems that are typed end to end, ship fast, and stay{" "}
            <span className="text-accent">boring in production</span>.
          </p>
          <p>
            Most recently at{" "}
            <InlineRef href={studio.url!} logo={studio.logo}>
              {studio.company}
            </InlineRef>
            , where I built and shipped{" "}
            <InlineRef href={assetsnip.url!} logo={assetsnip.logo}>
              {assetsnip.name}
            </InlineRef>{" "}
            solo — a browser extension, web app, API, and billing — and rebuilt the
            backend and dashboard for{" "}
            <InlineRef href={raah.url!} logo={raah.logo}>
              {raah.name}
            </InlineRef>
            .
          </p>
          <p>
            I work with{" "}
            <span className="font-medium text-primary">TypeScript</span>,{" "}
            <span className="font-medium text-primary">Next.js</span>,{" "}
            <span className="font-medium text-primary">Node.js</span>, and{" "}
            <span className="font-medium text-primary">PostgreSQL</span> most days,
            with <span className="font-medium text-primary">Bun</span> in the
            toolchain. Currently learning about AI systems and contributing to
            open source.
          </p>
          <p>
            Open to full-time roles and collaborations.{" "}
            <Link href="/contact" className="link">
              Reach out
            </Link>{" "}
            or{" "}
            <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="link">
              read my résumé
            </a>
            .
          </p>
        </div>
      </div>

      <Section id="experience" title="Experience">
        <div className="space-y-3">
          {EXPERIENCE.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        title="Projects I've built"
        action={
          <Link href="/projects" className="quiet-link font-mono text-xs">
            All projects →
          </Link>
        }
      >
        <div className="space-y-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills & tools">
        <div className="space-y-5">
          {SKILLS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechBadge key={item} name={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="github" title="GitHub activity">
        <GithubCalendar />
      </Section>

      <Section
        id="open-source"
        title="Open source"
        action={
          <a
            href={`https://github.com/pulls?q=is%3Apr+author%3A${PROFILE.github}+is%3Amerged`}
            target="_blank"
            rel="noreferrer"
            className="quiet-link font-mono text-xs"
          >
            All merged PRs →
          </a>
        }
      >
        <Suspense fallback={<div className="card h-40 animate-pulse" />}>
          <PRList />
        </Suspense>
      </Section>

      {posts.length > 0 && (
        <Section
          id="writing"
          title="Writing"
          action={
            <Link href="/blog" className="quiet-link font-mono text-xs">
              All posts →
            </Link>
          }
        >
          <div className="card divide-y">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-4 p-4"
              >
                <span className="text-sm text-primary transition-colors group-hover:text-accent">
                  {post.title ?? post.slug}
                </span>
                {post.date && (
                  <time className="whitespace-nowrap font-mono text-xs text-muted">
                    {formatDate(post.date)}
                  </time>
                )}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section id="connect" title="Connect with me">
        <div className="flex flex-wrap gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className="badge"
            >
              {s.label}
            </a>
          ))}
          <a href={PROFILE.calUrl} target="_blank" rel="noreferrer" className="badge">
            Book a call
          </a>
        </div>
      </Section>
    </>
  );
}
