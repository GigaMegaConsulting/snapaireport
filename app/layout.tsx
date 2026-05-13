import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
  authors: [{ name: "Giga Mega Consulting Inc." }],
  openGraph: {
    title: "SnapReport — Your AI Business Assessment in 5 Minutes",
    description: "Find $10K+ in hidden AI opportunities in your business. Free for the first 3.",
    type: "website",
    url: "https://snapaireport.com",
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
