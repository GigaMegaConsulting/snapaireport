import pkg from "../package.json";

/**
 * Version label shown in the header / footer.
 * Combines the package.json version with the short commit SHA
 * (set by Vercel automatically). Locally falls back to "dev".
 */
export const VERSION = pkg.version;

export const COMMIT_SHA =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
  process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ??
  "dev";

export const VERSION_LABEL = `v${VERSION} · ${COMMIT_SHA}`;
