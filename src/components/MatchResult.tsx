import React from 'react';
import MatchResultSuccess from './MatchResultSuccess';
import MatchResultFail from './MatchResultFail';

import { ResumeData } from '../types/resume';

interface MatchResultProps {
  positiveSwipes?: number;
  totalSwipes?: number;
  onRestart?: () => void;
  profileData: ResumeData;
}

export default function MatchResult({ positiveSwipes = 0, totalSwipes = 0, onRestart, profileData }: MatchResultProps) {
  const matchPercentage = totalSwipes > 0 ? (positiveSwipes / totalSwipes) * 100 : 0;
  const isMatch = matchPercentage >= 50;

  if (isMatch) {
    return <MatchResultSuccess onRestart={onRestart} profileData={profileData} />;
  }

  return <MatchResultFail onRestart={onRestart} />;
}
