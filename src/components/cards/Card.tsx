import { useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CardData } from '../../types/resume';
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
  triggerSuperLike: () => Promise<void>;
}

const Card = forwardRef<CardRef, CardProps>(({ data, onSwipe, index }, ref) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const isFront = index === 0;

  useImperativeHandle(ref, () => ({
    triggerSwipe: async (direction: 'left' | 'right') => {
      const targetX = direction === 'right' ? 500 : -500;
      await controls.start({ x: targetX, opacity: 0, transition: { duration: 0.5 } });
      onSwipe(direction);
    },
    triggerSuperLike: async () => {
      await controls.start({
        x: window.innerWidth ? window.innerWidth + 200 : 800,
        y: -400,
        rotate: 30,
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.5, ease: "easeIn" }
      });
      // Not calling onSwipe here as the parent manages advancing state
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

  const glowShadow = useTransform(x,
    [-150, -50, 0, 50, 150],
    [
      '0 0 30px rgba(239, 68, 68, 1)',
      '0 0 10px rgba(239, 68, 68, 0.7)',
      '0 0 0px rgba(0, 0, 0, 0)',
      '0 0 10px rgba(6, 182, 212, 0.7)',
      '0 0 30px rgba(6, 182, 212, 1)'
    ]
  );

  const borderColor = useTransform(x,
    [-150, -50, 0, 50, 150],
    [
      'rgba(239, 68, 68, 1)', // Red
      'rgba(239, 68, 68, 0.5)',
      'rgba(6, 182, 212, 0.3)', // Default cyan border
      'rgba(6, 182, 212, 0.7)',
      'rgba(6, 182, 212, 1)'    // Cyan
    ]
  );

  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
        return <IntroCard data={data.data as Parameters<typeof IntroCard>[0]["data"]} />;

      case 'ABOUT':
        return <AboutCard />;

      case 'EXPERIENCE':
        return <ExpCard data={data.data as Parameters<typeof ExpCard>[0]["data"]} />;

      case 'PROJECTS':
        return <ProjectsCard data={data.data as Parameters<typeof ProjectsCard>[0]["data"]} />;

      case 'SKILLS':
        return <SkillsCard data={data.data as Parameters<typeof SkillsCard>[0]["data"]} />;
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
        boxShadow: isFront ? glowShadow : undefined,
        borderColor: isFront ? borderColor : 'rgba(6, 182, 212, 0.3)',
        touchAction: 'pan-y',
      }}
      animate={controls}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className={`absolute top-0 left-0 w-full h-full bg-white/30 dark:bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden border origin-bottom select-none
         ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      {/* Swipe Feedback Overlays */}
      {isFront && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-10 left-6 border-2 border-cyan-400 text-cyan-400 bg-cyan-950/90 rounded-none px-4 py-2 text-xl md:text-2xl font-black tracking-widest uppercase z-50 pointer-events-none transform -rotate-12 shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center gap-2 font-mono"
          >
            <span className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]">{`>`}</span> ACK
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-10 right-6 border-2 border-red-500 text-red-500 bg-red-950/90 rounded-none px-4 py-2 text-xl md:text-2xl font-black tracking-widest uppercase z-50 pointer-events-none transform rotate-12 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center gap-2 font-mono"
          >
            <span className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]">{`>`}</span> DROP
          </motion.div>
        </>
      )}

      {renderContent()}
    </motion.div>
  );
});

export default Card;