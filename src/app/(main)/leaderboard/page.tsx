import Image from 'next/image';
import { redirect } from 'next/navigation';

import FeedWrapper from '@/components/feed-wrapper';
import PromotionCard from '@/components/promotion-card';
import StickyWrapper from '@/components/sticky-wrapper';
import { Separator } from '@/components/ui/separator';
import UserProgress from '@/components/user-progress';
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

import TopTenUsersList from './_components/top-users-list';

export default async function LeaderBoardPage() {
  const [userProgress, userSubscription, topTenUsers] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
    getTopTenUsers(),
  ]);

  if (!userProgress?.activeCourse) {
    redirect('/courses');
  }

  const userProgressWithActiveCourse = {
    ...userProgress,
    activeCourse: userProgress.activeCourse,
  } as UserProgressWithActiveCourse;

  const isPro = Boolean(userSubscription?.isSubscriptionActive);

  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center gap-y-6">
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
          <TopTenUsersList list={topTenUsers} />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          hasActiveSubscription={!!userSubscription?.isSubscriptionActive}
          userProgress={userProgressWithActiveCourse}
        />
        {!isPro && <PromotionCard />}
      </StickyWrapper>
    </div>
  );
}
