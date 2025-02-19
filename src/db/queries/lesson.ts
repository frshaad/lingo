import { cache } from 'react';

import { eq } from 'drizzle-orm';

import db from '@/db';
import { getCourseProgress } from '@/db/queries';
import { challengeProgress, lesson } from '@/db/schema';
import { authenticateUser } from '@/lib/auth';

/**
 * Retrieves a lesson with all its challenges and user progress information.
 * If no specific lesson ID is provided, it will use the active lesson from the course progress.
 *
 * @param id - Optional lesson ID to retrieve a specific lesson
 * @returns The lesson data with challenges and completion status, or null if not found/unauthorized
 */
export const getLesson = cache(async (id?: number) => {
  const userId = await authenticateUser();

  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;
  if (!lessonId) {
    return;
  }

  const lessonData = await db.query.lesson.findFirst({
    where: eq(lesson.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgresses: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!lessonData?.challenges) {
    return;
  }

  return {
    ...lessonData,
    challenges: lessonData.challenges.map((challenge) => ({
      ...challenge,
      isCompleted:
        challenge.challengeProgresses.length > 0 &&
        challenge.challengeProgresses.every(
          (challengeProgress) => challengeProgress.isCompleted,
        ),
    })),
  };
});

/**
 * Calculates the completion percentage of the current active lesson.
 * The percentage is based on the number of completed challenges divided by the total number of challenges.
 *
 * @returns A number between 0 and 100 representing the completion percentage.
 * Returns 0 if there's no active lesson or if the lesson cannot be retrieved.
 */
export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson();
  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.isCompleted,
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
});
