import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { isChallengeCompleted } from '@/db/queries-helpers';
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

  const units = await db.query.unit.findMany({
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

  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => ({
      ...lesson,
      isCompleted: lesson.challenges.every(isChallengeCompleted),
    })),
  }));
});
