import { redirect } from 'next/navigation';

import { getLesson, getUserProgress } from '@/db/queries';

import Quiz from './_components/quiz';

export default async function LessonPage() {
  const [lesson, userProgress] = await Promise.all([
    getLesson(),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const completedChellengesCount = lesson.challenges.filter(
    (chellenge) => chellenge.isCompleted,
  ).length;
  const allChallengesCount = lesson.challenges.length;
  const initialPercentage =
    (completedChellengesCount / allChallengesCount) * 100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  );
}
