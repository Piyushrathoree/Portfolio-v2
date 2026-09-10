import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const DATA_DIR = path.join(process.cwd(), "blogs");

export type BlogMeta = {
  title?: string;
  slug?: string;
  date?: string;
  description?: string;
  summary?: string;
  author?: string;
  tags?: string[];
};

export type Blog = { content: string; data: BlogMeta };

const CACHE = new Map<string, Blog>();

const normalizeSlug = (slug: string) => slug.replace(/\.mdx?$/i, "");

/** gray-matter parses unquoted YAML dates into Date objects; keep strings. */
function normalizeMeta(raw: Record<string, unknown>, slug: string): BlogMeta {
  const { date, ...rest } = raw;
  const meta: BlogMeta = { ...(rest as BlogMeta), slug: (rest.slug as string | undefined) ?? slug };
  if (date instanceof Date) {
    meta.date = date.toISOString().split("T")[0];
  } else if (typeof date === "string") {
    meta.date = date;
  }
  return meta;
}

export const getSingleBlog = async (slug: string): Promise<Blog> => {
  const key = normalizeSlug(slug);
  const cached = CACHE.get(key);
  if (cached) return cached;

  const raw = await fs.readFile(path.join(DATA_DIR, `${key}.mdx`), "utf-8");
  const parsed = matter(raw);
  const result: Blog = { content: parsed.content, data: normalizeMeta(parsed.data, key) };
  CACHE.set(key, result);
  return result;
};

export const getAllBlogs = async (): Promise<BlogMeta[]> => {
  const files = await fs.readdir(DATA_DIR);
  const blogs: BlogMeta[] = [];

  for (const file of files.filter((f) => f.toLowerCase().endsWith(".mdx"))) {
    try {
      const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
      blogs.push(normalizeMeta(matter(raw).data, normalizeSlug(file)));
    } catch (err) {
      console.warn("Failed to read blog", file, err);
    }
  }

  return blogs.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
