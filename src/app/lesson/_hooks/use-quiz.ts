import { useState, useTransition } from 'react';

import type { ChallengeOption } from '@/db/schema';
import type { PopulatedChallenge } from '@/types/db';
import type { QuizStatus } from '@/types/quiz';

type Args = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (PopulatedChallenge & {
    isCompleted: boolean;
    challengeOptions: ChallengeOption[];
  })[];
};

function getInitialChallengeIndex(challenges: Args['initialLessonChallenges']) {
  const firstUncompletedChallengeIndex = challenges.findIndex(
    (challenge) => !challenge.isCompleted
  );
  return firstUncompletedChallengeIndex === -1
    ? 0
    : firstUncompletedChallengeIndex;
}

export function useQuiz({
  initialLessonId,
  initialHearts,
  initialLessonChallenges,
  initialPercentage,
}: Args) {
  const [pending, _startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(() =>
    getInitialChallengeIndex(challenges)
  );
  const [status, setStatus] = useState<QuizStatus>('none');
  const [selectedOption, setSelectedOption] = useState<number>();

  const currentChallenge = challenges[activeChallengeIndex];
  const currentChallengeOptions = currentChallenge.challengeOptions ?? [];
  const title =
    currentChallenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : currentChallenge.question;

  const goToNextChallenge = () => {
    setActiveChallengeIndex((c) => c + 1);
  };

  const handleOptionSelect = (id: number) => {
    if (status !== 'none') {
      return;
    }

    setSelectedOption(id);
  };

  const handleContinue = () => {
    if (!selectedOption) {
      return;
    }

    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    if (status === 'correct') {
      goToNextChallenge();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    const correctAnswer = currentChallengeOptions.find((opt) => opt.isCorrect);
    if (!correctAnswer) {
      return;
    }

    if (correctAnswer.id === selectedOption) {
      //
    } else {
      //
    }
  };

  return {
    lessonId,
    title,
    currentChallengeOptions,
    hearts,
    currentChallenge,
    percentage,
    setHearts,
    setPercentage,
    setActiveChallengeIndex,
    selectedOption,
    handleOptionSelect,
    status,
    pending,
    handleContinue,
  };
}
