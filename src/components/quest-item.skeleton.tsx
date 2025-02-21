import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type QuestSkeletonProperties = {
  isLarge?: boolean;
};

export default function QuestItemSkeleton({
  isLarge,
}: QuestSkeletonProperties) {
  return (
    <article
      className={cn(
        'flex w-full items-center',
        isLarge ? 'gap-x-4 border-t-2 p-4' : 'gap-x-3 pb-4',
      )}
    >
      <Image
        alt="points"
        height={isLarge ? 60 : 40}
        src="/points.svg"
        width={isLarge ? 60 : 40}
      />
      <div className="flex w-full flex-col gap-y-2">
        <Skeleton
          className={cn(
            'rounded-md',
            isLarge ? 'h-[28px] w-[140px]' : 'h-[20px] w-[100px]',
          )}
        />

        <Skeleton
          className={cn('rounded-md w-full', isLarge ? 'h-3' : 'h-2')}
        />
      </div>
    </article>
  );
}
