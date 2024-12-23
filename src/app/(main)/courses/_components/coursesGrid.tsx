import { getCourses } from '@/db/queries';

export default async function CoursesGrid() {
  const courses = await getCourses();

  console.log({ courses });

  return <div>coursesGrid</div>;
}
