'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { getCurrentChallenge } from '@/db/queries/challenge';
import { challengeProgress } from '@/db/schema';
import { ProgressService } from '@/services/progress.service';

import { AuthorizationError, ResourceNotFoundError } from './errors';

type UpsertChallengeResult = { error: 'hearts' } | undefined;
type HandleExistingProgressParameters = {
  userId: string;
  currentHearts: number;
  currentPoints: number;
  progressId: number;
};

async function handleExistingProgress({
  currentHearts,
  currentPoints,
  progressId,
  userId,
}: HandleExistingProgressParameters) {
  await Promise.all([
    db
      .update(challengeProgress)
      .set({ isCompleted: true })
      .where(eq(challengeProgress.id, progressId)),
    ProgressService.incrementHearts(userId, currentHearts),
    ProgressService.addPoints(userId, currentPoints),
  ]);
}

async function handleNewProgress(
  userId: string,
  challengeId: number,
  currentPoints: number
) {
  await Promise.all([
    ProgressService.markChallengeComplete(userId, challengeId),
    ProgressService.addPoints(userId, currentPoints),
  ]);
}

export async function upsertChallengeProgress(
  challengeId: number
): Promise<UpsertChallengeResult> {
  const { userId } = await auth();
  if (!userId) {
    throw new AuthorizationError();
  }

  const [userProgressData, currentChallenge, existingProgress] =
    await Promise.all([
      getUserProgress(),
      getCurrentChallenge(challengeId),
      db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, challengeId)
        ),
      }),
    ]);

  if (!userProgressData) {
    throw new ResourceNotFoundError('User Progress');
  }
  if (!currentChallenge) {
    throw new ResourceNotFoundError('Challenge');
  }

  const isRetrying = !!existingProgress;
  if (userProgressData.hearts === 0 && !isRetrying) {
    return { error: 'hearts' };
  }

  await (isRetrying
    ? handleExistingProgress({
        userId,
        currentHearts: userProgressData.hearts,
        currentPoints: userProgressData.points,
        progressId: existingProgress.id,
      })
    : handleNewProgress(userId, challengeId, userProgressData.points));

  const paths = ['/learn', '/lesson', '/quests', '/leaderboard'];
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath(`/lesson/${currentChallenge.lessonId}`);
}
