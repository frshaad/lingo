'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '@/db';
import { getCourseById, getUserProgress } from '@/db/queries';
import { userProgress } from '@/db/schema';
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

    if (existingProgress) {
      await db.update(userProgress).set({
        activeCourseId: userData.courseId,
        userName: userData.userName,
        userImageSrc: userData.userImageSrc,
      });
    } else {
      await db.insert(userProgress).values({
        userId: userData.userId,
        activeCourseId: userData.courseId,
        userName: userData.userName,
        userImageSrc: userData.userImageSrc,
      });
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
