import type { Metadata } from "next";
import Link from "next/link";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllPosts, readingTimeMinutes } from "@/lib/blog";

const INDEX_COPY: Record<Locale, {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  read: string;
  empty: string;
  back: string;
  by: string;
}> = {
  en: {
    title: "Notes on AI for small business",
    metaTitle: "SnapReport Blog — AI for Quebec & Ontario small business",
    metaDescription:
      "Field notes on AI tools, automation, and what actually works for Canadian small businesses. Bilingual, no hype, written by a Montréal developer.",
    intro:
      "Short, practical writing on AI for Quebec and Ontario small businesses. No hype, no jargon — what's worth your time, what isn't, written by a developer who builds these tools daily.",
    read: "min read",
    empty: "No posts yet — first one's coming soon.",
    back: "← Back to SnapReport",
    by: "by",
  },
  fr: {
    title: "Notes sur l'IA pour la petite entreprise",
    metaTitle: "Blog SnapReport — IA pour les PME du Québec et de l'Ontario",
    metaDescription:
      "Notes pratiques sur les outils IA et l'automatisation, pour les PME canadiennes. Bilingue, sans battage, écrit par un développeur montréalais.",
    intro:
      "Du contenu court et pratique sur l'IA pour les PME du Québec et de l'Ontario. Pas de battage, pas de jargon — ce qui mérite votre temps, ce qui ne le mérite pas, écrit par un développeur qui construit ces outils au quotidien.",
    read: "min de lecture",
    empty: "Aucun article pour l'instant — le premier arrive bientôt.",
    back: "← Retour à SnapReport",
    by: "par",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const c = INDEX_COPY[loc];
  const altLocale: Locale = loc === "en" ? "fr" : "en";
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `https://snapaireport.com/${loc}/blog`,
      languages: {
        en: "https://snapaireport.com/en/blog",
        fr: "https://snapaireport.com/fr/blog",
        "x-default": "https://snapaireport.com/en/blog",
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: "website",
      url: `https://snapaireport.com/${loc}/blog`,
      siteName: "SnapReport",
      locale: loc === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: altLocale === "fr" ? "fr_CA" : "en_CA",
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

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const c = INDEX_COPY[loc];
  const posts = await getAllPosts(loc);

  return (
    <div className="min-h-screen bg-paper text-ink bp-grid">
      {/* Header (mirrors NicheLanding styling) */}
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
        <p className="mono text-[11px] tracking-[0.22em] text-ink-3 uppercase mb-6">
          {c.back === c.back && (
            <Link href={`/${loc}`} className="hover:text-ink transition">{c.back}</Link>
          )}
        </p>

        <h1 className="serif text-5xl md:text-6xl leading-tight mb-6">
          {c.title}
        </h1>
        <p className="text-lg text-ink-2 max-w-2xl mb-16">
          {c.intro}
        </p>

        {posts.length === 0 ? (
          <p className="text-ink-3 italic">{c.empty}</p>
        ) : (
          <ul className="space-y-12">
            {posts.map((post) => {
              const fm = post.frontmatter;
              const minutes = readingTimeMinutes(post.content);
              return (
                <li key={post.slug} className="border-t border-rule pt-12 first:border-t-0 first:pt-0">
                  <Link
                    href={`/${loc}/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="mono text-[11px] tracking-[0.18em] text-ink-3 uppercase mb-3">
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
                    <h2 className="serif text-3xl leading-snug mb-3 group-hover:text-amber-700 transition">
                      {fm.title}
                    </h2>
                    <p className="text-ink-2 leading-relaxed">
                      {fm.description}
                    </p>
                    <p className="mono text-[11px] tracking-[0.18em] text-amber-700 uppercase mt-4">
                      {c.by} {fm.author} →
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
