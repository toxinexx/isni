"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Database,
  Brain,
  Bot,
  Workflow,
  Server,
  Plug,
  Search,
  FileText,
  X,
  LucideIcon,
} from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import { skills } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Database,
  Brain,
  Bot,
  Workflow,
  Server,
  Plug,
  Search,
  FileText,
};

interface Skill {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  status: string;
  category: string;
}

export default function SkillModules() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
            SYSTEM MODULES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Active Skill Modules
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Core capabilities powering hybrid AI-human workflows. Each module represents
            deep expertise in automation, data engineering, and AI systems.
          </p>
        </motion.div>
      </div>

      {/* Skills grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {skills.map((skill) => {
          const Icon = iconMap[skill.icon];
          const isHovered = hoveredSkill === skill.id;

          return (
            <motion.div key={skill.id} variants={staggerItem}>
              <GlowCard
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                isActive={isHovered}
                className="p-5 h-full"
              >
                {/* Icon and status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-blue-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-[10px] font-mono text-green-400 uppercase">
                      Active
                    </span>
                  </div>
                </div>

                {/* Skill name */}
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
                  {skill.shortName}
                </h3>

                {/* Description preview */}
                <p className="text-sm text-zinc-500 line-clamp-2">
                  {skill.description}
                </p>

                {/* Category tag */}
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase">
                    {skill.category}
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Skill detail modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md glass rounded-2xl p-6"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>

              {/* Modal content */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  {(() => {
                    const Icon = iconMap[selectedSkill.icon];
                    return <Icon className="w-8 h-8 text-blue-400" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedSkill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-mono text-green-400">
                      STATUS: ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-zinc-300 mb-6">{selectedSkill.description}</p>

              {/* Module stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-800/30 rounded-lg">
                <div>
                  <span className="text-xs font-mono text-zinc-500">CATEGORY</span>
                  <p className="text-sm text-white capitalize mt-1">
                    {selectedSkill.category}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-500">UPTIME</span>
                  <p className="text-sm text-green-400 mt-1">99.9%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
