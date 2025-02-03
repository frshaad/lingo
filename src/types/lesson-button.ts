export interface UseLessonButtonProperties {
  index: number;
  id: number;
  activeLessonId?: number;
  isCompleted: boolean;
  totalLessonsCount: number;
}

export interface LessonButtonState {
  lessonIconPosition: number;
  isFirst: boolean;
  isLast: boolean;
  isActiveLesson: boolean;
  isLockedLesson: boolean;
  href: string;
}
