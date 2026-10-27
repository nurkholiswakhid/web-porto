"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { assetPath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AstronautIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const astronautRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const visual = astronautRef.current;
    const canvas = introCanvasRef.current;
    if (!visual || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const trailCanvas = document.createElement("canvas");
    const trailContext = trailCanvas.getContext("2d");
    if (!trailContext) return;

    const helmetImage = new Image();
    const pointer = { x: 50, y: 42, radius: 0 };
    const targetPointer = { x: 50, y: 42, radius: 0 };
    const size = { width: 0, height: 0 };
    let pointerInside = false;
    let animationFrame = 0;
    let lastFrame = performance.now();
    let previousX = 50;
    let previousY = 42;
    let needsRender = true;
    const trailDuration = 420;
    const trailPoints: Array<{
      x: number;
      y: number;
      radius: number;
      createdAt: number;
    }> = [];

    const resize = () => {
      const bounds = visual.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      size.width = Math.max(1, visual.offsetWidth || bounds.width);
      size.height = Math.max(1, visual.offsetHeight || bounds.height);
      canvas.width = Math.round(size.width * ratio);
      canvas.height = Math.round(size.height * ratio);
      trailCanvas.width = canvas.width;
      trailCanvas.height = canvas.height;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      trailContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      trailContext.clearRect(0, 0, size.width, size.height);
      needsRender = true;
      render();
    };

    const drawReveal = (
      drawContext: CanvasRenderingContext2D,
      xPercent: number,
      yPercent: number,
      radius: number,
      opacity = 1
    ) => {
      const x = (xPercent / 100) * size.width;
      const y = (yPercent / 100) * size.height;
      const gradient = drawContext.createRadialGradient(
        x,
        y,
        radius * 0.45,
        x,
        y,
        radius
      );
      gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
      gradient.addColorStop(0.7, `rgba(0, 0, 0, ${opacity * 0.92})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      drawContext.fillStyle = gradient;
      drawContext.beginPath();
      drawContext.arc(x, y, radius, 0, Math.PI * 2);
      drawContext.fill();
    };

    const render = () => {
      const now = performance.now();
      const smoothing = 1 - Math.exp(-(now - lastFrame) / 90);
      lastFrame = now;
      pointer.x += (targetPointer.x - pointer.x) * smoothing;
      pointer.y += (targetPointer.y - pointer.y) * smoothing;
      pointer.radius += (targetPointer.radius - pointer.radius) * smoothing;
      const hasTrail = trailPoints.some(
        (point) => now - point.createdAt < trailDuration
      );
      if (!needsRender && !pointerInside && !hasTrail) {
        animationFrame = 0;
        return;
      }
      context.clearRect(0, 0, size.width, size.height);
      if (helmetImage.complete && helmetImage.naturalWidth > 0) {
        context.drawImage(helmetImage, 0, 0, size.width, size.height);
        if (pointerInside || hasTrail) {
          context.save();
          context.globalCompositeOperation = "destination-out";
          trailContext.clearRect(0, 0, size.width, size.height);
          trailPoints.splice(
            0,
            trailPoints.length,
            ...trailPoints.filter(
              (point) => now - point.createdAt < trailDuration
            )
          );
          trailPoints.forEach((point) => {
            const progress = (now - point.createdAt) / trailDuration;
            drawReveal(
              trailContext,
              point.x,
              point.y,
              point.radius,
              1 - progress
            );
          });
          context.drawImage(trailCanvas, 0, 0, size.width, size.height);
          if (pointerInside && pointer.radius > 0) {
            drawReveal(context, pointer.x, pointer.y, pointer.radius);
          }
          context.restore();
        }
      }
      needsRender = false;
      if (
        pointerInside ||
        hasTrail ||
        Math.abs(targetPointer.radius - pointer.radius) > 0.01
      ) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };
    const startRender = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = visual.getBoundingClientRect();
      targetPointer.x = ((event.clientX - bounds.left) / bounds.width) * 100;
      targetPointer.y = ((event.clientY - bounds.top) / bounds.height) * 100;
      targetPointer.radius = 20;
      const distance = Math.hypot(
        targetPointer.x - previousX,
        targetPointer.y - previousY
      );
      const steps = Math.max(1, Math.ceil(distance / 1.2));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        trailPoints.push({
          x: previousX + (targetPointer.x - previousX) * progress,
          y: previousY + (targetPointer.y - previousY) * progress,
          radius: targetPointer.radius,
          createdAt: performance.now(),
        });
      }
      if (trailPoints.length > 120) trailPoints.splice(0, trailPoints.length - 120);
      previousX = targetPointer.x;
      previousY = targetPointer.y;
      needsRender = true;
      startRender();
    };
    const handlePointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = true;
      const bounds = visual.getBoundingClientRect();
      previousX = ((event.clientX - bounds.left) / bounds.width) * 100;
      previousY = ((event.clientY - bounds.top) / bounds.height) * 100;
      handlePointerMove(event);
    };
    const handlePointerLeave = () => {
      pointerInside = false;
      targetPointer.radius = 0;
      needsRender = true;
      startRender();
    };

    helmetImage.onload = resize;
    helmetImage.src = assetPath("images/helmt.png");
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(visual);
    visual.addEventListener("pointerenter", handlePointerEnter);
    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);
    resize();

    return () => {
      resizeObserver.disconnect();
      visual.removeEventListener("pointerenter", handlePointerEnter);
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const astronaut = astronautRef.current;
    const glow = glowRef.current;
    const scrollCue = scrollCueRef.current;
    if (!section || !astronaut || !glow || !scrollCue) return;
    const target = document.querySelector<HTMLElement>("[data-hero-visual]");
    const sequence = document.querySelector<HTMLElement>("[data-hero-sequence]");
    const heroSection = document.querySelector<HTMLElement>("[data-hero-section]");
    if (!target || !sequence || !heroSection) return;

    let resizeObserver: ResizeObserver | null = null;
    let refreshOnLoad: (() => void) | null = null;
    const context = gsap.context(() => {
      const motionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      if (motionQuery.matches) {
        gsap.set(target, { autoAlpha: 1 });
        gsap.set(scrollCue, { autoAlpha: 0 });
        return;
      }

      let transitionDistance = 0;
      const getTransitionDistance = () =>
        Math.max(window.innerHeight, section.offsetHeight - window.innerHeight);
      const readSourceRect = () => {
        gsap.set(astronaut, {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
        });
      };
      const readTransitionGeometry = () => {
        gsap.set(heroSection, { clearProps: "transform" });
        transitionDistance = getTransitionDistance();
        readSourceRect();
      };
      const moveSharedElement = (progress: number) => {
        gsap.set(astronaut, { x: 0, y: 0, scale: 1 });
        const sourceRect = astronaut.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const targetScale = targetRect.width / sourceRect.width;

        gsap.set(astronaut, {
          x: (targetCenterX - sourceCenterX) * progress,
          y: (targetCenterY - sourceCenterY) * progress,
          scale: 1 + (targetScale - 1) * progress,
          transformOrigin: "center center",
        });
      };
      const setHandoff = (progress: number) => {
        const handoff = gsap.utils.clamp(0, 1, (progress - 0.88) / 0.12);
        gsap.set(astronaut, { autoAlpha: 1 - handoff });
        gsap.set(target, { autoAlpha: handoff });
      };

      gsap.set(target, { autoAlpha: 0 });
      target.dataset.heroTransitionActive = "true";
      const notifyTransitionState = () =>
        target.dispatchEvent(new Event("hero-transition-state-change"));
      readTransitionGeometry();
      moveSharedElement(0);
      setHandoff(0);

      const transition = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${transitionDistance || getTransitionDistance()}`,
          scrub: 0.55,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            readTransitionGeometry();
            moveSharedElement(self.progress);
            setHandoff(self.progress);
            target.dataset.heroTransitionActive =
              self.progress < 1 ? "true" : "false";
            notifyTransitionState();
          },
          onUpdate: (self) => {
            moveSharedElement(self.progress);
            setHandoff(self.progress);
            target.dataset.heroTransitionActive =
              self.progress < 1 ? "true" : "false";
            notifyTransitionState();
          },
          onLeave: () => {
            target.dataset.heroTransitionActive = "false";
            notifyTransitionState();
          },
          onEnterBack: () => {
            target.dataset.heroTransitionActive = "true";
            notifyTransitionState();
          },
        },
      });

      transition
        .to({}, { duration: 1 })
        .fromTo(
          glow,
          { scale: 1, autoAlpha: 0.7 },
          { scale: 1.35, autoAlpha: 0.15, duration: 1 },
          0
        )
        .to(
          scrollCue,
          { autoAlpha: 0, y: 18, duration: 0.3, ease: "power2.out" },
          0
        );

      const refresh = () => ScrollTrigger.refresh();
      refreshOnLoad = refresh;
      resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(section);
      resizeObserver.observe(target);
      window.addEventListener("load", refresh, { once: true });
    }, section);

    return () => {
      resizeObserver?.disconnect();
      if (refreshOnLoad) {
        window.removeEventListener("load", refreshOnLoad);
      }
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pointer-events-none relative z-50 h-[200vh] overflow-visible bg-transparent"
      aria-label="Astronaut introduction"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-visible">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[min(90vw,760px)] w-[min(90vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[110px] will-change-transform"
          aria-hidden="true"
        />
        <div
          ref={astronautRef}
          className="pointer-events-auto relative z-[60] h-[min(126vw,760px)] w-[min(98vw,880px)] will-change-transform"
        >
          <img
            src={assetPath("images/tubuh.png")}
            alt="Nur Kholis Wakhid wearing an astronaut helmet"
            className="absolute inset-0 z-[1] h-full w-full object-fill drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            }}
          />
          <img
            src={assetPath("images/helmt.png")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-[2] h-full w-full object-fill opacity-0"
          />
          <canvas
            ref={introCanvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full drop-shadow-[0_0_34px_rgba(200,255,0,0.3)]"
          />
        </div>
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-center transition-opacity duration-300"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary">
            Scroll to enter orbit
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce text-accent" />
        </div>
      </div>
    </section>
  );
}
