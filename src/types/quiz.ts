import type { useQuiz } from '@/app/lesson/_hooks/use-quiz';
import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/db';

export type QuizStatus = 'correct' | 'wrong' | 'none';
export type ChallengeType = 'ASSIST' | 'SELECT';

export type QuizState = ReturnType<typeof useQuiz>;

export type QuizProviderProps = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
  userSubscription: unknown;
};
