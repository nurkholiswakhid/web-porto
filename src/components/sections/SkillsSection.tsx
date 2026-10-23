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
import TiltCard from "@/components/effects/TiltCard";

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
            TECH{" "}
            <span className="text-accent italic">ARSENAL</span>
          </h2>
          <p className="section-subtitle mt-4">
            Tools and technologies powering the mission.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((category, index) => (
            <div
              key={category.category}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <TiltCard
                maxTilt={5}
                scale={1.01}
                dataCursor="TECH"
                className="cosmic-card h-full group"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                    {ICON_MAP[category.icon] || <Code className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground group-hover:text-accent transition-colors">
                    {category.category}
                  </h3>
                </div>

                {/* Skill items */}
                <div className="space-y-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-secondary/50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                      <span className="text-sm text-text-secondary">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Tools strip */}
        <div className="reveal mt-12">
          <div className="hud-panel">
            <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-4">
              Full Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {skills
                .flatMap((c) => c.items)
                .map((tool) => (
                  <span key={tool} className="tech-badge">
                    {tool}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
