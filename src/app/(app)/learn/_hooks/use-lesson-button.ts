import { useMemo } from 'react';

import type {
  LessonButtonState,
  UseLessonButtonProperties,
} from '@/types/lesson-button';

import { useLearnContext } from '../_context/learn-context';
import { LESSON_CONSTANTS } from './lesson.constant';

export const useLessonButton = ({
  index,
  id,
  isCompleted,
  totalLessonsCount,
}: UseLessonButtonProperties): LessonButtonState => {
  const { courseProgress } = useLearnContext();
  const activeLessonId = courseProgress?.activeLesson?.id;

  return useMemo(() => {
    const calculateIndentation = () => {
      const { INDENTATION_PATTERN, LESSON_SPACING } = LESSON_CONSTANTS;
      const cycleIndex = index % INDENTATION_PATTERN.CYCLE_LENGTH;
      const indentationLevel = INDENTATION_PATTERN.PATTERN[cycleIndex];

      return indentationLevel * LESSON_SPACING.LESSON;
    };

    const getLessonStatus = () => ({
      isFirst: index === 0,
      isLast: index === totalLessonsCount,
      isActiveLesson: id === activeLessonId,
      isLockedLesson: !isCompleted && id !== activeLessonId,
    });

    const getLessonHref = () => (isCompleted ? `/lesson/${id}` : '/lesson');

    return {
      lessonIconPosition: calculateIndentation(),
      ...getLessonStatus(),
      href: getLessonHref(),
    };
  }, [activeLessonId, id, index, isCompleted, totalLessonsCount]);
};
