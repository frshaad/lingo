'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import {
  findChallengeProgress,
  getCourseById,
  getCurrentChallenge,
  getUserProgress,
} from '@/db/queries';
import { authenticateUser } from '@/lib/auth';
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

export async function upsertUserProgress(courseId: number) {
  try {
    const [userData, existingProgress] = await Promise.all([
      validateAndGetUserData(courseId),
      getUserProgress(),
    ]);
    const { courseId: activeCourseId } = userData;

    await (existingProgress
      ? ProgressService.updateUserProgress({ ...userData, activeCourseId })
      : ProgressService.addUserProgress({ ...userData, activeCourseId }));

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
  const userId = await authenticateUser();

  const [currentUserProgress, currentChallenge, existingProgress] =
    await Promise.all([
      getUserProgress(),
      getCurrentChallenge(challengeId),
      findChallengeProgress(userId, challengeId),
    ]);

  // TODO: Get user subscription

  if (!currentUserProgress) {
    throw new ResourceNotFoundError('User Progress');
  }

  if (!currentChallenge) {
    throw new ResourceNotFoundError('Challenge');
  }

  const isRetrying = !!existingProgress;
  if (isRetrying) {
    return { error: 'practice' };
  }

  // TODO: Handle Subscription

  const { hearts } = currentUserProgress;
  if (hearts === 0) {
    return { error: 'hearts' };
  }

  await ProgressService.decrementHearts(userId, hearts);

  revalidatePath('/shop');
  revalidatePath('/learn');
  revalidatePath('/quests');
  revalidatePath('/leaderboard');

  const { lessonId } = currentChallenge;
  revalidatePath(`/lesson/${lessonId}`);
}
