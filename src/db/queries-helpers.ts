import type { PopulatedChallenge } from '@/lib/types';

export function isChallengeCompleted(challenge: PopulatedChallenge) {
  return (
    challenge.challengeProgresses &&
    challenge.challengeProgresses.length > 0 &&
    challenge.challengeProgresses.every((progress) => progress.isCompleted)
  );
}
