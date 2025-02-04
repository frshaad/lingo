import { useCallback, useMemo, useState, useTransition } from 'react';

import { toast } from 'sonner';

import { upsertChallengeProgress } from '@/actions/challenge-progress.action';
import { reduceHearts } from '@/actions/user-progress.action';
import { useAudioEffects } from '@/hooks/use-audio-effects';
import { INITIAL_LIVES_COUNT } from '@/lib/global.constant';

import type {
  QuizChallenge,
  QuizHookArguments,
  QuizState,
} from '../_types/quiz';

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
  const [pending, startTransition] = useTransition();
  const { correctControls, incorrectControls } = useAudioEffects();

  const [quizData, setQuizData] = useState<QuizState>(() => ({
    lessonId,
    hearts: startingHearts,
    percentage: completionProgress,
    activeChallengeIndex: findFirstIncompleteChallengeIndex(challenges),
    status: 'none',
    selectedOption: undefined,
  }));
  const updateQuizData = useCallback((updates: Partial<QuizState>) => {
    setQuizData((previous) => ({ ...previous, ...updates }));
  }, []);

  const activeChallenge = challenges[quizData.activeChallengeIndex];
  const activeChallengeChoices = useMemo(
    () => activeChallenge.challengeOptions ?? [],
    [activeChallenge.challengeOptions]
  );

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
      // button: disabled (user should select an option first)
      return;
    }

    if (quizData.status === 'wrong') {
      // button: retry (user's answer was wrong)
      updateQuizData({ status: 'none', selectedOption: undefined });
      return;
    }

    if (quizData.status === 'correct') {
      // button: next question (user's answer was correct)
      goToNextChallenge();
      return;
    }

    // Find correct answer
    const correctChoice = activeChallengeChoices.find(
      (choice) => choice.isCorrect
    );
    if (!correctChoice) {
      return;
    }

    // status is 'none' and user has selected an option (not checked yet)
    // button: check user's answer
    startTransition(() => {
      const isUserAnswerCorrect = correctChoice.id === quizData.selectedOption;

      if (isUserAnswerCorrect) {
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
                hearts: Math.min(quizData.hearts + 1, INITIAL_LIVES_COUNT),
              });
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'));
      } else {
        reduceHearts(activeChallenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              // Call openHeartsModal()
              return;
            }

            incorrectControls.play();
            updateQuizData({ status: 'wrong' });

            if (!response?.error) {
              updateQuizData({ hearts: Math.max(quizData.hearts - 1, 0) });
            }
          })
          .catch(() => toast.error('Something went wrong. Please try again.'));
      }
    });
  }, [
    quizData.selectedOption,
    quizData.status,
    quizData.percentage,
    quizData.hearts,
    activeChallengeChoices,
    updateQuizData,
    goToNextChallenge,
    activeChallenge.id,
    correctControls,
    challenges.length,
    completionProgress,
    incorrectControls,
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
