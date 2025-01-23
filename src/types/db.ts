import type { Challenge, ChallengeProgress, Lesson, Unit } from '@/db/schema';

export type PopulatedChallenge = Challenge & {
  challengeProgresses: ChallengeProgress[];
};

export type PopulatedLesson = Lesson & {
  challenges: PopulatedChallenge[];
  isCompleted: boolean;
};

export type PopulatedUnit = Unit & {
  lessons: PopulatedLesson[];
};
