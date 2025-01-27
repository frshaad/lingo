import { useCallback, useState, useTransition } from 'react';
import type { QuizChallenge, QuizHookArgs, QuizState } from '../types/quiz';

const findFirstIncompleteChallengeIndex = (
  challenges: QuizChallenge[]
): number => {
  const index = challenges.findIndex((challenge) => !challenge.isCompleted);
  return index === -1 ? 0 : index;
};

const formatChallengeQuestion = (challenge: QuizChallenge): string => {
  return challenge.type === 'ASSIST'
    ? 'Select the correct meaning'
    : challenge.question;
};

export function useQuiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: QuizHookArgs) {
  const [pending, startTransition] = useTransition();

  const [quizData, setQuizData] = useState<QuizState>({
    lessonId: initialLessonId,
    hearts: initialHearts,
    percentage: initialPercentage,
    activeChallengeIndex: findFirstIncompleteChallengeIndex(
      initialLessonChallenges
    ),
    status: 'none',
    selectedOption: undefined,
  });

  const activeChallenge =
    initialLessonChallenges[quizData.activeChallengeIndex];
  const activeChallengeChoices = activeChallenge.challengeOptions ?? [];

  const updateQuizData = useCallback((updates: Partial<QuizState>) => {
    setQuizData((prev) => ({ ...prev, ...updates }));
  }, []);

  const selectChoice = useCallback(
    (choiceId: number) => {
      if (quizData.status !== 'none') {
        return;
      }
      updateQuizData({ selectedOption: choiceId });
    },
    [quizData.status, updateQuizData]
  );

  const goToNextChallenge = useCallback(() => {
    updateQuizData({
      activeChallengeIndex: quizData.activeChallengeIndex + 1,
      status: 'none',
      selectedOption: undefined,
    });
  }, [quizData.activeChallengeIndex, updateQuizData]);

  const proceedToNextStep = useCallback(() => {
    if (!quizData.selectedOption) {
      return;
    }

    if (quizData.status === 'wrong') {
      updateQuizData({ status: 'none', selectedOption: undefined });
      return;
    }

    if (quizData.status === 'correct') {
      goToNextChallenge();
      return;
    }

    const correctChoice = activeChallengeChoices.find(
      (choice) => choice.isCorrect
    );
    if (!correctChoice) {
      return;
    }

    startTransition(() => {
      const isCorrect = correctChoice.id === quizData.selectedOption;
      updateQuizData({
        status: isCorrect ? 'correct' : 'wrong',
        hearts: isCorrect ? quizData.hearts : quizData.hearts - 1,
      });
    });
  }, [quizData, activeChallengeChoices, goToNextChallenge, updateQuizData]);

  return {
    ...quizData,
    title: formatChallengeQuestion(activeChallenge),
    activeChallenge,
    activeChallengeChoices,
    selectChoice,
    proceedToNextStep,
    pending,
  };
}
