import { redirect } from 'next/navigation';

import { getLesson, getUserProgress } from '@/db/queries';
import Quiz from './_components/quiz';
import { QuizProvider } from './_context/quiz-context';

export default async function LessonPage() {
  const [lesson, userProgress] = await Promise.all([
    getLesson(),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const completedChallengesCount = lesson.challenges.filter(
    (challenge) => challenge.isCompleted
  ).length;
  const allChallengesCount = lesson.challenges.length;
  const initialPercentage =
    (completedChallengesCount / allChallengesCount) * 100;

  return (
    <QuizProvider
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    >
      <Quiz />
    </QuizProvider>
  );
}
