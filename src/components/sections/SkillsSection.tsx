"use client";

import { useRef } from "react";
import {
  Search,
  Code,
  Smartphone,
  Database,
  Brain,
  Cpu,
  Terminal,
} from "lucide-react";
import { skills } from "@/data/skills";
import { useReveal } from "@/hooks/useReveal";

const ICON_MAP: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative"
      aria-label="Technical skills"
    >
      <div className="section-container">
        <div className="reveal mb-12">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Skills
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            TECHNICAL{" "}
            <span className="text-accent italic">SKILLS</span>
          </h2>
          <p className="section-subtitle mt-4">
            Technologies and tools applied across professional projects.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <article
              key={category.category}
              className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface/50 p-5"
            >
              <div
                className="absolute left-5 top-0 h-0.5 w-10 bg-accent/70"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                    {ICON_MAP[category.icon] || <Code className="h-5 w-5" />}
                  </div>
                  <h3 className="font-display text-base font-bold leading-snug text-foreground">
                    {category.category}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-[10px] tracking-wider text-text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mb-4 h-px bg-border" aria-hidden="true" />
              <ul className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border/80 bg-bg-secondary/70 px-2.5 py-1.5 text-xs leading-relaxed text-text-secondary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
