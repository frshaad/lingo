'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { StoreApi } from 'zustand';
import { createStore, useStore } from 'zustand';

import type { userSubscription } from '@/db/schema';
import type { QuizProviderProperties, UseQuizData } from '@/types/quiz';

import { useQuiz } from '../_hooks/use-quiz';

type QuizContextType = UseQuizData & {
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isSubscriptionActive: boolean;
      })
    | undefined;
};

const QuizContext = createContext<StoreApi<QuizContextType> | undefined>(
  undefined
);

export function QuizProvider({
  children,
  lessonId,
  startingHearts,
  completionProgress,
  challenges,
  userSubscription,
}: QuizProviderProperties & PropsWithChildren) {
  const quizState = useQuiz({
    lessonId,
    startingHearts,
    completionProgress,
    challenges,
  });

  const [store] = useState(() =>
    createStore<QuizContextType>(() => ({
      ...quizState,
      userSubscription,
    }))
  );

  useEffect(() => {
    store.setState({
      ...quizState,
      userSubscription,
    });
  }, [store, quizState, userSubscription]);

  return <QuizContext.Provider value={store}>{children}</QuizContext.Provider>;
}

export function useQuizContext(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return useStore(context, (state) => state);
}
