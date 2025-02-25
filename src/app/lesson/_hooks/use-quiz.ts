import type { QuizChallenge, QuizHookArguments } from '../_types/quiz';
import { useQuizAction } from './quiz/use-quiz-action';
import { useQuizData } from './quiz/use-quiz-data';

const findFirstIncompleteChallengeIndex = (
  challenges: QuizChallenge[],
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
  const isLessonCompleted = activeChallengeIndex >= challenges.length;

  const { quizData, updateQuizData } = useQuizData({
    lessonId,
    activeChallengeIndex,
    hearts: startingHearts,
    percentage: completionProgress,
    status: isLessonCompleted ? 'completed' : 'none',
    selectedOption: isLessonCompleted ? 0 : undefined, // Add this line
  });

  const quizActions = useQuizAction({
    quizData,
    updateQuizData,
    challenges,
    completionProgress,
  });

  const challengesCount = challenges.length;

  // Only format title if there's an active challenge
  const title = quizActions.activeChallenge
    ? formatChallengeQuestion(quizActions.activeChallenge)
    : '';

  return {
    ...quizData,
    ...quizActions,
    title,
    challengesCount,
    isLessonCompleted,
  };
}
