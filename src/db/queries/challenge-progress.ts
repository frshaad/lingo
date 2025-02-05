import { and, eq } from 'drizzle-orm';

import db from '@/db';
import { challengeProgress } from '@/db/schema';

export async function findChallengeProgress(
  userId: string,
  challengeId: number
) {
  return db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });
}
