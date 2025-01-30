import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { userProgress } from '@/db/schema';

/**
 * Retrieves the current user's progress data including their active course
 * @returns User progress data or null if user is not authenticated
 */
export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userProgressData = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: { activeCourse: true },
  });

  return userProgressData;
});

export type UserProgressType = Awaited<ReturnType<typeof getUserProgress>>;
