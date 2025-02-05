'use client';

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import { type StoreApi, createStore, useStore } from 'zustand';

import type { CourseProgressType, UserProgressType } from '@/db/queries';
import type { unit } from '@/db/schema';

type RequiredActiveCourse = Omit<
  NonNullable<UserProgressType>,
  'activeCourse'
> & {
  activeCourse: NonNullable<NonNullable<UserProgressType>['activeCourse']>;
};

export type LearnContext = {
  userProgress: RequiredActiveCourse;
  units: (typeof unit.$inferSelect)[];
  courseProgress: NonNullable<CourseProgressType>;
  lessonPercentage: number;
};

const LearnContext = createContext<StoreApi<LearnContext> | undefined>(
  undefined
);

export function LearnContextProvider({
  courseProgress,
  lessonPercentage,
  units,
  userProgress,
  children,
}: LearnContext & PropsWithChildren) {
  const [store] = useState(() =>
    createStore<LearnContext>(() => ({
      courseProgress,
      lessonPercentage,
      units,
      userProgress,
    }))
  );

  return (
    <LearnContext.Provider value={store}>{children}</LearnContext.Provider>
  );
}

export function useLearnContext(): LearnContext {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearnContext must be used within LearnContextProvider');
  }
  return useStore(context, (state) => state);
}
