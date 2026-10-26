"use client";

import { useEffect, useState, useCallback } from "react";
import {
  X,
  ChevronUp,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { soundFx } from "@/lib/audio";

const NAV_ITEMS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Projects", href: "#projects" },
  { num: "03", label: "Experience", href: "#experience" },
  { num: "04", label: "Skills", href: "#skills" },
  { num: "05", label: "Education", href: "#education" },
  { num: "06", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const winHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = winHeight > 0 ? (window.scrollY / winHeight) * 100 : 0;
    setScrollProgress(Math.min(scrolled, 100));

    const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    let current = "";
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 140) {
          current = section;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const frame = requestAnimationFrame(() => {
      handleScroll();
      setSoundEnabled(soundFx.getEnabled());
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSound = () => {
    const nextState = soundFx.toggle();
    setSoundEnabled(nextState);
  };

  return (
    <>
      {/* Scroll Progress Line */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Navigation Bar */}
      <header
        className="fixed top-3 sm:top-5 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2"
      >
        <div
          className={cn(
            "rounded-2xl sm:rounded-full border px-3 sm:px-4 transition-all duration-300",
            "bg-bg/75 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
            isScrolled
              ? "border-accent/25 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              : "border-border/80"
          )}
        >
          <div className="flex items-center justify-between min-h-14 sm:min-h-16 gap-3">
            {/* Logo — Lando-style bold name wordmark */}
            <button
              onClick={scrollToTop}
              className="flex items-center whitespace-nowrap leading-none cursor-pointer group shrink-0"
              aria-label="Scroll to top"
              data-cursor="HOME"
            >
              <span className="font-display font-black text-sm sm:text-lg tracking-tight text-foreground">
                NUR KHOLIS
              </span>
              <span className="font-display font-black text-sm sm:text-lg tracking-tight text-accent ml-1">
                WAKHID
              </span>
            </button>

            {/* Desktop Inline Menu */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Desktop Navigation">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 relative cursor-pointer",
                    activeSection === item.href.replace("#", "")
                      ? "text-accent bg-accent/10"
                      : "text-text-secondary hover:text-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Audio SFX Toggle */}
              <button
                onClick={toggleSound}
                className={cn(
                  "p-2 rounded-full border transition-all cursor-pointer hidden sm:flex items-center",
                  soundEnabled
                    ? "bg-accent/15 border-accent/40 text-accent"
                    : "border-border text-text-dim hover:text-foreground"
                )}
                title={soundEnabled ? "Mute SFX" : "Enable SFX"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Menu Button — Lando-style minimal hamburger */}
              <button
                onClick={() => {
                  soundFx.playModeSwitch();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-surface/60 hover:border-accent hover:bg-accent/10 text-foreground transition-all duration-300 cursor-pointer lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="w-5 h-0.5 bg-foreground rounded-full" />
                    <span className="w-3.5 h-0.5 bg-accent rounded-full" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay — Lando-style massive typography */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-bg/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6">
            <div className="font-mono text-xs text-accent tracking-widest uppercase font-semibold">
              MENU
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                setIsMenuOpen(false);
              }}
              className="p-2.5 rounded-lg border border-border hover:text-accent hover:border-accent/50 transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Giant Typography Links */}
          <div className="flex flex-col gap-2 my-auto py-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => soundFx.playHover()}
                className="group text-left py-3 sm:py-4 border-b border-border/50 hover:border-accent/30 transition-all duration-300 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-sm text-text-dim group-hover:text-accent transition-colors">
                    {item.num}
                  </span>
                  <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-foreground group-hover:text-accent transition-colors tracking-tight">
                    {item.label}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-text-dim group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-text-dim">
            <span>© {new Date().getFullYear()} Nur Kholis Wakhid</span>
            <span className="text-accent">Full Stack Dev & SEO Specialist</span>
          </div>
        </div>
      )}

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer",
          "bg-surface/90 backdrop-blur-md border border-border",
          "hover:bg-accent/20 hover:border-accent",
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-text-secondary" />
      </button>
    </>
  );
}
