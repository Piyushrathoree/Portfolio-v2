import Container from "@/components/containers";
import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getSingleBlog } from "@/util/mdx_clean";
import rehypePrettyCode from "rehype-pretty-code";

export const metadata: Metadata = {
  title: "Blog",
  description: "Reading a blog...",
};

export default async function SingleBlogPage({ params }: { params: any }) {
  const resolvedParams = (await params) as { slug?: string };
  const slug = resolvedParams?.slug;

  // 1. UPDATE THIS: Pass an object with both themes
  const options = {
    theme: "github-light",
    darkTheme: "one-dark-pro",
    keepBackground: false, // We will handle background in CSS

    onVisitLine(node: any) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
  };

  if (!slug) notFound();

  let content: string;
  let frontmatter: Record<string, any> = {};

  try {
    const res = await getSingleBlog(slug);
    content = res.content;
    frontmatter = res.data || {};
  } catch (err) {
    notFound();
  }

  return (
    <Container className="mt-25 sm:w-225 md:p-20 md:pb-10 font-sans tracking-tight bg-gradient-to-b from-transparent to-neutral-50/10 dark:from-neutral-900 dark:to-neutral-950">
      {/* <h1 className="text-neutral-900 dark:text-neutral-50 text-4xl font-sans  font-bold md:text-5xl">
        {frontmatter.title ?? slug}
      </h1> */}

      {frontmatter.date && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-right mt-2">
          {frontmatter.date}
        </p>
      )}

      {frontmatter.image && (
        <div className="my-6 mx-auto w-screen">
          <Image
            src={
              frontmatter.image.startsWith("/public")
                ? frontmatter.image.replace("/public", "")
                : frontmatter.image
            }
            alt={frontmatter.title ?? ""}
            width={1200}
            height={600}
            className="w-screen h-auto rounded-xl object-cover shadow-xl"
          />
        </div>
      )}

      {/* 2. UPDATE THIS: Add dark:prose-invert to fix text color */}
      <article className="prose prose-slate dark:prose-invert max-w-none font-mono mx-auto mt-8">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              // @ts-ignore
              rehypePlugins: [[rehypePrettyCode, options]],
            },
          }}
        />
      </article>
    </Container>
  );
}
