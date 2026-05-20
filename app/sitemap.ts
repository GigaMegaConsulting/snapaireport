import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { LOCALES } from "@/lib/i18n";

/**
 * SnapReport sitemap.
 *
 * Includes:
 *   - Homepage (both locales)
 *   - Niche landing pages: /lawyers, /accountants (both locales)
 *   - Blog index (both locales)
 *   - Every published blog post (both locales)
 *   - Privacy page (both locales)
 *
 * Vercel auto-serves at /sitemap.xml. Submit once in Google Search Console.
 */
const BASE = "https://snapaireport.com";
const NICHES = ["lawyers", "accountants"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of LOCALES) {
    entries.push({
      url: `${BASE}/${loc}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
    entries.push({
      url: `${BASE}/${loc}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${BASE}/${loc}/assessment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
    entries.push({
      url: `${BASE}/${loc}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    });
    for (const niche of NICHES) {
      entries.push({
        url: `${BASE}/${loc}/${niche}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
    const posts = await getAllPosts(loc);
    for (const post of posts) {
      entries.push({
        url: `${BASE}/${loc}/blog/${post.slug}`,
        lastModified: post.frontmatter.updatedAt
          ? new Date(post.frontmatter.updatedAt)
          : new Date(post.frontmatter.publishedAt),
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
