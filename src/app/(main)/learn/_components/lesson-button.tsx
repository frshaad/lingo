'use client';

import Link from 'next/link';

import { useLessonButton } from '@/hooks/use-lesson-button';
import { cn } from '@/lib/utilities';
import type { LessonButtonProperties } from '@/types/lesson';

import { useLearnContext } from '../_context/learn-context';
import LessonIcon from './lesson-icon';
import LessonProgress from './lesson-progress';
import { StartTooltip } from './start-tooltip';

export default function LessonButton({
  id,
  isCompleted,
  totalLessonsCount,
  index,
}: LessonButtonProperties) {
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
      aria-disabled={isLockedLesson}
      className={cn(
        'transition-opacity',
        isLockedLesson
          ? 'pointer-events-none opacity-50'
          : 'pointer-events-auto'
      )}
      href={href}
    >
      <div
        className={cn('relative mt-6', {
          'mt-14': isFirst && !isCompleted,
        })}
        style={{ right: `${lessonIconPosition}px` }}
      >
        {isActiveLesson ? (
          <div aria-valuenow={lessonPercentage} className="relative size-24">
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
