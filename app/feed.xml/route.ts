import { getAllBlogs } from "@/util/mdx_clean";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllBlogs();
  const fallbackDate = new Date().toUTCString();
  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : fallbackDate;

  const items = posts
    .filter((post) => post.slug)
    .slice(0, 20)
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const description = post.description ?? post.summary ?? "";
      const pubDate = post.date ? new Date(post.date).toUTCString() : fallbackDate;
      const categories = (post.tags ?? [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return `<item>
  <title>${escapeXml(post.title ?? post.slug!)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${escapeXml(description)}</description>
  <pubDate>${pubDate}</pubDate>
  ${categories}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
