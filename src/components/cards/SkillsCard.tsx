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
  if (lower.includes('frontend') || lower.includes('web')) return <Layout size={14} />;
  if (lower.includes('backend') || lower.includes('api')) return <Server size={14} />;
  if (lower.includes('database') || lower.includes('data')) return <Database size={14} />;
  if (lower.includes('cloud') || lower.includes('devops')) return <Cloud size={14} />;
  if (lower.includes('language') || lower.includes('core')) return <Code size={14} />;
  if (lower.includes('tool')) return <Terminal size={14} />;
  return <Cpu size={14} />;
};

const getColorForCategory = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes('frontend')) return 'text-blue-400 border-blue-500/30 bg-blue-950/30';
  if (lower.includes('backend')) return 'text-purple-400 border-purple-500/30 bg-purple-950/30';
  if (lower.includes('cloud') || lower.includes('devops')) return 'text-indigo-400 border-indigo-500/30 bg-indigo-950/30';
  return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30';
};

export default function SkillsCard({ data }: SkillsCardProps) {
  return (
    <div className="flex flex-col h-full bg-[#030b14] text-cyan-500 rounded-none overflow-hidden relative p-8 shadow-[0_0_15px_rgba(0,255,255,0.1)] font-mono">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative z-10 mb-8 border-l-2 border-cyan-500 pl-4 bg-cyan-950/20 py-2">
        <h2 className="text-[10px] font-bold text-cyan-700 tracking-widest uppercase mb-1">
          SYS_TECHNICAL_ARSENAL
        </h2>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 uppercase tracking-widest" style={{ textShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
          Full Stack Mastery
        </h1>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 flex-1 pr-2 space-y-6 !scrollbar-hide">
        {data.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-3 border-b border-cyan-500/20 pb-2">
              <div className={`p-1.5 border shadow-[inset_0_0_5px_rgba(0,255,255,0.1)] ${getColorForCategory(cat.category)}`}>
                {getIconForCategory(cat.category)}
              </div>
              <h3 className="font-bold text-xs text-cyan-300 tracking-widest uppercase">{cat.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase border border-cyan-500/20 bg-black/60 text-cyan-500/80 hover:bg-cyan-900/40 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-default relative overflow-hidden group/item"
                >
                  <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  <span className="relative z-10">{skill}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-cyan-500/30 flex justify-between items-center text-[8px] text-cyan-600 font-bold uppercase tracking-widest bg-black/40 backdrop-blur-sm p-2 border-l border-r">
        <span>[ STACK_OVERVIEW ]</span>
        <span className="text-cyan-400 animate-pulse">[ READY_TO_DEPLOY ]</span>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,255,255,0.05)] z-20"></div>
    </div>
  );
}
