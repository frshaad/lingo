'use client';

import type { PopulatedUnit } from '@/types/db';

import LessonButton from './lesson-button';
import UnitBanner from './unit-banner';

export default function UnitComponent({
  title,
  description,
  lessons,
}: PopulatedUnit) {
  return (
    <>
      <UnitBanner description={description} title={title} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => (
          <LessonButton
            index={index}
            key={lesson.id}
            totalLessonsCount={lessons.length - 1}
            {...lesson}
          />
        ))}
      </div>
    </>
  );
}
