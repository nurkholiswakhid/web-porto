"use client";

import { useRef, useState } from "react";
import { Eye } from "lucide-react";
import { projects } from "@/data/projects";
import { PROJECT_CATEGORY_LABELS, ProjectCategory } from "@/data/types";
import { cn, assetPath } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import { soundFx } from "@/lib/audio";

const ALL_CATEGORIES: ("all" | ProjectCategory)[] = [
  "all",
  "seo",
  "web",
  "mobile",
  "edtech",
  "ai",
];

const CATEGORY_DISPLAY: Record<string, string> = {
  all: "All projects",
  ...PROJECT_CATEGORY_LABELS,
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  useReveal(sectionRef);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      aria-label="Featured projects"
    >
      <div className="section-container">
        <div className="reveal mb-12">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Projects
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            SELECTED{" "}
            <span className="text-accent italic">PROJECTS</span>
          </h2>
          <p className="section-subtitle mt-4">
            Selected work in web development, technical SEO, mobile
            applications, and applied AI.
          </p>
        </div>

        <div
          className="reveal -mx-4 mb-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          aria-label="Filter projects by category"
          role="group"
        >
          <div className="flex w-max min-w-full gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors cursor-pointer",
                  activeFilter === cat
                    ? "border-accent bg-accent text-bg"
                    : "border-border bg-surface/50 text-text-secondary hover:border-accent/40 hover:text-foreground"
                )}
                aria-pressed={activeFilter === cat}
              >
                {CATEGORY_DISPLAY[cat]}
              </button>
            ))}
          </div>
        </div>

        <div
          aria-live="polite"
          className="reveal mb-5 text-xs font-mono text-text-dim"
        >
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeFilter !== "all" &&
            ` · ${PROJECT_CATEGORY_LABELS[activeFilter]}`}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="h-full"
            >
              <article className="h-full overflow-hidden rounded-2xl border border-border bg-surface/60">
                <div className="flex h-full flex-col p-4 sm:p-5">
                  <div className="flex flex-1 flex-col">
                    {/* Thumbnail */}
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-bg-secondary">
                      {project.thumbnail && !imgErrors[project.slug] ? (
                        <img
                          src={assetPath(project.thumbnail)}
                          alt={project.thumbnailAlt || project.title}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                          onError={() => {
                            setImgErrors((prev) => ({
                              ...prev,
                              [project.slug]: true,
                            }));
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-surface">
                          <div className="text-center">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary">
                              <Eye className="w-5 h-5 text-accent" />
                            </div>
                            <span className="px-3 font-mono text-[10px] text-text-dim">
                              {PROJECT_CATEGORY_LABELS[project.category]}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Year badge */}
                      <div className="absolute top-3 right-3 rounded-md border border-border bg-bg/90 px-2 py-0.5 font-mono text-[10px] text-text-dim">
                        {project.year}
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="mb-2">
                      <span className="tech-badge inline-flex text-[10px]">
                        {PROJECT_CATEGORY_LABELS[project.category]}
                      </span>
                    </div>

                    <h3 className="mb-2 font-display text-base font-bold leading-snug text-foreground">
                      {project.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                      {project.summary}
                    </p>

                    {/* Expandable detail */}
                    {expandedProject === project.slug && (
                      <div className="mb-4 space-y-3 rounded-xl border border-border bg-bg-secondary p-3 text-xs">
                        <div>
                          <span className="font-mono text-[10px] text-text-dim uppercase">Contribution:</span>
                          <p className="text-text-secondary font-medium">{project.role}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-text-dim uppercase">Challenge:</span>
                          <p className="text-text-secondary">{project.problem}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-accent uppercase">Result:</span>
                          <p className="text-accent/90 font-medium">{project.outcome}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setExpandedProject(
                          expandedProject === project.slug ? null : project.slug
                        );
                      }}
                      className="mb-3 cursor-pointer text-left font-mono text-xs font-medium text-accent hover:underline"
                      aria-expanded={expandedProject === project.slug}
                    >
                      {expandedProject === project.slug
                        ? "← Hide project details"
                        : "+ View project details"}
                    </button>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono text-text-dim bg-bg-secondary/60 rounded border border-border/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary font-mono text-sm">
              No projects are currently listed in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
