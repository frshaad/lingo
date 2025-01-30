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
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => (
          <LessonButton
            key={lesson.id}
            totalLessonsCount={lessons.length - 1}
            index={index}
            {...lesson}
          />
        ))}
      </div>
    </>
  );
}
