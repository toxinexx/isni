"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "identity", label: "Identity" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "reviews", label: "Reviews" },
  { id: "metrics", label: "Metrics" },
  { id: "languages", label: "Languages" },
  { id: "contact", label: "Contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("identity");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-6"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`
            text-[10px] uppercase tracking-[0.15em] font-extralight
            transition-all duration-300 text-left
            hover:text-blue-400 hover:tracking-[0.2em]
            ${
              activeSection === item.id
                ? "text-blue-400"
                : "text-zinc-600"
            }
          `}
        >
          {item.label}
        </button>
      ))}

      {/* Vertical line indicator */}
      <div className="absolute -left-3 top-0 bottom-0 w-px bg-zinc-800">
        <motion.div
          className="w-px bg-blue-500"
          initial={{ height: 0 }}
          animate={{
            height: "14.28%",
            y: `${navItems.findIndex((item) => item.id === activeSection) * 100}%`,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.nav>
  );
}
