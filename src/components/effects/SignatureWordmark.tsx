"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SignatureWordmarkProps {
  className?: string;
  glowColor?: string;
}

export default function SignatureWordmark({
  className,
  glowColor = "#C8FF00",
}: SignatureWordmarkProps) {
  const [isDrawn, setIsDrawn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex flex-col items-start select-none", className)}
      title="Verified Pilot Monogram: Nur Kholis Wakhid"
    >
      <div className="font-mono text-[9px] text-text-dim uppercase tracking-[0.25em] mb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        <span>SIGNATURE</span>
      </div>

      <svg
        className="w-48 sm:w-56 h-14 sm:h-16 overflow-visible"
        viewBox="0 0 240 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized N & K flowing autograph path */}
        <path
          d="M 12 52 C 22 18, 32 8, 42 32 C 50 48, 56 55, 68 22 C 76 8, 86 38, 98 42 C 108 44, 116 28, 126 18 C 132 12, 142 45, 155 35 C 168 24, 178 12, 192 28 C 202 38, 218 36, 230 25"
          stroke={glowColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-all duration-[2200ms] ease-out",
            isDrawn ? "stroke-dashoffset-0 opacity-100" : "opacity-0"
          )}
          style={{
            strokeDasharray: 450,
            strokeDashoffset: isDrawn ? 0 : 450,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          }}
        />

        {/* Dynamic decorative baseline flourish */}
        <path
          d="M 35 56 Q 110 65, 225 50"
          stroke="#9a9890"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          className={cn(
            "transition-opacity duration-1000 delay-700",
            isDrawn ? "opacity-80" : "opacity-0"
          )}
        />

        {/* Tech verification stamp */}
        <circle
          cx="228"
          cy="26"
          r="3"
          fill={glowColor}
          className={cn(
            "transition-all duration-500 delay-[1800ms]",
            isDrawn ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}
        />
      </svg>
    </div>
  );
}
