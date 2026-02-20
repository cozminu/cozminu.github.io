import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface IntroCardProps {
  data: {
    name: string;
    label: string;
    experience: string;
    langs: string[];
    [key: string]: any;
  };
}

const IntroCard: React.FC<IntroCardProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden rounded-3xl" draggable={false}>
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={isDark ? 'profile_dark.jpg' : 'profile.jpg'}
          alt={data.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-8 text-white text-left">
        <div className="mt-auto mb-8">
          {/* Name & Title */}
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{data.name}</h1>
          <div className="flex flex-col gap-1 mb-4">
            <p className="text-xl text-indigo-300 font-semibold">{data.label}</p>
            <p className="text-gray-400 font-medium text-sm">{data.experience}</p>
          </div>

          {/* Languages */}
          <div>
            <div className="flex flex-wrap gap-2">
              {data.langs.map((lang: string) => (
                <span key={lang} className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-70">
          <p className="text-gray-400 italic text-xs animate-pulse">
            &larr; Swipe to explore &rarr;
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
