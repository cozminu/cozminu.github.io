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
    [key: string]: unknown;
  };
}

export default function ExpCard({ data }: ExpCardProps) {
  const startYear = new Date(data.startDate).getFullYear();
  const endYear = data.endDate ? new Date(data.endDate).getFullYear() : 'Present';

  return (
    <div className="flex flex-col h-full bg-[#030b14] text-cyan-500 rounded-none overflow-hidden relative p-8 shadow-[0_0_15px_rgba(0,255,255,0.1)] font-mono">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>

      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header Section */}
      <div className="relative z-10 mb-6 border-b border-cyan-500/30 pb-4 bg-black/40 p-4 border-l-2 border-l-cyan-500 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-0.5 bg-cyan-950/50 text-cyan-400 text-[8px] font-bold tracking-widest uppercase border border-cyan-500/50 shadow-[0_0_5px_rgba(0,255,255,0.2)]">
            SYS_EXPERIENCE_LOG
          </span>
          <div className="flex items-center text-cyan-500/70 text-[9px] font-mono tracking-widest uppercase">
            <Calendar size={10} className="mr-1.5" />
            <span>{startYear} — {endYear}</span>
          </div>
        </div>

        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1 leading-tight tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
          {data.position}
        </h1>

        <div className="flex items-center text-cyan-300/80 text-[10px] font-bold tracking-widest uppercase">
          <Building size={12} className="mr-2 text-purple-400" />
          <span>{data.name}</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="relative z-10 flex-1 space-y-3 px-2 !scrollbar-hide">
        {data.highlights.map((highlight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex gap-3 items-start group"
          >
            <div className="min-w-[6px] h-[6px] mt-1.5 rounded-none bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-colors" />
            <p className="text-[10px] text-cyan-500/80 leading-relaxed font-mono uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
              {highlight}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Footer */}
      <div className="relative z-10 mt-auto pt-6 border-t border-cyan-500/30">
        {data.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-black/60 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/40 hover:border-cyan-400 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Past Experience Hint */}
        {data.pastExperience && data.pastExperience.count > 0 && (
          <div className="flex items-center pt-3 border-t border-cyan-500/20">
            <div className="flex items-center justify-center w-6 h-6 bg-cyan-950/50 border border-cyan-500/30 text-purple-400 mr-3 shadow-[0_0_5px_rgba(192,132,252,0.2)]">
              <Briefcase size={10} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-widest text-cyan-600 font-bold">ARCHIVED_ROLES</span>
              <span className="text-[9px] text-cyan-500/60 uppercase tracking-widest">
                +{data.pastExperience.count} roles starting {data.pastExperience.oldestYear}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
