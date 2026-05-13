import en from "@/messages/en";
import fr from "@/messages/fr";

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
