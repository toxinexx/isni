"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({
  text,
  className = "",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? { x: [-2, 2, -2, 0] } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-cyan-400 opacity-70"
            style={{
              clipPath: "inset(10% 0 60% 0)",
              transform: "translate(-2px, 0)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-red-400 opacity-70"
            style={{
              clipPath: "inset(60% 0 10% 0)",
              transform: "translate(2px, 0)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </motion.span>
  );
}
