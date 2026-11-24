"use client";

import { useEffect, useState } from "react";
import { assetPath } from "@/lib/utils";

const CRITICAL_ASSETS = [
  "images/tubuh.webp",
  "images/helmt.webp",
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

    const minimumDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, 250)
    );
    const safetyTimeout = new Promise<void>((resolve) =>
      window.setTimeout(resolve, 12000)
    );

    const urls = CRITICAL_ASSETS.map(assetPath);

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
          <div className="asset-loader__content">
            <div className="asset-loader__identity">
              <div className="asset-loader__mark" aria-hidden="true">
                N<span />
              </div>
              <p className="asset-loader__name">
                Nur Kholis <span>Wakhid</span>
              </p>
            </div>
            <div
              className="asset-loader__track"
              role="progressbar"
              aria-label="Loading portfolio assets"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="asset-loader__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="asset-loader__meta">
              <span>Preparing your view</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
