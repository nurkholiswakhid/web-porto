"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededValue(index: number, salt: number): number {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

/** Procedural starfield particles with parallax depth */
function Stars({ count = 1200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, sizes, phases, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const phase = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const velocity = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = seededValue(i, 1) * 100 - 50;
      const y = seededValue(i, 2) * 64 - 32;
      const z = seededValue(i, 3) * 44 - 30;
      pos[i * 3] = x;
      // Independent jitter prevents visible horizontal or vertical rows.
      pos[i * 3 + 1] = y + Math.sin(x * 0.37 + i * 1.91) * 1.5;
      pos[i * 3 + 2] = z;
      sz[i] = seededValue(i, 4) * 1.4 + 0.35;
      phase[i] = seededValue(i, 5) * Math.PI * 2;
      velocity[i * 3] = (seededValue(i, 6) - 0.5) * 0.18;
      velocity[i * 3 + 1] = seededValue(i, 7) * 0.24 + 0.08;
      velocity[i * 3 + 2] = (seededValue(i, 8) - 0.5) * 0.04;

      const tint = seededValue(i, 9);
      color[i * 3] = tint > 0.86 ? 0.78 : 0.91;
      color[i * 3 + 1] = tint > 0.86 ? 1 : 0.95;
      color[i * 3 + 2] = tint > 0.86 ? 0 : 0.88;
    }
    return [pos, sz, phase, color, velocity];
  }, [count]);
  const positionsRef = useRef(positions);
  const velocitiesRef = useRef(velocities);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }

    // Move and wrap each particle so the field stays full forever.
    const currentPositions = positionsRef.current;
    const currentVelocities = velocitiesRef.current;
    for (let i = 0; i < count; i++) {
      const index = i * 3;
      currentPositions[index] += currentVelocities[index] * delta;
      currentPositions[index + 1] += currentVelocities[index + 1] * delta;
      currentPositions[index + 2] += currentVelocities[index + 2] * delta;

      if (currentPositions[index] > 50) currentPositions[index] = -50;
      if (currentPositions[index] < -50) currentPositions[index] = 50;
      if (currentPositions[index + 1] > 32) currentPositions[index + 1] = -32;
      if (currentPositions[index + 1] < -32) currentPositions[index + 1] = 32;
      if (currentPositions[index + 2] > 14) currentPositions[index + 2] = -30;
      if (currentPositions[index + 2] < -30) currentPositions[index + 2] = 14;
    }

    const positionAttribute = meshRef.current.geometry.attributes.position;
    positionAttribute.needsUpdate = true;

    // Mouse parallax
    meshRef.current.position.x +=
      (mouseRef.current.x * -0.5 - meshRef.current.position.x) * delta * 1.5;
    meshRef.current.position.y +=
      (mouseRef.current.y * 0.35 - meshRef.current.position.y) * delta * 1.5;
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
        <bufferAttribute
          attach="attributes-phase"
          args={[phases, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: 0.62 },
        }}
        vertexShader={`
          attribute float size;
          attribute float phase;
          attribute vec3 color;
          varying float vPhase;
          varying vec3 vColor;
          void main() {
            vPhase = phase;
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = clamp(size * (240.0 / -mvPosition.z), 1.0, 7.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uOpacity;
          varying float vPhase;
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float twinkle = 0.72 + 0.28 * sin(uTime * 1.8 + vPhase);
            float glow = smoothstep(0.5, 0.0, dist);
            float alpha = glow * uOpacity * twinkle;
            vec3 col = vColor;
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
      <Stars count={650} />
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
