import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '.';
import { coursesTable, userProgressTable } from './schema';

export const getCourses = cache(async () => {
  const courses = await db.query.coursesTable.findMany();
  return courses;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userProgress = await db.query.userProgressTable.findFirst({
    where: eq(userProgressTable.userId, userId),
    with: { activeCourse: true },
  });

  return userProgress;
});

export const getCourseById = cache(async (courseId: number) => {
  const course = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, courseId),
    // TODO: Populate units and lessons
  });

  return course;
});
