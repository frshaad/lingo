import { Skeleton } from '@/components/ui/skeleton';

export default function ShopItemsSkeleton() {
  return (
    <section className="w-full space-y-3">
      <Skeleton className="h-[94px] w-full" />
      <Skeleton className="h-[94px] w-full" />
    </section>
  );
}
