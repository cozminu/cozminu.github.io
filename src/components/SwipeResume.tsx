import { useState, useMemo, useCallback, useRef } from 'react';
import CardStack, { CardStackRef } from './cards/CardStack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import profileData from '../data/profile.json';
import { transformResumeToCards } from '../utils/resumeToCards';
import { ResumeData } from '../types/resume';

// Cast JSON to ResumeData to ensure types
const resumeData = profileData as unknown as ResumeData;

export default function SwipeResume() {
  const cards = useMemo(() => transformResumeToCards(resumeData), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{ index: number; action: 'left' | 'right' }[]>([]);
  const cardStackRef = useRef<CardStackRef>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isSuperLiked, setIsSuperLiked] = useState(false);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    // Add to history for undo
    setHistory(prev => [...prev, { index: currentIndex, action: direction }]);
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
  }, [history, isSwiping]);

  const handleSuperLike = useCallback(async () => {
    if (isSwiping || !cardStackRef.current) return;

    setIsSwiping(true);
    await cardStackRef.current.superLike();

    setIsSuperLiked(true);
    setCurrentIndex(cards.length);
    setIsSwiping(false);
  }, [cards.length, isSwiping]);

  // Restart handler
  const handleRestart = () => {
    setCurrentIndex(0);
    setHistory([]);
    setIsSuperLiked(false);
  };

  const isFinished = currentIndex >= cards.length;

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">

      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      {/* Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-900/40 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-900/40 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center z-10 relative">
        {!isFinished && <ProgressBar current={Math.min(currentIndex + 1, cards.length)} total={cards.length} />}

        <div className="my-8 w-full">
          <CardStack
            ref={cardStackRef}
            cards={cards}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
            positiveSwipes={isSuperLiked ? cards.length : history.filter(h => h.action === 'right').length}
            totalSwipes={isSuperLiked ? cards.length : history.length}
            onRestart={handleRestart}
            profileData={resumeData}
          />
        </div>

        {!isFinished && (
          <Controls
            onVote={handleVote}
            onUndo={handleUndo}
            onSuperLike={handleSuperLike}
            canUndo={history.length > 0}
            disabled={isFinished || isSwiping}
          />
        )}
      </div>
    </div>
  );
}
