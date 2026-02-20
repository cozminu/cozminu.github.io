import { Cpu, Layers, Globe } from 'lucide-react';

export default function AboutCard() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-3xl overflow-hidden relative p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Subtle background tech texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      {/* 1) Positioning Statement */}
      <div className="relative z-10 mb-8">
        <h1 className="text-2xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400">
          I build <span className="text-indigo-600 dark:text-indigo-400">backend systems</span> that don’t break under scale.
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Enterprise integrations. Performance-first architecture. AI-enabled automation.
        </p>
      </div>

      {/* 2) 3 Value Pillars */}
      <div className="space-y-4 relative z-10 flex-1">
        {/* Pillar A: Scalable Architecture */}
        <div className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
          <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Scalable Architecture</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
              <p><span className="text-emerald-600 dark:text-green-400 font-semibold">1M+</span> requests/day APIs</p>
              <p>Zero downtime systems</p>
              <p>Performance tuning: caching, streaming, concurrency</p>
            </div>
          </div>
        </div>

        {/* Pillar B: Enterprise Integration */}
        <div className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
          <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Enterprise Integration</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
              <p>ServiceNow / Workday / SailPoint</p>
              <p>Legacy <span className="text-slate-400 dark:text-slate-500">→</span> modern API bridging</p>
              <p>Cross-stack delivery (.NET Core + NestJS)</p>
            </div>
          </div>
        </div>

        {/* Pillar C: AI & Automation */}
        <div className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
          <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Cpu size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">AI & Automation</h3>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
              <p>Enterprise ChatGPT API wrapper</p>
              <p>Custom API over non-API legacy systems</p>
              <p>Data pipelines: <span className="text-emerald-600 dark:text-green-400 font-semibold">200K+</span> records via streaming</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3) Engineering Mindset */}
      <div className="relative z-10 pt-6 mt-auto">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 dark:text-slate-500 font-mono tracking-wide uppercase justify-center opacity-80 mb-4 border-t border-slate-200 dark:border-slate-800/50 pt-4">
          <span>Performance-driven</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Security-aware</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Systems thinker</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Remote-first</span>
        </div>
      </div>
    </div>
  );
}
