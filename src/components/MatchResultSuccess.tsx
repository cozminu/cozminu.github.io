import { CheckCircle, Code2, Rocket, Share2, Terminal, Zap } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface MatchResultSuccessProps {
  onRestart?: () => void;
  profileData: ResumeData;
}

export default function MatchResultSuccess({ onRestart, profileData }: MatchResultSuccessProps) {
  const data = profileData;
  const links = [
    {
      name: 'Email',
      url: `mailto:${data.basics.email}`,
      color: 'hover:bg-red-50 dark:hover:bg-red-500/20 hover:border-red-200 dark:hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
      color: 'hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:border-blue-200 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400',
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      name: 'GitHub',
      url: data.basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
      color: 'hover:bg-slate-100 dark:hover:bg-slate-500/20 hover:border-slate-300 dark:hover:border-slate-500/50 hover:text-slate-900 dark:hover:text-slate-300',
      icon: <Code2 className="w-5 h-5" />,
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-xl overflow-hidden relative border border-slate-200 dark:border-slate-800">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 dark:bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-8 text-center">

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {/* Success Icon */}
          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-6 rounded-full ring-1 ring-emerald-100 dark:ring-emerald-500/30 backdrop-blur-sm animate-pulse-slow">
            <Rocket className="w-16 h-16 text-emerald-500 dark:text-emerald-400" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">
              Build Succeeded!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-xs mx-auto text-sm leading-relaxed">
              All systems operational. Candidate is ready for deployment to your team.
            </p>
          </div>

          {/* Console Output */}
          <div className="w-full max-w-[280px] bg-slate-50 dark:bg-slate-950/50 rounded-lg p-4 font-mono text-xs text-left border border-slate-200 dark:border-slate-800/50 shadow-sm dark:shadow-inner">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Terminal className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span className="text-slate-500 dark:text-slate-500">ci/cd output</span>
            </div>
            <div className="space-y-2 opacity-90">
              <div className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600 dark:text-slate-300">Technical Skills Verified</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600 dark:text-slate-300">Culture Fit Check Passed</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-slate-600 dark:text-slate-300">High Impact Potential</span>
              </div>
              <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/50 text-emerald-600 dark:text-emerald-400 font-bold">
                <span>{`>`} Ready to Merge</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold dark:font-semibold mb-3">
            Select Deployment Target
          </p>

          <div className="grid grid-cols-3 gap-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-all duration-300 group ${link.color} hover:shadow-md`}
              >
                <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800/80 mb-2 group-hover:scale-110 transition-transform text-slate-600 dark:text-slate-400">
                  {link.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 dark:opacity-70 font-medium">{link.name}</span>
              </a>
            ))}
          </div>

          <button
            onClick={onRestart}
            className="mt-6 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex items-center justify-center gap-2 w-full py-2 hover:bg-slate-100 dark:hover:bg-slate-800/30 rounded-lg font-medium"
          >
            <CheckCircle className="w-3 h-3" />
            <span>Re-run Pipeline (Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
