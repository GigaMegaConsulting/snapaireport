import en from "@/messages/en";
import fr from "@/messages/fr";
import nichesEn, { type NicheKey, type NicheMessages } from "@/messages/niches.en";
import nichesFr from "@/messages/niches.fr";

export type { NicheKey };

export const NICHE_KEYS: readonly NicheKey[] = ["lawyers", "accountants"];

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type Messages = typeof en;

const MESSAGES: Record<Locale, Messages> = { en, fr: fr as Messages };

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Resolve the opposite locale (for the EN ↔ FR toggle). */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Human-readable label for a locale. */
export function localeLabel(locale: Locale): string {
  return locale === "en" ? "English" : "Français";
}

const NICHES: Record<Locale, NicheMessages> = {
  en: nichesEn,
  fr: nichesFr,
};

export function getNicheMessages(locale: Locale, niche: NicheKey) {
  return NICHES[locale][niche];
}

export function isNiche(value: string | undefined | null): value is NicheKey {
  return !!value && (NICHE_KEYS as readonly string[]).includes(value);
}
