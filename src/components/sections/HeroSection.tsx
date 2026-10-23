"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { assetPath } from "@/lib/utils";
import MarqueeText from "@/components/effects/MarqueeText";
import { soundFx } from "@/lib/audio";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = setTimeout(
      () => setIsVisible(true),
      prefersReducedMotion ? 0 : 200
    );
    return () => clearTimeout(timer);
  }, []);

  const linkedIn = socials.find((s) => s.kind === "linkedin");
  const github = socials.find((s) => s.kind === "github");
  const email = socials.find((s) => s.kind === "email");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Ambient gradient glows */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-150px] w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-mono text-xs text-text-secondary">
                Available for Opportunities
              </span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-accent flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Surabaya, ID
              </span>
            </div>

            {/* Role Label */}
            <div className="mb-3">
              <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase font-medium">
                Full Stack Developer &amp; SEO Specialist
              </span>
            </div>

            {/* Name — Massive cinematic typography */}
            <h1 className="hero-headline mb-4">
              <span className="block">NUR</span>
              <span className="block accent">KHOLIS</span>
              <span className="block">WAKHID</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
              Building high-performance digital solutions — from scalable web
              architectures to data-driven SEO strategies.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-8">
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-accent">3.84</div>
                <div className="font-mono text-[10px] text-text-dim">IPK · UNESA</div>
              </div>
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-foreground">Top 20</div>
                <div className="font-mono text-[10px] text-text-dim">LIDM Nasional</div>
              </div>
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-accent">IEEE</div>
                <div className="font-mono text-[10px] text-text-dim">Published</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="PROJECTS"
                className="btn-primary cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={assetPath(profile.cvPath)}
                download="CV_Nur_Kholis_Wakhid.pdf"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="DOWNLOAD"
                className="btn-secondary cursor-pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {linkedIn && (
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                </a>
              )}
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-foreground/50 hover:bg-foreground/10 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
              )}
              {email && (
                <a
                  href={email.url}
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Portrait only */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px]">
              {/* Holographic backdrop */}
              <div className="relative rounded-3xl border border-border/40 bg-gradient-to-b from-surface/50 via-bg/30 to-surface/60 backdrop-blur-[1px] overflow-hidden">
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(200,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.4) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Telemetry corners */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-accent/40 tracking-widest z-10">
                  ┌ NKW-001 // 2026
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-accent/40 tracking-widest z-10">
                  PILOT: ACTIVE ┐
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-text-dim/40 tracking-widest z-10">
                  └ 7.25°S 112.75°E
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-accent/30 tracking-widest z-10">
                  SURABAYA ┘
                </div>

                {/* Portrait image */}
                <img
                  src={assetPath("images/profile_torso.png")}
                  alt="Nur Kholis Wakhid — Full Stack Web Developer & SEO Specialist"
                  className="relative z-[2] w-full h-auto object-contain object-bottom"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                    filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.6))",
                  }}
                />
              </div>

              {/* Floating HUD labels */}
              <div className="absolute -top-2 -right-3 z-20 p-2.5 rounded-xl border border-accent/20 bg-surface/90 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-accent font-semibold uppercase tracking-wider">SEO &amp; Visibility</div>
                    <div className="text-[11px] font-semibold text-foreground">Data-Driven Growth</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-3 z-20 p-2.5 rounded-xl border border-accent/20 bg-surface/90 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-accent font-semibold uppercase tracking-wider">Full Stack Dev</div>
                    <div className="text-[11px] font-semibold text-foreground">Laravel · Next.js · REST</div>
                  </div>
                </div>
              </div>

              {/* Orbit ring decoration */}
              <div
                className="absolute -inset-4 rounded-full border border-dashed border-accent/[0.07] pointer-events-none"
                style={{ animation: "spin 40s linear infinite" }}
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/50 shadow-[0_0_8px_rgba(200,255,0,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Text Divider */}
      <div className="marquee-divider mt-auto">
        <MarqueeText
          lines={[
            {
              text: "FULL STACK DEVELOPER SEO SPECIALIST AI ENTHUSIAST",
              accentWords: ["DEVELOPER", "SPECIALIST", "ENTHUSIAST"],
            },
            {
              text: "BUILDING DIGITAL EXPERIENCES BEYOND BOUNDARIES",
              accentWords: ["DIGITAL", "BEYOND", "BOUNDARIES"],
            },
          ]}
          speed={35}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
