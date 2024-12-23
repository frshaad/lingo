import { Suspense } from 'react';

import CoursesGrid from './_components/courses-grid';
import CoursesGridSkelteon from './_components/courses-grid.skelteon';

export default function CoursesPage() {
  return (
    <div className="mx-auto h-full max-w-4xl px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <Suspense fallback={<CoursesGridSkelteon />}>
        <CoursesGrid />
      </Suspense>
    </div>
  );
}
