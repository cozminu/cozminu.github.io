import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Andrei Popescu",
    title: "Engineering Manager, Cognizant",
    quote:
      "Cozmin is a rare blend of technical depth and creative problem solving. His work on our AI assistant project was game-changing!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maria Ionescu",
    title: "Product Owner, BreakPoint IT",
    quote:
      "Working with Cozmin is a delight. He brings clarity, speed, and a positive attitude to every challenge.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Alex Dumitru",
    title: "Lead Developer, Activemall SRL",
    quote:
      "Cozmin's backend skills and mentorship helped our team deliver on time and scale with confidence.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="rounded-2xl p-6 md:p-8 border bg-white/30 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl border-white/30 dark:border-zinc-800/40">
      <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 mb-6 text-center">
        Testimonials
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px rgba(99,102,241,0.12)",
            }}
            className="flex-1 bg-white/60 dark:bg-zinc-900/60 rounded-xl shadow-lg p-5 flex flex-col items-center text-center backdrop-blur-md border border-white/20 dark:border-zinc-800/30"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-indigo-400 dark:border-pink-400"
              loading="lazy"
            />
            <blockquote className="italic text-zinc-700 dark:text-zinc-200 mb-2">
              “{t.quote}”
            </blockquote>
            <div className="font-bold text-indigo-600 dark:text-pink-400">
              {t.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {t.title}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
