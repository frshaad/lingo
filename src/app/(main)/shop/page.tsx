import Image from 'next/image';
import { redirect } from 'next/navigation';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import { getUserProgress } from '@/db/queries';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

import ShopItems from './_components/shop-items';

export default async function ShopPage() {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourse) {
    redirect('/courses');
  }

  const userProgressWithActiveCourse = {
    ...userProgress,
    activeCourse: userProgress.activeCourse,
  } as UserProgressWithActiveCourse;

  const { points, hearts } = userProgressWithActiveCourse;

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
          <ShopItems
            hasActiveSubscription={false} // TODO: Subscription
            hearts={hearts}
            points={points}
          />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          hasActiveSubscription={false} // TODO: Subscription
          userProgress={userProgressWithActiveCourse}
        />
      </StickyWrapper>
    </div>
  );
}
