import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getSingleBlog } from "@/util/mdx_clean";

export const alt = "Blog post — Piyush Rathore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await getSingleBlog(slug).catch(() => ({ data: {} as { title?: string; description?: string; summary?: string; date?: string; tags?: string[] } }));
  const date = data.date
    ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : undefined;
  return ogImage({
    eyebrow: date ? `Writing · ${date}` : "Writing",
    title: data.title ?? slug.replace(/[_-]+/g, " "),
    subtitle: data.description ?? data.summary,
    chips: data.tags,
    tag: "Read on piyush.social",
  });
}
