import React from "react";

const DarkBackgroundSVG: React.FC = () => (
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
);

export default DarkBackgroundSVG;
