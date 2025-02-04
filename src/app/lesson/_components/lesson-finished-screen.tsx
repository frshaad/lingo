'use client';

import Image from 'next/image';

import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import { useQuizContext } from '../_context/quiz-context';
import QuizFooter from './quiz-footer';
import { ResultCard } from './result-card';

export default function LessonFinishedScreen() {
  const { width, height } = useWindowSize();
  const { finishAudio, hearts, challengesCount } = useQuizContext();

  return (
    <>
      {finishAudio}
      <Confetti
        height={height}
        numberOfPieces={500}
        recycle={false}
        tweenDuration={10_000}
        width={width}
      />
      <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
        <Image
          alt="Finish"
          className="hidden lg:block"
          height={100}
          src="/finish.svg"
          width={100}
        />
        <Image
          alt="Finish"
          className="block lg:hidden"
          height={50}
          src="/finish.svg"
          width={50}
        />
        <h1 className="text-xl font-bold text-neutral-700 lg:text-3xl">
          Great job! <br /> You&apos;ve completed the lesson.
        </h1>
        <div className="flex w-full items-center gap-x-4">
          <ResultCard value={challengesCount * 10} variant="points" />
          <ResultCard value={hearts} variant="hearts" />
        </div>
      </div>
      <QuizFooter status="completed" />
    </>
  );
}
