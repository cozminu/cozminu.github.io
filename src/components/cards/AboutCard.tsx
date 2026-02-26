import { Cpu, Layers, Globe } from 'lucide-react';

export default function AboutCard() {
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

      {/* 1) Positioning Statement */}
      <div className="relative z-10 mb-8 border-l-2 border-cyan-500 pl-4 bg-cyan-950/20 py-2">
        <h1 className="text-2xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 uppercase tracking-widest" style={{ textShadow: '0 0 10px rgba(0,255,255,0.3)' }}>
          I build <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">backend systems</span> that don't break under scale.
        </h1>
        <p className="mt-3 text-[10px] text-cyan-300/80 tracking-widest uppercase">
          <span className="text-cyan-400 mr-2">{`>`}</span> Enterprise integrations. Performance-first architecture. AI-enabled automation.
        </p>
      </div>

      {/* 2) 3 Value Pillars */}
      <div className="space-y-4 relative z-10 flex-1">
        {/* Pillar A: Scalable Architecture */}
        <div className="flex gap-4 p-3 rounded-none bg-black/40 border border-cyan-500/20 hover:border-cyan-400 transition-colors relative group">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500 opacity-50 text-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500 opacity-50 text-cyan-500"></div>

          <div className="mt-1 min-w-[32px] h-[32px] bg-cyan-950/50 flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-shadow">
            <Globe size={18} />
          </div>
          <div>
            <h3 className="font-bold text-xs text-cyan-300 tracking-widest uppercase mb-1">Scalable Architecture</h3>
            <div className="text-[10px] text-cyan-500/70 space-y-1 uppercase tracking-wider">
              <p><span className="text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">1M+</span> requests/day APIs</p>
              <p>Zero downtime systems</p>
              <p>Performance tuning: caching, stream, concurrency</p>
            </div>
          </div>
        </div>

        {/* Pillar B: Enterprise Integration */}
        <div className="flex gap-4 p-3 rounded-none bg-black/40 border border-cyan-500/20 hover:border-cyan-400 transition-colors relative group">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500 opacity-50 text-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500 opacity-50 text-cyan-500"></div>

          <div className="mt-1 min-w-[32px] h-[32px] bg-cyan-950/50 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.5)] transition-shadow">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-bold text-xs text-cyan-300 tracking-widest uppercase mb-1">Enterprise Integration</h3>
            <div className="text-[10px] text-cyan-500/70 space-y-1 uppercase tracking-wider">
              <p>ServiceNow / Workday / SailPoint</p>
              <p>Legacy <span className="text-cyan-600 animate-pulse">→</span> modern API bridging</p>
              <p>Cross-stack delivery (.NET Core + NestJS)</p>
            </div>
          </div>
        </div>

        {/* Pillar C: AI & Automation */}
        <div className="flex gap-4 p-3 rounded-none bg-black/40 border border-cyan-500/20 hover:border-cyan-400 transition-colors relative group">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500 opacity-50 text-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500 opacity-50 text-cyan-500"></div>

          <div className="mt-1 min-w-[32px] h-[32px] bg-cyan-950/50 flex items-center justify-center text-purple-400 border border-purple-500/30 group-hover:shadow-[0_0_10px_rgba(192,132,252,0.5)] transition-shadow">
            <Cpu size={18} />
          </div>
          <div>
            <h3 className="font-bold text-xs text-cyan-300 tracking-widest uppercase mb-1">AI & Automation</h3>
            <div className="text-[10px] text-cyan-500/70 space-y-1 uppercase tracking-wider">
              <p>Enterprise ChatGPT API wrapper</p>
              <p>Custom API over non-API legacy systems</p>
              <p>Data pipelines: <span className="text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">200K+</span> records via streaming</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3) Engineering Mindset */}
      <div className="relative z-10 pt-6 mt-auto">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[8px] text-cyan-600 font-mono tracking-widest uppercase justify-center opacity-80 mb-4 border-t border-cyan-500/30 pt-4">
          <span className="hover:text-cyan-300 transition-colors cursor-default">[PERFORMANCE-DRIVEN]</span>
          <span className="text-cyan-800">•</span>
          <span className="hover:text-cyan-300 transition-colors cursor-default">[SECURITY-AWARE]</span>
          <span className="text-cyan-800">•</span>
          <span className="hover:text-cyan-300 transition-colors cursor-default">[SYSTEMS_THINKER]</span>
          <span className="text-cyan-800">•</span>
          <span className="hover:text-cyan-300 transition-colors cursor-default">[REMOTE_FIRST]</span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,255,255,0.05)]"></div>
    </div>
  );
}
