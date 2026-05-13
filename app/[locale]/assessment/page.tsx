import type { Metadata } from "next";
import { AssessmentForm } from "@/components/AssessmentForm";
import { getMessages, isLocale, isNiche, type Locale, type NicheKey } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);
  return { title: t.form.metaTitle };
}

export default async function AssessmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ niche?: string }>;
}) {
  const { locale } = await params;
  const { niche } = await searchParams;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const nicheKey: NicheKey | undefined = isNiche(niche) ? niche : undefined;
  const t = getMessages(loc);

  return <AssessmentForm locale={loc} t={t} niche={nicheKey} />;
}
