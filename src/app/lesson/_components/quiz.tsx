'use client';

import { useQuizContext } from '../_context/quiz-context';
import LessonFinishedScreen from './lesson-finished-screen';
import QuizContent from './quiz-content';
import QuizFooter from './quiz-footer';
import QuizHeader from './quiz-header';

export default function Quiz() {
  const { activeChallenge, lessonId, status } = useQuizContext();

  if (activeChallenge.lessonId === lessonId) {
    return (
      <>
        <QuizHeader />
        <QuizContent />
        <QuizFooter status={status} />
      </>
    );
  }

  return <LessonFinishedScreen />;
}
