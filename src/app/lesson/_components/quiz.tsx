/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { type ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';

import { useQuiz } from '../_hooks/use-quiz';
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
  initialPercentage,
  userSubscription,
}: Props) {
  const {
    hearts,
    percentage,
    currentChallengeOptions,
    title,
    currentChallenge,
  } = useQuiz({
    initialHearts,
    initialLessonChallenges,
    initialPercentage,
  });

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
