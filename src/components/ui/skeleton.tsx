import { cn } from '@/lib/utilities';

function Skeleton({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...properties}
    />
  );
}

export { Skeleton };
