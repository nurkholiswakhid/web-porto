import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nur Kholis Wakhid — Full Stack Web Developer & SEO Specialist",
  description:
    "Portofolio Nur Kholis Wakhid, Full Stack Web Developer dan Technical SEO Specialist di Surabaya. Berfokus pada aplikasi web yang andal, optimasi pencarian organik, dan integrasi AI/LLM.",
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
    title: "Nur Kholis Wakhid — Portfolio",
    description:
      "Full Stack Web Developer and Technical SEO Specialist building reliable applications and improving organic search performance.",
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
