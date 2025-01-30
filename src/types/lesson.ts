import type { lesson, unit } from '@/db/schema';

export type LessonType = typeof lesson.$inferSelect & {
  unit: typeof unit.$inferSelect;
};

export interface LessonButtonProps {
  id: number;
  activeLessonId?: number;
  isCompleted: boolean;
  totalLessonsCount: number;
  percentage: number;
  index: number;
}
