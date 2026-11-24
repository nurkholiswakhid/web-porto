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
      className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white sm:h-14 sm:w-14"
      aria-label={`${company} logo`}
    >
      {logo && !logoFailed ? (
        <Image
          src={assetPath(logo)}
          alt={`${company} logo`}
          width={56}
          height={56}
          unoptimized
          className="h-full w-full object-contain"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span className="font-display text-base font-black tracking-tight text-bg">
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
        <div className="reveal mb-12 grid gap-5 border-b border-border/70 pb-8 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end md:gap-12">
          <div>
            <p className="mb-3 font-mono text-xs text-accent">Career history</p>
            <h2 className="font-display text-[clamp(2rem,5.4vw,3.8rem)] font-black leading-[0.98] tracking-[-0.045em] text-foreground">
              Professional
              <br />
              <span className="text-accent">experience</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-text-secondary md:justify-self-end">
            Four roles across web development, technical SEO, mobile
            engineering, and IT support.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-1 left-[0.6875rem] top-1 w-px bg-gradient-to-b from-accent/80 via-border to-transparent md:left-[10.5rem]"
          />

          <div>
            {chronologicalExperiences.map((exp) => {
              const isCurrent = !exp.end;

              return (
                <article
                  key={`${exp.company}-${exp.start}`}
                  className="reveal relative grid gap-3 border-b border-border/60 pb-8 pl-8 last:border-b-0 last:pb-0 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-12 md:pb-10 md:pl-0 md:last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-[0.375rem] top-[0.3rem] h-2.5 w-2.5 rounded-full border-2 border-bg md:left-[10.1875rem] ${
                      isCurrent
                        ? "bg-accent shadow-[0_0_14px_rgba(200,255,0,0.42)]"
                        : "bg-text-dim"
                    }`}
                  />

                  <div className="min-w-0 md:pt-0.5 md:text-right">
                    <p className="font-mono text-[11px] leading-5 text-text-secondary sm:text-xs">
                      <span>{formatDate(exp.start)}</span>
                      <span className="mx-1.5 text-text-dim" aria-hidden="true">
                        —
                      </span>
                      <span
                        className={
                          isCurrent ? "text-accent" : "text-text-dim"
                        }
                      >
                        {exp.end ? formatDate(exp.end) : "Present"}
                      </span>
                    </p>
                    {isCurrent && (
                      <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] text-accent">
                        Current role
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <CompanyMark
                        company={exp.company}
                        logo={exp.logo}
                        logoMark={exp.logoMark}
                      />
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="break-words text-sm font-semibold text-accent">
                          {exp.company}
                        </p>
                        <h3 className="mt-1 break-words font-display text-lg font-bold leading-snug text-foreground sm:text-xl">
                          {exp.role}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-text-dim">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-5 grid gap-x-8 gap-y-3 border-t border-border/70 pt-4 md:grid-cols-2">
                      {exp.summary.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/80" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-5 max-w-4xl border-l-2 border-accent/70 pl-3.5">
                        <p className="mb-1 font-mono text-[10px] text-accent">
                          Highlight
                        </p>
                        {exp.achievements.map((achievement) => (
                          <p
                            key={achievement}
                            className="text-xs leading-5 text-foreground/80"
                          >
                            {achievement}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
                      <span className="mr-1 text-xs text-text-dim">
                        Tools &amp; skills
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tools.map((tool) => (
                          <span
                            key={tool}
                            className="max-w-full break-words rounded-full border border-border/80 bg-bg-secondary/60 px-2.5 py-1 text-[10px] leading-tight text-text-secondary"
                          >
                            {tool}
                          </span>
                        ))}
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
