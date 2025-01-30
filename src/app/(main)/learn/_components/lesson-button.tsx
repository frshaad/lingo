import Link from 'next/link';

import { useLessonButton } from '@/hooks/use-lesson-button';
import { cn } from '@/lib/utils';
import LessonIcon from './lesson-icon';
import LessonProgress from './lesson-progress';
import { StartTooltip } from './start-tooltip';

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
  const {
    lessonIconPosition,
    isFirst,
    isLast,
    isActiveLesson,
    isLockedLesson,
    href,
  } = useLessonButton({
    index,
    id,
    activeLessonId,
    isCompleted,
    totalLessonsCount,
  });

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
            <StartTooltip />
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
