import Image from 'next/image';

import FeedWrapper from '@/components/feed-wrapper';
import PromotionCardSkeleton from '@/components/promotion-card.skeleton';
import QuestsCardSkeleton from '@/components/quests-card.skeleton';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgressSkeleton from '@/components/user-progress.skeleton';

import ShopItemsSkeleton from './_components/shop-items.skeleton';

export default function ShopPageLoading() {
  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center gap-y-6">
          <Image alt="shop" height={90} src="/shop.svg" width={90} />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            Shop
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            Spend your points on cool stuff.
          </p>
          <ShopItemsSkeleton />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgressSkeleton />
        <PromotionCardSkeleton />
        <QuestsCardSkeleton />
      </StickyWrapper>
    </div>
  );
}
