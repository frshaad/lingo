import { Suspense } from 'react';

import CoursesGrid from './_components/courses-grid';
import CoursesGridSkeleton from './_components/courses-grid.skeleton';

export default function CoursesPage() {
  return (
    <div className="mx-auto h-full max-w-4xl px-3">
      <h1 className="font-bold text-2xl text-neutral-700">Language Courses</h1>
      <Suspense fallback={<CoursesGridSkeleton />}>
        <CoursesGrid />
      </Suspense>
    </div>
  );
}
