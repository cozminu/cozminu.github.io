import { useEffect } from 'react';
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
    <div className="flex items-center gap-6 mt-8 relative z-10 w-full justify-center">
      {/* Decorative scanline behind controls */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 -z-10 pointer-events-none" />

      {/* Undo Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onUndo}
        disabled={!canUndo || disabled}
        className={`relative group p-4 rounded-none border transition-all duration-300 overflow-hidden
          ${!canUndo || disabled
            ? 'border-gray-800 bg-gray-900/50 text-gray-700 cursor-not-allowed opacity-50'
            : 'border-yellow-500/50 bg-black/60 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] shadow-[inset_0_0_10px_rgba(234,179,8,0.1)]'
          }`}
        aria-label="Undo"
      >
        {!canUndo && disabled ? null : (
          <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        )}
        <RotateCcw className="w-5 h-5 relative z-10" />
      </motion.button>

      {/* Pass (X) Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onVote('left')}
        disabled={disabled}
        className={`relative group p-5 rounded-none border transition-all duration-300 overflow-hidden
          ${disabled
            ? 'border-gray-800 bg-gray-900/50 text-gray-700 cursor-not-allowed opacity-50'
            : 'border-red-500/50 bg-black/80 text-red-500 hover:border-red-400 hover:text-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] shadow-[inset_0_0_15px_rgba(239,68,68,0.15)]'
          }`}
        aria-label="Pass"
      >
        {!disabled && (
          <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        )}
        <X className="w-7 h-7 relative z-10" />
      </motion.button>

      {/* Like (Heart) Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onVote('right')}
        disabled={disabled}
        className={`relative group p-5 rounded-none border transition-all duration-300 overflow-hidden
           ${disabled
            ? 'border-gray-800 bg-gray-900/50 text-gray-700 cursor-not-allowed opacity-50'
            : 'border-cyan-500/50 bg-black/80 text-cyan-500 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] shadow-[inset_0_0_15px_rgba(6,182,212,0.15)]'
          }`}
        aria-label="Like"
      >
        {!disabled && (
          <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        )}
        <Heart className="w-7 h-7 fill-transparent group-hover:fill-cyan-500/20 transition-colors relative z-10" />
      </motion.button>

      {/* Super Like Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSuperLike}
        disabled={disabled}
        className={`relative group p-4 rounded-none border transition-all duration-300 overflow-hidden
          ${disabled
            ? 'border-gray-800 bg-gray-900/50 text-gray-700 cursor-not-allowed opacity-50'
            : 'border-blue-500/50 bg-black/60 text-blue-500 hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]'
          }`}
        aria-label="Super Like"
      >
        {!disabled && (
          <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        )}
        <Star className="w-5 h-5 fill-transparent group-hover:fill-blue-500/20 transition-colors relative z-10" />
      </motion.button>
    </div>
  );
}
