'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { CourseProgressType, UserProgressType } from '@/db/queries';
import type { unit } from '@/db/schema';

type RequiredActiveCourse = Omit<
  NonNullable<UserProgressType>,
  'activeCourse'
> & {
  activeCourse: NonNullable<NonNullable<UserProgressType>['activeCourse']>;
};

export type LearnContextProviderProps = {
  userProgress: RequiredActiveCourse;
  units: (typeof unit.$inferSelect)[];
  courseProgress: NonNullable<CourseProgressType>;
  lessonPercentage: number;
};

const LearnContext = createContext<LearnContextProviderProps | null>(null);

export function LearnContextProvider({
  courseProgress,
  lessonPercentage,
  units,
  userProgress,
  children,
}: LearnContextProviderProps & { children: ReactNode }) {
  const [data] = useState(() => ({
    courseProgress,
    lessonPercentage,
    units,
    userProgress,
  }));

  return <LearnContext.Provider value={data}>{children}</LearnContext.Provider>;
}

export function useLearnContext(): LearnContextProviderProps {
  const context = useContext(LearnContext);
  if (!context) {
    throw new Error('useLearnContext must be used within LearnContextProvider');
  }
  return context;
}
