"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type BackgroundType = "particles" | "grid" | "mesh" | "aurora" | "circuit" | "starfield";

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (bg: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const STORAGE_KEY = "cv-background-preference";

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [background, setBackgroundState] = useState<BackgroundType>("particles");
  const [mounted, setMounted] = useState(false);

  // Load preference from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as BackgroundType | null;
    if (saved && ["particles", "grid", "mesh", "aurora", "circuit", "starfield"].includes(saved)) {
      setBackgroundState(saved);
    }
  }, []);

  const setBackground = (bg: BackgroundType) => {
    setBackgroundState(bg);
    localStorage.setItem(STORAGE_KEY, bg);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}
