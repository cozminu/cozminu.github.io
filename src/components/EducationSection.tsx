import React from "react";

export default function EducationSection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  return (
    <Section id="education" title="Education" isFlashing={isFlashing}>
      <p>Universitatea „Dunărea de Jos" din Galați — Automation (2009)</p>
    </Section>
  );
}
