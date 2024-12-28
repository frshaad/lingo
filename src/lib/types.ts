import type { Challenge, ChallengeProgress, Lesson, Unit } from '@/db/schema';

export type PopulatedUnit = Unit & {
  lessons: PopulatedLesson[];
};

export type PopulatedLesson = Lesson & {
  challenges: PopulatedChallenge[];
  isCompleted: boolean;
};

export type PopulatedChallenge = Challenge & {
  challengeProgresses: ChallengeProgress[];
};
