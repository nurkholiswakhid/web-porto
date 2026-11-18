"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { assetPath, formatDate } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

function CompanyMark({
  company,
  logo,
  logoMark,
}: {
  company: string;
  logo?: string;
  logoMark?: string;
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const fallbackMark =
    logoMark ||
    company
      .split(" ")
      .filter((word) => !["PT", "Academy"].includes(word))
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white sm:h-16 sm:w-16"
      aria-label={`${company} logo`}
    >
      {logo && !logoFailed ? (
        <Image
          src={assetPath(logo)}
          alt={`${company} logo`}
          width={64}
          height={64}
          unoptimized
          className="h-full w-full object-contain"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span className="font-display text-lg font-black tracking-tight text-bg">
          {fallbackMark}
        </span>
      )}
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const chronologicalExperiences = [...experiences].sort((a, b) =>
    b.start.localeCompare(a.start)
  );

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

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[0.3rem] top-4 hidden w-px bg-gradient-to-b from-accent/70 via-border to-transparent md:block"
          />

          <div className="space-y-5">
            {chronologicalExperiences.map((exp, index) => {
              const isCurrent = !exp.end;

              return (
                <article
                  key={`${exp.company}-${exp.start}`}
                  className="reveal relative grid gap-3 pl-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8 md:pl-0"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[1.15rem] hidden h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_14px_rgba(200,255,0,0.42)] md:left-[10.3rem] md:top-8 md:block"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pb-1 md:block md:pt-6">
                    <p className="min-w-0 font-mono text-xs leading-relaxed text-text-secondary">
                      {formatDate(exp.start)}
                      <span className="mx-1.5 text-text-dim">to</span>
                      <span className={isCurrent ? "text-accent" : "text-text-dim"}>
                        {exp.end ? formatDate(exp.end) : "Present"}
                      </span>
                    </p>
                    {isCurrent && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-accent md:mt-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                  </div>

                  <div className="group relative min-w-0 rounded-2xl border border-border bg-surface/60 transition-colors duration-300 hover:border-accent/35 hover:bg-surface/90">
                    <div className="min-w-0 p-4 sm:p-6">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <CompanyMark
                          company={exp.company}
                          logo={exp.logo}
                          logoMark={exp.logoMark}
                        />
                        <div className="min-w-0">
                          <p className="mb-1 break-words text-sm font-semibold text-accent">
                            {exp.company}
                          </p>
                          <h3 className="break-words font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
                            {exp.role}
                          </h3>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-text-dim">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {exp.location}
                          </p>
                        </div>
                      </div>

                      <ul className="mt-5 max-w-4xl space-y-2.5 border-t border-border/70 pt-4">
                        {exp.summary.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                          >
                            <span className="mt-[0.55rem] h-1 w-1 shrink-0 bg-accent/80" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-4 max-w-4xl border-l-2 border-accent/60 pl-3">
                          {exp.achievements.map((achievement, i) => (
                            <p
                              key={i}
                              className="text-xs leading-relaxed text-foreground/80"
                            >
                              {achievement}
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="mt-5 border-t border-border/70 pt-4">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                          Tools & skills
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tools.map((tool) => (
                            <span
                              key={tool}
                              className="max-w-full break-words border border-border/80 px-2 py-1 text-[10px] leading-tight text-text-secondary transition-colors group-hover:border-accent/25"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
