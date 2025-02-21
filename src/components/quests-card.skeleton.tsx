import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type QuestSkeletonProperties = {
  isLarge?: boolean;
};

function QuestItemSkeleton({ isLarge }: QuestSkeletonProperties) {
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
            'rounded-full',
            isLarge ? 'h-[28px] w-[140px]' : 'h-[20px] w-[100px]',
          )}
        />

        <Skeleton
          className={cn('rounded-full w-full', isLarge ? 'h-3' : 'h-2')}
        />
      </div>
    </article>
  );
}

export default function QuestsCard() {
  return (
    <section className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryGhost">
            View All
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
        <QuestItemSkeleton />
      </ul>
    </section>
  );
}
