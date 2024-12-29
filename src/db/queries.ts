import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { isChallengeCompleted } from '@/db/queries-helpers';
import {
  challengeProgress,
  course,
  lesson,
  unit,
  userProgress,
} from '@/db/schema';

/**
 * Retrieves all available courses from the database
 * @returns Array of all courses
 */
export const getCourses = cache(async () => {
  const courses = await db.query.course.findMany();
  return courses;
});

/**
 * Retrieves a specific course by ID, including its units and lessons
 * @param courseId - The ID of the course to retrieve
 * @returns Course data with related units and lessons
 */
export const getCourseById = cache(async (courseId: number) => {
  const courseData = await db.query.course.findFirst({
    where: eq(course.id, courseId),
    with: {
      units: {
        with: { lessons: true },
      },
    },
  });

  return courseData;
});

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
      isCompleted: lesson.challenges.every(isChallengeCompleted),
    })),
  }));
});

/**
 * Gets the user's current course progress and identifies the first uncompleted lesson
 * @returns Object containing the first uncompleted lesson or null if no active course
 */
export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

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
          challenge.challengeProgresses.length === 0,
      ),
    );

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

/**
 * Retrieves a lesson with all its challenges and user progress information.
 * If no specific lesson ID is provided, it will use the active lesson from the course progress.
 *
 * @param id - Optional lesson ID to retrieve a specific lesson
 * @returns The lesson data with challenges and completion status, or null if not found/unauthorized
 */
export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;
  if (!lessonId) {
    return null;
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
    return null;
  }

  return {
    ...lessonData,
    challenges: lessonData.challenges.map((challenge) => ({
      ...challenge,
      isCompleted: challenge.challengeProgresses.every(
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
