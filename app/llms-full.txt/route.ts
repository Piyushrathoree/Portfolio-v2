import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { getAllBlogs, getSingleBlog } from "@/util/mdx_clean";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllBlogs();
  const fullPosts = await Promise.all(
    posts
      .filter((post) => post.slug)
      .map(async (post) => ({ post, blog: await getSingleBlog(post.slug!) }))
  );

  const projects = PROJECTS.map(
    (project) => `## ${project.title}

URL: ${absoluteUrl(`/projects/${project.slug}`)}
${project.siteLink ? `Live site: ${project.siteLink}\n` : ""}Source: ${project.githubLink}
Status: ${project.status}
Year: ${project.year}
Role: ${project.role}
Stack: ${project.tech.join(", ")}

${project.description}

${project.overview.join("\n\n")}

Highlights:
${project.bullets.map((bullet) => `- ${bullet}`).join("\n")}`
  ).join("\n\n");

  const articles = fullPosts
    .map(
      ({ post, blog }) => `## ${post.title ?? post.slug}

URL: ${absoluteUrl(`/blog/${post.slug}`)}
${post.date ? `Published: ${post.date}\n` : ""}${post.author ? `Author: ${post.author}\n` : ""}${post.tags?.length ? `Tags: ${post.tags.join(", ")}\n` : ""}
${post.description ?? post.summary ?? ""}

${blog.content.trim()}`
    )
    .join("\n\n");

  const content = `# ${SITE_NAME} — Full Context

> ${SITE_DESCRIPTION}

## Identity

Name: ${PROFILE.name}
Role: ${PROFILE.role}
Location: ${PROFILE.location}
Homepage: ${absoluteUrl()}
GitHub: https://github.com/${PROFILE.github}

## Projects

${projects}

## Writing

${articles || "No published posts are currently listed."}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
