import React from "react";
import { motion } from "framer-motion";

export default function FloatingContactButton() {
  return (
    <motion.a
      href="mailto:ucozmin@gmail.com"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.12, boxShadow: "0 0 24px 8px #6366f1" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg shadow-lg border border-white/30 dark:border-zinc-800/40 font-bold text-base hover:bg-indigo-100 dark:hover:bg-pink-900/40 transition-colors"
      aria-label="Contact Cozmin via email"
    >
      {/* Simple email SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 7.75v8.5a2 2 0 01-2 2h-15.5a2 2 0 01-2-2v-8.5a2 2 0 012-2h15.5a2 2 0 012 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 7.75l8.25 6.5 8.25-6.5"
        />
      </svg>
      Contact Me
    </motion.a>
  );
}
