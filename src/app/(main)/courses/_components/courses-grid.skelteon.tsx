import { Skeleton } from '@/components/ui/skeleton';

export default function CoursesGridSkelteon() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
        <CourseCardSkelteon key={item} />
      ))}
    </div>
  );
}

function CourseCardSkelteon() {
  return (
    <div className="flex h-full min-h-52 min-w-48 cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2">
      <div className="flex min-h-6 w-full items-center justify-end"></div>
      <Skeleton className="h-[70px] w-[93.33px] rounded-lg" />
      <Skeleton className="mt-3 h-6 w-14 rounded-md" />
    </div>
  );
}
