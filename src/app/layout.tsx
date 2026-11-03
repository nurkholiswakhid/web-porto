import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nurkholiswakhid.me"),
  alternates: {
    canonical: "/",
  },
  title: "Nur Kholis Wakhid - Full Stack Web Developer & SEO Specialist",
  description:
    "Portofolio Nur Kholis Wakhid, Full Stack Web Developer dan Technical SEO Specialist di Surabaya, berfokus pada pengembangan web, SEO, dan integrasi AI/LLM.",
  openGraph: {
    title: "Nur Kholis Wakhid | Full Stack Web Developer & Technical SEO Specialist",
    description:
      "Building reliable digital products with measurable results. Explore web development, technical SEO, and AI/LLM projects by Nur Kholis Wakhid.",
    url: "https://nurkholiswakhid.me",
    siteName: "Nur Kholis Wakhid",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/images/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Nur Kholis Wakhid — Full Stack Web Developer and Technical SEO Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nur Kholis Wakhid | Full Stack Web Developer & Technical SEO Specialist",
    description:
      "Building reliable digital products with measurable results. Explore web development, technical SEO, and AI/LLM projects.",
    images: ["/images/open-graph.png"],
  },
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
  publisher: "Nur Kholis Wakhid",
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
    <html lang="en">
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
