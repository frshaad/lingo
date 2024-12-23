import { cache } from 'react';

import db from '.';

export const getCourses = cache(async () => {
  const data = await db.query.coursesTable.findMany();
  return data;
});
