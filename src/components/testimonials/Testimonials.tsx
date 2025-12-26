"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const countryFlags: Record<string, string> = {
  US: "/flags/us.png",
  CA: "/flags/ca.png",
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <span className="text-xs font-mono text-zinc-400">
              CLIENT_FEEDBACK.log
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            System Reviews
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
            // Verified client testimonials
          </p>
        </motion.div>

        {/* Testimonial card */}
        <motion.div variants={fadeInUp} className="relative">
          <div className="glass rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-blue-500/20">
              <Quote className="w-12 h-12" />
            </div>

            {/* Terminal-style header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-500 font-mono">
                review --id={currentTestimonial.id}
              </span>
            </div>

            {/* Testimonial content */}
            <div className="min-h-[180px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg sm:text-xl text-zinc-300 mb-6 leading-relaxed italic">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {currentTestimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={countryFlags[currentTestimonial.country]}
                          alt={currentTestimonial.country}
                          className="w-5 h-auto inline-block"
                        />
                        {currentTestimonial.name}
                      </p>
                      <p className="text-xs text-green-400 font-mono">
                        VERIFIED CLIENT
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-500 w-6"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none"
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />
          </div>

          {/* Glow effect under card */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-blue-500/20 blur-2xl rounded-full" />
        </motion.div>

        {/* Counter */}
        <motion.div
          variants={fadeInUp}
          className="text-center mt-8 text-zinc-600 font-mono text-sm"
        >
          [{currentIndex + 1}/{testimonials.length}] reviews loaded
        </motion.div>
      </motion.div>
    </section>
  );
}
