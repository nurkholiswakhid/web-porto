"use client";

import { useEffect, useRef } from "react";

interface MarqueeTextProps {
  lines: { text: string; accentWords?: string[] }[];
  speed?: number;
  className?: string;
}

export default function MarqueeText({
  lines,
  speed = 40,
  className = "",
}: MarqueeTextProps) {
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animId: number;
    const offsets = lines.map(() => 0);
    const initialized = lines.map(() => false);
    const speeds = lines.map((_, i) => (i % 2 === 0 ? speed : -speed));

    const tick = () => {
      trackRefs.current.forEach((track, i) => {
        if (!track) return;

        const firstItem = track.firstElementChild;
        if (!(firstItem instanceof HTMLElement)) return;

        const loopWidth =
          firstItem.getBoundingClientRect().width +
          parseFloat(getComputedStyle(firstItem).marginRight || "0");
        if (!loopWidth) return;

        if (!initialized[i]) {
          // Start right-moving rows on the second copy to keep both edges filled.
          offsets[i] = speeds[i] > 0 ? -loopWidth : 0;
          initialized[i] = true;
        }

        offsets[i] += speeds[i] * (1 / 60);
        if (speeds[i] > 0 && offsets[i] >= 0) {
          offsets[i] -= loopWidth;
        } else if (speeds[i] < 0 && offsets[i] <= -loopWidth) {
          offsets[i] += loopWidth;
        }
        track.style.transform = `translateX(${offsets[i]}px)`;
      });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [lines, speed]);

  const renderLine = (
    line: { text: string; accentWords?: string[] },
    idx: number
  ) => {
    const words = line.text.split(" ");
    return words.map((word, wi) => {
      const isAccent = line.accentWords?.some(
        (aw) => aw.toLowerCase() === word.toLowerCase()
      );
      return (
        <span
          key={`${idx}-${wi}`}
          className={
            isAccent
              ? "text-accent italic"
              : "text-foreground"
          }
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div
      className={`overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden whitespace-nowrap">
          <div
            ref={(el) => { trackRefs.current[i] = el; }}
            className="inline-flex whitespace-nowrap will-change-transform"
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((dup) => (
              <span
                key={dup}
                className="shrink-0 font-display font-black text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight mr-8"
              >
                {renderLine(line, i)}
                <span className="text-border mx-6">✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
