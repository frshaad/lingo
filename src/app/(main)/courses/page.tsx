import { Suspense } from 'react';

import CoursesGrid from './_components/coursesGrid';

export default function CoursesPage() {
  return (
    <div className="mx-auto h-full max-w-4xl px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <Suspense fallback={<p>Loading Courses</p>}>
        <CoursesGrid />
      </Suspense>
    </div>
  );
}
