"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentTrailing = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, select, textarea, [data-cursor], .interactive");
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor");
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      currentTrailing.current.x += (targetPos.current.x - currentTrailing.current.x) * 0.18;
      currentTrailing.current.y += (targetPos.current.y - currentTrailing.current.y) * 0.18;
      setTrailingPos({
        x: currentTrailing.current.x,
        y: currentTrailing.current.y,
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <aside
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
    >
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#C8FF00] pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${
            isClicking ? 0.6 : isHovered ? 1.4 : 1
          })`,
        }}
      />

      {/* Trailing Reticle Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none transition-all duration-150 ease-out flex items-center justify-center"
        style={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 16)}px, ${
            trailingPos.y - (isHovered ? 24 : 16)
          }px, 0) scale(${isClicking ? 0.85 : 1})`,
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-colors duration-300 relative ${
            isHovered
              ? "border-accent/80 bg-accent/10 shadow-[0_0_15px_rgba(200,255,0,0.3)]"
              : "border-text-secondary/30"
          }`}
        >
          {/* Reticle ticks */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-text-secondary/50" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-text-secondary/50" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-0.5 h-1.5 bg-text-secondary/50" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-0.5 h-1.5 bg-text-secondary/50" />
        </div>

        {/* Floating Cursor Label */}
        {cursorText && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-bg/90 border border-accent/60 text-[9px] font-mono font-bold text-accent uppercase tracking-widest shadow-md">
            {cursorText}
          </div>
        )}
      </div>
    </aside>
  );
}
