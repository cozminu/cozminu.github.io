import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "AI Assistant Integration",
    description:
      "Enterprise digital assistant with custom APIs, ChatGPT wrapper, and large-data streaming for pharma clients.",
    tech: ["NestJS", "TypeScript", "Azure", "Kubernetes", "ChatGPT"],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    impact: "200K+ items processed, pharma-grade security, 99.99% uptime",
  },
  {
    name: "Payment System Upgrade",
    description:
      "JavaCard Applet and backend features for secure, scalable payment processing across multiple platforms.",
    tech: ["JavaCard", "Node.js", "TypeScript", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    impact:
      "Enabled new payment flows, improved reliability, reduced fraud risk",
  },
  {
    name: "REST API Platform",
    description:
      "High-performance REST API serving 1M+ requests/day, with caching, background workers, and internal tools.",
    tech: ["PHP", "CodeIgniter", "MySQL", "Memcached", "Joomla", "Phalcon"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    impact: "1M+ daily requests, 8-person team mentored, seamless integrations",
  },
];

export default function ProjectsSection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      isFlashing={isFlashing}
      className="rounded-2xl p-6 md:p-8 border bg-white/30 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl border-white/30 dark:border-zinc-800/40"
    >
      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px rgba(99,102,241,0.12)",
            }}
            className="bg-white/60 dark:bg-zinc-900/60 rounded-xl shadow-lg p-5 flex flex-col items-center text-center backdrop-blur-md border border-white/20 dark:border-zinc-800/30"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-32 object-cover rounded-lg mb-3 shadow"
              loading="lazy"
            />
            <div className="font-bold text-indigo-600 dark:text-pink-400 text-lg mb-1">
              {p.name}
            </div>
            <div className="text-xs text-zinc-700 dark:text-zinc-200 mb-2">
              {p.description}
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded bg-indigo-100 dark:bg-pink-900/40 text-xs text-indigo-700 dark:text-pink-200 font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 italic">
              {p.impact}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
