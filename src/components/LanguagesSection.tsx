import React from "react";

export default function LanguagesSection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  const languages = [
    {
      name: "Romanian",
      flag: "🇷🇴",
      proficiency: 100,
      level: "Native or Bilingual",
      color: "bg-gradient-to-br from-yellow-200 via-red-200 to-blue-200",
    },
    {
      name: "English",
      flag: "🇬🇧",
      proficiency: 85,
      level: "Professional Working",
      color: "bg-gradient-to-br from-blue-200 via-white to-red-200",
    },
  ];

  return (
    <Section id="languages" title="Languages" isFlashing={isFlashing}>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`inline-flex items-center px-3 py-1 rounded-full shadow-sm ${lang.color}`}
            style={{ minWidth: "0" }}
          >
            <span className="text-lg mr-2">{lang.flag}</span>
            <span className="font-semibold text-xs text-zinc-800 dark:text-zinc-100 mr-1">
              {lang.name}
            </span>
            <span className="text-[10px] text-zinc-600 dark:text-zinc-300">
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
