import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/site";
import { getAllBlogs } from "@/util/mdx_clean";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/projects` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/open-source` },
    { url: `${SITE_URL}/contact` },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    images: [`${SITE_URL}${p.image}`],
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(post.updated ? { lastModified: new Date(post.updated) } : {}),
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
