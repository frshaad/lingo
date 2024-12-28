'use client';

import 'react-circular-progressbar/dist/styles.css';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

type Props = {
  percentage: number;
  children: React.ReactNode;
};

export default function LessonProgress({ percentage, children }: Props) {
  return (
    <CircularProgressbarWithChildren
      value={Number.isNaN(percentage) ? 0 : percentage}
      styles={{
        path: { stroke: '#4ade80' },
        trail: { stroke: '#e5e7eb' },
      }}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
}
