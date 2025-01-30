import type { challenge, challengeProgress, lesson, unit } from '@/db/schema';

export type PopulatedChallenge = typeof challenge.$inferSelect & {
  challengeProgresses: (typeof challengeProgress.$inferSelect)[];
};

export type PopulatedLesson = typeof lesson.$inferSelect & {
  challenges: PopulatedChallenge[];
  isCompleted: boolean;
};

export type PopulatedUnit = typeof unit.$inferSelect & {
  lessons: PopulatedLesson[];
};
