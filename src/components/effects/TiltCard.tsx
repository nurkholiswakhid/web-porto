"use client";

import { useState, useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { soundFx } from "@/lib/audio";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  dataCursor?: string;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  dataCursor = "INSPECT",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    setTilt({
      x: -normY * maxTilt,
      y: normX * maxTilt,
    });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      className={cn(
        "relative rounded-2xl transition-transform duration-200 ease-out",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
    >
      {/* 3D Child Content */}
      <div className="w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Dynamic Specular Glare Reflection */}
      {glare && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.35) 0%, rgba(139, 92, 246, 0.15) 30%, transparent 70%)`,
            mixBlendMode: "screen",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
