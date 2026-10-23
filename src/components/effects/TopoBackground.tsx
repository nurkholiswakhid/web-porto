"use client";

import { useEffect, useRef } from "react";

/**
 * Renders animated topographic contour lines as an SVG background,
 * mimicking the organic flowing lines on landonorris.com.
 */
export default function TopoBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const svg = svgRef.current;
    if (!svg) return;

    let offset = 0;
    let animId: number;

    const tick = () => {
      offset += 0.15;
      const paths = svg.querySelectorAll<SVGPathElement>(".topo-line");
      paths.forEach((path, i) => {
        const shift = Math.sin(offset * 0.01 + i * 0.5) * 8;
        path.style.transform = `translateY(${shift}px)`;
      });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Generate procedural contour paths
  const generatePaths = () => {
    const paths: string[] = [];
    const lineCount = 12;
    const width = 1920;
    const height = 900;

    for (let i = 0; i < lineCount; i++) {
      const baseY = (height / (lineCount + 1)) * (i + 1);
      let d = `M -100 ${baseY}`;
      const segments = 12;
      for (let s = 1; s <= segments; s++) {
        const x = (width / segments) * s + 100;
        const yVariance = Math.sin(i * 0.8 + s * 0.7) * 60 + Math.cos(s * 1.2 + i) * 40;
        const cp1x = x - (width / segments) * 0.6;
        const cp1y = baseY + yVariance * 0.7;
        const cp2x = x - (width / segments) * 0.3;
        const cp2y = baseY + yVariance;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${baseY + yVariance * 0.3}`;
      }
      paths.push(d);
    }
    return paths;
  };

  const paths = generatePaths();

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1920 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          className="topo-line"
          d={d}
          fill="none"
          stroke="var(--color-topo-line)"
          strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
          opacity={0.15 + (i % 3 === 0 ? 0.08 : 0)}
          style={{ willChange: "transform", transition: "transform 0.3s ease-out" }}
        />
      ))}
    </svg>
  );
}
