import type { useQuiz } from '@/app/lesson/_hooks/use-quiz';
import type { challengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/database';

export type QuizStatus = 'correct' | 'wrong' | 'none';
export type ChallengeType = 'ASSIST' | 'SELECT';

export type QuizState = ReturnType<typeof useQuiz>;

export type QuizProviderProperties = {
  lessonId: number;
  startingHearts: number;
  completionProgress: number;
  challenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: (typeof challengeOption.$inferSelect)[];
  })[];
  userSubscription: unknown;
};
