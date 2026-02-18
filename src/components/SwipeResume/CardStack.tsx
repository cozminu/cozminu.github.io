import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import { CardData } from '../../types/resume';

interface CardStackProps {
  cards: CardData[];
  onSwipe: (id: string, direction: 'left' | 'right') => void;
  currentIndex: number;
}

export default function CardStack({ cards, onSwipe, currentIndex }: CardStackProps) {
  // We show up to 3 cards for stack effect
  const visibleCards = cards.slice(currentIndex, currentIndex + 3).reverse();

  return (
    <div className="relative w-full max-w-sm h-[600px] sm:h-[700px] perspective-1000">
      <AnimatePresence>
        {visibleCards.map((card, idx) => {
          // visibleCards is reversed, so the last element is the front one (index 0 for Card)
          // If we have [Card3, Card2, Card1], then Card1 is last.
          // Index logic:
          // If visibleCards length is 3 (full stack):
          // idx 0 = Card3 (back) -> index 2
          // idx 1 = Card2 (middle) -> index 1
          // idx 2 = Card1 (front) -> index 0

          const stackIndex = visibleCards.length - 1 - idx;

          return (
            <Card
              key={card.id}
              data={card}
              onSwipe={(dir) => onSwipe(card.id, dir)}
              index={stackIndex}
            />
          );
        })}
      </AnimatePresence>

      {false && currentIndex >= cards.length && (
        <div className="flex items-center justify-center h-full text-zinc-500">
          No more cards. Refresh to start over.
        </div>
      )}
    </div>
  );
}
