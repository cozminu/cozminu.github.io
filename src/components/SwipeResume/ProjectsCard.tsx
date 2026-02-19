import React from 'react';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';

interface ProjectsCardProps {
  data: {
    name: string;
    description: string;
    image: string;
    highlights: string[];
    keywords: string[];
    url?: string; // Assuming there might be a URL, though not in original snippet
    [key: string]: any;
  };
}

export default function ProjectsCard({ data }: ProjectsCardProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Image Banner */}
      <div className="h-44 relative shrink-0 overflow-hidden group">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white tracking-wider uppercase shadow-sm">
              Project
            </span>
            {data.url && <ExternalLink size={12} className="text-slate-300 hover:text-white transition-colors cursor-pointer" />}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">{data.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col relative z-10 pt-2">
        {/* Background Texture continues */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
          marginTop: '-11rem' // Align with top of card conceptually if needed, or just let it fill
        }} />

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal dark:font-light">
          {data.description}
        </p>

        <div className="space-y-3 flex-1">
          {data.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="min-w-[18px] h-[18px] rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight size={10} />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2 mb-2 text-slate-400 dark:text-slate-500 text-[10px] font-mono uppercase tracking-wider">
            <Code2 size={12} />
            <span>Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
