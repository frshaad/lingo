import { useCallback, useMemo, useTransition } from 'react';

import { useMount } from 'react-use';
import { toast } from 'sonner';

import { upsertChallengeProgress } from '@/actions/challenge-progress.action';
import { reduceHearts } from '@/actions/user-progress.action';
import { useAudioEffects } from '@/hooks/use-audio-effects';
import { useHeartsModal } from '@/hooks/use-hearts-modal';
import { usePracticeModal } from '@/hooks/use-practice-modal';
import { FULL_LIVES_COUNT } from '@/lib/global.constant';

import type { InitialQuizState, QuizChallenge } from '../../_types/quiz';

type UseQuizActionParameters = {
  quizData: InitialQuizState;
  // eslint-disable-next-line no-unused-vars
  updateQuizData: (updates: Partial<InitialQuizState>) => void;
  challenges: QuizChallenge[];
  completionProgress: number;
};

export function useQuizAction({
  quizData,
  updateQuizData,
  challenges,
  completionProgress,
}: UseQuizActionParameters) {
  const [pending, startTransition] = useTransition();
  const {
    correctControls,
    incorrectControls,
    correctAudio,
    finishAudio,
    incorrectAudio,
  } = useAudioEffects();
  const heartsModal = useHeartsModal();
  const practiceModal = usePracticeModal();

  useMount(() => {
    if (completionProgress === 100) {
      practiceModal.open();
    }
  });

  const activeChallenge = challenges[quizData.activeChallengeIndex];
  const activeChallengeChoices = useMemo(
    () => activeChallenge.challengeOptions ?? [],
    [activeChallenge.challengeOptions],
  );

  const selectChoice = useCallback(
    (choiceId: number) => {
      if (quizData.status !== 'none') {
        return;
      }
      updateQuizData({ selectedOption: choiceId });
    },
    [quizData.status, updateQuizData],
  );

  const goToNextChallenge = useCallback(() => {
    updateQuizData({
      activeChallengeIndex: quizData.activeChallengeIndex + 1,
      status: 'none',
      selectedOption: undefined,
    });
  }, [quizData.activeChallengeIndex, updateQuizData]);

  const handleCorrectAnswer = useCallback(async () => {
    try {
      const response = await upsertChallengeProgress(activeChallenge.id);

      if (response?.error === 'hearts') {
        heartsModal.open();
        return;
      }

      correctControls.play();
      updateQuizData({
        status: 'correct',
        percentage: quizData.percentage + 100 / challenges.length,
      });

      // Reward heart for practice sessions
      if (completionProgress === 100) {
        updateQuizData({
          hearts: Math.min(quizData.hearts + 1, FULL_LIVES_COUNT),
        });
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  }, [
    activeChallenge.id,
    challenges.length,
    completionProgress,
    correctControls,
    heartsModal,
    quizData.hearts,
    quizData.percentage,
    updateQuizData,
  ]);

  const handleWrongAnswer = useCallback(async () => {
    try {
      const response = await reduceHearts(activeChallenge.id);

      if (response?.error === 'hearts') {
        heartsModal.open();
        return;
      }

      incorrectControls.play();
      updateQuizData({ status: 'wrong' });

      if (!response?.error) {
        updateQuizData({ hearts: Math.max(quizData.hearts - 1, 0) });
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  }, [
    activeChallenge.id,
    incorrectControls,
    heartsModal,
    quizData.hearts,
    updateQuizData,
  ]);

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
      (choice) => choice.isCorrect,
    );
    if (!correctChoice) {
      return;
    }

    startTransition(() => {
      const isUserAnswerCorrect = correctChoice.id === quizData.selectedOption;
      if (isUserAnswerCorrect) {
        handleCorrectAnswer();
      } else {
        handleWrongAnswer();
      }
    });
  }, [
    quizData.selectedOption,
    quizData.status,
    activeChallengeChoices,
    updateQuizData,
    goToNextChallenge,
    handleCorrectAnswer,
    handleWrongAnswer,
  ]);

  return {
    selectChoice,
    pending,
    proceedToNextStep,
    activeChallenge,
    activeChallengeChoices,
    correctAudio,
    finishAudio,
    incorrectAudio,
  };
}
