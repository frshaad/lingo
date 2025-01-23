import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/db';

export type QuizStatus = 'correct' | 'wrong' | 'none';
export type ChallengeType = 'ASSIST' | 'SELECT';

export type QuizState = {
  hearts: number;
  percentage: number;
  currentChallengeOptions: ChallengeOption[];
  title: string;
  currentChallenge: PopulatedChallenge;
};

export type QuizProviderProps = {
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
  userSubscription: unknown;
};
