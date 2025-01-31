'use server';

import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { challenge, challengeProgress, userProgress } from '@/db/schema';
import {
  INITIAL_LIVES_COUNT,
  SCORE_PER_CORRECT_ANSWER,
} from '@/lib/global.constant';
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
  await Promise.all([
    db
      .update(challengeProgress)
      .set({ isCompleted: true })
      .where(eq(challengeProgress.id, progressId)),
    db
      .update(userProgress)
      .set({
        hearts: Math.min(currentHearts + 1, INITIAL_LIVES_COUNT),
        points: currentPoints + SCORE_PER_CORRECT_ANSWER,
      })
      .where(eq(userProgress.userId, userId)),
  ]);
}

async function createNewProgress(
  userId: string,
  challengeId: number,
  currentPoints: number
) {
  await Promise.all([
    db.insert(challengeProgress).values({
      challengeId,
      userId,
      isCompleted: true,
    }),
    db
      .update(userProgress)
      .set({
        points: currentPoints + SCORE_PER_CORRECT_ANSWER,
      })
      .where(eq(userProgress.userId, userId)),
  ]);
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

  revalidatePages(currentChallenge.lessonId);
}
