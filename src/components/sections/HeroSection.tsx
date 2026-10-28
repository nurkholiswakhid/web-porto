"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { assetPath } from "@/lib/utils";
import MarqueeText from "@/components/effects/MarqueeText";
import { soundFx } from "@/lib/audio";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const helmetCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const canvas = helmetCanvasRef.current;
    if (!visual || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const trailCanvas = document.createElement("canvas");
    const trailContext = trailCanvas.getContext("2d");
    if (!trailContext) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const helmetImage = new Image();
    const cursor = { x: 50, y: 42, radius: 0 };
    const target = { x: 50, y: 42, radius: 0 };
    const canvasSize = { width: 0, height: 0 };
    let needsRender = true;
    let previousX = 0;
    let previousY = 0;
    let velocity = 0;
    let pointerInside = false;
    let animationFrame = 0;
    let lastFrameTime = performance.now();
    let activeSegment = -1;
    const segmentColumns = 8;
    const segmentRows = 6;
    const segments = Array.from(
      { length: segmentColumns * segmentRows },
      () => ({
        points: [] as Array<{ x: number; y: number; radius: number }>,
        fadeStartedAt: 0,
      })
    );
    let resizeObserver: ResizeObserver | null = null;
    const trailDuration = 500;

    const resizeCanvas = () => {
      const bounds = visual.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvasSize.width = Math.max(1, bounds.width);
      canvasSize.height = Math.max(1, bounds.height);
      canvas.width = Math.round(canvasSize.width * ratio);
      canvas.height = Math.round(canvasSize.height * ratio);
      trailCanvas.width = canvas.width;
      trailCanvas.height = canvas.height;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      trailContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      trailContext.clearRect(0, 0, canvasSize.width, canvasSize.height);
      needsRender = true;
    };

    const drawTrailPoint = (
      xPercent: number,
      yPercent: number,
      radius: number,
      opacity = 1
    ) => {
      const x = (xPercent / 100) * canvasSize.width;
      const y = (yPercent / 100) * canvasSize.height;
      const gradient = trailContext.createRadialGradient(
        x,
        y,
        radius * 0.55,
        x,
        y,
        radius
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.72, "rgba(0, 0, 0, 0.92)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      trailContext.save();
      trailContext.globalCompositeOperation = "source-over";
      trailContext.globalAlpha = opacity;
      trailContext.fillStyle = gradient;
      trailContext.beginPath();
      trailContext.arc(x, y, radius, 0, Math.PI * 2);
      trailContext.fill();
      trailContext.restore();
    };

    const getSegmentIndex = (x: number, y: number) => {
      const column = Math.min(
        segmentColumns - 1,
        Math.max(0, Math.floor((x / 100) * segmentColumns))
      );
      const row = Math.min(
        segmentRows - 1,
        Math.max(0, Math.floor((y / 100) * segmentRows))
      );
      return row * segmentColumns + column;
    };

    const triggerSegmentFade = (segmentIndex: number, timestamp: number) => {
      const segment = segments[segmentIndex];
      if (segment.fadeStartedAt === 0 && segment.points.length > 0) {
        segment.fadeStartedAt = timestamp;
      }
    };

    const hasActiveFade = () =>
      segments.some((segment) => segment.fadeStartedAt > 0);

    const redrawTrail = (now: number) => {
      trailContext.clearRect(0, 0, canvasSize.width, canvasSize.height);
      segments.forEach((segment) => {
        if (segment.fadeStartedAt === 0) {
          segment.points.forEach((point) =>
            drawTrailPoint(point.x, point.y, point.radius)
          );
          return;
        }
        const elapsed = now - segment.fadeStartedAt;
        if (elapsed >= trailDuration) {
          segment.points = [];
          segment.fadeStartedAt = 0;
          return;
        }
        const stepDelay =
          segment.points.length > 1
            ? (trailDuration * 0.35) / (segment.points.length - 1)
            : 0;
        const fadeDuration = trailDuration * 0.65;
        segment.points.forEach((point, index) => {
          const progress = Math.max(
            0,
            Math.min(1, (elapsed - index * stepDelay) / fadeDuration)
          );
          const easedProgress = progress * progress * (3 - 2 * progress);
          drawTrailPoint(point.x, point.y, point.radius, 1 - easedProgress);
        });
      });
    };

    const render = () => {
      const now = performance.now();
      const deltaTime = Math.min(now - lastFrameTime, 50);
      lastFrameTime = now;
      const smoothing = reducedMotion
        ? 1
        : 1 - Math.exp(-deltaTime / 110);
      cursor.x += (target.x - cursor.x) * smoothing;
      cursor.y += (target.y - cursor.y) * smoothing;
      cursor.radius += (target.radius - cursor.radius) * smoothing;

      const hasMotion =
        Math.abs(target.x - cursor.x) > 0.01 ||
        Math.abs(target.y - cursor.y) > 0.01 ||
        Math.abs(target.radius - cursor.radius) > 0.01;
      if (needsRender || hasMotion) {
        context.clearRect(0, 0, canvasSize.width, canvasSize.height);
        if (helmetImage.complete && helmetImage.naturalWidth > 0) {
          context.drawImage(
            helmetImage,
            0,
            0,
            canvasSize.width,
            canvasSize.height
          );
          const transitionActive =
            visual.dataset.heroTransitionActive === "true";
          if (!transitionActive && (pointerInside || hasActiveFade())) {
            context.save();
            context.globalCompositeOperation = "destination-out";
            redrawTrail(now);
            context.globalAlpha = 1;
            context.drawImage(
              trailCanvas,
              0,
              0,
              canvasSize.width,
              canvasSize.height
            );
            if (pointerInside && cursor.radius > 0) {
              context.globalAlpha = 1;
              const x = (cursor.x / 100) * canvasSize.width;
              const y = (cursor.y / 100) * canvasSize.height;
              const gradient = context.createRadialGradient(
                x,
                y,
                cursor.radius * 0.55,
                x,
                y,
                cursor.radius
              );
              gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
              gradient.addColorStop(0.72, "rgba(0, 0, 0, 0.92)");
              gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
              context.fillStyle = gradient;
              context.beginPath();
              context.arc(x, y, cursor.radius, 0, Math.PI * 2);
              context.fill();
            }
            context.restore();
          }
        }
        needsRender = false;
      }
      if (
        pointerInside ||
        hasMotion ||
        needsRender ||
        hasActiveFade()
      ) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const startRenderLoop = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };
    const handleTransitionStateChange = () => {
      needsRender = true;
      startRenderLoop();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = visual.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 100;
      const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 100;
      const deltaX = normalizedX - previousX;
      const deltaY = normalizedY - previousY;
      const speed = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 10);
      velocity += (speed - velocity) * 0.18;

      target.x = normalizedX;
      target.y = normalizedY;
      target.radius = 20 + velocity * 3;
      const lastPoint = { x: previousX, y: previousY };
      const distance = Math.hypot(
        normalizedX - lastPoint.x,
        normalizedY - lastPoint.y
      );
      if (distance > 0.6) {
        const steps = Math.max(1, Math.ceil(distance / 0.6));
        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps;
          const pointX =
            lastPoint.x + (normalizedX - lastPoint.x) * progress;
          const pointY =
            lastPoint.y + (normalizedY - lastPoint.y) * progress;
          const segmentIndex = getSegmentIndex(pointX, pointY);
          if (activeSegment !== -1 && activeSegment !== segmentIndex) {
            triggerSegmentFade(activeSegment, performance.now());
          }
          activeSegment = segmentIndex;
          const segment = segments[segmentIndex];
          const previousPoint = segment.points[segment.points.length - 1];
          if (
            !previousPoint ||
            Math.hypot(pointX - previousPoint.x, pointY - previousPoint.y) > 0.4
          ) {
            segment.points.push({
              x: pointX,
              y: pointY,
              radius: target.radius,
            });
            if (segment.points.length > 24) segment.points.shift();
          }
        }
      }
      const endpointSegment = getSegmentIndex(normalizedX, normalizedY);
      if (activeSegment !== -1 && activeSegment !== endpointSegment) {
        triggerSegmentFade(activeSegment, performance.now());
      }
      activeSegment = endpointSegment;
      previousX = normalizedX;
      previousY = normalizedY;
      needsRender = true;
      startRenderLoop();
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = visual.getBoundingClientRect();
      previousX = ((event.clientX - bounds.left) / bounds.width) * 100;
      previousY = ((event.clientY - bounds.top) / bounds.height) * 100;
      velocity = 0;
      pointerInside = true;
      target.x = previousX;
      target.y = previousY;
      target.radius = 10;
      activeSegment = getSegmentIndex(previousX, previousY);
      needsRender = true;
      startRenderLoop();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      target.radius = 0;
      if (activeSegment !== -1) {
        triggerSegmentFade(activeSegment, performance.now());
      }
      needsRender = true;
      startRenderLoop();
    };

    helmetImage.onload = () => {
      needsRender = true;
    };
    helmetImage.src = assetPath("images/helmt.png");

    visual.addEventListener("pointerenter", handlePointerEnter);
    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);
    visual.addEventListener(
      "hero-transition-state-change",
      handleTransitionStateChange
    );
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(visual);
    resizeCanvas();
    startRenderLoop();

    return () => {
      visual.removeEventListener("pointerenter", handlePointerEnter);
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", handlePointerLeave);
      visual.removeEventListener(
        "hero-transition-state-change",
        handleTransitionStateChange
      );
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const linkedIn = socials.find((s) => s.kind === "linkedin");
  const github = socials.find((s) => s.kind === "github");
  const email = socials.find((s) => s.kind === "email");

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-hero-section
      className="relative z-0 -mt-[100vh] min-h-screen flex flex-col justify-center overflow-visible bg-transparent"
      aria-label="Hero section"
    >
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[min(90vw,600px)] w-[min(90vw,600px)] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px] lg:left-[-200px] lg:top-[-200px] lg:h-[600px] lg:w-[600px] lg:translate-x-0 lg:blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/2 h-[min(85vw,500px)] w-[min(85vw,500px)] -translate-x-1/2 rounded-full bg-accent/[0.02] blur-[100px] lg:bottom-[-100px] lg:left-auto lg:right-[-150px] lg:h-[500px] lg:w-[500px] lg:translate-x-0 lg:blur-[120px]" />

      {/* Main Hero Content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-28 pb-16"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Status Pill */}
            <div className="mb-6 flex w-fit max-w-full flex-col items-center gap-2 rounded-2xl border border-border bg-surface/60 px-3.5 py-2 text-center backdrop-blur-md sm:inline-flex sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-text-secondary">
                Open to Professional Opportunities
              </span>
              <span className="hidden text-border sm:inline">|</span>
              <span className="flex items-center gap-1 whitespace-nowrap font-mono text-[11px] text-accent">
                <MapPin className="w-3 h-3" /> Surabaya, Indonesia
              </span>
            </div>

            {/* Role Label */}
            <div className="mb-3">
              <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase font-medium">
                Full Stack Developer &amp; SEO Specialist
              </span>
            </div>

            {/* Name — Massive cinematic typography */}
            <h1 className="hero-headline mb-4">
              <span className="block">NUR</span>
              <span className="block accent">KHOLIS</span>
              <span className="block">WAKHID</span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg mb-8">
              I build reliable web applications and improve organic search
              performance through thoughtful engineering and measurable SEO.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-8">
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-accent">3.84</div>
                <div className="font-mono text-[10px] text-text-dim">GPA · UNESA</div>
              </div>
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-foreground">Top 20</div>
                <div className="font-mono text-[10px] text-text-dim">NATIONAL FINALIST</div>
              </div>
              <div className="p-3 rounded-xl border border-border bg-surface/40 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-accent">IEEE</div>
                <div className="font-mono text-[10px] text-text-dim">IEEE PUBLICATION</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="PROJECTS"
                className="btn-primary cursor-pointer"
              >
                <span>View Selected Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={assetPath(profile.cvPath)}
                download="CV_Nur_Kholis_Wakhid.pdf"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="DOWNLOAD"
                className="btn-secondary cursor-pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {linkedIn && (
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                </a>
              )}
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-foreground/50 hover:bg-foreground/10 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4 text-text-secondary group-hover:text-foreground transition-colors" />
                </a>
              )}
              {email && (
                <a
                  href={email.url}
                  className="group p-2.5 rounded-xl border border-border bg-surface/40 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Portrait only */}
          <div className="order-first flex w-full justify-center lg:col-span-5 lg:order-2">
            <div
              ref={visualRef}
              data-hero-visual
              className="relative w-full max-w-[380px] touch-pan-y opacity-0 sm:max-w-[440px] lg:max-w-[480px]"
            >
              {/* Holographic backdrop */}
              <div className="relative aspect-square overflow-hidden lg:aspect-[3769/3218]">
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(200,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.4) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Telemetry corners */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-accent/40 tracking-widest z-10">
                  WEB DEVELOPMENT
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-accent/40 tracking-widest z-10">
                  SEO STRATEGY ┐
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-text-dim/40 tracking-widest z-10">
                  └ SURABAYA, INDONESIA
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-accent/30 tracking-widest z-10">
                  OPEN TO OPPORTUNITIES ┘
                </div>

                {/* Canvas helmet layer erases only the area under the pointer. */}
                <canvas
                  ref={helmetCanvasRef}
                  aria-hidden="true"
                  className="invisible absolute inset-0 z-[3] h-full w-full pointer-events-none drop-shadow-[0_0_26px_rgba(200,255,0,0.28)]"
                />

                {/* Portrait subject remains below the masked helmet layer. */}
                <img
                  src={assetPath("images/tubuh.png")}
                  alt="Nur Kholis Wakhid — Full Stack Web Developer & SEO Specialist"
                  className="absolute inset-0 z-[2] h-full w-full object-contain lg:object-fill"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                    filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.6))",
                  }}
                />
              </div>

              {/* Floating HUD labels */}
              <div className="absolute -top-2 -right-3 z-20 p-2.5 rounded-xl border border-accent/20 bg-surface/90 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-accent font-semibold uppercase tracking-wider">SEO &amp; Performance</div>
                    <div className="text-[11px] font-semibold text-foreground">Measurable Organic Growth</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-3 z-20 p-2.5 rounded-xl border border-accent/20 bg-surface/90 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-accent font-semibold uppercase tracking-wider">Full Stack Development</div>
                    <div className="text-[11px] font-semibold text-foreground">Laravel · Next.js · REST APIs</div>
                  </div>
                </div>
              </div>

              {/* Orbit ring decoration */}
              <div
                className="pointer-events-none absolute -inset-4 scale-[0.62] rounded-full border border-dashed border-accent/[0.07] lg:scale-100"
                style={{ animation: "spin 40s linear infinite" }}
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/50 shadow-[0_0_8px_rgba(200,255,0,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Text Divider */}
      <div className="marquee-divider mt-auto">
        <MarqueeText
          lines={[
            {
              text: "FULL STACK DEVELOPMENT TECHNICAL SEO AI INTEGRATION",
              accentWords: ["DEVELOPMENT", "SEO", "INTEGRATION"],
            },
            {
              text: "RELIABLE WEB APPLICATIONS MEASURABLE ORGANIC GROWTH",
              accentWords: ["RELIABLE", "MEASURABLE", "GROWTH"],
            },
          ]}
          speed={35}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[10px] text-text-dim tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-border flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
