'use client';

import HeartsModal from '@/components/modal/hearts-modal';

import { useQuizContext } from '../_context/quiz-context';
import LessonFinishedScreen from './lesson-finished-screen';
import QuizContent from './quiz-content';
import QuizFooter from './quiz-footer';
import QuizHeader from './quiz-header';

export default function Quiz() {
  const {
    activeChallenge,
    status,
    correctAudio,
    finishAudio,
    incorrectAudio,
    isLessonCompleted,
  } = useQuizContext();

  if (isLessonCompleted || !activeChallenge) {
    return <LessonFinishedScreen />;
  }

  return (
    <>
      {finishAudio}
      {correctAudio}
      {incorrectAudio}
      <HeartsModal />
      <QuizHeader />
      <QuizContent />
      <QuizFooter status={status} />
    </>
  );
}
