"use client";

import { useRef } from "react";
import { GraduationCap, Trophy, BookOpen, ExternalLink, Award } from "lucide-react";
import { education } from "@/data/education";
import { publications, achievements } from "@/data/publications";
import { useReveal } from "@/hooks/useReveal";

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative"
      aria-label="Education, Publications, and Achievements"
    >
      <div className="section-container">
        <div className="reveal mb-12">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Academy & Research
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            EDUCATION &{" "}
            <span className="text-accent italic">PUBLICATIONS</span>
          </h2>
          <p className="section-subtitle mt-4">
            Pondasi akademis, publikasi karya ilmiah, dan rekam jejak prestasi.
          </p>
        </div>

        {/* Education Grid */}
        <div className="mb-12">
          <div className="font-mono text-xs text-accent tracking-widest uppercase mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            FORMAL EDUCATION
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={`${edu.institution}-${edu.start}`}
                className="reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="cosmic-card h-full">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground mb-1">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-1">
                        {edu.degree} — {edu.field}
                      </p>
                      <p className="font-mono text-xs text-text-dim">
                        {edu.start} — {edu.end || "Present"}
                      </p>
                    </div>
                  </div>

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-4 h-4 text-accent" />
                        <span className="font-mono text-[10px] text-accent tracking-wider uppercase">
                          Highlights
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {edu.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-text-secondary"
                          >
                            <span className="mt-1.5 w-1 h-1 bg-accent rounded-full shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications & Achievements */}
        <div>
          <div className="font-mono text-xs text-accent tracking-widest uppercase mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            PUBLICATIONS & RECOGNITIONS
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, idx) => (
              <div
                key={pub.title}
                className="reveal cosmic-card flex flex-col justify-between group"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent font-semibold">
                      {pub.venue}
                    </span>
                    <span className="font-mono text-xs text-text-dim">
                      {pub.year}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {pub.description}
                  </p>
                </div>
                {pub.url && (
                  <div className="pt-3 border-t border-border/60">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-foreground font-medium transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Paper</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {achievements.map((ach) => (
              <div
                key={ach.title}
                className="reveal cosmic-card border-accent/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      NATIONAL
                    </span>
                    <span className="font-mono text-xs text-text-dim">
                      {ach.year}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug mb-1">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-mono text-accent mb-2">
                    {ach.event}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed mb-2">
                    Penyelenggara: {ach.organizer}
                  </p>
                  {ach.highlight && (
                    <p className="text-xs text-text-dim italic">
                      &quot;{ach.highlight}&quot;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
