"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Sparkles, Grid3X3, Waves, Zap, Stars, Box } from "lucide-react";
import { useBackground, BackgroundType } from "@/context/BackgroundContext";

const backgrounds: { type: BackgroundType; label: string; icon: React.ReactNode }[] = [
  { type: "particles", label: "Particles", icon: <Sparkles className="w-4 h-4" /> },
  { type: "grid", label: "Grid", icon: <Grid3X3 className="w-4 h-4" /> },
  { type: "mesh", label: "Mesh", icon: <Box className="w-4 h-4" /> },
  { type: "aurora", label: "Aurora", icon: <Waves className="w-4 h-4" /> },
  { type: "circuit", label: "Circuit", icon: <Zap className="w-4 h-4" /> },
  { type: "starfield", label: "Stars", icon: <Stars className="w-4 h-4" /> },
];

export default function BackgroundSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { background, setBackground } = useBackground();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 glass rounded-xl p-3 mb-2"
            style={{ minWidth: "200px" }}
          >
            <div className="text-xs text-zinc-400 mb-2 font-mono px-1">
              BACKGROUND_MODE
            </div>
            <div className="flex flex-col gap-1">
              {backgrounds.map((bg) => (
                <button
                  key={bg.type}
                  onClick={() => {
                    setBackground(bg.type);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    background === bg.type
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  }`}
                >
                  {bg.icon}
                  <span className="text-sm">{bg.label}</span>
                  {background === bg.type && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-blue-400"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-blue-500/20 border-blue-500/30"
            : "hover:bg-zinc-800/50"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-zinc-300" />
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Palette className="w-5 h-5 text-zinc-300" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect when open */}
        {isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </div>
  );
}
