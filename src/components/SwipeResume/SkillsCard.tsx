import React from 'react';
import { Cpu, Layout, Server, Terminal, Database, Cloud, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsCardProps {
  data: SkillCategory[];
}

const getIconForCategory = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes('frontend') || lower.includes('web')) return <Layout size={18} />;
  if (lower.includes('backend') || lower.includes('api')) return <Server size={18} />;
  if (lower.includes('database') || lower.includes('data')) return <Database size={18} />;
  if (lower.includes('cloud') || lower.includes('devops')) return <Cloud size={18} />;
  if (lower.includes('language') || lower.includes('core')) return <Code size={18} />;
  if (lower.includes('tool')) return <Terminal size={18} />;
  return <Cpu size={18} />;
};

const getColorForCategory = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes('frontend')) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/20 border-blue-100 dark:border-blue-500/30';
  if (lower.includes('backend')) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/20 border-emerald-100 dark:border-emerald-500/30';
  if (lower.includes('cloud') || lower.includes('devops')) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/20 border-orange-100 dark:border-orange-500/30';
  return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/20 border-indigo-100 dark:border-indigo-500/30';
};

export default function SkillsCard({ data }: SkillsCardProps) {
  // Sort or prioritize categories if needed, but for now take them as is.
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-3xl overflow-hidden relative p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <h2 className="text-sm font-mono text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-1">
          Technical Arsenal
        </h2>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
          Full Stack Mastery
        </h1>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 flex-1 pr-2 space-y-5">
        {data.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-1.5 rounded-lg border ${getColorForCategory(cat.category)}`}>
                {getIconForCategory(cat.category)}
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-slate-200 dark:border-white/5 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-mono">
        <span>STACK_OVERVIEW</span>
        <span>READY_TO_DEPLOY</span>
      </div>
    </div>
  );
}
