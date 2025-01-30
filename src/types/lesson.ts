import type { lesson, unit } from '@/db/schema';

export type LessonType = typeof lesson.$inferSelect & {
  unit: typeof unit.$inferSelect;
};

export interface LessonButtonProps {
  id: number;
  isCompleted: boolean;
  totalLessonsCount: number;
  index: number;
}
