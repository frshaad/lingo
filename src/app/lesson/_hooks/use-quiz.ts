import { useState } from 'react';

import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';

type Args = {
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
};

export function useQuiz({
  initialHearts,
  initialLessonChallenges,
  initialPercentage,
}: Args) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
    const firstUncompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.isCompleted
    );
    return firstUncompletedChallengeIndex === -1
      ? 0
      : firstUncompletedChallengeIndex;
  });

  const currentChallenge = challenges[activeChallengeIndex];
  const currentChallengeOptions = currentChallenge.challengeOptions ?? [];
  const title =
    currentChallenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : currentChallenge.question;

  return {
    title,
    currentChallengeOptions,
    hearts,
    currentChallenge,
    percentage,
    setHearts,
    setPercentage,
    setChallenges,
    setActiveChallengeIndex,
  };
}
