import { useQuizContext } from '../_context/quiz-context';
import ChallengeOptions from './challenge-options';
import QuestionBubble from './question-bubble';

export default function QuizContent() {
  const { currentChallengeOptions, title, currentChallenge } = useQuizContext();

  return (
    <article className="mx-auto flex size-full flex-col items-center justify-center gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
      <h1 className="text-center font-bold text-lg text-neutral-700 lg:text-start lg:text-3xl">
        {title}
      </h1>
      <div className="w-full">
        {currentChallenge.type === 'ASSIST' && (
          <QuestionBubble question={currentChallenge.question} />
        )}
        <ChallengeOptions
          options={currentChallengeOptions}
          type={currentChallenge.type}
        />
      </div>
    </article>
  );
}
