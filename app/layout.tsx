import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Clarity - AI Business Assessment for SMBs",
  description:
    "Find $10K+ in hidden AI opportunities. 20-minute voice call, custom AI readiness report, clear next steps. First 3 assessments are free.",
  keywords: [
    "AI consulting",
    "AI audit",
    "AI business assessment",
    "small business AI",
    "AI automation",
    "AI readiness",
  ],
  authors: [{ name: "Giga Mega Consulting Inc." }],
  openGraph: {
    title: "AI Clarity - AI Business Assessment for SMBs",
    description: "Find $10K+ in hidden AI opportunities in your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
