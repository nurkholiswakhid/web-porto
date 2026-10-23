"use client";

import { useRef, useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { projects } from "@/data/projects";
import { PROJECT_CATEGORY_LABELS, ProjectCategory } from "@/data/types";
import { cn, assetPath } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import { soundFx } from "@/lib/audio";
import MissionGallery from "@/components/effects/MissionGallery";
import TiltCard from "@/components/effects/TiltCard";

const ALL_CATEGORIES: ("all" | ProjectCategory)[] = [
  "all",
  "seo",
  "web",
  "mobile",
  "edtech",
  "ai",
];

const CATEGORY_DISPLAY: Record<string, string> = {
  all: "All",
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
        {/* Lando-style big headline */}
        <div className="reveal mb-12">
          <div className="section-label">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Projects
          </div>
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground">
            FEATURED{" "}
            <span className="text-accent italic">WORK</span>
          </h2>
          <p className="section-subtitle mt-4">
            A collection of projects across the digital frontier.
          </p>
        </div>

        {/* Horizontal Mission Gallery */}
        <div className="reveal mb-12">
          <MissionGallery />
        </div>

        {/* Category Filter */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setActiveFilter(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={cn(
                "px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 cursor-pointer",
                activeFilter === cat
                  ? "bg-accent text-bg font-bold border border-accent"
                  : "bg-surface/50 text-text-secondary border border-border hover:border-accent/30 hover:text-foreground"
              )}
            >
              {CATEGORY_DISPLAY[cat]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.slug}
              className="reveal h-full"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <TiltCard
                maxTilt={6}
                scale={1.015}
                dataCursor="PROJECT"
                className="h-full border border-border bg-surface/60 backdrop-blur-md rounded-2xl overflow-hidden hover:border-accent/30 group"
              >
                <div className="p-5 h-full flex flex-col justify-between">
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-bg-secondary border border-border">
                      {project.thumbnail && !imgErrors[project.slug] ? (
                        <img
                          src={assetPath(project.thumbnail)}
                          alt={project.thumbnailAlt || project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          onError={() => {
                            setImgErrors((prev) => ({
                              ...prev,
                              [project.slug]: true,
                            }));
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-surface flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center">
                              <Eye className="w-5 h-5 text-accent" />
                            </div>
                            <span className="font-mono text-[10px] text-text-dim">
                              {project.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-accent/20 border border-accent/40 hover:bg-accent/40 text-foreground transition-colors"
                            aria-label={`View demo for ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4 text-accent" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-foreground/10 border border-foreground/30 hover:bg-foreground/20 text-foreground transition-colors"
                            aria-label={`View source for ${project.title}`}
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Year badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-bg/75 backdrop-blur border border-border font-mono text-[10px] text-text-dim">
                        {project.year}
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="mb-2">
                      <span className="tech-badge text-[10px]">
                        {PROJECT_CATEGORY_LABELS[project.category]}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {project.summary}
                    </p>

                    {/* Expandable detail */}
                    {expandedProject === project.slug && (
                      <div className="mb-3 p-3 rounded-xl bg-bg-secondary/70 border border-border text-xs space-y-2 animate-fade-in">
                        <div>
                          <span className="font-mono text-[10px] text-text-dim uppercase">Role:</span>
                          <p className="text-text-secondary font-medium">{project.role}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-text-dim uppercase">Problem:</span>
                          <p className="text-text-secondary">{project.problem}</p>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-accent uppercase">Outcome:</span>
                          <p className="text-accent/90 font-medium">{project.outcome}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setExpandedProject(
                          expandedProject === project.slug ? null : project.slug
                        );
                      }}
                      className="text-xs text-accent hover:text-foreground transition-colors font-mono mb-3 text-left cursor-pointer"
                    >
                      {expandedProject === project.slug
                        ? "← Collapse"
                        : "+ Details"}
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
              </TiltCard>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary font-mono text-sm">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
