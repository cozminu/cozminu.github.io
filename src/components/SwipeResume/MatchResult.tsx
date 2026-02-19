import React from 'react';
import MatchResultSuccess from './MatchResultSuccess';
import MatchResultFail from './MatchResultFail';

interface MatchResultProps {
  positiveSwipes?: number;
  totalSwipes?: number;
  onRestart?: () => void;
}

export default function MatchResult({ positiveSwipes = 0, totalSwipes = 0, onRestart }: MatchResultProps) {
  const matchPercentage = totalSwipes > 0 ? (positiveSwipes / totalSwipes) * 100 : 0;
  const isMatch = matchPercentage >= 50;

  if (isMatch) {
    return <MatchResultSuccess onRestart={onRestart} />;
  }

  return <MatchResultFail onRestart={onRestart} />;
}
