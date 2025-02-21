import { Skeleton } from '@/components/ui/skeleton';

export default function PromotionCardSkeleton() {
  return (
    <section className="space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-[28px] w-[160px] rounded-md" />
        </div>
        <Skeleton className="h-[24px] w-[200px] rounded-md" />
      </div>
      <Skeleton className="h-[48px] w-full rounded-md" />
    </section>
  );
}
