import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import db from '.';
import { userProgressTable } from './schema';

export const getCourses = cache(async () => {
  const data = await db.query.coursesTable.findMany();
  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const data = await db.query.userProgressTable.findFirst({
    where: eq(userProgressTable.userId, userId),
    with: { activeCourse: true },
  });

  return data;
});
