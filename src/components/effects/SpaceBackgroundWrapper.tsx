"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SpaceBackgroundFallback from "@/components/effects/SpaceBackgroundFallback";

const SpaceBackground = dynamic(
  () => import("@/components/effects/SpaceBackground"),
  { ssr: false }
);

export default function SpaceBackgroundWrapper() {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isLowPowerDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.hardwareConcurrency <= 4;
      let hasWebGL = false;

      if (!prefersReducedMotion && !isLowPowerDevice) {
        try {
          const canvas = document.createElement("canvas");
          hasWebGL = Boolean(
            canvas.getContext("webgl") || canvas.getContext("webgl2")
          );
        } catch {
          hasWebGL = false;
        }
      }

      setUseWebGL(hasWebGL);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return useWebGL ? <SpaceBackground /> : <SpaceBackgroundFallback />;
}
