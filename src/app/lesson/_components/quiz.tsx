'use client';

import { useQuizContext } from '../_context/quiz-context';
import QuizContent from './quiz-content';
import QuizHeader from './quiz-header';

export default function Quiz() {
  const { userSubscription } = useQuizContext();

  return (
    <>
      <QuizHeader hasActiveSubscription={!!userSubscription} />
      <QuizContent />
    </>
  );
}
