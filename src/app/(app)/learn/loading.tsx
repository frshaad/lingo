import FeedWrapper from '@/components/feed-wrapper';
import Loading from '@/components/page-loading-spinner';
import PromotionCardSkeleton from '@/components/promotion-card.skeleton';
import QuestsCardSkeleton from '@/components/quests-card.skeleton';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgressSkeleton from '@/components/user-progress.skeleton';

import FeedHeaderSkeleton from './_components/feed-header.skeleton';

export default function LearnLoading() {
  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <FeedHeaderSkeleton />
        <Loading />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgressSkeleton />
        <PromotionCardSkeleton />
        <QuestsCardSkeleton />
      </StickyWrapper>
    </div>
  );
}
