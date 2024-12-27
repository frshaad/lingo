import { redirect } from 'next/navigation';

import UserProgress from '@/components/user-progress';
import { getUnits, getUserProgress } from '@/db/queries';

import FeedHeader from './_components/feed-header';
import FeedWrapper from './_components/feed-wrapper';
import StickyWrapper from './_components/sticky-wrapper';

export default async function LearnPage() {
  const [userProgress, units] = await Promise.all([
    getUserProgress(),
    getUnits(),
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses');
  }

  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <FeedHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)}
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
