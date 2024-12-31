import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';

import { Progress } from '@/components/ui/progress';

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export default function QuizHeader({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-x-7 px-10 pt-5 lg:pt-12">
      <X
        onClick={() => {}}
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
      />
      <Progress value={percentage} />
      <div className="flex items-center gap-x-2 font-bold text-rose-500">
        <Image src="/heart.svg" alt="hearts" width={28} height={28} />
        {hasActiveSubscription ? (
          <InfinityIcon size={6} className="stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
}
