import { Code2, Cpu, Share2, Terminal, Zap, ShieldCheck } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface MatchResultSuccessProps {
  onRestart?: () => void;
  profileData: ResumeData;
}

export default function MatchResultSuccess({ onRestart, profileData }: MatchResultSuccessProps) {
  const data = profileData;
  const links = [
    {
      name: 'COMMS_LINK',
      url: `mailto:${data.basics.email}`,
      color: 'hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 border-cyan-500/30 text-cyan-500',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: 'CORP_NET',
      url: data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
      color: 'hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 border-blue-500/30 text-blue-500',
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      name: 'SOURCE_CODE',
      url: data.basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
      color: 'hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 border-purple-500/30 text-purple-500',
      icon: <Code2 className="w-5 h-5" />,
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#030b14] text-cyan-500 rounded-none shadow-[0_0_30px_rgba(0,255,255,0.15)] overflow-hidden relative border border-cyan-500/30 font-mono">
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

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-cyan-600 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-8 text-center overflow-y-auto overflow-x-hidden !scrollbar-hide">

        <div className="flex-1 flex flex-col items-center justify-center w-full space-y-5">
          {/* Success Icon */}
          <div className="relative group mt-2">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 group-hover:opacity-80 transition-opacity animate-pulse"></div>
            <ShieldCheck className="w-20 h-20 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-3xl lg:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 uppercase" style={{ textShadow: '0 0 15px rgba(0,255,255,0.3)' }}>
              UPLINK_ESTABLISHED
            </h1>
            <div className="border-l-2 border-cyan-500/50 pl-4 text-left backdrop-blur-sm bg-cyan-950/20 py-2">
              <p className="text-cyan-300/80 text-[10px] leading-relaxed uppercase tracking-wider">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Network intrusion successful.
                <br />
                <span className="text-purple-400 mr-2">{`>`}</span>
                Unit primed for deployment.
              </p>
            </div>
          </div>

          {/* Console Output */}
          <div className="w-full bg-black/60 rounded-none p-4 font-mono text-left border border-cyan-500/30 shadow-[inset_0_0_15px_rgba(0,255,255,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-500/30">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-500 tracking-widest uppercase text-xs">root@mainframe:~/deploy max-w-full</span>
            </div>
            <div className="space-y-2 opacity-90 text-[10px] tracking-widest uppercase w-full">
              <div className="flex gap-2">
                <span className="text-cyan-400 font-bold">[OK]</span>
                <span className="text-cyan-200 truncate">REQUISITE_SKILLS: VERIFIED</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-bold">[OK]</span>
                <span className="text-cyan-200 truncate">NEURAL_ALIGNMENT: OPTIMAL</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyan-400 font-bold">[OK]</span>
                <span className="text-cyan-200 truncate">COMBAT_RATING: MAX</span>
              </div>
              <div className="flex gap-2 mt-3 pt-2 border-t border-cyan-500/30 text-purple-400 font-bold">
                <span>{`>`} AWAITING_ORDERS</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-6 shrink-0">
          <div className="flex items-center gap-2 mb-3 before:h-px before:flex-1 before:bg-cyan-500/30 after:h-px after:flex-1 after:bg-cyan-500/30">
            <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold px-2 whitespace-nowrap">
              Select Protocol
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-3 rounded-none bg-black/40 border transition-all duration-300 group ${link.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity"></div>

                {/* Cyberpunk corners */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-50"></div>

                <div className="mb-2 group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_8px_currentColor]">
                  {link.icon}
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase">{link.name}</span>
              </a>
            ))}
          </div>

          <button
            onClick={onRestart}
            className="mt-6 text-[10px] text-cyan-600 hover:text-cyan-300 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 w-full py-3 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-950/30 rounded-none group relative overflow-hidden cursor-pointer"
          >
            {/* Cyberpunk accent lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 group-hover:bg-cyan-500/50 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/20 group-hover:bg-cyan-500/50 transition-colors"></div>

            <Cpu className="w-3 h-3 group-hover:rotate-90 transition-transform duration-500" />
            <span>TERMINATE_SESSION</span>
          </button>
        </div>
      </div>

    </div>
  );
}
