import React, { useContext, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CardData } from '../../types/resume';
import { Calendar, Building } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

interface CardProps {
  data: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number; // 0 = front, 1 = second, etc.
  score?: number;
  onRestart?: () => void;
}

export interface CardRef {
  triggerSwipe: (direction: 'left' | 'right') => Promise<void>;
}

const Card = forwardRef<CardRef, CardProps>(({ data, onSwipe, index, score, onRestart }, ref) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const isFront = index === 0;
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useImperativeHandle(ref, () => ({
    triggerSwipe: async (direction: 'left' | 'right') => {
      const targetX = direction === 'right' ? 500 : -500;
      await controls.start({ x: targetX, opacity: 0, transition: { duration: 0.4 } });
      onSwipe(direction);
    }
  }));

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
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.4 } });
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.4 } });
      onSwipe('left');
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 500, damping: 50 } });
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case 'INTRO':
        return (
          <div className="flex flex-col h-full bg-black relative overflow-hidden rounded-3xl" draggable={false}>
            {/* Full Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={isDark ? 'profile_dark.jpg' : 'profile.jpg'}
                alt={data.data.name}
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
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{data.data.name}</h1>
                <div className="flex flex-col gap-1 mb-4">
                  <p className="text-xl text-indigo-300 font-semibold">{data.data.label}</p>
                  <p className="text-gray-400 font-medium text-sm">{data.data.experience}</p>
                </div>

                {/* Languages */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {data.data.langs.map((lang: string) => (
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

            <ul className="space-y-3 flex-1 mb-4">
              {job.highlights.map((highlight: string, i: number) => (
                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
                  <span className="mr-2 text-indigo-500 mt-1">•</span>
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Footer: Technologies & History */}
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
              {job.technologies && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.technologies.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-white/40 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 text-xs rounded-md font-medium border border-white/20 dark:border-white/10 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Past Experience Hint */}
              {job.pastExperience && job.pastExperience.count > 0 && (
                <div className="flex items-center justify-start opacity-60 hover:opacity-100 transition-opacity">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-semibold">
                    + {job.pastExperience.count} previous roles since {job.pastExperience.oldestYear}
                  </p>
                </div>
              )}
            </div>
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
            <div className="p-6 flex-1 flex flex-col relative">
              <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase mb-2 block">Project</span>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

              <div className="space-y-2 flex-grow mb-4">
                {project.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {h}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-white/40 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 text-xs rounded font-medium border border-white/20 dark:border-white/10 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'SKILLS':
        return (
          <div className="flex flex-col h-full p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">Technical Depth</h2>
            <div className="space-y-6">
              {data.data.map((category: any) => (
                <div key={category.category}>
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-white/40 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-sm rounded-md font-medium border border-white/20 dark:border-white/10 shadow-sm backdrop-blur-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
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
      className={`absolute top-0 left-0 w-full h-full bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 dark:border-white/10 origin-bottom select-none
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
});

export default Card;