"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "orange";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}

const glowColors = {
  blue: {
    border: "hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/20",
    bg: "group-hover:bg-blue-500/5",
  },
  purple: {
    border: "hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/20",
    bg: "group-hover:bg-purple-500/5",
  },
  green: {
    border: "hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/20",
    bg: "group-hover:bg-green-500/5",
  },
  orange: {
    border: "hover:border-orange-500/50",
    glow: "group-hover:shadow-orange-500/20",
    bg: "group-hover:bg-orange-500/5",
  },
};

export default function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: GlowCardProps) {
  const colors = glowColors[glowColor];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        group relative rounded-xl overflow-hidden cursor-pointer
        bg-zinc-900/50 backdrop-blur-sm
        border border-zinc-800/50
        ${colors.border}
        transition-all duration-300
        shadow-lg shadow-black/20
        ${isActive ? "border-green-500/50 shadow-green-500/20" : ""}
        ${className}
      `}
    >
      {/* Gradient border on hover */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${colors.bg}
        `}
      />

      {/* Top glow line */}
      <div
        className={`
          absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-blue-500/50 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-zinc-700/50 group-hover:border-blue-500/50 transition-colors rounded-tl" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-zinc-700/50 group-hover:border-blue-500/50 transition-colors rounded-tr" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-zinc-700/50 group-hover:border-blue-500/50 transition-colors rounded-bl" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-zinc-700/50 group-hover:border-blue-500/50 transition-colors rounded-br" />
    </motion.div>
  );
}
