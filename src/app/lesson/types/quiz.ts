import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/db';
import type { QuizStatus } from '@/types/quiz';

export type QuizChallenge = PopulatedChallenge & {
  isCompleted: boolean;
  challengeOptions: ChallengeOption[];
};

export type QuizHookArgs = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: QuizChallenge[];
};

export type QuizState = {
  lessonId: number;
  hearts: number;
  percentage: number;
  activeChallengeIndex: number;
  status: QuizStatus;
  selectedOption?: number;
};
