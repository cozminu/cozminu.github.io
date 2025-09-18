import React from "react";

export default function CertificationsSection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  const certifications = [
    {
      name: "The Git & Github Bootcamp",
      provider: "Udemy",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
        </svg>
      ),
      color:
        "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700",
    },
    {
      name: "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)",
      provider: "Udemy",
      icon: (
        <svg
          className="w-7 h-7 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
        </svg>
      ),
      color:
        "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700",
    },
    {
      name: "Agile Project Management: Scrum Step by Step with Examples",
      provider: "Udemy",
      icon: (
        <svg
          className="w-7 h-7 text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4"
          />
        </svg>
      ),
      color:
        "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700",
    },
  ];

  return (
    <Section id="certifications" title="Certifications" isFlashing={isFlashing}>
      <div className="flex flex-col gap-4">
        {certifications.map((cert, idx) => (
          <div
            key={cert.name}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl border shadow-sm transition hover:scale-[1.02] hover:shadow-lg ${cert.color}`}
          >
            <div className="flex-shrink-0">{cert.icon}</div>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-xs md:text-sm text-zinc-900 dark:text-zinc-100">
                {cert.name}
              </span>
              <span className="mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                {cert.provider}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
