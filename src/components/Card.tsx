import { useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CardData } from '../types/resume';
import AboutCard from './AboutCard';
import SkillsCard from './SkillsCard';
import ExpCard from './ExpCard';
import ProjectsCard from './ProjectsCard';
import IntroCard from './IntroCard';

interface CardProps {
  data: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number; // 0 = front, 1 = second, etc.
}

export interface CardRef {
  triggerSwipe: (direction: 'left' | 'right') => Promise<void>;
}

const Card = forwardRef<CardRef, CardProps>(({ data, onSwipe, index }, ref) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const isFront = index === 0;

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
    event;
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
        return <IntroCard data={data.data} />;

      case 'ABOUT':
        return <AboutCard />;

      case 'EXPERIENCE':
        return <ExpCard data={data.data} />;

      case 'PROJECTS':
        return <ProjectsCard data={data.data} />;

      case 'SKILLS':
        return <SkillsCard data={data.data} />;
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