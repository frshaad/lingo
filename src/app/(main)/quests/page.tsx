import Image from 'next/image';
import { redirect } from 'next/navigation';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import { QUESTS } from '@/lib/global.constant';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

import QuestItem from './_components/quest-item';

export default async function QuestsPage() {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!userProgress?.activeCourse) {
    redirect('/courses');
  }

  const userProgressWithActiveCourse = {
    ...userProgress,
    activeCourse: userProgress.activeCourse,
  } as UserProgressWithActiveCourse;

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
            {QUESTS.map((quest) => (
              <QuestItem
                key={quest.id}
                quest={quest}
                userPoints={userProgress.points}
              />
            ))}
          </section>
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          hasActiveSubscription={!!userSubscription?.isSubscriptionActive}
          userProgress={userProgressWithActiveCourse}
        />
      </StickyWrapper>
    </div>
  );
}
