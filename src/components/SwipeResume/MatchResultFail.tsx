import React from 'react';
import { Bug, Code2, RefreshCcw, Terminal } from 'lucide-react';

interface MatchResultFailProps {
  onRestart?: () => void;
}

export default function MatchResultFail({ onRestart }: MatchResultFailProps) {
  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100 dark:bg-red-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-100 dark:bg-indigo-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center space-y-8">

        {/* Playful Error State */}
        <div className="bg-red-50 dark:bg-red-500/10 p-6 rounded-full ring-1 ring-red-100 dark:ring-red-500/30 backdrop-blur-sm animate-bounce-slow">
          <Bug className="w-16 h-16 text-red-500 dark:text-red-500" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500 dark:from-red-400 dark:to-amber-400">
            Runtime Error: 404
          </h1>
          <div className="space-y-2">
            <p className="text-xl font-medium text-slate-800 dark:text-slate-200">
              Match Not Found
            </p>
            <p className="text-slate-600 dark:text-slate-400 max-w-xs mx-auto text-sm leading-relaxed">
              <span className="font-mono text-red-500 dark:text-red-400">{`> `}</span>
              System detected a potential missed opportunity.
              <br />
              <span className="font-mono text-indigo-500 dark:text-indigo-400">{`> `}</span>
              Are you sure you want to deploy to production without this candidate?
            </p>
          </div>
        </div>

        {/* Stats/Funny recap */}
        <div className="w-full max-w-[280px] bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-4 backdrop-blur-md border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center gap-3 text-left mb-2">
            <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">console.log(missedFeatures)</span>
          </div>
          <ul className="text-sm text-left space-y-2 text-slate-700 dark:text-slate-300 font-mono">
            <li className="flex items-center gap-2">
              <span className="text-red-500 dark:text-red-400">✖</span> 10x Developer Energy
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500 dark:text-red-400">✖</span> Clean Code Guarantee
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500 dark:text-red-400">✖</span> Friday Deploy Confidence
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="group relative px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold font-mono shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>Debug Decision</span>
        </button>
      </div>

      {/* Code decoration at bottom */}
      <div className="absolute bottom-4 right-4 opacity-5 dark:opacity-20">
        <Code2 className="w-24 h-24 text-slate-900 dark:text-slate-500" />
      </div>
    </div>
  );
}
