import Image from 'next/image';
import { redirect } from 'next/navigation';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import UserProgress from '@/components/user-progress';
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

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
          {topTenUsers.map((user, index) => (
            <div
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
              key={user.userId}
            >
              <span className="mr-4 font-bold text-lime-700">{index + 1}</span>
              <Avatar className="ml-3 mr-6 size-12 border bg-green-500">
                <AvatarImage className="object-cover" src={user.userImageSrc} />
              </Avatar>
              <p className="flex-1 font-bold text-neutral-800">
                {user.userName}
              </p>
              <p className="text-muted-foreground">{user.points} XP</p>
            </div>
          ))}
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
