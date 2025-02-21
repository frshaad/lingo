import Image from 'next/image';

import FeedWrapper from '@/components/feed-wrapper';
import PromotionCardSkeleton from '@/components/promotion-card.skeleton';
import QuestsCardSkeleton from '@/components/quests-card.skeleton';
import StickyWrapper from '@/components/sticky-wrapper';
import { Separator } from '@/components/ui/separator';
import UserProgressSkeleton from '@/components/user-progress.skeleton';

import TopTenUsersListSkeleton from './_components/top-users-list.skeleton';

export default function LeaderBoardPage() {
  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center gap-y-3">
          <Image
            alt="leaderboard"
            height={90}
            src="/leaderboard.svg"
            width={90}
          />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            Leaderboard
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          <TopTenUsersListSkeleton />
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
