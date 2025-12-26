"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, MapPin, ChevronDown, Zap } from "lucide-react";
import { experience } from "@/lib/data";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ExperiencePipeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
            DATA PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Experience Flow
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Career trajectory visualized as a data pipeline. Each role represents
            a processing stage in the evolution of AI automation expertise.
          </p>
        </motion.div>
      </div>

      {/* Pipeline visualization */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto relative"
      >
        {/* Central pipeline line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"
          />
          {/* Animated particles flowing down */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"
                style={{ left: "-3px" }}
                initial={{ top: "-10px", opacity: 0 }}
                animate={{
                  top: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* Experience nodes */}
        {experience.map((role, index) => (
          <motion.div
            key={role.id}
            variants={staggerItem}
            className={`relative mb-12 ${
              index % 2 === 0
                ? "sm:pr-1/2 sm:text-right"
                : "sm:pl-1/2 sm:ml-auto"
            }`}
          >
            {/* Node connector */}
            <div
              className={`absolute top-6 w-8 sm:w-12 h-px bg-gradient-to-r ${
                index % 2 === 0
                  ? "right-full sm:right-auto sm:left-[calc(50%-48px)] from-transparent to-blue-500"
                  : "left-8 sm:left-auto sm:right-[calc(50%-48px)] from-blue-500 to-transparent"
              }`}
            />

            {/* Node dot */}
            <motion.div
              className={`absolute top-4 left-6 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full ${
                role.isActive
                  ? "bg-green-500 shadow-lg shadow-green-500/50"
                  : "bg-blue-500 shadow-lg shadow-blue-500/50"
              } border-2 border-zinc-900 z-10`}
              whileHover={{ scale: 1.3 }}
            >
              {role.isActive && (
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
              )}
            </motion.div>

            {/* Card */}
            <motion.div
              layout
              onClick={() =>
                setExpandedId(expandedId === role.id ? null : role.id)
              }
              className={`relative ml-16 sm:ml-0 ${
                index % 2 === 0 ? "sm:mr-[calc(50%+24px)]" : "sm:ml-[calc(50%+24px)]"
              } cursor-pointer`}
            >
              <div
                className={`
                  glass rounded-xl p-5 transition-all duration-300
                  border ${
                    role.isActive
                      ? "border-green-500/30 hover:border-green-500/50"
                      : "border-zinc-800/50 hover:border-blue-500/50"
                  }
                  hover:shadow-lg hover:shadow-blue-500/10
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className={index % 2 === 0 ? "sm:text-right sm:order-2" : ""}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {role.isActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-green-500/20 text-green-400 rounded border border-green-500/30">
                          <Zap className="w-3 h-3" />
                          ACTIVE
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-white">{role.role}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{role.company}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === role.id ? 180 : 0 }}
                    className="p-1 rounded-lg bg-zinc-800/50 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </motion.div>
                </div>

                {/* Meta info */}
                <div className={`flex flex-wrap gap-4 text-sm text-zinc-500 ${
                  index % 2 === 0 ? "sm:justify-end" : ""
                }`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{role.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{role.location}</span>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-zinc-800/50">
                        {/* Responsibilities */}
                        <div className="mb-4">
                          <h4 className="text-xs font-mono text-zinc-500 mb-2 uppercase">
                            Key Responsibilities
                          </h4>
                          <ul className={`space-y-2 ${
                            index % 2 === 0 ? "sm:text-right" : ""
                          }`}>
                            {role.responsibilities.map((resp, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-sm text-zinc-400 flex items-start gap-2"
                              >
                                <span className="text-blue-400 mt-1 shrink-0">
                                  {index % 2 === 0 ? "" : "→"}
                                </span>
                                <span>{resp}</span>
                                <span className="text-blue-400 mt-1 shrink-0 hidden sm:inline">
                                  {index % 2 === 0 ? "←" : ""}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs font-mono text-zinc-500 mb-2 uppercase">
                            Technologies
                          </h4>
                          <div className={`flex flex-wrap gap-2 ${
                            index % 2 === 0 ? "sm:justify-end" : ""
                          }`}>
                            {role.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-mono bg-zinc-800/50 text-zinc-400 rounded border border-zinc-700/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
