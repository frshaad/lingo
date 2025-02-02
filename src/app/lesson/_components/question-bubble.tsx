import Image from 'next/image';

import { useQuizContext } from '../_context/quiz-context';

export default function QuestionBubble() {
  const { activeChallenge } = useQuizContext();

  return (
    <div className="mb-6 flex items-center gap-x-4">
      <Image
        alt="mascot"
        className="max-lg:hidden"
        height={60}
        src="/mascot.svg"
        width={60}
      />
      <Image
        alt="mascot"
        className="lg:hidden"
        height={40}
        src="/mascot.svg"
        width={40}
      />
      <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
        {activeChallenge.question}
        <div className="absolute -left-3 top-1/2 size-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent" />
      </div>
    </div>
  );
}
