import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { ArrowLeft } from "lucide-react";
import { JsonLdScript } from "@/components/JsonLd";
import { getAllBlogs, getSingleBlog } from "@/util/mdx_clean";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

const prettyCode: Options = {
  theme: { light: "github-light", dark: "one-dark-pro" },
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.filter((p) => Boolean(p.slug)).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getSingleBlog(slug);
    const title = data.title ?? slug;
    const description =
      data.description ?? data.summary ?? `Read ${title} on ${SITE_NAME}'s blog.`;
    return {
      title,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: data.date,
        authors: [SITE_NAME],
      },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return { title: "Blog", description: `Articles by ${SITE_NAME}` };
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  if (!slug) notFound();

  let content: string;
  let data: Awaited<ReturnType<typeof getSingleBlog>>["data"];
  try {
    ({ content, data } = await getSingleBlog(slug));
  } catch {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${slug}`);
  const title = data.title ?? slug;
  const description = data.description ?? data.summary ?? `Read ${title} on ${SITE_NAME}'s blog.`;

  return (
    <article>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description,
          url: postUrl,
          image: absoluteUrl("/opengraph-image"),
          inLanguage: "en",
          ...(data.date ? { datePublished: data.date, dateModified: data.date } : {}),
          ...(data.tags?.length ? { keywords: data.tags } : {}),
          author: { "@type": "Person", name: SITE_NAME, url: absoluteUrl() },
          publisher: { "@type": "Person", name: SITE_NAME, url: absoluteUrl() },
          mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: title, item: postUrl },
          ],
        }}
      />
      <Link href="/blog" className="quiet-link inline-flex items-center gap-1 font-mono text-xs">
        <ArrowLeft size={12} /> All posts
      </Link>

      <header className="mt-6 mb-8 border-b pb-6">
        <h1 className="text-xl font-semibold text-primary md:text-2xl">{data.title ?? slug}</h1>
        {(data.description ?? data.summary) && (
          <p className="mt-2 text-[15px] leading-relaxed text-secondary">
            {data.description ?? data.summary}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          {data.date && <time dateTime={data.date}>{formatDate(data.date)}</time>}
          {data.tags && data.tags.length > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>{data.tags.join(", ")}</span>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-sm max-w-none prose-headings:font-medium prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-a:no-underline hover:prose-a:underline prose-pre:font-mono">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode, prettyCode]] } }}
        />
      </div>
    </article>
  );
}
