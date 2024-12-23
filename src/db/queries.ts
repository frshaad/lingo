import { cache } from 'react';

import db from './index';
import { coursesTable } from './schema';

export const getCourses = cache(async () => {
  const data = await db.query.coursesTable.findMany();
  return data;
});

export const addCourse = async (title: string, imageSrc: string) => {
  const data = await db.insert(coursesTable).values({ title, imageSrc });
  return data;
};
