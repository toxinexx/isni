"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  dots?: boolean;
  status?: string;
  highlight?: boolean;
}

export default function TypeWriter({
  text,
  delay = 0,
  speed = 30,
  onComplete,
  className = "",
  showCursor = true,
  dots = false,
  status,
  highlight = false,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || hasCompleted.current) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (dots && dotCount < 15) {
      setShowDots(true);
      const dotInterval = setInterval(() => {
        setDotCount((prev) => {
          if (prev >= 14) {
            clearInterval(dotInterval);
            setShowStatus(true);
            if (!hasCompleted.current) {
              hasCompleted.current = true;
              setTimeout(() => onComplete?.(), 100);
            }
            return 15;
          }
          return prev + 1;
        });
      }, 25);
      return () => clearInterval(dotInterval);
    } else if (!dots && displayText.length === text.length) {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        onComplete?.();
      }
    }
  }, [isTyping, displayText, text, speed, dots, dotCount, onComplete]);

  const dotsString = ".".repeat(Math.min(dotCount, 15));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono ${className}`}
    >
      <span className={highlight ? "text-green-400 glow-text-green" : ""}>
        {displayText}
      </span>
      {showDots && (
        <span className="text-zinc-500">{dotsString}</span>
      )}
      {showStatus && status && (
        <span className="text-green-400 ml-2">[{status}]</span>
      )}
      {showCursor && isTyping && displayText.length < text.length && (
        <span className="cursor-blink text-blue-400">|</span>
      )}
    </motion.div>
  );
}
