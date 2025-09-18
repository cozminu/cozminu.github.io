import React from "react";

export default function Section({
  id,
  title,
  children,
  isFlashing,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  isFlashing?: boolean;
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl p-6 md:p-8 transition-all duration-700
        bg-white/30 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl border-white/30 dark:border-zinc-800/40
        ${
          isFlashing
            ? "animate-pulse bg-blue-100/80 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30"
            : ""
        }
      `}
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(16px)",
      }}
    >
      <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 mb-3 md:mb-4">
        {title}
      </h2>
      <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
