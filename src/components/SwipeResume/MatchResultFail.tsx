import React from 'react';

interface MatchResultFailProps {
  onRestart?: () => void;
}

export default function MatchResultFail({ onRestart }: MatchResultFailProps) {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="h-1/3 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2">It's not a Match...</h1>
        <p className="text-gray-300">That's fair.</p>
        <p className="text-gray-300">But first impressions can be incomplete.</p>
      </div>
      <div className="h-2/3 flex items-start justify-center p-6">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Take a Second Look
        </button>
      </div>
    </div>
  );
}
