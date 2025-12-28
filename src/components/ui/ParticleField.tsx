"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Detect mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function Particles({ count, mouse, isMobile }: { count: number; mouse: React.RefObject<{ x: number; y: number }>; isMobile: boolean }) {
  const mesh = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));
  const frameSkip = useRef(0);

  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color("#3b82f6"); // blue
    const color2 = new THREE.Color("#8b5cf6"); // purple
    const color3 = new THREE.Color("#06b6d4"); // cyan

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 10;
      pos[i3 + 1] = (Math.random() - 0.5) * 10;
      pos[i3 + 2] = (Math.random() - 0.5) * 10;

      // Store original positions
      original[i3] = pos[i3];
      original[i3 + 1] = pos[i3 + 1];
      original[i3 + 2] = pos[i3 + 2];

      const mixedColor = color1.clone();
      const rand = Math.random();
      if (rand > 0.66) {
        mixedColor.lerp(color2, Math.random());
      } else if (rand > 0.33) {
        mixedColor.lerp(color3, Math.random());
      }
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return [pos, original, col];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Skip frames on mobile for better performance
    if (isMobile) {
      frameSkip.current++;
      if (frameSkip.current % 2 !== 0) return; // Run at 30fps on mobile
    }

    const time = state.clock.getElapsedTime();

    // Rotate particles slowly
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.03;

    // Skip per-particle updates on mobile - just rotate
    if (isMobile) {
      return;
    }

    // Get position attribute
    const posAttr = mesh.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;
    const vel = velocities.current;

    // Convert mouse position to 3D space
    const mouseX = mouse.current ? mouse.current.x * 5 : 0;
    const mouseY = mouse.current ? mouse.current.y * 5 : 0;
    const pushRadius = 0.4; // Very tight radius of mouse influence
    const pushStrength = 0.25; // How strongly particles are pushed

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Calculate distance from mouse in 2D (x, y plane)
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Push particles away from mouse
      if (dist < pushRadius && dist > 0.01) {
        const force = (1 - dist / pushRadius) * pushStrength;
        vel[i3] += (dx / dist) * force;
        vel[i3 + 1] += (dy / dist) * force;
      }

      // Apply velocity
      posArray[i3] += vel[i3];
      posArray[i3 + 1] += vel[i3 + 1];
      posArray[i3 + 2] += vel[i3 + 2];

      // Spring back to original position
      const springStrength = 0.02;
      posArray[i3] += (originalPositions[i3] - posArray[i3]) * springStrength;
      posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * springStrength;
      posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * springStrength;

      // Dampen velocity
      vel[i3] *= 0.92;
      vel[i3 + 1] *= 0.92;
      vel[i3 + 2] *= 0.92;

      // Add gentle floating animation
      posArray[i3 + 1] += Math.sin(time + i * 0.1) * 0.001;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <>
      <pointLight color="#3b82f6" intensity={2} distance={50} />
      <points ref={mesh} geometry={geometry}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

function Scene({ mouse, isMobile }: { mouse: React.RefObject<{ x: number; y: number }>; isMobile: boolean }) {
  const { camera } = useThree();

  useFrame(() => {
    // Skip camera movement on mobile
    if (isMobile) return;

    if (mouse.current) {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouse.current.x * 0.5,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        mouse.current.y * 0.5,
        0.05
      );
    }
  });

  // Use fewer particles on mobile (150 vs 500)
  const particleCount = isMobile ? 150 : 500;

  return <Particles count={particleCount} mouse={mouse} isMobile={isMobile} />;
}

export default function ParticleField() {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={isMobile ? 1 : [1, 2]} // Lower pixel ratio on mobile
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Scene mouse={mouse} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
