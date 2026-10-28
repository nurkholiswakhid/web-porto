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
  const introNameRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);
  const automaticBlobPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const visual = astronautRef.current;
    const canvas = introCanvasRef.current;
    const automaticBlobPath = automaticBlobPathRef.current;
    if (!visual || !canvas || !automaticBlobPath) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const trailCanvas = document.createElement("canvas");
    const trailContext = trailCanvas.getContext("2d");
    if (!trailContext) return;

    const helmetImage = new Image();
    const automaticPointer = { x: 50, y: 42, radius: 0 };
    const automaticTarget = { x: 50, y: 42, radius: 0 };
    const manualPointer = { x: 50, y: 42, radius: 0 };
    const manualTarget = { x: 50, y: 42, radius: 0 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const isCompactScreen = () => coarsePointer || mobileViewport.matches;
    const cursorConfig = {
      automatic: {
        enabled: !reducedMotion,
        size: isCompactScreen() ? 50 : 126,
        movementSmoothing: coarsePointer ? 90 : 58,
        closingSmoothing: 180,
        directionSmoothing: 150,
        springStrength: 34,
        springDamping: 10,
        maxVelocity: 520,
        maxStretch: 1.28,
        contourSpeed: 0.00072,
        idleRipple: 0.035,
        asymmetry: 0.11,
        velocityInfluence: 0.2,
        contourSmoothing: 110,
        puddleLobes: 4,
        puddleWidth: 1.28,
        puddleHeight: 0.98,
      },
      manual: {
        enabled: true,
        size: 28,
        smoothing: 45,
        directionSmoothing: 55,
        springStrength: 34,
        springDamping: 10,
        maxVelocity: 520,
        maxStretch: 1.28,
        idleRipple: 0.035,
        asymmetry: 0.11,
        velocityInfluence: 0.2,
        contourSmoothing: 110,
        puddleLobes: 4,
        puddleWidth: 1.28,
        puddleHeight: 0.98,
        contourSpeed: 0.00072,
      },
    };
    const size = { width: 0, height: 0 };
    let pointerInside = false;
    const automaticMotion = cursorConfig.automatic.enabled;
    let introVisible = true;
    let tickerActive = false;
    let lastFrame = performance.now();
    let previousX = 50;
    let previousY = 42;
    let needsRender = true;
    let lastAutomaticFrame = 0;
    let lastPointerEventAt = 0;
    let automaticStretch = 1;
    let automaticStretchVelocity = 0;
    let automaticAngle = 0;
    let automaticSpeed = 0;
    let contourSettling = 1;
    const automaticContourPoints: Array<{ x: number; y: number }> = [];
    let manualAngle = 0;
    let manualSpeed = 0;
    let manualStretch = 1;
    let manualStretchVelocity = 0;
    let manualSettling = 1;
    let lastManualFrameX = manualPointer.x;
    let lastManualFrameY = manualPointer.y;
    const manualContourPoints: Array<{ x: number; y: number }> = [];
    const automaticPath = {
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      speedX: coarsePointer
        ? 0.0002 + Math.random() * 0.00008
        : 0.00035 + Math.random() * 0.0002,
      speedY: coarsePointer
        ? 0.00016 + Math.random() * 0.00007
        : 0.00028 + Math.random() * 0.00018,
      amplitudeX: coarsePointer ? 7 : 16 + Math.random() * 8,
      amplitudeY: coarsePointer ? 5 : 12 + Math.random() * 8,
    };
    const trailDuration = 260;
    const automaticFrameInterval = coarsePointer ? 1000 / 24 : 1000 / 30;
    const renderFrameInterval = coarsePointer ? 1000 / 30 : 0;
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

    type OrganicCursorConfig = {
      size: number;
      puddleWidth: number;
      puddleHeight: number;
      maxVelocity: number;
      maxStretch: number;
      contourSpeed: number;
      idleRipple: number;
      asymmetry: number;
      velocityInfluence: number;
      contourSmoothing: number;
      puddleLobes: number;
    };

    const drawOrganicReveal = (
      drawContext: CanvasRenderingContext2D,
      xPercent: number,
      yPercent: number,
      radius: number,
      stretch: number,
      angle: number,
      time: number,
      elapsed: number,
      speed: number,
      settling: number,
      config: OrganicCursorConfig,
      smoothedContour: Array<{ x: number; y: number }>,
      updateSvgPath = false
    ) => {
      const x = (xPercent / 100) * size.width;
      const y = (yPercent / 100) * size.height;
      drawContext.save();
      drawContext.translate(x, y);
      drawContext.scale(
        config.puddleWidth,
        config.puddleHeight
      );
      drawContext.fillStyle = "#000";
      const points = 20;
      const contour = Array.from({ length: points }, (_, index) => {
        const theta = (index / points) * Math.PI * 2;
        const phase = time * config.contourSpeed;
        const motion = Math.min(
          1,
          speed / config.maxVelocity
        );
        const settlingRipple = config.idleRipple * settling;
        const direction = theta - angle;
        const forwardBack = Math.cos(direction);
        const stretchAlongMotion =
          1 +
          (stretch - 1) *
            forwardBack *
            forwardBack;
        const waves =
          Math.sin(theta * 3 + phase * 0.62) *
            (0.075 + settlingRipple * 0.55) +
          Math.cos(theta * 5 - phase * 0.38 + 0.7) *
            (0.04 + settlingRipple * 0.3) +
          Math.sin(theta * 2 + phase * 0.24 - 1.1) *
            (0.035 + settlingRipple * 0.25);
        const lobe = (center: number, width: number, strength: number) => {
          const delta = Math.atan2(
            Math.sin(theta - center),
            Math.cos(theta - center)
          );
          const normalized = Math.abs(delta) / width;
          if (normalized >= 1) return 0;
          const rounded = (Math.cos(normalized * Math.PI) + 1) / 2;
          return strength * rounded * rounded;
        };
        const lobes =
          lobe(-2.6 + Math.sin(phase * 0.3) * 0.04, 0.82, 0.18) +
          lobe(-1.45 - Math.sin(phase * 0.24) * 0.035, 0.86, -0.15) +
          lobe(-0.25 + Math.sin(phase * 0.2) * 0.03, 0.82, 0.15) +
          lobe(0.9 - Math.sin(phase * 0.27) * 0.035, 0.78, -0.17) +
          lobe(2.05 + Math.sin(phase * 0.22) * 0.04, 0.9, 0.18) +
          lobe(2.85 - Math.sin(phase * 0.25) * 0.03, 0.72, -0.1);
        const directionalMass =
          forwardBack * motion * config.velocityInfluence +
          Math.cos(direction * 2) * motion * 0.045;
        const wakeLobes =
          lobe(angle, 0.92, motion * 0.1) +
          lobe(angle + Math.PI, 1.08, -motion * 0.13);
        const asymmetry =
          Math.cos(theta - 0.55) * config.asymmetry * 0.32 +
          Math.sin(theta * 1.5 + 0.4) *
            config.asymmetry *
            0.22;
        const deform = Math.max(
          0.72,
          Math.min(
            1.28,
            (1 + waves + lobes + asymmetry + directionalMass + wakeLobes) *
              stretchAlongMotion
          )
        );
        const localX = Math.cos(theta) * radius * deform;
        const localY = Math.sin(theta) * radius * deform;
        const rotatedX =
          localX * Math.cos(angle) - localY * Math.sin(angle);
        const rotatedY =
          localX * Math.sin(angle) + localY * Math.cos(angle);
        return {
          x: rotatedX,
          y: rotatedY,
        };
      });

      const contourSmoothing =
        1 -
        Math.exp(
          -Math.min(50, elapsed) / config.contourSmoothing
        );
      contour.forEach((point, index) => {
        const previousPoint = smoothedContour[index];
        if (!previousPoint) {
          smoothedContour[index] = { ...point };
          return;
        }
        previousPoint.x += (point.x - previousPoint.x) * contourSmoothing;
        previousPoint.y += (point.y - previousPoint.y) * contourSmoothing;
        contour[index] = previousPoint;
      });

      const controlTension = 0.82 / 6;
      const firstPoint = contour[0];
      let pathData = `M ${firstPoint.x.toFixed(2)} ${firstPoint.y.toFixed(2)}`;
      for (let index = 0; index < points; index += 1) {
        const previous = contour[(index - 1 + points) % points];
        const current = contour[index];
        const next = contour[(index + 1) % points];
        const following = contour[(index + 2) % points];
        const control1X =
          current.x + (next.x - previous.x) * controlTension;
        const control1Y =
          current.y + (next.y - previous.y) * controlTension;
        const control2X =
          next.x - (following.x - current.x) * controlTension;
        const control2Y =
          next.y - (following.y - current.y) * controlTension;
        pathData += ` C ${control1X.toFixed(2)} ${control1Y.toFixed(2)} ${control2X.toFixed(2)} ${control2Y.toFixed(2)} ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
      }
      pathData += " Z";
      if (updateSvgPath) automaticBlobPath.setAttribute("d", pathData);
      drawContext.fill(new Path2D(pathData));
      drawContext.restore();
    };

    const render = () => {
      const now = performance.now();
      if (renderFrameInterval && now - lastFrame < renderFrameInterval) return;
      const elapsed = Math.min(now - lastFrame, 50);
      const automaticSmoothing =
        1 - Math.exp(-elapsed / cursorConfig.automatic.movementSmoothing);
      const automaticClosingSmoothing =
        1 - Math.exp(-elapsed / cursorConfig.automatic.closingSmoothing);
      const manualSmoothing =
        1 - Math.exp(-elapsed / cursorConfig.manual.smoothing);
      lastFrame = now;
      if (
        document.visibilityState === "hidden" ||
        (!introVisible && !pointerInside)
      ) {
        if (tickerActive) {
          gsap.ticker.remove(render);
          tickerActive = false;
        }
        return;
      }
      const updateAutomatic =
        automaticMotion &&
        now - lastAutomaticFrame >= automaticFrameInterval;
      if (updateAutomatic) {
        automaticTarget.x =
          50 +
          Math.sin(now * automaticPath.speedX + automaticPath.phaseX) *
            automaticPath.amplitudeX;
        automaticTarget.y =
          42 +
          Math.sin(now * automaticPath.speedY + automaticPath.phaseY) *
            automaticPath.amplitudeY;
        automaticTarget.radius = cursorConfig.automatic.size;
        lastAutomaticFrame = now;
        needsRender = true;
      }
      const previousAutomaticX = automaticPointer.x;
      const previousAutomaticY = automaticPointer.y;
      automaticPointer.x +=
        (automaticTarget.x - automaticPointer.x) * automaticSmoothing;
      automaticPointer.y +=
        (automaticTarget.y - automaticPointer.y) * automaticSmoothing;
      automaticPointer.radius +=
        (automaticTarget.radius - automaticPointer.radius) *
        (automaticTarget.radius < automaticPointer.radius
          ? automaticClosingSmoothing
          : automaticSmoothing);
      const movementX =
        ((automaticPointer.x - previousAutomaticX) / 100) * size.width;
      const movementY =
        ((automaticPointer.y - previousAutomaticY) / 100) * size.height;
      const elapsedSeconds = Math.max(elapsed / 1000, 0.001);
      const instantaneousSpeed =
        Math.hypot(movementX, movementY) / elapsedSeconds;
      automaticSpeed +=
        (instantaneousSpeed - automaticSpeed) *
        (1 - Math.exp(-elapsed / cursorConfig.automatic.directionSmoothing));
      const speedRatio = Math.min(
        1,
        automaticSpeed / cursorConfig.automatic.maxVelocity
      );
      const targetStretch =
        1 + speedRatio * (cursorConfig.automatic.maxStretch - 1);
      const springAcceleration =
        (targetStretch - automaticStretch) *
        cursorConfig.automatic.springStrength;
      automaticStretchVelocity += springAcceleration * elapsedSeconds;
      automaticStretchVelocity *= Math.exp(
        -cursorConfig.automatic.springDamping * elapsedSeconds
      );
      automaticStretch += automaticStretchVelocity * elapsedSeconds;
      automaticStretch = Math.max(1, Math.min(cursorConfig.automatic.maxStretch, automaticStretch));
      if (instantaneousSpeed > 8) {
        const targetAngle = Math.atan2(movementY, movementX);
        const angleDelta = Math.atan2(
          Math.sin(targetAngle - automaticAngle),
          Math.cos(targetAngle - automaticAngle)
        );
        automaticAngle +=
          angleDelta *
          (1 -
            Math.exp(-elapsed / cursorConfig.automatic.directionSmoothing));
      }
      contourSettling +=
        ((speedRatio < 0.025 ? 1 : 0) - contourSettling) *
        (1 - Math.exp(-elapsed / 900));
      manualPointer.x +=
        (manualTarget.x - manualPointer.x) * manualSmoothing;
      manualPointer.y +=
        (manualTarget.y - manualPointer.y) * manualSmoothing;
      manualPointer.radius +=
        (manualTarget.radius - manualPointer.radius) * manualSmoothing;
      const manualMovementX =
        ((manualPointer.x - lastManualFrameX) / 100) * size.width;
      const manualMovementY =
        ((manualPointer.y - lastManualFrameY) / 100) * size.height;
      lastManualFrameX = manualPointer.x;
      lastManualFrameY = manualPointer.y;
      const manualInstantaneousSpeed =
        Math.hypot(manualMovementX, manualMovementY) / elapsedSeconds;
      manualSpeed +=
        (manualInstantaneousSpeed - manualSpeed) *
        (1 - Math.exp(-elapsed / cursorConfig.manual.directionSmoothing));
      const manualSpeedRatio = Math.min(
        1,
        manualSpeed / cursorConfig.manual.maxVelocity
      );
      const manualTargetStretch =
        1 +
        manualSpeedRatio * (cursorConfig.manual.maxStretch - 1);
      const manualSpringAcceleration =
        (manualTargetStretch - manualStretch) *
        cursorConfig.manual.springStrength;
      manualStretchVelocity += manualSpringAcceleration * elapsedSeconds;
      manualStretchVelocity *= Math.exp(
        -cursorConfig.manual.springDamping * elapsedSeconds
      );
      manualStretch += manualStretchVelocity * elapsedSeconds;
      manualStretch = Math.max(
        1,
        Math.min(cursorConfig.manual.maxStretch, manualStretch)
      );
      if (manualInstantaneousSpeed > 8) {
        const manualTargetAngle = Math.atan2(
          manualMovementY,
          manualMovementX
        );
        const manualAngleDelta = Math.atan2(
          Math.sin(manualTargetAngle - manualAngle),
          Math.cos(manualTargetAngle - manualAngle)
        );
        manualAngle +=
          manualAngleDelta *
          (1 -
            Math.exp(
              -elapsed / cursorConfig.manual.directionSmoothing
            ));
      }
      manualSettling +=
        ((manualSpeedRatio < 0.025 ? 1 : 0) - manualSettling) *
        (1 - Math.exp(-elapsed / 900));
      while (
        trailPoints.length > 0 &&
        now - trailPoints[0].createdAt >= trailDuration
      ) {
        trailPoints.shift();
      }
      const hasTrail = trailPoints.length > 0;
      if (!needsRender && !pointerInside && !hasTrail && !automaticMotion) {
        if (tickerActive) {
          gsap.ticker.remove(render);
          tickerActive = false;
        }
        return;
      }
      context.clearRect(0, 0, size.width, size.height);
      if (helmetImage.complete && helmetImage.naturalWidth > 0) {
        context.drawImage(helmetImage, 0, 0, size.width, size.height);
        if (
          pointerInside ||
          hasTrail ||
          (automaticMotion && automaticPointer.radius > 0)
        ) {
          trailContext.clearRect(0, 0, size.width, size.height);
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
          if (automaticMotion && automaticPointer.radius > 0) {
            drawOrganicReveal(
              trailContext,
              automaticPointer.x,
              automaticPointer.y,
              automaticPointer.radius,
              automaticStretch,
              automaticAngle,
              now,
              elapsed,
              automaticSpeed,
              contourSettling,
              cursorConfig.automatic,
              automaticContourPoints,
              true
            );
          }
          if (pointerInside && manualPointer.radius > 0) {
            drawOrganicReveal(
              trailContext,
              manualPointer.x,
              manualPointer.y,
              manualPointer.radius,
              manualStretch,
              manualAngle,
              now,
              elapsed,
              manualSpeed,
              manualSettling,
              cursorConfig.manual,
              manualContourPoints
            );
          }
          context.save();
          context.globalCompositeOperation = "destination-in";
          context.drawImage(trailCanvas, 0, 0, size.width, size.height);
          context.restore();
        }
      }
      needsRender = false;
      if (
        pointerInside ||
        hasTrail ||
        automaticMotion ||
        Math.abs(automaticTarget.radius - automaticPointer.radius) > 0.01 ||
        Math.abs(manualTarget.radius - manualPointer.radius) > 0.01 ||
        now - lastPointerEventAt < 120
      ) {
        if (!tickerActive) {
          gsap.ticker.add(render);
          tickerActive = true;
        }
      } else {
        if (tickerActive) {
          gsap.ticker.remove(render);
          tickerActive = false;
        }
      }
    };
    const startRender = () => {
      if (!tickerActive) {
        gsap.ticker.add(render);
        tickerActive = true;
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = visual.getBoundingClientRect();
      manualTarget.x = ((event.clientX - bounds.left) / bounds.width) * 100;
      manualTarget.y = ((event.clientY - bounds.top) / bounds.height) * 100;
      manualTarget.radius = cursorConfig.manual.size;
      lastPointerEventAt = performance.now();
      const distance = Math.hypot(
        manualTarget.x - previousX,
        manualTarget.y - previousY
      );
      const steps = Math.max(1, Math.ceil(distance / 1.2));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        trailPoints.push({
          x: previousX + (manualTarget.x - previousX) * progress,
          y: previousY + (manualTarget.y - previousY) * progress,
          radius: manualTarget.radius,
          createdAt: performance.now(),
        });
      }
      if (trailPoints.length > 40) trailPoints.splice(0, trailPoints.length - 40);
      previousX = manualTarget.x;
      previousY = manualTarget.y;
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
      manualTarget.radius = 0;
      needsRender = true;
      startRender();
    };

    helmetImage.onload = resize;
    helmetImage.src = assetPath("images/helmt.png");
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        introVisible = entry.isIntersecting;
        if (introVisible) {
          needsRender = true;
          startRender();
        }
      },
      { threshold: 0.01 }
    );
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && introVisible) {
        needsRender = true;
        startRender();
      }
    };
    resizeObserver.observe(visual);
    visibilityObserver.observe(visual);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    visual.addEventListener("pointerenter", handlePointerEnter);
    visual.addEventListener("pointermove", handlePointerMove);
    visual.addEventListener("pointerleave", handlePointerLeave);
    resize();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      visual.removeEventListener("pointerenter", handlePointerEnter);
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", handlePointerLeave);
      if (tickerActive) gsap.ticker.remove(render);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const astronaut = astronautRef.current;
    const glow = glowRef.current;
    const introName = introNameRef.current;
    const scrollCue = scrollCueRef.current;
    if (!section || !astronaut || !glow || !introName || !scrollCue) return;
    const target = document.querySelector<HTMLElement>("[data-hero-visual]");
    const sequence = document.querySelector<HTMLElement>("[data-hero-sequence]");
    const heroSection = document.querySelector<HTMLElement>("[data-hero-section]");
    if (!target || !sequence || !heroSection) return;

    let resizeObserver: ResizeObserver | null = null;
    let refreshOnLoad: (() => void) | null = null;
    const context = gsap.context(() => {
      const isMobileLayout = () =>
        window.matchMedia("(max-width: 767px)").matches;
      const motionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      const getTransitionDistance = () =>
        Math.max(window.innerHeight, section.offsetHeight - window.innerHeight);

      if (motionQuery.matches && !isMobileLayout()) {
        gsap.set(target, { autoAlpha: 1 });
        gsap.set(scrollCue, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(window.innerHeight, section.offsetHeight - window.innerHeight)}`,
          onUpdate: (self) =>
            gsap.set(introName, {
              autoAlpha: 1 - gsap.utils.clamp(0, 1, self.progress / 0.18),
            }),
        });
        return;
      }

      let transitionDistance = 0;
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
        if (isMobileLayout()) return;

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
        const introOpacity =
          1 - gsap.utils.clamp(0, 1, progress / 0.18);
        gsap.set(introName, { autoAlpha: introOpacity });
        gsap.set(astronaut, {
          autoAlpha: isMobileLayout() ? introOpacity : 1 - handoff,
        });
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
          ref={introNameRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[clamp(0.65rem,7.2vw,7.5rem)] font-black uppercase leading-none tracking-[0.055em] text-accent/[0.24] [text-shadow:0_0_34px_rgba(200,255,0,0.22)]"
        >
          NUR KHOLIS WAKHID
        </div>
        <div
          ref={astronautRef}
          className="pointer-events-auto relative z-[60] h-[min(98vw,520px)] w-[min(98vw,520px)] will-change-transform lg:h-[min(126vw,760px)] lg:w-[min(98vw,880px)]"
        >
          <img
            src={assetPath("images/tubuh.png")}
            alt="Nur Kholis Wakhid wearing an astronaut helmet"
            className="absolute inset-0 z-[1] h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)] lg:object-fill"
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
            className="absolute inset-0 z-[2] h-full w-full object-contain opacity-0 lg:object-fill"
          />
          <canvas
            ref={introCanvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full drop-shadow-[0_0_34px_rgba(200,255,0,0.3)]"
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
            viewBox="-100 -100 200 200"
          >
            <path ref={automaticBlobPathRef} fill="black" />
          </svg>
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
