"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededValue(index: number): number {
  return Math.sin(index * 12.9898) * 0.5 + 0.5;
}

/** Procedural starfield particles with parallax depth */
function Stars({ count = 1200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededValue(i * 4) - 0.5) * 80;
      pos[i * 3 + 1] = (seededValue(i * 4 + 1) - 0.5) * 50;
      pos[i * 3 + 2] = (seededValue(i * 4 + 2) - 0.5) * 40 - 8;
      sz[i] = seededValue(i * 4 + 3) * 0.8 + 0.15;
    }
    return [pos, sz];
  }, [count]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Subtle drift
    meshRef.current.rotation.y += delta * 0.008;
    meshRef.current.rotation.x += delta * 0.003;
    // Mouse parallax
    meshRef.current.position.x +=
      (mouseRef.current.x * -0.3 - meshRef.current.position.x) * delta * 1.5;
    meshRef.current.position.y +=
      (mouseRef.current.y * 0.2 - meshRef.current.position.y) * delta * 1.5;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uColor: { value: new THREE.Color("#e8e4df") },
          uOpacity: { value: 0.5 },
        }}
        vertexShader={`
          attribute float size;
          varying float vSize;
          void main() {
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (200.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vSize;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, dist) * uOpacity;
            // Larger stars get a subtle warm tint
            vec3 col = mix(uColor, vec3(0.78, 1.0, 0.0), step(1.2, vSize) * 0.15);
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </points>
  );
}

/** Ensure the renderer is truly transparent */
function TransparentScene() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);
  return null;
}

function SceneContent() {
  return (
    <>
      <TransparentScene />
      <Stars count={800} />
      {/* Dim ambient */}
      <ambientLight intensity={0.02} />
    </>
  );
}

/** WebGL availability check */
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("webgl2")
    );
  } catch {
    return false;
  }
}

/** CSS-only fallback starfield for no-WebGL environments */
function FallbackStarfield() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0a] via-[#141614] to-[#141614]" />
      {/* Fake stars via radial gradients */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.5px 1.5px at 30% 65%, #C8FF00 40%, transparent 100%), " +
            "radial-gradient(1px 1px at 50% 10%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 70% 40%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.2px 1.2px at 85% 75%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 15% 80%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 90% 15%, #e8e4df 50%, transparent 100%), " +
            "radial-gradient(1.5px 1.5px at 45% 50%, #C8FF00 30%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function SpaceBackground() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasWebGL(isWebGLAvailable());
      setReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!hasWebGL || reducedMotion) {
    return <FallbackStarfield />;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <SceneContent />
        </Canvas>
      </div>

      {/* Film grain texture overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </>
  );
}
