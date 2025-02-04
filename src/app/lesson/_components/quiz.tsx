'use client';

import { useQuizContext } from '../_context/quiz-context';
import ChallengeFinishScreen from './challenge-finish-screen';
import QuizContent from './quiz-content';
import QuizFooter from './quiz-footer';
import QuizHeader from './quiz-header';

export default function Quiz() {
  const { activeChallenge } = useQuizContext();

  if (activeChallenge) {
    return (
      <>
        <QuizHeader />
        <QuizContent />
        <QuizFooter />
      </>
    );
  }

  return <ChallengeFinishScreen />;
}
