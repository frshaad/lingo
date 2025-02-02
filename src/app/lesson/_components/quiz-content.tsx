'use client';

import { useQuizContext } from '../_context/quiz-context';
import ChallengeOptions from './challenge-options';
import QuestionBubble from './question-bubble';

export default function QuizContent() {
  const { title, activeChallenge } = useQuizContext();

  return (
    <article className="mx-auto flex size-full flex-col items-center justify-center gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
      <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
        {title}
      </h1>
      <div className="w-full">
        {activeChallenge.type === 'ASSIST' && <QuestionBubble />}
        <ChallengeOptions />
      </div>
    </article>
  );
}
