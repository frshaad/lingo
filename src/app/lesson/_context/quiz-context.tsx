'use client';

import { type ReactNode, createContext, useContext, useMemo } from 'react';

import type { QuizProviderProps, QuizState } from '@/types/quiz';

import { useQuiz } from '../_hooks/use-quiz';

type QuizContextType = QuizState & {
  userSubscription: unknown;
};

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({
  children,
  lessonId,
  startingHearts,
  completionProgress,
  challenges,
  userSubscription,
}: QuizProviderProps & { children: ReactNode }) {
  const quizState = useQuiz({
    lessonId,
    startingHearts,
    completionProgress,
    challenges,
  });

  const memoizedValue = useMemo(
    () => ({ ...quizState, userSubscription }),
    [quizState, userSubscription]
  );

  return (
    <QuizContext.Provider value={memoizedValue}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
}
