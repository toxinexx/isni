"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe2 } from "lucide-react";
import { languages } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const levelColors: Record<string, string> = {
  Native: "from-green-500 to-emerald-500",
  Fluent: "from-blue-500 to-cyan-500",
  Intermediate: "from-purple-500 to-violet-500",
  Basic: "from-orange-500 to-amber-500",
};

const levelGlows: Record<string, string> = {
  Native: "shadow-green-500/30",
  Fluent: "shadow-blue-500/30",
  Intermediate: "shadow-purple-500/30",
  Basic: "shadow-orange-500/30",
};

function LanguageBar({
  name,
  level,
  percentage,
  index,
}: {
  name: string;
  level: string;
  percentage: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-white">{name}</span>
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400`}
          >
            {level}
          </span>
        </div>
        <span className="text-sm text-zinc-500 font-mono">{percentage}%</span>
      </div>

      {/* Progress bar container */}
      <div className="relative h-3 bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/30">
        {/* Animated progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${levelColors[level]} shadow-lg ${levelGlows[level]}`}
        >
          {/* Shine effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : {}}
            transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
        </motion.div>

        {/* Grid lines */}
        <div className="absolute inset-0 flex">
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="h-full border-l border-zinc-700/30"
              style={{ marginLeft: `${mark}%` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Languages() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Section header */}
      <div className="max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            <Globe2 className="w-3 h-3" />
            COMMUNICATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Language Proficiency
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Multilingual capabilities enabling seamless collaboration across
            European and international teams.
          </p>
        </motion.div>
      </div>

      {/* Languages list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {languages.map((lang, index) => (
          <LanguageBar
            key={lang.name}
            name={lang.name}
            level={lang.level}
            percentage={lang.percentage}
            index={index}
          />
        ))}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl mx-auto mt-12"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(levelColors).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}
              />
              <span className="text-xs text-zinc-500">{level}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
    </section>
  );
}
