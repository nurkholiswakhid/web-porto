"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, MapPin, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { assetPath, cn } from "@/lib/utils";
import { soundFx } from "@/lib/audio";
import TiltCard from "./TiltCard";

export default function MissionGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    soundFx.playClick();
    const offset = direction === "left" ? -420 : 420;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
    checkScroll();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full my-12">
      {/* Header Bar with Gallery Navigation Controls */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <div className="font-mono text-xs text-cosmic-highlight flex items-center gap-1.5 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mission Gallery // Horizontal Flight Stream</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-cosmic-text mt-1">
            Visual Expedition Feed
          </h3>
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left in mission gallery"
            className={cn(
              "p-2.5 rounded-xl border border-cosmic-border bg-cosmic-surface/60 transition-all",
              canScrollLeft
                ? "text-cosmic-text hover:border-cosmic-primary hover:bg-cosmic-primary/10 cursor-pointer"
                : "text-cosmic-text-dim opacity-40 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right in mission gallery"
            className={cn(
              "p-2.5 rounded-xl border border-cosmic-border bg-cosmic-surface/60 transition-all",
              canScrollRight
                ? "text-cosmic-text hover:border-cosmic-secondary hover:bg-cosmic-secondary/10 cursor-pointer"
                : "text-cosmic-text-dim opacity-40 cursor-not-allowed"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={checkScroll}
        data-cursor={isDragging ? "DRAGGING" : "DRAG"}
        className={cn(
          "flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.slug}
            className="shrink-0 w-[300px] sm:w-[360px] md:w-[400px]"
          >
            <TiltCard
              maxTilt={8}
              dataCursor="EXPLORE"
              className="h-full border border-cosmic-border/80 bg-cosmic-surface/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:border-cosmic-secondary/60 group"
            >
              {/* Media Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-cosmic-bg">
                {project.thumbnail ? (
                  <img
                    src={assetPath(project.thumbnail)}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-cosmic-primary/20 via-cosmic-surface to-cosmic-secondary/20 flex items-center justify-center font-mono text-xs text-cosmic-text-dim">
                    [MISSION ASSET]
                  </div>
                )}
                {/* Tech tag pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cosmic-bg/85 backdrop-blur-md border border-cosmic-border text-[10px] font-mono text-cosmic-highlight font-semibold uppercase">
                  {project.category}
                </div>
                {/* Year tag pill */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-cosmic-bg/85 backdrop-blur-md border border-cosmic-border text-[10px] font-mono text-cosmic-text-dim flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cosmic-secondary" />
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-cosmic-text-dim font-mono mb-1">
                    <MapPin className="w-3 h-3 text-cosmic-secondary" />
                    <span>INDONESIA // PROD</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-cosmic-text group-hover:text-cosmic-secondary transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-cosmic-text-secondary leading-relaxed line-clamp-2 mt-2">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-cosmic-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-cosmic-primary/10 border border-cosmic-primary/20 font-mono text-[9px] text-cosmic-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-cosmic-border bg-cosmic-surface hover:border-cosmic-highlight hover:text-cosmic-highlight text-cosmic-text-secondary transition-colors"
                      title="Launch live mission"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}
