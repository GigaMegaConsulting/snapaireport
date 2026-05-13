import Script from "next/script";

/**
 * Google Analytics 4 integration.
 *
 * Set NEXT_PUBLIC_GA_ID to your GA4 Measurement ID (format: G-XXXXXXXXXX)
 * in .env.local for local dev and as a Vercel environment variable for prod.
 *
 * No tracking is loaded if the env var is missing — safe to deploy without one.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>
    </>
  );
}
