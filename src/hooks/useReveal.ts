"use client";

import { useEffect, RefObject } from "react";

/**
 * Observes `.reveal` elements within a container and adds `.revealed`
 * when they enter the viewport, triggering the CSS transition.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const checkAndReveal = () => {
      const elements = container.querySelectorAll(".reveal:not(.revealed)");
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal when the top of element is within viewport + 200px buffer
        if (rect.top <= windowHeight + 200 && rect.bottom >= -100) {
          el.classList.add("revealed");
        }
      });
    };

    // Run immediately
    checkAndReveal();

    // Check again after short delay for dynamic content and hydration
    const timer1 = setTimeout(checkAndReveal, 100);
    const timer2 = setTimeout(checkAndReveal, 500);

    // Listen to scroll and resize
    window.addEventListener("scroll", checkAndReveal, { passive: true });
    window.addEventListener("resize", checkAndReveal, { passive: true });

    // Use IntersectionObserver as primary trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px 0px 200px 0px" }
    );

    const allElements = container.querySelectorAll(".reveal");
    allElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("scroll", checkAndReveal);
      window.removeEventListener("resize", checkAndReveal);
      observer.disconnect();
    };
  }, [ref]);
}
