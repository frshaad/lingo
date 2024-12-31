/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import { type ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';

import QuizHeader from './quiz-header';

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
  userSubscription: any;
};

export default function Quiz({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <QuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  );
}
