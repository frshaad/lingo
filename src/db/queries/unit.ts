import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { challengeProgress, unit } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';
import type { PopulatedChallenge } from '@/types/database';

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
  const [userId, userProgress] = await Promise.all([
    authenticateUser(),
    getUserProgress(),
  ]);

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const units = await db.query.unit.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(unit.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
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
          : lesson.challenges.every((element) => isChallengeCompleted(element)),
    })),
  }));
});
