import { RefreshCcw, Terminal, AlertTriangle } from 'lucide-react';

interface MatchResultFailProps {
  onRestart?: () => void;
}

export default function MatchResultFail({ onRestart }: MatchResultFailProps) {
  return (
    <div className="flex flex-col h-full w-full bg-[#0a0005] text-red-500 rounded-none shadow-[0_0_30px_rgba(255,0,60,0.15)] overflow-hidden relative border border-red-500/30 font-mono">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>

      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 0, 60, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 60, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-600 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-900 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center space-y-8">

        {/* Glitching Alert Icon */}
        <div className="relative group mt-4">
          <div className="absolute inset-0 bg-red-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          <AlertTriangle className="w-20 h-20 text-red-500 relative z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
        </div>

        <div className="space-y-4 w-full">
          <div className="relative inline-block">
            <h1 className="text-3xl lg:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-red-500 uppercase" style={{ textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
              SYSTEM_FAILURE
            </h1>
          </div>
          <div className="space-y-2 border-l-2 border-red-500/50 pl-4 text-left backdrop-blur-sm bg-red-950/20 py-2">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
              NEURAL_LINK_SEVERED
            </p>
            <p className="text-red-300/80 text-[10px] leading-relaxed uppercase tracking-wider">
              <span className="text-red-500 mr-2">{`>`}</span>
              Warning: Sub-optimal neural sync.
              <br />
              <span className="text-pink-500 mr-2">{`>`}</span>
              Proceeding without this unit may compromise mission constraints.
            </p>
          </div>
        </div>

        {/* Diagnostics Recap */}
        <div className="w-full bg-black/60 rounded-none p-4 backdrop-blur-md border border-red-500/30 shadow-[inset_0_0_15px_rgba(255,0,0,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 text-left mb-3">
            <Terminal className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] text-red-400 uppercase tracking-widest">root@override:~/diagnostics</span>
          </div>
          <ul className="text-[10px] text-left space-y-2 text-red-300 uppercase tracking-widest w-full">
            <li className="flex items-center gap-2">
              <span className="text-red-500 font-bold">[ERR]</span> <span className="truncate">CYBERNETICS: OFFLINE</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500 font-bold">[ERR]</span> <span className="truncate">ICE_BREAKER: FAILED</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500 font-bold">[ERR]</span> <span className="truncate">STABILITY: COMPROMISED</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="group relative w-full py-4 mt-4 bg-transparent text-red-500 font-bold tracking-widest overflow-hidden transition-all hover:text-black border border-red-500 hover:border-transparent text-[10px] uppercase flex items-center justify-center cursor-pointer"
        >
          {/* Neon hover effect */}
          <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>

          <div className="relative z-10 flex items-center gap-3">
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>INITIATE_REBOOT</span>
          </div>

          {/* Cyberpunk accent corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500 z-10 group-hover:border-black transition-colors"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500 z-10 group-hover:border-black transition-colors"></div>
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(255,0,0,0.1)]"></div>
    </div>
  );
}
