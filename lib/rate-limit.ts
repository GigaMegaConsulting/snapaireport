/**
 * In-memory per-IP rate limiter.
 *
 * Caveat: Vercel serverless functions are stateless across cold starts and
 * different function instances. This bucket only catches abuse that hits the
 * same warm instance — which covers the typical "bot fires 100 requests in
 * 30 seconds" pattern but won't stop a distributed attack. Good enough as a
 * launch-day guard. Swap to Upstash Redis / Vercel KV if abuse becomes real.
 */

type Bucket = {
  hits: number[]; // unix-ms timestamps of recent hits
};

const BUCKETS = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5; // submissions per IP per hour

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const bucket = BUCKETS.get(ip) ?? { hits: [] };

  // Drop hits outside the window
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (bucket.hits.length >= MAX_HITS) {
    const oldest = bucket.hits[0];
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { ok: false, retryAfterSeconds };
  }

  bucket.hits.push(now);
  BUCKETS.set(ip, bucket);

  // Best-effort cleanup so the Map doesn't grow unbounded on a long-lived
  // instance. Only prune occasionally to avoid the overhead per request.
  if (BUCKETS.size > 1000 && Math.random() < 0.05) {
    for (const [key, b] of BUCKETS) {
      if (b.hits.every((t) => now - t > WINDOW_MS)) BUCKETS.delete(key);
    }
  }

  return { ok: true, remaining: MAX_HITS - bucket.hits.length };
}

/**
 * Extract the request's IP from common forwarded headers, falling back to
 * a coarse host identifier. Order matches Vercel's recommended chain.
 */
export function getRequestIp(req: { headers: Headers }): string {
  const h = req.headers;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = h.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
