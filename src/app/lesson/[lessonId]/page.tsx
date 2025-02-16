import { redirect } from 'next/navigation';

import PracticeModal from '@/components/modal/practice-modal';
import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

import Quiz from '../_components/quiz';
import { QuizProvider } from '../_context/quiz-context';

type Properties = {
  params: Promise<{ lessonId: number }>;
};

export default async function LessonIdPage({ params }: Properties) {
  const { lessonId } = await params;
  const [lesson, userProgress, userSubscription] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!lesson || !userProgress) {
    redirect('/learn');
  }

  const completionProgress =
    (lesson.challenges.filter((challenge) => challenge.isCompleted).length /
      lesson.challenges.length) *
    100;

  return (
    <QuizProvider
      challenges={lesson.challenges}
      completionProgress={completionProgress}
      lessonId={lesson.id}
      startingHearts={userProgress.hearts}
      userSubscription={userSubscription}
    >
      <PracticeModal />
      <Quiz />
    </QuizProvider>
  );
}
