import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { course, userProgress } from '@/db/schema';

// Add type for the query result
type UserProgressWithCourse = typeof userProgress.$inferSelect & {
  activeCourse: typeof course.$inferSelect | null;
};

export const getCourses = cache(async () => {
  const courses = await db.query.course.findMany();
  return courses;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userProgressData = (await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: { activeCourse: true },
  })) as UserProgressWithCourse | null;

  return userProgressData;
});

export const getCourseById = cache(async (courseId: number) => {
  const courseData = await db.query.course.findFirst({
    where: eq(course.id, courseId),
    // TODO: Populate units and lessons
  });

  return courseData;
});
