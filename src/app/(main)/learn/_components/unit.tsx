import type { Lesson, Unit } from '@/db/schema';
import type { PopulatedUnit } from '@/lib/types';

import LessonButton from './lesson-button';
import UnitBanner from './unit-banner';

type Props = PopulatedUnit & {
  activeLesson?: Lesson & { unit: Unit };
  activeLessonPercentage: number;
};

export default function UnitComponent({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => (
          <LessonButton
            key={lesson.id}
            activeLessonId={activeLesson?.id}
            totalLessonsCount={lessons.length - 1}
            percentage={activeLessonPercentage}
            index={index}
            {...lesson}
          />
        ))}
      </div>
    </>
  );
}
