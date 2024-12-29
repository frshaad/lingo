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
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <FeedHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <Unit
            key={unit.id}
            activeLesson={courseProgress.activeLesson}
            activeLessonPercentage={lessonPercentage}
            {...unit}
          />
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
