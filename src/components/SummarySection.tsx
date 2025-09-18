import React from "react";

export default function SummarySection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  return (
    <Section id="summary" title="Summary" isFlashing={isFlashing}>
      <p>
        Senior Software Developer with 10+ years of experience in building
        scalable, high-performance applications across telecommunications,
        energy, and pharma industries. Proficient in TypeScript, NestJS,
        Node.js, PHP, and cloud services like Azure. Skilled in backend
        development, system integrations, and AI-powered solutions. Adept at
        quickly learning new technologies and collaborating with
        cross-functional teams in remote environments.
      </p>
    </Section>
  );
}
