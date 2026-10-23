"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollRevealOptions {
  /** CSS selector for child elements to animate (defaults to ".reveal") */
  selector?: string;
  /** Start position relative to viewport (default: "top 85%") */
  start?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Stagger delay between elements */
  stagger?: number;
  /** Initial Y offset */
  yOffset?: number;
}

/**
 * GSAP-powered scroll reveal hook.
 * Animates child elements with staggered fade-in + slide-up when
 * the container enters the viewport.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) {
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // Immediately reveal all elements
      const elements = container.querySelectorAll(options.selector || ".reveal");
      elements.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const {
      selector = ".reveal",
      start = "top 85%",
      duration = 0.8,
      stagger = 0.12,
      yOffset = 40,
    } = options;

    const ctx = gsap.context(() => {
      const elements = container.querySelectorAll(selector);
      if (elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y: yOffset });

      ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        onEnter: () => {
          hasAnimated.current = true;
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease: "power3.out",
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [ref, options]);
}
