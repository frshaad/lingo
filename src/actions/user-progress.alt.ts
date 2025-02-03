'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from '@/db';
import { getCourseById, getUserProgress } from '@/db/queries';
import { challenge } from '@/db/schema';
import { ProgressService } from '@/services/progress.service';

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

async function revalidateProgressPaths(lessonId?: number) {
  const paths = ['/courses', '/learn', '/shop', '/quests', '/leaderboard'];
  for (const path of paths) {
    revalidatePath(path);
  }
  if (lessonId) revalidatePath(`/lesson/${lessonId}`);
}

export async function upsertUserProgress(courseId: number) {
  try {
    const userData = await validateAndGetUserData(courseId);
    const {
      userId,
      userImageSrc,
      courseId: activeCourseId,
      userName,
    } = userData;
    await ProgressService.updateUserProgress({
      userId,
      activeCourseId,
      userName,
      userImageSrc,
    });

    revalidateProgressPaths();
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
  if (!user) throw new AuthorizationError();

  const [currentUserProgress, currentChallenge] = await Promise.all([
    getUserProgress(),
    db.query.challenge.findFirst({
      where: eq(challenge.id, challengeId),
    }),
  ]);

  if (!currentChallenge) throw new ResourceNotFoundError('Challenge');
  if (!currentUserProgress) throw new ResourceNotFoundError('User Progress');
  if (currentUserProgress.hearts === 0) return { error: 'hearts' };

  await ProgressService.decrementHearts(user.id, currentUserProgress.hearts);
  revalidateProgressPaths(currentChallenge.lessonId);
}
