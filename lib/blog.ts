/**
 * Blog post loader for SnapReport.
 *
 * Posts live as MDX files in `content/blog/{en,fr}/<slug>.mdx`. Each post
 * carries frontmatter (gray-matter) with at least:
 *
 *   ---
 *   title: "..."
 *   description: "..." (meta description, < 160 chars)
 *   publishedAt: "2026-05-21"
 *   author: "Jérôme D. Soucy"
 *   niche: "lawyers" | "accountants" | "general"
 *   keywords: ["...", "..."]
 *   translationSlug: "<slug-in-the-other-locale>"  # for hreflang pair
 *   coverImage: "/blog/covers/foo.jpg"  # optional
 *   draft: false  # optional — hides from index + sitemap
 *   ---
 *
 *   <body in MDX>
 *
 * `getAllPosts(locale)` walks the directory at build time. Posts with
 * `draft: true` are excluded.
 *
 * Internal links inside MDX can use plain markdown — e.g. `[law firms](/en/lawyers)`.
 * The renderer treats them as Next.js links.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

export interface BlogFrontmatter {
  title: string;
  description: string;
  publishedAt: string;       // YYYY-MM-DD
  updatedAt?: string;        // YYYY-MM-DD
  author: string;
  niche?: string;
  keywords?: string[];
  translationSlug?: string;
  coverImage?: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  locale: Locale;
  frontmatter: BlogFrontmatter;
  content: string;           // raw MDX body
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function postsDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale);
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
  const dir = postsDir(locale);
  if (!(await exists(dir))) return [];
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/i, ""));
}

export async function getPostBySlug(
  locale: Locale,
  slug: string,
): Promise<BlogPost | null> {
  const candidates = [
    path.join(postsDir(locale), `${slug}.mdx`),
    path.join(postsDir(locale), `${slug}.md`),
  ];
  for (const filePath of candidates) {
    if (!(await exists(filePath))) continue;
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      locale,
      frontmatter: data as BlogFrontmatter,
      content,
      filePath,
    };
  }
  return null;
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(locale, slug)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) =>
      (b.frontmatter.publishedAt ?? "").localeCompare(a.frontmatter.publishedAt ?? ""),
    );
}

/**
 * Estimate reading time in minutes. ~225 wpm is the standard cited
 * by Medium/Substack and matches what most readers actually clock.
 */
export function readingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}
