'use client';

import Image from 'next/image';

import { InfinityIcon } from 'lucide-react';

import ExitModal from '@/components/modal/exit-modal';
import { Progress } from '@/components/ui/progress';

import { useQuizContext } from '../_context/quiz-context';

const HeartDisplay = ({ count }: { count: number | 'infinity' }) => (
  <div className="flex items-center gap-x-2 font-bold text-rose-500">
    <Image alt="hearts" height={28} src="/heart.svg" width={28} />
    {count === 'infinity' ? (
      <InfinityIcon className="stroke-[3]" size={6} />
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
