import { getCourses, getUserProgress } from '@/db/queries';

import CourseCard from './course-card';

export default async function CoursesGrid() {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();
  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CourseCard
          active={userProgress?.activeCourseId === course.id}
          key={course.id}
          {...course}
        />
      ))}
    </div>
  );
}
