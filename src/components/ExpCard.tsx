import React from 'react';
import { Calendar, Building, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpCardProps {
  data: {
    position: string;
    name: string;
    startDate: string;
    endDate?: string;
    highlights: string[];
    technologies?: string[];
    pastExperience?: {
      count: number;
      oldestYear: number;
    };
    [key: string]: any;
  };
}

export default function ExpCard({ data }: ExpCardProps) {
  const startYear = new Date(data.startDate).getFullYear();
  const endYear = data.endDate ? new Date(data.endDate).getFullYear() : 'Present';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-3xl overflow-hidden relative p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />

      {/* Header Section */}
      <div className="relative z-10 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-widest uppercase border border-indigo-100 dark:border-indigo-500/30">
            Experience
          </span>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-mono">
            <Calendar size={12} className="mr-1.5" />
            <span>{startYear} — {endYear}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
          {data.position}
        </h1>

        <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
          <Building size={14} className="mr-1.5 text-indigo-500 dark:text-indigo-400" />
          <span>{data.name}</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="relative z-10 flex-1 space-y-4">
        {data.highlights.map((highlight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-3"
          >
            <div className="min-w-[4px] h-[4px] mt-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal dark:font-light">
              {highlight}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Footer */}
      <div className="relative z-10 mt-auto pt-6">
        {data.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Past Experience Hint */}
        {data.pastExperience && data.pastExperience.count > 0 && (
          <div className="flex items-center pt-4 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-500 dark:text-indigo-400 mr-3">
              <Briefcase size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Previous Roles</span>
              <span className="text-xs text-slate-400">
                +{data.pastExperience.count} roles starting {data.pastExperience.oldestYear}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
