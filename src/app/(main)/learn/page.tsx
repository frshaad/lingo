import { redirect } from 'next/navigation';

import UserProgress from '@/components/user-progress';
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from '@/db/queries';
import FeedHeader from './_components/feed-header';
import FeedWrapper from './_components/feed-wrapper';
import StickyWrapper from './_components/sticky-wrapper';
import Unit from './_components/unit';
import { LearnContextProvider } from './_context/learn-context';

export default async function LearnPage() {
  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      getUserProgress(),
      getUnits(),
      getCourseProgress(),
      getLessonPercentage(),
    ]);

  if (!userProgress?.activeCourse || !courseProgress) {
    redirect('/courses');
  }

  return (
    <LearnContextProvider
      userProgress={userProgress}
      units={units}
      courseProgress={courseProgress}
      lessonPercentage={lessonPercentage}
    >
      <div className="flex gap-12 px-6">
        <FeedWrapper>
          <FeedHeader />
          {units.map((unit) => (
            <Unit key={unit.id} {...unit} />
          ))}
        </FeedWrapper>
        <StickyWrapper>
          <UserProgress hasActiveSubscription={false} />
        </StickyWrapper>
      </div>
    </LearnContextProvider>
  );
}
