import type { Challenge, ChallengeProgress, Lesson, Unit } from '@/db/schema';

export type PopulatedUnit = Unit & {
  lessons: (Lesson & {
    challenges: (Challenge & {
      challengeProgresses: ChallengeProgress[];
    })[];
    isCompleted: boolean;
  })[];
};
