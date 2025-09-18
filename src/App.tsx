import GitHubStats from "./components/GitHubStats";
import SummarySection from "./components/SummarySection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import LanguagesSection from "./components/LanguagesSection";
import CertificationsSection from "./components/CertificationsSection";
import FloatingContactButton from "./components/FloatingContactButton";
import ProjectsSection from "./components/ProjectsSection";
import Chip from "./components/Chip";
import AppHeader from "./components/AppHeader";
import QuickLinks from "./components/QuickLinks";
import Section from "./components/Section";
import MainLayout from "./components/MainLayout";
import Footer from "./components/Footer";
import LightBackgroundSVG from "./components/LightBackgroundSVG";
import DarkBackgroundSVG from "./components/DarkBackgroundSVG";
import React from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

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
      {/* Decorative background for light and dark mode */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <LightBackgroundSVG />
        <DarkBackgroundSVG />
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
        {/* Gradient animation CSS moved to App.css */}
        <AppHeader isDark={isDark} />

        <MainLayout
          left={
            <>
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
              <Section id="github-stats" title="GitHub Activity">
                <GitHubStats />
              </Section>
            </>
          }
          right={
            <>
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
            </>
          }
        />

        <Footer />
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
