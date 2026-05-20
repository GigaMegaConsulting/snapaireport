import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllPosts, getPostBySlug, readingTimeMinutes } from "@/lib/blog";

const POST_COPY: Record<Locale, {
  by: string;
  read: string;
  back: string;
  cta_title: string;
  cta_body: string;
  cta_button: string;
}> = {
  en: {
    by: "by",
    read: "min read",
    back: "← All notes",
    cta_title: "Ready to find your own AI quick wins?",
    cta_body:
      "5 minutes. A short form. We mail you back a tailored PDF: AI-readiness score, top quick wins for your business, recommended tools, risk flags. Free during beta.",
    cta_button: "Start your free assessment →",
  },
  fr: {
    by: "par",
    read: "min de lecture",
    back: "← Toutes les notes",
    cta_title: "Prêt à trouver vos propres gains rapides en IA ?",
    cta_body:
      "5 minutes. Un court formulaire. Nous vous envoyons un PDF personnalisé : score d'aptitude IA, gains rapides pour votre entreprise, outils recommandés, alertes de risque. Gratuit pendant la phase beta.",
    cta_button: "Commencez votre évaluation gratuite →",
  },
};

// Build static params so all posts are pre-rendered at build time.
export async function generateStaticParams(): Promise<Array<{ locale: Locale; slug: string }>> {
  const out: Array<{ locale: Locale; slug: string }> = [];
  for (const loc of ["en", "fr"] as const) {
    const posts = await getAllPosts(loc);
    for (const p of posts) out.push({ locale: loc, slug: p.slug });
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(loc, slug);
  if (!post) return { title: "Not found" };
  const fm = post.frontmatter;
  const altLocale: Locale = loc === "en" ? "fr" : "en";
  const altSlug = fm.translationSlug;
  const canonical = `https://snapaireport.com/${loc}/blog/${slug}`;
  const altHref = altSlug ? `https://snapaireport.com/${altLocale}/blog/${altSlug}` : undefined;

  return {
    title: `${fm.title} · SnapReport`,
    description: fm.description,
    keywords: fm.keywords,
    authors: [{ name: fm.author }],
    alternates: {
      canonical,
      languages: altHref
        ? {
            [loc]: canonical,
            [altLocale]: altHref,
            "x-default": loc === "en" ? canonical : altHref,
          }
        : undefined,
    },
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      url: canonical,
      siteName: "SnapReport",
      locale: loc === "fr" ? "fr_CA" : "en_CA",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt ?? fm.publishedAt,
      authors: [fm.author],
      ...(fm.coverImage ? { images: [{ url: `https://snapaireport.com${fm.coverImage}` }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      ...(fm.coverImage ? { images: [`https://snapaireport.com${fm.coverImage}`] } : {}),
    },
  };
}

function formatDate(iso: string, locale: Locale): string {
  try {
    return new Date(iso).toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(loc, slug);
  if (!post) notFound();
  const fm = post.frontmatter;
  const c = POST_COPY[loc];
  const minutes = readingTimeMinutes(post.content);
  const canonical = `https://snapaireport.com/${loc}/blog/${slug}`;

  // Schema.org Article for rich SERP results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt ?? fm.publishedAt,
    author: { "@type": "Person", name: fm.author },
    publisher: {
      "@type": "Organization",
      name: "SnapReport",
      url: "https://snapaireport.com",
    },
    inLanguage: loc === "fr" ? "fr-CA" : "en-CA",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(fm.coverImage ? { image: `https://snapaireport.com${fm.coverImage}` } : {}),
    ...(fm.keywords ? { keywords: fm.keywords.join(", ") } : {}),
  };

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <Link href={`/${loc}`} className="flex items-center gap-3 min-w-0">
            <span className="serif text-xl">SnapReport</span>
            <span className="mono text-[10px] tracking-[0.18em] text-ink-3 uppercase border border-rule px-1.5 py-0.5">
              Blog
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitch current={loc} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="mono text-[11px] tracking-[0.22em] text-ink-3 uppercase mb-8">
          <Link href={`/${loc}/blog`} className="hover:text-ink transition">{c.back}</Link>
        </p>

        <article>
          <header className="mb-12">
            <div className="mono text-[11px] tracking-[0.18em] text-ink-3 uppercase mb-4">
              <time dateTime={fm.publishedAt}>{formatDate(fm.publishedAt, loc)}</time>
              <span className="mx-2">·</span>
              <span>{minutes} {c.read}</span>
              {fm.niche && (
                <>
                  <span className="mx-2">·</span>
                  <span>{fm.niche}</span>
                </>
              )}
            </div>
            <h1 className="serif text-4xl md:text-5xl leading-tight mb-6">{fm.title}</h1>
            <p className="text-lg text-ink-2 leading-relaxed">{fm.description}</p>
            <p className="mono text-[11px] tracking-[0.18em] text-ink-3 uppercase mt-6">
              {c.by} {fm.author}
            </p>
          </header>

          <div className="prose-blog">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Funnel CTA */}
        <section className="mt-20 border-t border-rule pt-12">
          <div className="border border-rule p-8 bg-paper-2">
            <h2 className="serif text-2xl mb-4">{c.cta_title}</h2>
            <p className="text-ink-2 mb-6 leading-relaxed">{c.cta_body}</p>
            <Link
              href={`/${loc}/assessment${fm.niche ? `?for=${fm.niche}` : ""}`}
              className="mono text-[13px] tracking-[0.18em] uppercase inline-block border border-ink px-5 py-3 hover:bg-ink hover:text-paper transition"
            >
              {c.cta_button}
            </Link>
          </div>
        </section>
      </main>

      {/* Minimal blog-content styles (Tailwind classes don't apply inside MDX by default). */}
      <style>{`
        .prose-blog h2 { font-family: var(--font-serif), Georgia, serif; font-size: 1.75rem; line-height: 1.25; margin-top: 2.5rem; margin-bottom: 1rem; }
        .prose-blog h3 { font-family: var(--font-serif), Georgia, serif; font-size: 1.375rem; line-height: 1.3; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-blog p { font-size: 1.0625rem; line-height: 1.7; margin: 1rem 0; color: var(--ink, #1a1a1a); }
        .prose-blog ul, .prose-blog ol { margin: 1rem 0 1rem 1.25rem; }
        .prose-blog li { margin: 0.5rem 0; line-height: 1.65; }
        .prose-blog a { color: #b45309; text-decoration: underline; text-underline-offset: 3px; }
        .prose-blog a:hover { color: #1a1a1a; }
        .prose-blog blockquote { border-left: 3px solid #b45309; margin: 1.5rem 0; padding: 0.5rem 1.25rem; color: #555; font-style: italic; }
        .prose-blog code { background: #f3eee5; padding: 0.1rem 0.35rem; border-radius: 3px; font-family: var(--font-mono), monospace; font-size: 0.9em; }
        .prose-blog pre { background: #1a1a1a; color: #efeae0; padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1.5rem 0; }
        .prose-blog pre code { background: transparent; color: inherit; padding: 0; }
        .prose-blog hr { border: 0; border-top: 1px solid var(--rule, #d4cfc1); margin: 2.5rem 0; }
        .prose-blog table { border-collapse: collapse; margin: 1.5rem 0; width: 100%; }
        .prose-blog th, .prose-blog td { border: 1px solid var(--rule, #d4cfc1); padding: 0.5rem 0.75rem; text-align: left; }
        .prose-blog th { background: #f3eee5; font-weight: 600; }
      `}</style>
    </div>
  );
}
