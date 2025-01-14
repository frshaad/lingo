import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { challengeProgress, unit } from '@/db/schema';
import type { PopulatedChallenge } from '@/lib/types';

function isChallengeCompleted(challenge: PopulatedChallenge) {
  return (
    challenge.challengeProgresses &&
    challenge.challengeProgresses.length > 0 &&
    challenge.challengeProgresses.every((progress) => progress.isCompleted)
  );
}

/**
 * Retrieves all units for the user's active course with their completion status
 * @returns Array of units with their lessons and completion status
 */
export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const units = await db.query.unit.findMany({
    where: eq(unit.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgresses: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      isCompleted:
        lesson.challenges.length === 0
          ? false
          : lesson.challenges.every(isChallengeCompleted),
    })),
  }));
});
