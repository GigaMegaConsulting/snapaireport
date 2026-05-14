import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnapReport — Your AI Business Assessment in 5 Minutes",
  description:
    "Find $10K+ in hidden AI opportunities. Answer 10 questions, get a custom AI readiness report by email. First 3 reports are free.",
  keywords: [
    "AI consulting",
    "AI business assessment",
    "AI readiness report",
    "small business AI",
    "AI automation",
    "AI for SMB",
    "SnapReport",
  ],
  authors: [{ name: "SnapReport" }],
  metadataBase: new URL("https://snapaireport.com"),
  openGraph: {
    title: "SnapReport — Your AI Business Assessment in 5 Minutes",
    description: "Find $10K+ in hidden AI opportunities in your business. Free for the first 3.",
    type: "website",
    url: "https://snapaireport.com",
    siteName: "SnapReport",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapReport — Your AI Business Assessment in 5 Minutes",
    description: "Find $10K+ in hidden AI opportunities in your business. Free for the first 3.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
