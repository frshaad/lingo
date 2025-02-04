import type { QuizChallenge, QuizHookArguments } from '../_types/quiz';
import { useQuizAction } from './quiz/use-quiz-action';
import { useQuizData } from './quiz/use-quiz-data';

const findFirstIncompleteChallengeIndex = (
  challenges: QuizChallenge[]
): number => {
  const index = challenges.findIndex((challenge) => !challenge.isCompleted);
  return index === -1 ? 0 : index;
};

const formatChallengeQuestion = ({ type, question }: QuizChallenge): string => {
  return type === 'ASSIST' ? 'Select the correct meaning' : question;
};

export function useQuiz({
  lessonId,
  startingHearts,
  completionProgress,
  challenges,
}: QuizHookArguments) {
  const activeChallengeIndex = findFirstIncompleteChallengeIndex(challenges);
  const { quizData, updateQuizData } = useQuizData({
    lessonId,
    activeChallengeIndex,
    hearts: startingHearts,
    percentage: completionProgress,
    status: 'none',
    selectedOption: undefined,
  });
  const quizActions = useQuizAction({
    quizData,
    updateQuizData,
    challenges,
    completionProgress,
  });

  return {
    ...quizData,
    ...quizActions,
    title: formatChallengeQuestion(quizActions.activeChallenge),
  };
}
