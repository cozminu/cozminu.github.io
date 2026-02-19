import React, { useContext } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CardData } from '../../types/resume';
import { MapPin, Calendar, Building } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface CardProps {
  data: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number; // 0 = front, 1 = second, etc.
  score?: number;
  onRestart?: () => void;
}

export default function Card({ data, onSwipe, index, score, onRestart }: CardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const isFront = index === 0;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Visual stacking logic
  const scale = 1 - index * 0.05;
  const y = index * 10; // Move back cards down slightly
  const zIndex = 100 - index;
  const opacityVal = 1 - index * 0.2; // Fade out back cards

  // Rotation based on x position (only for front card)
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Background color opacity for swipe feedback
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, 0], [1, 0]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
      onSwipe('left');
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 500, damping: 50 } });
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case 'INTRO':
        return (
          <div className="flex flex-col h-full bg-white dark:bg-zinc-900" draggable={false}>
            {/* Top Half: Image */}
            <div className="h-6/10 w-full relative shrink-0">
              <img
                src={isDark ? 'profile_dark.jpg' : 'profile.jpg'}
                alt={data.data.name}
                className="w-full h-full object-cover"
                draggable={false} // Prevent image drag interfering with card drag
              />
              {false && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 md:hidden">
                {/* Mobile overlay text if needed */}
              </div>}
            </div>

            {/* Bottom Half: Content */}
            <div className="h-auto flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{data.data.name}</h1>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{data.data.label}</p>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{data.data.location.city}, {data.data.location.region}</span>
              </div>
              <div className="flex">
                <p className="text-gray-500 dark:text-gray-400 italic text-sm animate-pulse">
                  &larr; Swipe to explore &rarr;
                </p>
              </div>
            </div>
          </div>
        );

      case 'ABOUT':
        return (
          <div className="flex flex-col h-full p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">About Me</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {data.data.summary}
            </p>
          </div>
        );

      case 'EXPERIENCE':
        const job = data.data;
        const startYear = new Date(job.startDate).getFullYear();
        const endYear = job.endDate ? new Date(job.endDate).getFullYear() : 'Present';

        return (
          <div className="flex flex-col h-full p-6 relative">
            <div className="mb-4">
              <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">Experience</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{job.position}</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
                <Building className="w-4 h-4 mr-1" />
                <span className="font-medium mr-3">{job.name}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{startYear} - {endYear}</span>
              </div>
            </div>

            <ul className="space-y-3 flex-1 overflow-y-auto custom-scrollbar mb-4">
              {job.highlights.map((highlight: string, i: number) => (
                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
                  <span className="mr-2 text-indigo-500 mt-1">•</span>
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Technologies Footer */}
            {job.technologies && (
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-md font-medium border border-indigo-100 dark:border-indigo-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'PROJECTS':
        const project = data.data;
        return (
          <div className="flex flex-col h-full">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 relative shrink-0">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              </div>
            </div>
            <div className="p-6 flex-1">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.keywords.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs rounded font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                {project.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'SKILLS':
        return (
          <div className="flex flex-col h-full p-6 overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.data.map((skill: any) => (
                <div key={skill.name} className="flex flex-col items-center px-3 py-2 bg-white dark:bg-zinc-800 rounded-lg grow shadow-sm border border-gray-100 dark:border-zinc-700">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{skill.name}</span>
                  <span className="text-xs text-indigo-500 font-medium">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'MATCH':
        return null; // Match card is handled by CardStack overlay logic if needed, or we can render a placeholder
    }


  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate: isFront ? rotate : 0,
        zIndex,
        scale,
        opacity: isFront ? opacity : opacityVal,
        touchAction: (data.type === 'INTRO' || data.type === 'MATCH') ? 'none' : 'pan-y',
      }}
      animate={controls}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className={`absolute top-0 left-0 w-full h-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 origin-bottom select-none
         ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      {/* Swipe Feedback Overlays */}
      {isFront && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 border-4 border-green-500 text-green-500 rounded-lg px-4 py-2 text-4xl font-bold tracking-widest uppercase z-50 pointer-events-none transform -rotate-12 bg-white/20 backdrop-blur-sm"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 border-4 border-red-500 text-red-500 rounded-lg px-4 py-2 text-4xl font-bold tracking-widest uppercase z-50 pointer-events-none transform rotate-12 bg-white/20 backdrop-blur-sm"
          >
            NOPE
          </motion.div>
        </>
      )}

      {renderContent()}
    </motion.div>
  );
}