import { redirect } from 'next/navigation';

import PracticeModal from '@/components/modal/practice-modal';
import { getLesson, getUserProgress } from '@/db/queries';

import Quiz from '../_components/quiz';
import { QuizProvider } from '../_context/quiz-context';

type Properties = {
  params: Promise<{ lessonId: number }>;
};

export default async function LessonIdPage({ params }: Properties) {
  const { lessonId } = await params;
  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
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
      userSubscription={undefined} // TODO: add user subscription
    >
      <PracticeModal />
      <Quiz />
    </QuizProvider>
  );
}
