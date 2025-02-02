'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import db from '@/db';
import { getCourseById, getUserProgress } from '@/db/queries';
import { challenge, challengeProgress, userProgress } from '@/db/schema';

import { AuthorizationError, ResourceNotFoundError } from './errors';

type UserProgressData = {
  userId: string;
  courseId: number;
  userName: string;
  userImageSrc: string;
};

async function validateAndGetUserData(
  courseId: number
): Promise<UserProgressData> {
  const user = await currentUser();
  if (!user) {
    throw new AuthorizationError();
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new ResourceNotFoundError('Course');
  }

  return {
    userId: user.id,
    courseId,
    userName: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/mascot.svg',
  };
}

export async function upsertUserProgress(courseId: number) {
  try {
    const [userData, existingProgress] = await Promise.all([
      validateAndGetUserData(courseId),
      getUserProgress(),
    ]);

    const {
      courseId: activeCourseId,
      userName,
      userImageSrc,
      userId,
    } = userData;

    if (existingProgress) {
      await db
        .update(userProgress)
        .set({ activeCourseId, userName, userImageSrc })
        .where(eq(userProgress.userId, userId));
    } else {
      await db
        .insert(userProgress)
        .values({ userId, activeCourseId, userName, userImageSrc });
    }

    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect('/learn');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    throw new Error('Failed to update progress');
  }
}

export async function reduceHearts(challengeId: number) {
  const user = await currentUser();
  if (!user) {
    throw new AuthorizationError();
  }

  const currentUserProgress = await getUserProgress();
  // const userSubscription = await getUserSubscription();

  const currentChallenge = await db.query.challenge.findFirst({
    where: eq(challenge.id, challengeId),
  });

  if (!currentChallenge) {
    throw new ResourceNotFoundError('Challenge');
  }

  const { lessonId } = currentChallenge;

  const existingProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, user.id),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isRetrying = !!existingProgress;
  if (isRetrying) {
    return { error: 'practice' };
  }

  if (!currentUserProgress) {
    throw new ResourceNotFoundError('User Progress');
  }

  // if (userSubscription?.isActive) {
  //   return { error: 'subscription' };
  // }

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, user.id));

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
}
