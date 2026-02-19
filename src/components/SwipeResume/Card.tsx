import React, { useContext, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CardData } from '../../types/resume';
import { ThemeContext } from '../../context/ThemeContext';
import AboutCard from './AboutCard';
import SkillsCard from './SkillsCard';
import ExpCard from './ExpCard';
import ProjectsCard from './ProjectsCard';

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
        return <AboutCard data={data.data} />;

      case 'EXPERIENCE':
        return <ExpCard data={data.data} />;

      case 'PROJECTS':
        return <ProjectsCard data={data.data} />;

      case 'SKILLS':
        return <SkillsCard data={data.data} />;

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