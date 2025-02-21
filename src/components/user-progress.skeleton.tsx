import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserProgressSkeleton() {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost">
        <Skeleton className="size-8 rounded-md" />
      </Button>
      <Button variant="ghost">
        <Skeleton className="h-7 w-14 rounded-md" />
      </Button>
      <Button variant="ghost">
        <Skeleton className="h-7 w-14 rounded-md" />
      </Button>
    </div>
  );
}
