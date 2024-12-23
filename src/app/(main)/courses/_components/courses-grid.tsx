import { getCourses } from '@/db/queries';

import CourseCard from './course-card';

export default async function CoursesGrid() {
  const activeCourse = 2;
  const courses = await getCourses();

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          active={activeCourse === course.id}
          disabled={false}
          // onClick={(id) => id}
          {...course}
        />
      ))}
    </div>
  );
}
