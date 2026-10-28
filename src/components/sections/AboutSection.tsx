"use client";

import { useRef } from "react";
import {
  Compass,
  Target,
  Brain,
  Smartphone,
  MapPin,
  GraduationCap,
  Award,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/profile";
import { assetPath } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import TiltCard from "@/components/effects/TiltCard";
import MarqueeText from "@/components/effects/MarqueeText";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const focusAreas = [
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Full Stack Web Development",
      description:
        "Arsitektur aplikasi web end-to-end dengan Laravel, Next.js, REST API, serta database MySQL yang skalabel.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Data-Driven SEO",
      description:
        "Meningkatkan traffic organik melalui technical SEO, riset keyword, dan optimasi Core Web Vitals.",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI & LLM Integration",
      description:
        "Eksplorasi integrasi AI/LLM, prompt engineering, dan riset pemodelan topik terpublikasi di jurnal bereputasi.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Engineering",
      description:
        "Membangun aplikasi Android native dengan Kotlin, Firebase, dan arsitektur MVVM.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      aria-label="About me"
    >
      {/* Big Statement Section — Lando-style */}
      <div className="section-container">
        {/* Statement headline */}
        <div className="reveal mb-16">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            About
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground max-w-4xl">
            REDEFINING{" "}
            <span className="text-accent italic">DIGITAL,</span>
            <br />
            ENGINEERING{" "}
            <span className="text-accent italic">SOLUTIONS,</span>
            <br />
            DELIVERING{" "}
            <span className="text-text-secondary">IMPACT.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Crew Dossier (5 cols) */}
          <div className="lg:col-span-5 reveal">
            <div className="hud-panel p-6">
              {/* Dossier Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
                <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  PROFILE
                </div>
                <span className="font-mono text-[10px] text-accent px-2 py-0.5 rounded border border-accent/30 bg-accent/10">
                  VERIFIED
                </span>
              </div>

              {/* Pilot Avatar & Quick Bio */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
                <div className="relative shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-2xl border border-accent/30 bg-surface overflow-hidden group/avatar">
                  <img
                    src={assetPath("images/avatar_headshot.png")}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top scale-105 transition-transform duration-500 group-hover/avatar:scale-110"
                  />
                  {/* Wireframe helmet overlay */}
                  
                  <div className="absolute top-1 right-1 z-10">
                    <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-accent font-mono mt-0.5">
                    Full Stack Dev & SEO Specialist
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-text-dim mt-2">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>Surabaya, Indonesia</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-text-dim mt-1">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    <span>UNESA · IPK 3.84</span>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-text-secondary leading-relaxed text-sm mb-5">
                Lulusan S1 Pendidikan Teknologi Informasi dengan keahlian dalam Full Stack Web Development, SEO berbasis data, dan eksplorasi AI/LLM.
              </p>

              {/* Key Credentials */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
                <div className="p-2.5 rounded-lg border border-border bg-surface/40 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] text-text-dim uppercase">Prestasi</div>
                    <div className="text-xs font-semibold text-foreground truncate">LIDM Top 20</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-surface/40 flex items-center gap-2">
                  <Award className="w-4 h-4 text-text-secondary shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] text-text-dim uppercase">Riset</div>
                    <div className="text-xs font-semibold text-foreground truncate">IEEE & SINTA 4</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-accent/15 bg-accent/[0.04] p-3">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Fokus Saat Ini
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    Merancang produk digital yang cepat, mudah digunakan, dan
                    bertumbuh lewat strategi berbasis data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Core Focus Areas (7 cols) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {focusAreas.map((area, index) => (
              <div
                key={area.title}
                className="reveal h-full"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <TiltCard
                  maxTilt={5}
                  scale={1.01}
                  dataCursor="FOCUS"
                  className="cosmic-card group cursor-default h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-105 transition-all mb-3">
                      {area.icon}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {area.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-text-dim">
                    <span>0{index + 1}</span>
                    <span className="text-accent font-semibold">ACTIVE</span>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee divider after about */}
      <div className="marquee-divider">
        <MarqueeText
          lines={[
            {
              text: "LARAVEL NEXT.JS REACT KOTLIN SEO PYTHON AI LLM",
              accentWords: ["NEXT.JS", "SEO", "AI"],
            },
          ]}
          speed={30}
        />
      </div>
    </section>
  );
}
