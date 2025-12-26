"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypeWriter from "@/components/ui/TypeWriter";
import { bootSequenceLines } from "@/lib/data";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Show progress bar after first line
    const progressTimer = setTimeout(() => {
      setShowProgress(true);
    }, 500);

    return () => clearTimeout(progressTimer);
  }, []);

  useEffect(() => {
    if (showProgress && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 3 + 1;
          return next > 100 ? 100 : next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showProgress, progress]);

  const handleLineComplete = () => {
    if (currentLine < bootSequenceLines.length - 1) {
      setCurrentLine((prev) => prev + 1);
    } else {
      // Final line complete
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 400);
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Terminal container */}
          <div className="relative w-full max-w-2xl mx-4">
            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-lg overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-zinc-500 font-mono">
                  hybrid-agent-system
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-6 min-h-[300px]">
                {bootSequenceLines.slice(0, currentLine + 1).map((line, index) => (
                  <div key={index} className="mb-2">
                    {index === currentLine ? (
                      <TypeWriter
                        text={line.text}
                        delay={0}
                        speed={15}
                        dots={line.dots}
                        status={line.status}
                        highlight={line.highlight}
                        onComplete={handleLineComplete}
                        className="text-sm sm:text-base"
                      />
                    ) : (
                      <div className="font-mono text-sm sm:text-base">
                        <span className={line.highlight ? "text-green-400 glow-text-green" : ""}>
                          {line.text}
                        </span>
                        {line.dots && (
                          <>
                            <span className="text-zinc-500">
                              {"".padEnd(15, ".")}
                            </span>
                            <span className="text-green-400 ml-2">[{line.status}]</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Cursor line */}
                {currentLine >= bootSequenceLines.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 font-mono text-sm"
                  >
                    <span className="text-blue-400">$</span>
                    <span className="cursor-blink text-white ml-2">_</span>
                  </motion.div>
                )}
              </div>

              {/* Progress bar */}
              {showProgress && (
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span>System initialization</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Glow effect under terminal */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-500/20 blur-3xl rounded-full" />
          </div>

          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
