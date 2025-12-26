"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  layer: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
}

export default function Starfield() {
  const [scrollY, setScrollY] = useState(0);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // Generate stars for 3 layers
  const stars = useMemo(() => {
    const allStars: Star[] = [];
    let id = 0;

    // Layer 1 - Far stars (small, slow)
    for (let i = 0; i < 150; i++) {
      allStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1,
        opacity: 0.3 + Math.random() * 0.3,
        layer: 1,
        twinkleSpeed: 3 + Math.random() * 4,
      });
    }

    // Layer 2 - Mid stars (medium)
    for (let i = 0; i < 80; i++) {
      allStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5,
        opacity: 0.4 + Math.random() * 0.4,
        layer: 2,
        twinkleSpeed: 2 + Math.random() * 3,
      });
    }

    // Layer 3 - Close stars (large, fast)
    for (let i = 0; i < 40; i++) {
      allStars.push({
        id: id++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2,
        opacity: 0.5 + Math.random() * 0.5,
        layer: 3,
        twinkleSpeed: 1.5 + Math.random() * 2,
      });
    }

    return allStars;
  }, []);

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spawn shooting stars periodically
  useEffect(() => {
    let shootingStarId = 0;

    const spawnShootingStar = () => {
      const newStar: ShootingStar = {
        id: shootingStarId++,
        startX: Math.random() * 80 + 10, // Keep away from edges
        startY: Math.random() * 30, // Start near top
        angle: 30 + Math.random() * 30, // 30-60 degrees
        length: 100 + Math.random() * 150,
      };

      setShootingStars((prev) => [...prev, newStar]);

      // Remove after animation
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 1500);
    };

    // Random interval for shooting stars (every 3-8 seconds)
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 5000;
      setTimeout(() => {
        spawnShootingStar();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }, []);

  const getParallaxOffset = (layer: number) => {
    const speeds = { 1: 0.02, 2: 0.05, 3: 0.1 };
    return scrollY * (speeds[layer as keyof typeof speeds] || 0);
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#0a0a12] to-[#0f0f1a]">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor:
              star.layer === 3
                ? "rgba(59, 130, 246, 0.9)"
                : star.layer === 2
                  ? "rgba(139, 92, 246, 0.8)"
                  : "rgba(255, 255, 255, 0.7)",
            boxShadow:
              star.layer === 3
                ? "0 0 4px rgba(59, 130, 246, 0.5)"
                : star.layer === 2
                  ? "0 0 3px rgba(139, 92, 246, 0.4)"
                  : "none",
            transform: `translateY(${getParallaxOffset(star.layer)}px)`,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
          }}
          transition={{
            duration: star.twinkleSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute h-[2px] origin-left"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: star.length,
              transform: `rotate(${star.angle}deg)`,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, rgba(59, 130, 246, 1) 100%)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scaleX: [0, 1, 1, 1],
              x: [0, star.length * 2],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Nebula glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          left: "60%",
          top: "30%",
          transform: `translateY(${getParallaxOffset(1)}px)`,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
          left: "20%",
          top: "60%",
          transform: `translateY(${getParallaxOffset(2)}px)`,
        }}
      />
    </div>
  );
}
