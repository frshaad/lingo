import { useMemo } from 'react';

import { LESSON_CONSTANTS } from '@/app/(main)/learn/_components/lesson.constant';
import { useLearnContext } from '@/app/(main)/learn/_context/learn-context';
import type {
  LessonButtonState,
  UseLessonButtonProps,
} from '@/types/lesson-button';

export const useLessonButton = ({
  index,
  id,
  isCompleted,
  totalLessonsCount,
}: UseLessonButtonProps): LessonButtonState => {
  const { courseProgress } = useLearnContext();
  const activeLessonId = courseProgress?.activeLesson?.id;

  return useMemo(() => {
    const { INDENTATION_PATTERN, LESSON_SPACING } = LESSON_CONSTANTS;
    const cycleIndex = index % INDENTATION_PATTERN.CYCLE_LENGTH;
    const indentationLevel = INDENTATION_PATTERN.PATTERN[cycleIndex];

    const isFirst = index === 0;
    const isLast = index === totalLessonsCount;
    const isActiveLesson = id === activeLessonId;
    const isLockedLesson = !isCompleted && id !== activeLessonId;

    return {
      lessonIconPosition: indentationLevel * LESSON_SPACING.LESSON,
      isFirst,
      isLast,
      isActiveLesson,
      isLockedLesson,
      href: isCompleted ? `/lesson/${id}` : '/lesson',
    };
  }, [index, id, activeLessonId, isCompleted, totalLessonsCount]);
};
