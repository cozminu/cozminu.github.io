interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.min((current / total) * 100, 100);

  return (
    <div className="absolute top-0 left-0 w-full z-10 px-4">
      {/* Container with cyberpunk styling */}
      <div
        className="h-1.5 w-full max-w-[250px] mx-auto bg-gray-900/80 rounded-none overflow-hidden border border-cyan-500/30 relative shadow-[0_0_10px_rgba(0,255,255,0.1)]"
      >
        {/* Glow behind progress bar */}
        <div className="absolute inset-0 bg-cyan-900/20 blur-sm pointer-events-none" />

        {/* The actual fill */}
        <div
          className="h-full bg-cyan-400 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(34,211,238,0.8)] relative"
          style={{ width: `${progress}%` }}
        >
          {/* Highlight element on the leading edge */}
          <div className="absolute top-0 right-0 bottom-0 w-2 bg-white blur-[1px] opacity-70" />
        </div>

        {/* Cyberpunk ticks/markers */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-px bg-cyan-100" />
          ))}
        </div>
      </div>

      {/* Text Readout */}
      <div className="w-full max-w-[250px] mx-auto mt-1 flex justify-between px-1">
        <span className="text-[8px] font-mono text-cyan-500/70 uppercase tracking-widest">
          SYS_SCAN
        </span>
        <span className="text-[8px] font-mono text-cyan-400 font-bold tracking-wider">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
