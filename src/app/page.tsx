"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundProvider, useBackground, BackgroundType } from "@/context/BackgroundContext";
import BootSequence from "@/components/boot/BootSequence";
import IdentityCore from "@/components/identity/IdentityCore";
import SkillModules from "@/components/skills/SkillModules";
import ExperiencePipeline from "@/components/experience/ExperiencePipeline";
import Testimonials from "@/components/testimonials/Testimonials";
import LiveMetrics from "@/components/metrics/LiveMetrics";
import Languages from "@/components/languages/Languages";
import CallToAction from "@/components/cta/CallToAction";
import FloatingNav from "@/components/layout/FloatingNav";
import BackgroundSwitcher from "@/components/ui/BackgroundSwitcher";

// Dynamically import all backgrounds to avoid SSR issues
const ParticleField = dynamic(
  () => import("@/components/ui/ParticleField"),
  { ssr: false }
);
const GridMatrix = dynamic(
  () => import("@/components/ui/backgrounds/GridMatrix"),
  { ssr: false }
);
const GeometricMesh = dynamic(
  () => import("@/components/ui/backgrounds/GeometricMesh"),
  { ssr: false }
);
const AuroraWaves = dynamic(
  () => import("@/components/ui/backgrounds/AuroraWaves"),
  { ssr: false }
);
const CircuitBoard = dynamic(
  () => import("@/components/ui/backgrounds/CircuitBoard"),
  { ssr: false }
);
const Starfield = dynamic(
  () => import("@/components/ui/backgrounds/Starfield"),
  { ssr: false }
);

// Background renderer component
function BackgroundRenderer() {
  const { background } = useBackground();

  const backgrounds: Record<BackgroundType, React.ReactNode> = {
    particles: <ParticleField />,
    grid: <GridMatrix />,
    mesh: <GeometricMesh />,
    aurora: <AuroraWaves />,
    circuit: <CircuitBoard />,
    starfield: <Starfield />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {backgrounds[background]}
      </motion.div>
    </AnimatePresence>
  );
}

function HomeContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Skip boot sequence in development for faster iteration
  useEffect(() => {
    const skipBoot = process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      window.location.hash === "#skip";

    if (skipBoot) {
      setBootComplete(true);
      setShowContent(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative min-h-screen">
      {/* Boot sequence overlay */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Dynamic background - only show after boot */}
      {showContent && <BackgroundRenderer />}

      {/* Floating Navigation */}
      {showContent && <FloatingNav />}

      {/* Background Switcher */}
      {showContent && <BackgroundSwitcher />}

      {/* Main content */}
      {showContent && (
        <div className="relative z-10">
          {/* Hero / Identity section */}
          <section id="identity">
            <IdentityCore />
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Skills section */}
          <section id="skills">
            <SkillModules />
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Experience Pipeline */}
          <section id="experience">
            <ExperiencePipeline />
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Testimonials */}
          <section id="reviews">
            <Testimonials />
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Live Metrics */}
          <section id="metrics">
            <LiveMetrics />
          </section>

          {/* Divider */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          </div>

          {/* Languages */}
          <section id="languages">
            <Languages />
          </section>

          {/* CTA */}
          <section id="contact">
            <CallToAction />
          </section>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <BackgroundProvider>
      <HomeContent />
    </BackgroundProvider>
  );
}
