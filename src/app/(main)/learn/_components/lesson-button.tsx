'use client';

import 'react-circular-progressbar/dist/styles.css';

import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { Button } from '@/components/ui/button';
import type { PopulatedLesson } from '@/lib/types';
import { cn } from '@/lib/utils';

const INDENTATION_PATTERN = [0, 1, 2, 1, 0, -1, -2, -1];
const CYCLE_LENGTH = 8;
const LESSON_SPACING = 40;

type Props = PopulatedLesson & {
  activeLessonId?: number;
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
}: Props) {
  const cycleIndex = index % CYCLE_LENGTH;
  const indentationLevel = INDENTATION_PATTERN[cycleIndex];
  const lessonIconPosition = indentationLevel * LESSON_SPACING;

  const isFirst = index === 0;
  const isLast = index === totalLessonsCount;
  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : '/lesson';
  const isActiveLesson = id === activeLessonId;
  const isLockedLesson = !isCompleted && !isActiveLesson;

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
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-green-500">
              Start
              <div className="absolute -bottom-2 left-1/2 size-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : 42}
              styles={{
                path: { stroke: '#4ade80' },
                trail: { stroke: '#e5e7eb' },
              }}
            >
              <Button
                size="rounded"
                variant={isLockedLesson ? 'locked' : 'secondary'}
                className="size-16 border-b-8"
              >
                <Icon
                  size={10}
                  className={cn(
                    isLockedLesson
                      ? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground',
                    isCompleted && 'fill-none stroke-[4]',
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={isLockedLesson ? 'locked' : 'secondary'}
            className="size-16 border-b-8"
          >
            <Icon
              size={10}
              className={cn(
                isLockedLesson
                  ? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isCompleted && 'fill-none stroke-[4]',
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
}
