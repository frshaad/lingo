import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { getUserProgress } from '@/db/queries';
import { challengeProgress, unit } from '@/db/schema';

/**
 * Gets the user's current course progress and identifies the first uncompleted lesson
 * @returns Object containing the first uncompleted lesson or null if no active course
 */
export const getCourseProgress = cache(async () => {
  const [{ userId }, userProgress] = await Promise.all([
    auth(),
    getUserProgress(),
  ]);

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.unit.findMany({
    orderBy: (unit, { asc }) => [asc(unit.order)],
    where: eq(unit.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lesson, { asc }) => [asc(lesson.order)],
        with: {
          unit: true,
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

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) =>
      lesson.challenges.some(
        (challenge) =>
          !challenge.challengeProgresses ||
          challenge.challengeProgresses.length === 0 ||
          !challenge.challengeProgresses[0].isCompleted
      )
    );

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export type CourseProgressType = Awaited<ReturnType<typeof getCourseProgress>>;
