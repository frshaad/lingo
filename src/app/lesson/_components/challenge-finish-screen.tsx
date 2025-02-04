'use client';

import { useQuizContext } from '../_context/quiz-context';

export default function ChallengeFinishScreen() {
  const { finishAudio } = useQuizContext();

  return (
    <>
      {finishAudio}
      <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
        Finished the challenge!
      </h1>
    </>
  );
}
