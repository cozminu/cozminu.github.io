import React, { useEffect } from 'react';
import { X, Heart, RotateCcw, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ControlsProps {
  onVote: (direction: 'left' | 'right') => void;
  onUndo: () => void;
  onSuperLike: () => void;
  canUndo: boolean;
  disabled: boolean;
}

export default function Controls({ onVote, onUndo, onSuperLike, canUndo, disabled }: ControlsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      if (e.key === 'ArrowLeft') {
        onVote('left');
      } else if (e.key === 'ArrowRight') {
        onVote('right');
      } else if (e.key === 'Backspace' && canUndo) {
        onUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onVote, onUndo, canUndo, disabled]);

  return (
    <div className="flex items-center gap-6 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onUndo}
        disabled={!canUndo || disabled}
        className={`p-4 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 transition-colors
          ${!canUndo || disabled ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-yellow-500 hover:text-yellow-600 hover:bg-white/60 dark:hover:bg-white/20'}`}
        aria-label="Undo"
      >
        <RotateCcw className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onVote('left')}
        disabled={disabled}
        className={`p-5 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:border-white/10 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'text-red-500 hover:text-red-600 hover:bg-white/60 dark:hover:bg-white/20'}`}
        aria-label="Pass"
      >
        <X className="w-8 h-8" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onVote('right')}
        disabled={disabled}
        className={`p-5 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:border-white/10 transition-colors
           ${disabled ? 'opacity-50 cursor-not-allowed' : 'text-green-500 hover:text-green-600 hover:bg-white/60 dark:hover:bg-white/20'}`}
        aria-label="Like"
      >
        <Heart className="w-8 h-8 fill-current" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSuperLike}
        disabled={disabled}
        className={`p-3 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'text-blue-500 hover:text-blue-600 hover:bg-white/60 dark:hover:bg-white/20'}`}
        aria-label="Super Like"
      >
        <Star className="w-6 h-6 fill-current" />
      </motion.button>
    </div>
  );
}
