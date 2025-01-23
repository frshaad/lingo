import Link from 'next/link';

import { cn } from '@/lib/utils';

import LessonIcon from './lesson-icon';
import LessonProgress from './lesson-progress';
import { LESSON_CONSTANTS } from './lesson.constant';

type LessonButtonProps = {
  id: number;
  activeLessonId?: number;
  isCompleted: boolean;
  totalLessonsCount: number;
  percentage: number;
  index: number;
};

export default function LessonButton({
  id,
  activeLessonId,
  isCompleted,
  totalLessonsCount,
  percentage,
  index,
}: LessonButtonProps) {
  const { INDENTATION_PATTERN, CYCLE_LENGTH, LESSON_SPACING } =
    LESSON_CONSTANTS;
  const cycleIndex = index % CYCLE_LENGTH;
  const indentationLevel = INDENTATION_PATTERN[cycleIndex];
  const lessonIconPosition = indentationLevel * LESSON_SPACING;

  const isFirst = index === 0;
  const isLast = index === totalLessonsCount;
  const isActiveLesson = id === activeLessonId;
  const isLockedLesson = !isCompleted && !isActiveLesson;
  const href = isCompleted ? `/lesson/${id}` : '/lesson';

  return (
    <Link
      href={href}
      aria-disabled={isLockedLesson}
      className={isLockedLesson ? 'pointer-events-none' : 'pointer-events-auto'}
    >
      <div
        className={cn('relative mt-6', {
          'mt-14': isFirst && !isCompleted,
        })}
        style={{ right: `${lessonIconPosition}px` }}
      >
        {isActiveLesson ? (
          <div className="relative size-24">
            <div className="-top-6 absolute left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold text-green-500 uppercase tracking-wide">
              Start
              <div className="-bottom-2 -translate-x-1/2 absolute left-1/2 size-0 transform border-x-8 border-x-transparent border-t-8" />
            </div>
            <LessonProgress percentage={percentage}>
              <LessonIcon
                isCompleted={isCompleted}
                isLast={isLast}
                isLockedLesson={isLockedLesson}
              />
            </LessonProgress>
          </div>
        ) : (
          <LessonIcon
            isCompleted={isCompleted}
            isLast={isLast}
            isLockedLesson={isLockedLesson}
          />
        )}
      </div>
    </Link>
  );
}
