import React from "react";

const LightBackgroundSVG: React.FC = () => (
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
);

export default LightBackgroundSVG;
