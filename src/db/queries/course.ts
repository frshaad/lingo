import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '@/db';
import { course } from '@/db/schema';

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
