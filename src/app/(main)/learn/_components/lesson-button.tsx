'use client';

import Link from 'next/link';

import { useLessonButton } from '@/hooks/use-lesson-button';
import { cn } from '@/lib/utils';
import type { LessonButtonProps } from '@/types/lesson';
import { useLearnContext } from '../_context/learn-context';
import LessonIcon from './lesson-icon';
import LessonProgress from './lesson-progress';
import { StartTooltip } from './start-tooltip';

export default function LessonButton({
  id,
  isCompleted,
  totalLessonsCount,
  index,
}: LessonButtonProps) {
  const { lessonPercentage } = useLearnContext();
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
    isCompleted,
    totalLessonsCount,
  });

  return (
    <Link
      href={href}
      aria-disabled={isLockedLesson}
      className={cn(
        'transition-opacity',
        isLockedLesson
          ? 'pointer-events-none opacity-50'
          : 'pointer-events-auto'
      )}
    >
      <div
        className={cn('relative mt-6', {
          'mt-14': isFirst && !isCompleted,
        })}
        style={{ right: `${lessonIconPosition}px` }}
      >
        {isActiveLesson ? (
          <div className="relative size-24" aria-valuenow={lessonPercentage}>
            <StartTooltip />
            <LessonProgress>
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
