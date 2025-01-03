/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import { type ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';

import ChallengeOptions from './challenge-options';
import QuestionBubble from './question-bubble';
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
  const [challenges, setChallenges] = useState(initialLessonChallenges);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
    const firstUncompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.isCompleted,
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

  return (
    <>
      <QuizHeader
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <article className="mx-auto flex size-full flex-col items-center justify-center gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
        <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
          {title}
        </h1>
        <div className="w-full">
          {currentChallenge.type === 'ASSIST' && (
            <QuestionBubble question={currentChallenge.question} />
          )}
          <ChallengeOptions
            options={currentChallengeOptions}
            onSelect={() => {}}
            status="none"
            isDisabled={false}
            type={currentChallenge.type}
          />
        </div>
      </article>
    </>
  );
}
