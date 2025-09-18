import React from "react";
import { motion } from "framer-motion";

export default function QuickLinks({
  handleQuickLinkClick,
}: {
  handleQuickLinkClick: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("summary")}
        aria-label="Jump to Summary section"
        tabIndex={0}
      >
        Summary
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("experience")}
        aria-label="Jump to Experience section"
        tabIndex={0}
      >
        Experience
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("skills")}
        aria-label="Jump to Skills section"
        tabIndex={0}
      >
        Skills
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("languages")}
        aria-label="Jump to Languages section"
        tabIndex={0}
      >
        Languages
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("certifications")}
        aria-label="Jump to Certifications section"
        tabIndex={0}
      >
        Certifications
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("featured-projects")}
        aria-label="Jump to Featured Projects section"
        tabIndex={0}
      >
        Featured Projects
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
        onClick={() => handleQuickLinkClick("github-stats")}
        aria-label="Jump to GitHub Activity section"
        tabIndex={0}
      >
        GitHub Activity
      </motion.button>
    </div>
  );
}
