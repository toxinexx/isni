"use client";

import { motion } from "framer-motion";
import { Rocket, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const ctaButtons = [
  {
    label: "Let's connect!",
    description: "Start a conversation",
    icon: Rocket,
    href: `mailto:${personalInfo.email}`,
    primary: true,
    color: "from-blue-500 to-purple-500",
  },
  {
    label: "Initialize Collaboration",
    description: "Connect on LinkedIn",
    icon: Linkedin,
    href: personalInfo.linkedin,
    primary: false,
    color: "from-blue-600 to-blue-400",
  },
];

export default function CallToAction() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Dark overlay with soft vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `rgba(0, 0, 0, 0.25)`,
          maskImage: `
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30"
          >
            <Sparkles className="w-8 h-8 text-blue-400" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to Deploy?
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Let&apos;s build something extraordinary together. Hybrid intelligence
            meets purposeful automation.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {ctaButtons.map((button) => (
            <motion.a
              key={button.label}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : undefined}
              rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group relative flex items-center gap-4 px-6 py-4 rounded-xl w-full sm:w-auto
                transition-all duration-300
                ${
                  button.primary
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    : "glass border border-zinc-700/50 hover:border-blue-500/50 text-white"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  p-2 rounded-lg transition-colors
                  ${button.primary ? "bg-white/10" : "bg-zinc-800/50 group-hover:bg-blue-500/10"}
                `}
              >
                <button.icon
                  className={`w-5 h-5 ${button.primary ? "text-white" : "text-blue-400"}`}
                />
              </div>

              {/* Text */}
              <div className="text-left">
                <div className="font-semibold">{button.label}</div>
                <div
                  className={`text-xs ${
                    button.primary ? "text-white/70" : "text-zinc-500"
                  }`}
                >
                  {button.description}
                </div>
              </div>

              {/* Arrow for primary button */}
              {button.primary && (
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              )}

              {/* Hover glow effect */}
              <div
                className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-r ${button.color} blur-xl -z-10
                `}
                style={{ transform: "scale(0.9)" }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm text-zinc-600"
        >
          Response time: Usually within 12 hours
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
        />

        {/* Footer credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-zinc-700">
            {personalInfo.name} &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
