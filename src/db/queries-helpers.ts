import type { Challenge, ChallengeProgress } from '@/db/schema';

export function isChallengeCompleted(
  challenge: Challenge & {
    challengeProgresses: ChallengeProgress[];
  },
) {
  return (
    challenge.challengeProgresses &&
    challenge.challengeProgresses.length > 0 &&
    challenge.challengeProgresses.every((progress) => progress.isCompleted)
  );
}
