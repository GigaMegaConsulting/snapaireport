import type { Metadata } from "next";
import { AssessmentForm } from "@/components/AssessmentForm";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const t = getMessages(loc);

  return <AssessmentForm locale={loc} t={t} />;
}
