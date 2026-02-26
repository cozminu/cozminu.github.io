import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';

interface ProjectsCardProps {
  data: {
    name: string;
    description: string;
    image: string;
    highlights: string[];
    keywords: string[];
    url?: string;
    [key: string]: unknown;
  };
}

export default function ProjectsCard({ data }: ProjectsCardProps) {
  return (
    <div className="flex flex-col h-full bg-[#030b14] text-cyan-500 rounded-none overflow-hidden relative shadow-[0_0_15px_rgba(0,255,255,0.1)] font-mono">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Image Banner */}
      <div className="h-44 relative shrink-0 overflow-hidden group border-b border-cyan-500/30 z-10">
        <div className="absolute inset-0 bg-cyan-900/40 mix-blend-color z-10 pointer-events-none"></div>
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-150 contrast-125 mix-blend-luminosity brightness-75"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b14] via-[#030b14]/60 to-transparent z-10" />

        <div className="absolute bottom-0 left-0 p-6 w-full z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-none text-[8px] font-bold bg-cyan-950/80 border border-cyan-500 text-cyan-400 tracking-widest uppercase shadow-[0_0_5px_rgba(0,255,255,0.3)]">
              SYS_PROJECT
            </span>
            {data.url && (
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} className="text-purple-400 hover:text-cyan-300 transition-colors cursor-pointer hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" />
              </a>
            )}
          </div>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
            {data.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col relative z-10 pt-4 bg-black/40 backdrop-blur-sm">
        <p className="text-cyan-500/80 text-[10px] uppercase tracking-wider leading-relaxed mb-6 font-mono">
          <span className="text-purple-400 mr-2">{`>`}</span>
          {data.description}
        </p>

        <div className="space-y-3 flex-1 !scrollbar-hide">
          {data.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="min-w-[16px] h-[16px] bg-cyan-950/50 flex items-center justify-center mt-0.5 border border-cyan-500/30 text-cyan-400 group-hover:bg-purple-900/50 group-hover:border-purple-400 group-hover:text-purple-300 transition-colors shadow-[0_0_5px_rgba(0,255,255,0.2)]">
                <ArrowUpRight size={10} />
              </div>
              <span className="text-[10px] text-cyan-500/70 font-mono tracking-wider uppercase group-hover:text-cyan-300 transition-colors">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-4 pt-4 border-t border-cyan-500/30 shrink-0">
          <div className="flex items-center gap-2 mb-3 text-cyan-600 text-[8px] font-bold uppercase tracking-widest">
            <Code2 size={10} className="text-purple-400" />
            <span>DEPLOYED_TECH_STACK</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,255,255,0.05)] z-20"></div>
    </div>
  );
}
