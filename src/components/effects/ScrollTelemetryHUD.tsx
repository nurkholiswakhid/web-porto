"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollTelemetryHUD() {
  const [velocity, setVelocity] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [activeSector, setActiveSector] = useState("HOME");
  const [isVisible, setIsVisible] = useState(false);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocityTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const dt = Math.max(1, currentTime - lastTime.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);

      const rawSpeed = (dy / dt) * 18;
      const speed = Math.min(28.4, Math.max(3.2, rawSpeed));
      setVelocity(speed);

      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
      velocityTimeout.current = setTimeout(() => {
        setVelocity(0);
      }, 150);

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      setAltitude(Math.round(scrollFraction * 100));
      setIsVisible(currentScrollY > 150);

      const sections = ["hero", "about", "projects", "experience", "skills", "education", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 100) {
            setActiveSector(s.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    };
  }, []);

  return (
    <aside
      aria-label="Scroll Telemetry"
      className={cn(
        "fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-3.5 px-3.5 py-2 rounded-xl border border-border bg-bg/80 backdrop-blur-xl shadow-2xl font-mono text-[10px]">
        <div className="flex items-center gap-1.5">
          <Activity className={cn("w-3.5 h-3.5 text-accent", velocity > 0 && "animate-pulse")} />
          <span className="text-text-dim">SPD:</span>
          <span className="text-accent font-semibold min-w-[40px]">
            {velocity > 0 ? `${velocity.toFixed(0)} px/s` : "IDLE"}
          </span>
        </div>

        <span className="text-border">|</span>

        <div className="flex items-center gap-1.5">
          <span className="text-text-dim">DEPTH:</span>
          <span className="text-foreground font-semibold">
            {altitude}%
          </span>
        </div>

        <span className="text-border">|</span>

        <div className="flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-text-secondary" />
          <span className="text-text-secondary font-bold">
            {activeSector}
          </span>
        </div>
      </div>
    </aside>
  );
}
