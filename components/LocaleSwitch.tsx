"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

/**
 * EN | FR toggle. Renders both as small mono links, with the current
 * locale rendered as ink and the other as faded.
 *
 * Preserves the current path beneath the locale segment so users stay
 * on the same page when switching languages.
 */
export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");
  const suffix = rest ? `/${rest}` : "";

  return (
    <div className="inline-flex items-center gap-1 mono text-[11px] uppercase tracking-[0.18em]">
      {LOCALES.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-ink-3 mx-1">/</span>}
          {loc === current ? (
            <span className="text-ink">{loc}</span>
          ) : (
            <Link
              href={`/${loc}${suffix}`}
              className="text-ink-3 hover:text-ink transition"
              aria-label={`Switch to ${loc.toUpperCase()}`}
            >
              {loc}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
