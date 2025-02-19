'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import db from '@/db';
import {
  findChallengeProgress,
  getCurrentChallenge,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import { challengeProgress } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';
import { ProgressService } from '@/services/progress.service';

import { ResourceNotFoundError } from './errors';

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
  currentPoints: number,
) {
  await Promise.all([
    ProgressService.markChallengeComplete(userId, challengeId),
    ProgressService.addPoints(userId, currentPoints),
  ]);
}

export async function upsertChallengeProgress(
  challengeId: number,
): Promise<UpsertChallengeResult> {
  const userId = await authenticateUser();
  const [
    userProgressData,
    currentChallenge,
    existingProgress,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getCurrentChallenge(challengeId),
    findChallengeProgress(userId, challengeId),
    getUserSubscription(),
  ]);

  if (!userProgressData) {
    throw new ResourceNotFoundError('User Progress');
  }
  const { hearts, points } = userProgressData;

  if (!currentChallenge) {
    throw new ResourceNotFoundError('Challenge');
  }

  const isPracticing = !!existingProgress;

  if (
    hearts === 0 &&
    !isPracticing &&
    !userSubscription?.isSubscriptionActive
  ) {
    return { error: 'hearts' };
  }

  await (isPracticing
    ? handleExistingProgress({
        userId,
        currentHearts: hearts,
        currentPoints: points,
        progressId: existingProgress.id,
      })
    : handleNewProgress(userId, challengeId, points));

  const paths = ['/learn', '/lesson', '/quests', '/leaderboard'];
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidatePath(`/lesson/${currentChallenge.lessonId}`);
}
