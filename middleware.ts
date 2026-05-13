import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr"] as const;
const DEFAULT_LOCALE = "en";

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((tag) => tag.trim().split(";")[0].toLowerCase());
  for (const tag of ranked) {
    const base = tag.split("-")[0];
    if ((LOCALES as readonly string[]).includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, internal Next assets, design page, and static files (icon, manifest)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/design") ||
    pathname.includes(".") // any file with extension (.svg, .png, .ico, etc.)
  ) {
    return NextResponse.next();
  }

  // If the path already has a locale prefix, leave it alone
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && (LOCALES as readonly string[]).includes(segments[0])) {
    return NextResponse.next();
  }

  // Otherwise, prepend the user's preferred locale
  const locale = pickLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|design|.*\\..*).*)"],
};
