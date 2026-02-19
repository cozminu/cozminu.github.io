import React from 'react';
import { FileText, Github, Linkedin, Mail, RotateCcw } from 'lucide-react';
import profileData from '../../data/profile.json';
import { ResumeData } from '../../types/resume';

interface MatchResultSuccessProps {
  onRestart?: () => void;
}

export default function MatchResultSuccess({ onRestart }: MatchResultSuccessProps) {
  const data = profileData as unknown as ResumeData;
  const links = [
    {
      name: 'Email',
      url: `mailto:${data.basics.email}`,
      icon: <Mail className="w-6 h-6 text-red-500" />,
    },
    {
      name: 'LinkedIn',
      url: data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
      icon: <Linkedin className="w-6 h-6 text-blue-600" />,
    },
    {
      name: 'GitHub',
      url: data.basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
      icon: <Github className="w-6 h-6 text-gray-800 dark:text-white" />,
    },
    {
      name: 'Resume',
      url: '/Profile.pdf', // Assuming PDF is at root
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="h-1/3 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2">It's a Match!</h1>
        <p className="text-indigo-100">You seem interested. Let's connect.</p>
      </div>
      <div className="h-2/3 flex flex-col items-center justify-between p-6">
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {links.map((link: any) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
            >
              {link.icon}
              <span className="mt-2 font-medium text-sm">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Reset Button - No text, no borders */}
        <button
          onClick={onRestart}
          className="mt-4 p-3 text-white/70 hover:text-white transition-colors focus:outline-none"
          aria-label="Reset"
        >
          <RotateCcw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
