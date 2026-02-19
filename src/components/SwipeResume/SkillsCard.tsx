import React from 'react';
import { Cpu, Globe, Layout, Server, Terminal, Database, Cloud, Code } from 'lucide-react';
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
  if (lower.includes('frontend')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  if (lower.includes('backend')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (lower.includes('cloud') || lower.includes('devops')) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
  return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
};

export default function SkillsCard({ data }: SkillsCardProps) {
  // Sort or prioritize categories if needed, but for now take them as is.
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white rounded-3xl overflow-hidden relative p-6">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <h2 className="text-sm font-mono text-indigo-400 tracking-wider uppercase mb-1">
          Technical Arsenal
        </h2>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
          Full Stack Mastery
        </h1>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
        {data.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-1.5 rounded-lg ${getColorForCategory(cat.category)}`}>
                {getIconForCategory(cat.category)}
              </div>
              <h3 className="font-bold text-lg text-slate-200">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>STACK_OVERVIEW</span>
        <span>READY_TO_DEPLOY</span>
      </div>
    </div>
  );
}
