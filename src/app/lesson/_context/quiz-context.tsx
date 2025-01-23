'use client';

import { type ReactNode, createContext, useContext } from 'react';

import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';
import { useQuiz } from '../_hooks/use-quiz';

type QuizContextType = ReturnType<typeof useQuiz> & {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userSubscription: any;
};

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({
  children,
  initialHearts,
  initialLessonChallenges,
  initialPercentage,
  userSubscription,
}: {
  children: ReactNode;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userSubscription: any;
}) {
  const quizState = useQuiz({
    initialHearts,
    initialLessonChallenges,
    initialPercentage,
  });

  return (
    <QuizContext.Provider value={{ ...quizState, userSubscription }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
}
