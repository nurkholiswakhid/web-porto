import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nur Kholis Wakhid — Full Stack Web Developer & SEO Specialist",
  description:
    "Portofolio profesional Nur Kholis Wakhid: Full Stack Web Developer (Laravel, Next.js), SEO Specialist berbasis data, dan AI/LLM Enthusiast. Menghadirkan solusi digital berkinerja tinggi dan terukur.",
  keywords: [
    "Nur Kholis Wakhid",
    "Full Stack Web Developer",
    "SEO Specialist",
    "Technical SEO",
    "Laravel",
    "Next.js",
    "AI LLM Developer",
    "Surabaya Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Nur Kholis Wakhid" }],
  openGraph: {
    title: "Nur Kholis Wakhid — Portfolio Cosmic Frontier",
    description:
      "Full Stack Web Developer, SEO Specialist & AI Enthusiast — Building Digital Experiences Beyond Boundaries.",
    type: "website",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <head>
        <link rel="icon" href="/iconnn.ico" sizes="any" />
      </head>
      <body className="font-body antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
