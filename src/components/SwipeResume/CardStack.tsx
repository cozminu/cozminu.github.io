import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import { CardData, ResumeData } from '../../types/resume';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import profileData from '../../data/profile.json';

interface CardStackProps {
  cards: CardData[];
  onSwipe: (id: string, direction: 'left' | 'right') => void;
  currentIndex: number;
  score?: number;
  onRestart?: () => void;
}

export default function CardStack({ cards, onSwipe, currentIndex, score, onRestart }: CardStackProps) {
  // We show up to 3 cards for stack effect
  const visibleCards = cards.slice(currentIndex, currentIndex + 3).reverse();
  const data = profileData as unknown as ResumeData;
  const links = [
    {
      name: 'Email',
      url: `mailto:${data.basics.email}`,
      icon: <Mail className="w-6 h-6 text-red-500" />,
    },
    {
      name: 'LinkedIn',
      url: data.basics.profiles.find(p => p.network === 'LinkedIn')?.url || '#',
      icon: <Linkedin className="w-6 h-6 text-blue-600" />,
    },
    {
      name: 'GitHub',
      url: data.basics.profiles.find(p => p.network === 'GitHub')?.url || '#',
      icon: <Github className="w-6 h-6 text-gray-800 dark:text-white" />,
    },
    {
      name: 'Resume',
      url: '/Profile.pdf', // Assuming PDF is at root
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
    }
  ];

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
              score={score}
              onRestart={onRestart}
            />
          );
        })}
      </AnimatePresence>

      {currentIndex >= cards.length && (
        (score !== undefined && score < 40) ?
          (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8 bg-gradient-to-br from-gray-700 to-gray-900 text-white">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">It's not a Match...</h1>
                <p className="text-gray-300">That's fair.</p>
                <p className="text-gray-300">But first impressions can be incomplete.</p>
              </div>
              <button
                onClick={onRestart}
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Take a Second Look
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">It's a Match!</h1>
                <p className="text-indigo-100">You seem interested. Let's connect.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {links.map((link: any) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                  >
                    {link.icon}
                    <span className="mt-2 font-medium text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
