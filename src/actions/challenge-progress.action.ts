'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { challenge, challengeProgress, userProgress } from '@/db/schema';
import { DEFAULT_HEARTS, POINT_INCREMENT_STEP } from '@/lib/constants';
import { AuthorizationError, ResourceNotFoundError } from './errors';

const PATHS_TO_REVALIDATE = [
  '/learn',
  '/lesson',
  '/quests',
  '/leaderboard',
] as const;

type UpsertChallengeResult = { error: 'hearts' } | undefined;

async function updateExistingProgress(
  userId: string,
  progressId: number,
  currentHearts: number,
  currentPoints: number
) {
  await db
    .update(challengeProgress)
    .set({ isCompleted: true })
    .where(eq(challengeProgress.id, progressId));

  await db
    .update(userProgress)
    .set({
      hearts: Math.min(currentHearts + 1, DEFAULT_HEARTS),
      points: currentPoints + POINT_INCREMENT_STEP,
    })
    .where(eq(userProgress.userId, userId));
}

async function createNewProgress(
  userId: string,
  challengeId: number,
  currentPoints: number
) {
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    isCompleted: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentPoints + POINT_INCREMENT_STEP,
    })
    .where(eq(userProgress.userId, userId));
}

function revalidatePages(lessonId: number) {
  for (const path of PATHS_TO_REVALIDATE) {
    revalidatePath(path);
  }
  revalidatePath(`/lesson/${lessonId}`);
}

export async function upsertChallengeProgress(
  challengeId: number
): Promise<UpsertChallengeResult> {
  const { userId } = await auth();
  if (!userId) {
    throw new AuthorizationError();
  }

  const userProgressData = await getUserProgress();
  if (!userProgressData) {
    throw new ResourceNotFoundError('User Progress');
  }

  const currentChallenge = await db.query.challenge.findFirst({
    where: eq(challenge.id, challengeId),
  });
  if (!currentChallenge) {
    throw new ResourceNotFoundError('Challenge');
  }

  const existingProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isRetrying = !!existingProgress;

  if (userProgressData.hearts === 0 && !isRetrying) {
    return { error: 'hearts' };
  }

  if (isRetrying) {
    await updateExistingProgress(
      userId,
      existingProgress.id,
      userProgressData.hearts,
      userProgressData.points
    );
  } else {
    await createNewProgress(userId, challengeId, userProgressData.points);
  }

  await revalidatePages(currentChallenge.lessonId);
}
