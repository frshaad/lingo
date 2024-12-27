import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { course, unit, userProgress } from '@/db/schema';

export const getCourses = cache(async () => {
  const courses = await db.query.course.findMany();
  return courses;
});

export const getCourseById = cache(async (courseId: number) => {
  const courseData = await db.query.course.findFirst({
    where: eq(course.id, courseId),
    // TODO: Populate units and lessons
  });

  return courseData;
});

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

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();
  if (!userProgress?.activeCourseId) {
    return [];
  }

  const unitsData = await db.query.unit.findMany({
    where: eq(unit.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgresses: true,
            },
          },
        },
      },
    },
  });

  const normalizedUnitsData = unitsData.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      const areAllChallengesCompleted = lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgresses &&
          challenge.challengeProgresses.length > 0 &&
          challenge.challengeProgresses.every(
            (progress) => progress.isCompleted,
          ),
      );

      return { ...lesson, isCompleted: areAllChallengesCompleted };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedUnitsData;
});
