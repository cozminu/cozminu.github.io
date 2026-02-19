import React, { useState, useMemo, useCallback, useRef } from 'react';
import CardStack, { CardStackRef } from './CardStack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import profileData from '../../data/profile.json';
import { transformResumeToCards } from '../../utils/resumeToCards';
import { ResumeData } from '../../types/resume';
import ThemeToggle from '../ThemeToggle'; // Adjust path if needed
import { motion } from 'framer-motion';

// Cast JSON to ResumeData to ensure types
const resumeData = profileData as unknown as ResumeData;

export default function SwipeResume() {
  const cards = useMemo(() => transformResumeToCards(resumeData), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0); // Keeping for potential future use
  const [history, setHistory] = useState<{ index: number; action: 'left' | 'right' }[]>([]);
  const cardStackRef = useRef<CardStackRef>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleSwipe = useCallback((id: string, direction: 'left' | 'right') => {
    // Add to history for undo
    setHistory(prev => [...prev, { index: currentIndex, action: direction }]);

    // Update score (simple logic: right swipe = interest)
    if (direction === 'right') {
      setScore(prev => prev + 10);
    }

    // Advance to next card
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const handleVote = useCallback(async (direction: 'left' | 'right') => {
    if (isSwiping || !cardStackRef.current) return;

    setIsSwiping(true);
    await cardStackRef.current.swipe(direction);
    setIsSwiping(false);
  }, [isSwiping]);

  const handleUndo = useCallback(() => {
    if (history.length === 0 || isSwiping) return;

    const lastAction = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastAction.index);

    if (lastAction.action === 'right') {
      setScore(prev => prev - 10);
    }
  }, [history, isSwiping]);

  // Restart handler
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setHistory([]);
  };

  const isFinished = currentIndex >= cards.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center z-10 relative">
        {!isFinished && <ProgressBar current={Math.min(currentIndex + 1, cards.length)} total={cards.length} />}

        <div className="my-8 w-full">
          {false ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/50 dark:border-white/10"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">You've reached the end!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">But let's be honest, I'm worth a second look. 😉</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition"
                >
                  Start Over
                </button>
                {/* Add download PDF button if needed here too */}
              </div>
            </motion.div>
          ) : (
            <CardStack
              ref={cardStackRef}
              cards={cards}
              currentIndex={currentIndex}
              onSwipe={handleSwipe}
              score={score}
              onRestart={handleRestart}
            />
          )}
        </div>

        {!isFinished && (
          <Controls
            onVote={handleVote}
            onUndo={handleUndo}
            canUndo={history.length > 0}
            disabled={isFinished || isSwiping}
          />
        )}
      </div>
    </div>
  );
}
