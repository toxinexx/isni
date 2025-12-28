"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/boot/BootSequence";
import IdentityCore from "@/components/identity/IdentityCore";
import SkillModules from "@/components/skills/SkillModules";
import ExperiencePipeline from "@/components/experience/ExperiencePipeline";
import Testimonials from "@/components/testimonials/Testimonials";
import LiveMetrics from "@/components/metrics/LiveMetrics";
import Languages from "@/components/languages/Languages";
import CallToAction from "@/components/cta/CallToAction";
import FloatingNav from "@/components/layout/FloatingNav";

// Dynamically import ParticleField to avoid SSR issues
const ParticleField = dynamic(
  () => import("@/components/ui/ParticleField"),
  { ssr: false }
);

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

      {/* Particle background - only show after boot */}
      {showContent && <ParticleField />}

      {/* Floating Navigation */}
      {showContent && <FloatingNav />}

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
  return <HomeContent />;
}
