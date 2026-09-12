import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { getAllBlogs } from "@/util/mdx_clean";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllBlogs();
  const projectLinks = PROJECTS.map(
    (project) =>
      `- [${project.title}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.description}`
  );
  const postLinks = posts
    .filter((post) => post.slug)
    .map(
      (post) =>
        `- [${post.title ?? post.slug}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description ?? post.summary ?? "Engineering writing."}`
    );

  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a personal portfolio for a software engineer and full-stack developer based in ${PROFILE.location}. The site contains verified information about work, projects, open-source contributions, and technical writing.

## Pages

- [Homepage](${absoluteUrl()}): Profile, experience, skills, featured projects, and contact links.
- [Projects](${absoluteUrl("/projects")}): Full project index with technical details and source repositories.
- [Open source](${absoluteUrl("/open-source")}): Merged pull requests and repository contributions.
- [Writing](${absoluteUrl("/blog")}): Articles about backend systems, microservices, and web development.
- [Contact](${absoluteUrl("/contact")}): Email, calendar, and collaboration details.

## Projects

${projectLinks.join("\n")}

## Writing

${postLinks.length > 0 ? postLinks.join("\n") : "No published posts are currently listed."}

## Machine-readable resources

- [Full context](${absoluteUrl("/llms-full.txt")}): Expanded project descriptions and complete article text.
- [RSS feed](${absoluteUrl("/feed.xml")}): Updates from the writing section.
- [Sitemap](${absoluteUrl("/sitemap.xml")}): Canonical URLs for indexable pages.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
