"use client";

import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/experience";
import { formatDate } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import TiltCard from "@/components/effects/TiltCard";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative"
      aria-label="Professional experience"
    >
      <div className="section-container">
        <div className="reveal mb-12">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Experience
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            PROFESSIONAL{" "}
            <span className="text-accent italic">EXPERIENCE</span>
          </h2>
          <p className="section-subtitle mt-4">
            Experience in web development, technical SEO, and mobile
            application engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.start}`}
              className={`reveal relative flex flex-col md:flex-row gap-6 md:gap-12 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 mt-6 md:mt-8 z-10">
                <div className="w-full h-full bg-accent rounded-full border-2 border-bg shadow-[0_0_12px_rgba(200,255,0,0.4)]" />
              </div>

              {/* Date side */}
              <div className={`md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-text-dim">
                  <Calendar className="w-3 h-3" />
                  {formatDate(exp.start)} — {exp.end ? formatDate(exp.end) : "Present"}
                </div>
              </div>

              {/* Content side */}
              <div className={`md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <TiltCard
                  maxTilt={4}
                  scale={1.01}
                  dataCursor="WORK"
                  className="cosmic-card"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-accent font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4 text-xs text-text-dim">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.summary.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-1.5 w-1 h-1 bg-accent/50 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool) => (
                      <span key={tool} className="tech-badge">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <div className="font-mono text-[10px] text-accent tracking-wider uppercase mb-2">
                        Key Contributions
                      </div>
                      {exp.achievements.map((ach, i) => (
                        <p key={i} className="text-sm text-accent/80">
                          ✦ {ach}
                        </p>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
