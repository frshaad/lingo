import Image from 'next/image';

import FeedWrapper from '@/components/feed-wrapper';
import PromotionCardSkeleton from '@/components/promotion-card.skeleton';
import QuestItemSkeleton from '@/components/quest-item.skeleton';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgressSkeleton from '@/components/user-progress.skeleton';

export default function QuestsPageLoading() {
  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center gap-y-6">
          <Image alt="quests" height={90} src="/quests.svg" width={90} />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            Quests
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            Complete Quests by earning points.
          </p>
          <section className="w-full">
            <QuestItemSkeleton isLarge />
            <QuestItemSkeleton isLarge />
            <QuestItemSkeleton isLarge />
            <QuestItemSkeleton isLarge />
            <QuestItemSkeleton isLarge />
          </section>
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgressSkeleton />
        <PromotionCardSkeleton />
      </StickyWrapper>
    </div>
  );
}
