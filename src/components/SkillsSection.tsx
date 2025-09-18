import React from "react";

export default function SkillsSection({
  Section,
  Chip,
  isFlashing,
}: {
  Section: any;
  Chip: any;
  isFlashing?: boolean;
}) {
  const skills = [
    {
      name: "TypeScript",
      color: "bg-blue-100 dark:bg-blue-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#3b82f6" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            TS
          </text>
        </svg>
      ),
    },
    {
      name: "NestJS",
      color: "bg-red-100 dark:bg-red-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#ef4444" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            NJS
          </text>
        </svg>
      ),
    },
    {
      name: "Node.js",
      color: "bg-green-100 dark:bg-green-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#22c55e" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            Node
          </text>
        </svg>
      ),
    },
    {
      name: "PostgreSQL",
      color: "bg-indigo-100 dark:bg-indigo-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="12" rx="10" ry="8" fill="#6366f1" />
          <text x="2" y="17" fontSize="10" fill="#fff">
            PGSQL
          </text>
        </svg>
      ),
    },
    {
      name: "Redis",
      color: "bg-pink-100 dark:bg-pink-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#ec4899" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            Redis
          </text>
        </svg>
      ),
    },
    {
      name: "Azure",
      color: "bg-cyan-100 dark:bg-cyan-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 22,22 2,22" fill="#06b6d4" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            Az
          </text>
        </svg>
      ),
    },
    {
      name: "Kubernetes",
      color: "bg-sky-100 dark:bg-sky-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#0ea5e9" />
          <text x="2" y="17" fontSize="10" fill="#fff">
            K8s
          </text>
        </svg>
      ),
    },
    {
      name: "PHP",
      color: "bg-purple-100 dark:bg-purple-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="12" rx="10" ry="8" fill="#a21caf" />
          <text x="6" y="17" fontSize="10" fill="#fff">
            PHP
          </text>
        </svg>
      ),
    },
    {
      name: ".NET Core (C#)",
      color: "bg-gray-100 dark:bg-gray-900/40",
      icon: (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#6b7280" />
          <text x="2" y="17" fontSize="10" fill="#fff">
            .NET
          </text>
        </svg>
      ),
    },
  ];

  return (
    <Section id="skills" title="Skills" isFlashing={isFlashing}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <div
            key={skill.name}
            className={`flex items-center px-2 py-1 rounded-full font-semibold text-[10px] sm:text-xs shadow transition-all duration-300 hover:scale-105 hover:shadow-lg ${skill.color}`}
            style={{
              animation: `fadeIn 0.7s ease ${idx * 0.1}s both`,
              maxWidth: "110px",
            }}
          >
            {React.cloneElement(skill.icon, { className: "w-3 h-3 mr-1" })}
            <span className="truncate ml-1 max-w-[60px] sm:max-w-[80px] md:max-w-[100px] text-zinc-900 dark:text-zinc-100">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}
