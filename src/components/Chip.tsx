import React from "react";

export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-300 hover:shadow hover:bg-indigo-100 dark:hover:bg-indigo-900"
      style={{
        background: "var(--color-chip-light)",
        color: "var(--color-text-light)",
        borderColor: "var(--color-border-light)",
      }}
      data-dark={
        typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark")
      }
    >
      {children}
    </span>
  );
}
