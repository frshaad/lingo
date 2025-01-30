import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { upsertChallengeProgress } from '@/actions/challenge-progress.action';
import { useAudioEffects } from '@/hooks/use-audio-effects';
import { DEFAULT_HEARTS } from '@/lib/constants';
import type { QuizChallenge, QuizHookArgs, QuizState } from '../_types/quiz';

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
  lessonId,
  startingHearts,
  completionProgress,
  challenges,
}: QuizHookArgs) {
  const [pending, startTransition] = useTransition();
  const { correctControls } = useAudioEffects();

  const [quizData, setQuizData] = useState<QuizState>(() => ({
    lessonId,
    hearts: startingHearts,
    percentage: completionProgress,
    activeChallengeIndex: findFirstIncompleteChallengeIndex(challenges),
    status: 'none',
    selectedOption: undefined,
  }));

  const activeChallenge = challenges[quizData.activeChallengeIndex];
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

      if (isCorrect) {
        upsertChallengeProgress(activeChallenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              // Call openHeartsModal()
              return;
            }

            correctControls.play();
            updateQuizData({
              status: 'correct',
              percentage: quizData.percentage + 100 / challenges.length,
            });

            // This is a practice
            if (completionProgress === 100) {
              updateQuizData({
                hearts: Math.min(quizData.hearts + 1, DEFAULT_HEARTS),
              });
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'));
      }
    });
  }, [
    quizData,
    activeChallengeChoices,
    goToNextChallenge,
    updateQuizData,
    activeChallenge.id,
    challenges.length,
    completionProgress,
    correctControls.play,
  ]);

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
