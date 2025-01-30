'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { CourseProgressType, UserProgressType } from '@/db/queries';
import type { course, unit } from '@/db/schema';

export type LearnContextProviderProps = {
  userProgress: UserProgressType;
  units: (typeof unit.$inferSelect)[];
  courseProgress: CourseProgressType;
  lessonPercentage: number;
  activeCourse: typeof course.$inferSelect;
};

const LearnContext = createContext<LearnContextProviderProps | null>(null);

export function LearnContextProvider({
  courseProgress,
  lessonPercentage,
  units,
  activeCourse,
  userProgress,
  children,
}: LearnContextProviderProps & { children: ReactNode }) {
  const [data] = useState(() => ({
    courseProgress,
    lessonPercentage,
    units,
    userProgress,
    activeCourse,
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
