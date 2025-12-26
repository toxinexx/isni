"use client";

import { motion } from "framer-motion";

export default function AuroraWaves() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Aurora blob 1 - Blue */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          left: "-10%",
          top: "-20%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 2 - Purple */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          right: "-5%",
          top: "20%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 3 - Cyan */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
          left: "30%",
          bottom: "-10%",
        }}
        animate={{
          x: [0, -60, 80, 0],
          y: [0, -100, -50, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 4 - Mixed gradient */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)",
          filter: "blur(60px)",
          right: "20%",
          bottom: "20%",
        }}
        animate={{
          x: [0, 70, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 5 - Top accent */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 70%)",
          filter: "blur(70px)",
          left: "50%",
          top: "5%",
        }}
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
