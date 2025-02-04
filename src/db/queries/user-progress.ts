import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { userProgress } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';

/**
 * Retrieves the current user's progress data including their active course
 * @returns User progress data or null if user is not authenticated
 */
export const getUserProgress = cache(async () => {
  const userId = await authenticateUser();

  const userProgressData = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: { activeCourse: true },
  });

  return userProgressData;
});

export type UserProgressType = Awaited<ReturnType<typeof getUserProgress>>;
