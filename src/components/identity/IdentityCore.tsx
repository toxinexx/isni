"use client";

import { motion } from "framer-motion";
import { MapPin, Linkedin } from "lucide-react";
import Image from "next/image";
import GlitchText from "@/components/ui/GlitchText";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer, floatAnimation, scaleIn } from "@/lib/animations";

const roleLabels = [
  "AI Automation",
  "Data Engineering",
  "LLM Integration",
  "Workflow Orchestration",
  "Vibe Code",
];

export default function IdentityCore() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Portrait with animated ring */}
        <motion.div
          variants={scaleIn}
          className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-6"
        >
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 rounded-full gradient-conic animate-spin-slow" />

          {/* Inner dark ring (gap between gradient and image) */}
          <div className="absolute inset-[3px] rounded-full bg-[#0a0a0f]" />

          {/* Portrait image */}
          <div className="absolute inset-[6px] rounded-full overflow-hidden">
            <Image
              src="/portrait.jpg"
              alt="Isni Skara"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              priority
            />
          </div>

          {/* Glow effect behind */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl -z-10" />

          {/* Subtle pulse glow */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>

        {/* Status indicator */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-sm text-zinc-400 font-mono">System Online</span>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-tight text-white"
        >
          <GlitchText
            text={personalInfo.name}
            className="text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          />
        </motion.h1>

        {/* Title with scan line effect */}
        <motion.div variants={fadeInUp} className="relative mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300">
            {personalInfo.title}
          </h2>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Floating role labels */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {roleLabels.map((label, index) => (
            <motion.span
              key={label}
              initial="initial"
              animate="animate"
              variants={floatAnimation}
              custom={index}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-1.5 rounded-full text-sm font-mono bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl text-zinc-400 mb-8 font-light italic"
        >
          &ldquo;{personalInfo.tagline}&rdquo;
        </motion.p>

        {/* Location and links */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2 text-zinc-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{personalInfo.location}</span>
          </div>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs font-mono">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-zinc-800/50 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-zinc-800/50 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-zinc-800/50 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-zinc-800/50 rounded-br-lg" />
    </section>
  );
}
