"use client";

import dynamic from "next/dynamic";

const SpaceBackground = dynamic(
  () => import("@/components/effects/SpaceBackground"),
  { ssr: false }
);

export default function SpaceBackgroundWrapper() {
  return <SpaceBackground />;
}
