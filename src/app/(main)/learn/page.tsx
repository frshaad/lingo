import { redirect } from 'next/navigation';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';
import type { UserProgressWithActiveCourse } from '@/types/user-progress';

import FeedHeader from './_components/feed-header';
import Unit from './_components/unit';
import { LearnContextProvider } from './_context/learn-context';

export default async function LearnPage() {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
    getUserSubscription(),
  ]);

  if (!userProgress?.activeCourse || !courseProgress) {
    redirect('/courses');
  }

  const userProgressWithActiveCourse = {
    ...userProgress,
    activeCourse: userProgress.activeCourse,
  } as UserProgressWithActiveCourse;

  return (
    <LearnContextProvider
      courseProgress={courseProgress}
      lessonPercentage={lessonPercentage}
      units={units}
      userProgress={userProgressWithActiveCourse}
    >
      <div className="flex gap-12 px-6">
        <FeedWrapper>
          <FeedHeader />
          {units.map((unit) => (
            <Unit key={unit.id} {...unit} />
          ))}
        </FeedWrapper>
        <StickyWrapper>
          <UserProgress
            hasActiveSubscription={!!userSubscription?.isSubscriptionActive}
            userProgress={userProgressWithActiveCourse}
          />
        </StickyWrapper>
      </div>
    </LearnContextProvider>
  );
}
