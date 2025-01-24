'use client';

import { type ReactNode, createContext, useContext } from 'react';

import type { QuizProviderProps, QuizState } from '@/types/quiz';
import { useQuiz } from '../_hooks/use-quiz';

type QuizContextType = QuizState & {
  userSubscription: unknown;
};

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({
  children,
  ...props
}: QuizProviderProps & { children: ReactNode }) {
  const quizState = useQuiz(props);
  const { userSubscription } = props;

  return (
    <QuizContext.Provider value={{ ...quizState, userSubscription }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
};
