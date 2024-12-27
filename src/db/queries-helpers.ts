import {
  type ChallengeProgressSelectSchema,
  type ChallengeSelectSchema,
} from '@/db/schema';

export function isChallengeCompleted(
  challenge: ChallengeSelectSchema & {
    challengeProgresses: ChallengeProgressSelectSchema[];
  },
) {
  return (
    challenge.challengeProgresses &&
    challenge.challengeProgresses.length > 0 &&
    challenge.challengeProgresses.every((progress) => progress.isCompleted)
  );
}
