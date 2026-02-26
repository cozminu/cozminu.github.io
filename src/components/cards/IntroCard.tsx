import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface IntroCardProps {
  data: {
    name: string;
    label: string;
    experience: string;
    langs: string[];
    [key: string]: unknown;
  };
}

const IntroCard: React.FC<IntroCardProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark' || true; // Force dark logic here visually

  return (
    <div className="flex flex-col h-full bg-[#030b14] relative overflow-hidden rounded-none text-cyan-500 font-mono shadow-[0_0_15px_rgba(0,255,255,0.1)]" draggable={false}>
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50 opacity-20"></div>

      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-70">
        <img
          src={isDark ? 'profile_dark.jpg' : 'profile.jpg'}
          alt={data.name}
          className="w-full h-full object-cover saturate-50 contrast-125"
          draggable={false}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030b14] via-[#030b14]/60 to-transparent" />
      </div>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 z-10"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-8 text-left">
        <div className="mt-auto mb-8 bg-black/40 backdrop-blur-sm p-4 border-l-2 border-cyan-500 shadow-[inset_0_0_15px_rgba(0,255,255,0.05)]">
          {/* Name & Title */}
          <h1 className="text-4xl font-black mb-2 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">{data.name}</h1>
          <div className="flex flex-col gap-1 mb-4">
            <p className="text-sm text-cyan-300 font-bold tracking-widest uppercase">
              <span className="text-purple-400 mr-2">{`>`}</span>
              {data.label}
            </p>
            <p className="text-cyan-500/70 font-medium text-[10px] tracking-widest uppercase">
              <span className="text-cyan-700 mr-2">SYS.UPTIME:</span>
              {data.experience}
            </p>
          </div>

          {/* Languages */}
          <div className="mt-4 pt-4 border-t border-cyan-500/30">
            <div className="flex flex-wrap gap-2">
              {data.langs.map((lang: string) => (
                <span key={lang} className="px-2 py-1 bg-cyan-950/40 text-cyan-400 text-[10px] tracking-widest uppercase font-bold border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors shadow-[0_0_5px_rgba(0,255,255,0.1)] cursor-default">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-70">
          <p className="text-cyan-500/50 uppercase tracking-widest text-[9px] animate-pulse flex items-center gap-2">
            <span className="text-cyan-400">&lt;&lt;</span> SWIPE_TO_INITIATE <span className="text-cyan-400">&gt;&gt;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
