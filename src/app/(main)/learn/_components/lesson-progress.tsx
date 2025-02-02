'use client';

import type { ReactNode } from 'react';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useLearnContext } from '../_context/learn-context';

export default function LessonProgress({ children }: { children: ReactNode }) {
  const { lessonPercentage } = useLearnContext();

  return (
    <CircularProgressbarWithChildren
      value={Number.isNaN(lessonPercentage) ? 0 : lessonPercentage}
      styles={{
        path: { stroke: '#4ade80' },
        trail: { stroke: '#e5e7eb' },
      }}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
}
