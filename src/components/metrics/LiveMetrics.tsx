"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Activity, TrendingUp, CheckCircle2, Cpu, Workflow, LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { metrics } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  "Automation Success Rate": Activity,
  "Data Accuracy": CheckCircle2,
  "Pipeline Uptime": TrendingUp,
  "AI Evaluations": Cpu,
  "Workflows Deployed": Workflow,
};

function MiniChart({ percentage }: { percentage: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const [points, setPoints] = useState<string>("");

  useEffect(() => {
    if (!isInView) return;

    // Generate random-ish but upward trending points
    const newPoints = [];
    for (let i = 0; i <= 10; i++) {
      const x = i * 10;
      const baseY = 50 - (percentage / 100) * 40;
      const variation = Math.sin(i * 0.8) * 10 + Math.random() * 5;
      const y = Math.max(10, Math.min(90, baseY + variation - i * 2));
      newPoints.push(`${x},${y}`);
    }
    setPoints(newPoints.join(" "));
  }, [isInView, percentage]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className="w-full h-16"
      preserveAspectRatio="none"
    >
      {/* Grid lines */}
      <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* Chart line */}
      {points && (
        <>
          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <motion.polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
          <motion.polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </>
      )}
    </svg>
  );
}

function CircularProgress({ percentage }: { percentage: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg ref={ref} viewBox="0 0 100 100" className="w-20 h-20">
      {/* Background circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="rgba(59, 130, 246, 0.1)"
        strokeWidth="8"
      />
      {/* Progress circle */}
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: isInView ? offset : circumference }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        transform="rotate(-90 50 50)"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LiveMetrics() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
            <motion.span
              animate={{ opacity: isLive ? 1 : 0.3 }}
              className="w-2 h-2 rounded-full bg-orange-400"
            />
            LIVE METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            System Performance
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Real-time metrics demonstrating reliability, accuracy, and efficiency
            across all automation pipelines.
          </p>
        </motion.div>
      </div>

      {/* Metrics grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {metrics.map((metric, index) => {
          const Icon = iconMap[metric.label] || Activity;
          const isPercentage = metric.suffix === "%";

          return (
            <motion.div
              key={metric.label}
              variants={staggerItem}
              className="glass rounded-xl p-6 border border-zinc-800/50 hover:border-blue-500/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-zinc-800/50 group-hover:bg-blue-500/10 transition-colors">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                {isPercentage && (
                  <CircularProgress percentage={metric.value} />
                )}
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={isPercentage ? 1 : 0}
                    duration={1.5}
                  />
                </span>
              </div>

              {/* Label */}
              <h3 className="text-sm font-medium text-zinc-300 mb-1">
                {metric.label}
              </h3>
              <p className="text-xs text-zinc-500">{metric.description}</p>

              {/* Mini chart for percentages */}
              {isPercentage && (
                <div className="mt-4 -mx-2">
                  <MiniChart percentage={metric.value} />
                </div>
              )}

              {/* Status bar for non-percentages */}
              {!isPercentage && (
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Last updated</span>
                    <span className="text-green-400 font-mono">Just now</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
