import type { Metadata } from "next";
import { NicheLanding } from "@/components/NicheLanding";
import { getMessages, isLocale, getNicheMessages, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "en";
  const n = getNicheMessages(loc, "lawyers");
  return {
    title: `SnapReport — ${n.badge}`,
    description: n.lead,
  };
}

export default async function LawyersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  return <NicheLanding locale={loc} niche="lawyers" t={getMessages(loc)} />;
}
