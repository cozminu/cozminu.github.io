import ProfilePic from "./components/ProfilePic";
import ProfileTitle from "./components/ProfileTitle";
import GitHubStats from "./components/GitHubStats";
import SummarySection from "./components/SummarySection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import LanguagesSection from "./components/LanguagesSection";
import CertificationsSection from "./components/CertificationsSection";
import FloatingContactButton from "./components/FloatingContactButton";
import ProjectsSection from "./components/ProjectsSection";
import Chip from "./components/Chip";
import QuickLinks from "./components/QuickLinks";
import React from "react";
// import { motion } from "framer-motion";

const ThemeContext = React.createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

function Section(props: {
  id: string;
  title: string;
  children: any;
  isFlashing?: boolean;
}) {
  return (
    <section
      id={props.id}
      className={`rounded-2xl p-6 md:p-8 transition-all duration-700
        bg-white/30 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl border-white/30 dark:border-zinc-800/40
        ${
          props.isFlashing
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
        {props.title}
      </h2>
      <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed">
        {props.children}
      </div>
    </section>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<string>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return [context.theme, context.setTheme] as const;
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full bg-white/70 dark:bg-zinc-900 hover:bg-white/90 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors"
      tabIndex={0}
    >
      {isDark ? (
        <svg
          className="w-5 h-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-zinc-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

// ...Chip is now imported from components/Chip

function App() {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [flashingSection, setFlashingSection] = React.useState<string | null>(
    null
  );

  const handleQuickLinkClick = (sectionId: string) => {
    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Flash the section
    setFlashingSection(sectionId);
    setTimeout(() => {
      setFlashingSection(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative text-zinc-800 dark:text-zinc-200">
      {/* Decorative background for light mode */}
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(1.04); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(0.98); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        {/* Light and dark mode backgrounds without blobs */}
        <svg
          className="w-full h-full block dark:hidden"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id="lightBg"
              cx="50%"
              cy="40%"
              r="80%"
              fx="50%"
              fy="40%"
              gradientTransform="rotate(10)"
            >
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#f3f4f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#lightBg)" />
        </svg>
        <svg
          className="w-full h-full hidden dark:block"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id="darkBg"
              cx="50%"
              cy="40%"
              r="80%"
              fx="50%"
              fy="40%"
              gradientTransform="rotate(10)"
            >
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#23272f" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="1" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#darkBg)" />
        </svg>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12 relative">
        {/* Animated gradient header background */}
        {/* Responsive header gradient for light/dark mode */}
        <div
          className={
            `absolute top-0 left-0 w-full h-64 -z-10 animate-gradient-move ` +
            (isDark
              ? "bg-gradient-to-br from-indigo-900 via-fuchsia-700 to-cyan-500"
              : "bg-gradient-to-br from-indigo-400 via-pink-400 to-orange-300")
          }
          style={{
            boxShadow: isDark
              ? "0 4px 32px 0 rgba(80, 17, 204, 0.25), 0 2px 16px 0 rgba(6, 182, 212, 0.18)"
              : "0 4px 32px 0 rgba(99, 102, 241, 0.18), 0 2px 16px 0 rgba(251, 191, 36, 0.13)",
            opacity: 0.95,
          }}
        />
        <style>{`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 8s ease-in-out infinite;
          }
        `}</style>
        {/* Always show theme toggle at top left */}
        <div className="fixed top-3 right-3 z-50">
          <ThemeToggle />
        </div>
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

        <main className="mt-6 sm:mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <SummarySection
              Section={Section}
              isFlashing={flashingSection === "summary"}
            />
            <ProjectsSection
              Section={Section}
              isFlashing={flashingSection === "projects"}
            />
            <ExperienceSection
              Section={Section}
              isFlashing={flashingSection === "experience"}
            />
            {/* GitHub stats as a separate section */}
            <Section id="github-stats" title="GitHub Activity">
              <GitHubStats />
            </Section>
          </div>

          <aside className="relative lg:sticky lg:top-8 space-y-4 sm:space-y-6 md:space-y-8 h-fit">
            <Section id="quick-links" title="Quick Links">
              <QuickLinks handleQuickLinkClick={handleQuickLinkClick} />
            </Section>

            <SkillsSection
              Section={Section}
              Chip={Chip}
              isFlashing={flashingSection === "skills"}
            />

            <LanguagesSection
              Section={Section}
              isFlashing={flashingSection === "languages"}
            />

            <CertificationsSection
              Section={Section}
              isFlashing={flashingSection === "certifications"}
            />
          </aside>
        </main>

        <footer className="mt-8 sm:mt-12 md:mt-16 pb-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Cozmin Ungureanu
        </footer>
      </div>
      <FloatingContactButton />
    </div>
  );
}

function AppWithProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithProvider;
