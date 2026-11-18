"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { assetPath } from "@/lib/utils";

const CRITICAL_ASSETS = [
  "images/avatar_headshot.png",
  "images/tubuh.png",
  "images/helmt.png",
  "images/profile.png",
  "images/profile_torso.png",
  ...projects.map((project) => project.thumbnail),
];

export default function AssetLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(8);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");
    document.body.classList.add("is-loading");

    let disposed = false;
    let finished = false;

    const minimumDelay = new Promise((resolve) =>
      window.setTimeout(resolve, 650)
    );
    const safetyTimeout = new Promise((resolve) =>
      window.setTimeout(resolve, 12000)
    );

    const fontsReady =
      document.fonts?.ready ??
      Promise.resolve();
    const windowReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true })
          );

    const urls = Array.from(
      new Set([
        ...CRITICAL_ASSETS.map(assetPath),
        ...Array.from(document.images)
          .filter((image) => image.loading !== "lazy")
          .map((image) => image.currentSrc || image.src)
          .filter(Boolean),
      ])
    );

    let loaded = 0;
    const updateProgress = () => {
      loaded += 1;
      if (!disposed) {
        setProgress(
          Math.min(
            96,
            Math.round(12 + (loaded / Math.max(urls.length, 1)) * 84)
          )
        );
      }
    };

    const imagePromises = urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          let settled = false;
          const settle = () => {
            if (settled) return;
            settled = true;
            updateProgress();
            resolve();
          };

          image.onload = settle;
          image.onerror = settle;
          image.src = url;
        })
    );

    Promise.race([
      Promise.all([
        fontsReady,
        windowReady,
        Promise.all(imagePromises),
        minimumDelay,
      ]),
      Promise.all([safetyTimeout, minimumDelay]),
    ]).then(() => {
      if (disposed || finished) return;
      finished = true;
      setProgress(100);
      setExiting(true);

      window.setTimeout(() => {
        if (disposed) return;
        setReady(true);
        document.documentElement.classList.remove("is-loading");
        document.body.classList.remove("is-loading");
      }, 550);
    });

    return () => {
      disposed = true;
      document.documentElement.classList.remove("is-loading");
      document.body.classList.remove("is-loading");
    };
  }, []);

  return (
    <>
      {children}
      {!ready && (
        <div
          className={`asset-loader ${exiting ? "asset-loader--exiting" : ""}`}
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio, ${progress} percent`}
        >
          <div className="asset-loader__grid" aria-hidden="true" />
          <div className="asset-loader__content">
            <div className="asset-loader__mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="asset-loader__name">Nur Kholis Wakhid</p>
            <div className="asset-loader__track">
              <div
                className="asset-loader__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="asset-loader__meta">
              <span>Loading assets</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
