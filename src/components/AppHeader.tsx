import React from "react";
import ProfilePic from "./ProfilePic";
import ProfileTitle from "./ProfileTitle";
import Chip from "./Chip";

export default function AppHeader({ isDark }: { isDark: boolean }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex justify-center sm:justify-start">
          <div className="relative">
            {/* Floating profile card with animated border */}
            <div
              className="relative rounded-full p-1 bg-white dark:bg-zinc-900"
              style={{
                boxShadow:
                  "0 0 0 6px #fff, 0 0 24px 0 #6366f1, 0 0 24px 0 #f59e42, 0 0 24px 0 #22d3ee, 0 0 24px 0 #a21caf",
              }}
            >
              <ProfilePic
                src={isDark ? "profile_dark.jpg" : "profile.jpg"}
                alt="Cozmin Ungureanu"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="text-center sm:text-left flex flex-col gap-4">
          <div>
            <ProfileTitle
              name="Cozmin Ungureanu"
              title="Senior Software Developer | Node.js & TypeScript"
              location="Braşov, Romania"
            />
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <Chip>Senior Software Developer</Chip>
              <Chip>Node.js</Chip>
              <Chip>TypeScript</Chip>
              <Chip>NestJS</Chip>
              <Chip>Azure</Chip>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                href="mailto:ucozmin@gmail.com"
              >
                ucozmin@gmail.com
              </a>
              <span className="hidden sm:inline opacity-30">•</span>
              <a
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                href="https://www.linkedin.com/in/nodejs-dev"
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
