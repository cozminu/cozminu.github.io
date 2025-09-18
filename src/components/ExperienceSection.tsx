import React from "react";

export default function ExperienceSection({
  Section,
  isFlashing,
}: {
  Section: any;
  isFlashing?: boolean;
}) {
  return (
    <Section id="experience" title="Experience" isFlashing={isFlashing}>
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
          <ul className="mt-3 list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Implemented new features to payment system.</li>
            <li>
              Designed and implemented JavaCard Applet for payment processing.
            </li>
          </ul>
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
              Designed and implemented key integrations for an AI-powered
              digital assistant, including custom APIs bridging legacy systems
              (.NET Core, C#, NestJS).
            </li>
            <li>
              Built a NestJS chat API as a wrapper for ChatGPT for dynamic
              responses across enterprise systems.
            </li>
            <li>
              Optimized large-data handling via concurrent calls, Azure Blob CSV
              uploads, and streaming (200K+ items).
            </li>
            <li>
              Orchestrated NestJS cron workloads on Kubernetes for ServiceNow,
              Sailpoint, and Workday syncs.
            </li>
            <li>
              Remediated WAST vulnerabilities to meet pharma-grade data security
              requirements.
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
              Developed a REST API with NestJS and PostgreSQL serving customer,
              broker, and supplier apps.
            </li>
            <li>
              Partnered with frontend, QA, and product for seamless integration
              and UX.
            </li>
            <li>
              Integrated Redis and third‑party providers; identified scalability
              bottlenecks early.
            </li>
            <li>Upskilled rapidly in TypeScript, NestJS, and PostgreSQL.</li>
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
              Maintained a high‑performance REST API (PHP/CodeIgniter, MySQL,
              Memcached) serving 1M+ requests/day.
            </li>
            <li>
              Built a background auth worker for concurrent logins, improving
              reliability and speed.
            </li>
            <li>
              Advised an 8‑person team on performance, caching, and security
              best practices.
            </li>
            <li>
              Developed internal tools (CRM on Joomla → Phalcon) and a customer
              web app (Bonfire).
            </li>
          </ul>
        </article>
      </div>
    </Section>
  );
}
