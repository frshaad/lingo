import { LESSON_CONSTANTS } from '@/app/(main)/learn/_components/lesson.constant';

type UseLessonButtonProps = {
  index: number;
  id: number;
  activeLessonId?: number;
  isCompleted: boolean;
  totalLessonsCount: number;
};

export const useLessonButton = ({
  index,
  id,
  activeLessonId,
  isCompleted,
  totalLessonsCount,
}: UseLessonButtonProps) => {
  const { INDENTATION_PATTERN, CYCLE_LENGTH, LESSON_SPACING } =
    LESSON_CONSTANTS;
  const cycleIndex = index % CYCLE_LENGTH;
  const indentationLevel = INDENTATION_PATTERN[cycleIndex];

  return {
    lessonIconPosition: indentationLevel * LESSON_SPACING,
    isFirst: index === 0,
    isLast: index === totalLessonsCount,
    isActiveLesson: id === activeLessonId,
    isLockedLesson: !isCompleted && id !== activeLessonId,
    href: isCompleted ? `/lesson/${id}` : '/lesson',
  };
};
