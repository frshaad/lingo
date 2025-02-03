import type { challengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/database';
import type { QuizStatus } from '@/types/quiz';

export type QuizChallenge = PopulatedChallenge & {
  isCompleted: boolean;
  challengeOptions: (typeof challengeOption.$inferSelect)[];
};

export type QuizHookArguments = {
  lessonId: number;
  startingHearts: number;
  completionProgress: number;
  challenges: QuizChallenge[];
};

export type QuizState = {
  lessonId: number;
  hearts: number;
  percentage: number;
  activeChallengeIndex: number;
  status: QuizStatus;
  selectedOption?: number;
};
