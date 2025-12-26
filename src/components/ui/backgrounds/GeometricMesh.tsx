"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveMesh({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const { positionArray, originalPositions } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(120, 120, 100, 100);
    const positions = geometry.attributes.position.array as Float32Array;
    const original = new Float32Array(positions.length);
    original.set(positions);
    return { positionArray: positions, originalPositions: original };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !geometryRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = geometryRef.current.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];

      // Wave displacement
      const waveX = Math.sin(x * 0.5 + time * 0.5) * 0.3;
      const waveY = Math.sin(y * 0.5 + time * 0.7) * 0.3;
      const wave = waveX + waveY;

      // Mouse influence
      let mouseInfluence = 0;
      if (mouse.current) {
        const dx = x - mouse.current.x * 45;
        const dy = y - mouse.current.y * 45;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouseInfluence = Math.max(0, 1 - dist / 10) * Math.sin(time * 3) * 0.5;
      }

      positions[i + 2] = wave + mouseInfluence;
    }

    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.computeVertexNormals();

    // Slow rotation
    meshRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(time * 0.1) * 0.05;
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, -5, 0]}>
      <planeGeometry ref={geometryRef} args={[120, 120, 100, 100]} />
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8b5cf6" />
      <WaveMesh mouse={mouse} />
    </>
  );
}

export default function GeometricMesh() {
  const mouse = useRef({ x: 0, y: 0 });

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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 15, 20], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
