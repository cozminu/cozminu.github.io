import ProfilePic from "./components/ProfilePic";
import ProfileTitle from "./components/ProfileTitle";
import React from "react";

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
      className={`backdrop-blur rounded-xl p-6 md:p-8 border shadow-sm transition-all duration-700
        bg-[var(--color-section-light)] dark:bg-[var(--color-section-dark)]
        border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]
        ${
          props.isFlashing
            ? "animate-pulse bg-blue-100/80 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30"
            : ""
        }
      `}
    >
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] mb-3 md:mb-4">
        {props.title}
      </h2>
      <div className="text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] leading-relaxed">
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
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full bg-white/70 dark:bg-zinc-900 hover:bg-white/90 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 transition-colors"
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

function Chip(props: { children: any }) {
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
      {props.children}
    </span>
  );
}

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
        {/* Light mode background */}
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
          <ellipse
            cx="1200"
            cy="100"
            rx="300"
            ry="120"
            fill="#a5b4fc"
            fillOpacity="0.28"
            style={{ animation: "float1 7s ease-in-out infinite" }}
          />
          <ellipse
            cx="300"
            cy="800"
            rx="250"
            ry="80"
            fill="#fbbf24"
            fillOpacity="0.13"
            style={{ animation: "float2 9s ease-in-out infinite" }}
          />
        </svg>
        {/* Dark mode background */}
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
          <ellipse
            cx="1200"
            cy="100"
            rx="300"
            ry="120"
            fill="#6366f1"
            fillOpacity="0.12"
            style={{ animation: "float1 7s ease-in-out infinite" }}
          />
          <ellipse
            cx="300"
            cy="800"
            rx="250"
            ry="80"
            fill="#fbbf24"
            fillOpacity="0.05"
            style={{ animation: "float2 9s ease-in-out infinite" }}
          />
        </svg>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex justify-center sm:justify-start">
              <div className="relative">
                <div className="relative rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800 p-1 bg-white dark:bg-zinc-900">
                  <ProfilePic
                    src={isDark ? "profile_dark.jpg" : "profile.jpg"}
                    alt="Cozmin Ungureanu"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="text-center sm:text-left">
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
          <div className="flex justify-center sm:justify-end">
            <ThemeToggle />
          </div>
        </header>

        <main className="mt-6 sm:mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <Section
              id="summary"
              title="Summary"
              isFlashing={flashingSection === "summary"}
            >
              <p>
                Senior Software Developer with 10+ years of experience in
                building scalable, high-performance applications across
                telecommunications, energy, and pharma industries. Proficient in
                TypeScript, NestJS, Node.js, PHP, and cloud services like Azure.
                Skilled in backend development, system integrations, and
                AI-powered solutions. Adept at quickly learning new technologies
                and collaborating with cross-functional teams in remote
                environments.
              </p>
            </Section>

            <Section
              id="experience"
              title="Experience"
              isFlashing={flashingSection === "experience"}
            >
              <div className="space-y-6">
                <article>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100">
                      BreakPoint IT — Back-end Developer
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      January 2025 - Present · Remote
                    </p>
                  </div>
                </article>
                <article>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100">
                      Cognizant — Senior Software Engineer
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      July 2023 - January 2025 · Remote
                    </p>
                  </div>
                  <ul className="mt-3 list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>
                      Designed and implemented key integrations for an
                      AI-powered digital assistant, including custom APIs
                      bridging legacy systems (.NET Core, C#, NestJS).
                    </li>
                    <li>
                      Built a NestJS chat API as a wrapper for ChatGPT for
                      dynamic responses across enterprise systems.
                    </li>
                    <li>
                      Optimized large-data handling via concurrent calls, Azure
                      Blob CSV uploads, and streaming (200K+ items).
                    </li>
                    <li>
                      Orchestrated NestJS cron workloads on Kubernetes for
                      ServiceNow, Sailpoint, and Workday syncs.
                    </li>
                    <li>
                      Remediated WAST vulnerabilities to meet pharma-grade data
                      security requirements.
                    </li>
                  </ul>
                </article>
                <article>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100">
                      Cognizant Softvision — Senior Software Engineer
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      October 2022 - July 2023 · Remote
                    </p>
                  </div>
                  <ul className="mt-3 list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>
                      Developed a REST API with NestJS and PostgreSQL serving
                      customer, broker, and supplier apps.
                    </li>
                    <li>
                      Partnered with frontend, QA, and product for seamless
                      integration and UX.
                    </li>
                    <li>
                      Integrated Redis and third‑party providers; identified
                      scalability bottlenecks early.
                    </li>
                    <li>
                      Upskilled rapidly in TypeScript, NestJS, and PostgreSQL.
                    </li>
                  </ul>
                </article>
                <article>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100">
                      SC Activemall SRL — Full Stack Developer
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      December 2013 - November 2021 · Galaţi, Romania
                    </p>
                  </div>
                  <ul className="mt-3 list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li>
                      Maintained a high‑performance REST API (PHP/CodeIgniter,
                      MySQL, Memcached) serving 1M+ requests/day.
                    </li>
                    <li>
                      Built a background auth worker for concurrent logins,
                      improving reliability and speed.
                    </li>
                    <li>
                      Advised an 8‑person team on performance, caching, and
                      security best practices.
                    </li>
                    <li>
                      Developed internal tools (CRM on Joomla → Phalcon) and a
                      customer web app (Bonfire).
                    </li>
                  </ul>
                </article>
              </div>
            </Section>
          </div>

          <aside className="relative lg:sticky lg:top-8 space-y-4 sm:space-y-6 md:space-y-8 h-fit">
            <Section id="quick-links" title="Quick Links">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("summary")}
                >
                  Summary
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("experience")}
                >
                  Experience
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("skills")}
                >
                  Skills
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("languages")}
                >
                  Languages
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("certifications")}
                >
                  Certifications
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700"
                  onClick={() => handleQuickLinkClick("education")}
                >
                  Education
                </button>
              </div>
            </Section>

            <Section
              id="skills"
              title="Skills"
              isFlashing={flashingSection === "skills"}
            >
              <div className="flex flex-wrap gap-2">
                <Chip>TypeScript</Chip>
                <Chip>NestJS</Chip>
                <Chip>Node.js</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>Redis</Chip>
                <Chip>Azure</Chip>
                <Chip>Kubernetes</Chip>
                <Chip>PHP</Chip>
                <Chip>.NET Core (C#)</Chip>
              </div>
            </Section>

            <Section
              id="languages"
              title="Languages"
              isFlashing={flashingSection === "languages"}
            >
              <ul className="space-y-2">
                <li>Romanian — Native or Bilingual</li>
                <li>English — Professional Working</li>
              </ul>
            </Section>

            <Section
              id="certifications"
              title="Certifications"
              isFlashing={flashingSection === "certifications"}
            >
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-chip-light)] dark:bg-[var(--color-chip-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  <span className="font-medium">The Git & Github Bootcamp</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-chip-light)] dark:bg-[var(--color-chip-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  <span className="font-medium">
                    NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-chip-light)] dark:bg-[var(--color-chip-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-sm">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  <span className="font-medium">
                    Agile Project Management: Scrum Step by Step with Examples
                  </span>
                </div>
              </div>
            </Section>

            <Section
              id="education"
              title="Education"
              isFlashing={flashingSection === "education"}
            >
              <p>
                Universitatea „Dunărea de Jos" din Galați — Automation (2009)
              </p>
            </Section>
          </aside>
        </main>

        <footer className="mt-8 sm:mt-12 md:mt-16 pb-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Cozmin Ungureanu
        </footer>
      </div>
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
