'use client';

import { InfinityIcon } from 'lucide-react';
import Image from 'next/image';

import ExitModal from '@/components/modal/exit-modal';
import { Progress } from '@/components/ui/progress';
import { useQuizContext } from '../_context/quiz-context';

const HeartDisplay = ({ count }: { count: number | 'infinity' }) => (
  <div className="flex items-center gap-x-2 font-bold text-rose-500">
    <Image src="/heart.svg" alt="hearts" width={28} height={28} />
    {count === 'infinity' ? (
      <InfinityIcon size={6} className="stroke-[3]" />
    ) : (
      count
    )}
  </div>
);

export default function QuizHeader() {
  const { hearts, percentage, userSubscription } = useQuizContext();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-x-7 px-10 pt-5 lg:pt-12">
      <ExitModal />
      <Progress value={percentage} />
      <HeartDisplay count={userSubscription ? 'infinity' : hearts} />
    </header>
  );
}
